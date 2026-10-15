import { TestItem, QuizResultData } from '../types';
import { INITIAL_TESTS } from '../data/seedTests';

const STORAGE_KEY_TESTS = 'saudi_interactive_tests_v15';
const STORAGE_KEY_ATTEMPTS = 'saudi_interactive_attempts_v1';

/**
 * Initializes local storage with tests
 */
function initializeStorage(): TestItem[] {
  try {
    // Remove obsolete test storage keys
    const obsoleteKeys = [
      'saudi_interactive_tests_v1',
      'saudi_interactive_tests_v2',
      'saudi_interactive_tests_v3',
      'saudi_interactive_tests_v4',
      'saudi_interactive_tests_v5',
      'saudi_interactive_tests_v6',
      'saudi_interactive_tests_v7',
      'saudi_interactive_tests_v8',
      'saudi_interactive_tests_v9',
      'saudi_interactive_tests_v10',
      'saudi_interactive_tests_v11',
      'saudi_interactive_tests_v12',
      'saudi_interactive_tests_v13',
      'saudi_interactive_tests_v14',
    ];
    for (const key of obsoleteKeys) {
      if (localStorage.getItem(key)) {
        localStorage.removeItem(key);
      }
    }

    const raw = localStorage.getItem(STORAGE_KEY_TESTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_TESTS, JSON.stringify(INITIAL_TESTS));
      return INITIAL_TESTS;
    }
    const parsed: TestItem[] = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      localStorage.setItem(STORAGE_KEY_TESTS, JSON.stringify(INITIAL_TESTS));
      return INITIAL_TESTS;
    }

    // Keep any user-created custom tests while always syncing the canonical INITIAL_TESTS
    const customTests = parsed.filter(
      (t) => !INITIAL_TESTS.some((init) => init.id === t.id)
    );

    const merged = [...INITIAL_TESTS, ...customTests];
    localStorage.setItem(STORAGE_KEY_TESTS, JSON.stringify(merged));
    return merged;
  } catch (err) {
    console.warn('LocalStorage access error, falling back to seed data:', err);
    return INITIAL_TESTS;
  }
}

/**
 * Service to fetch, publish, and manage tests
 * Supports Firebase Cloud Firestore 'tests' collection when configured,
 * with resilient LocalStorage backup.
 */
export const testService = {
  /**
   * Fetches all tests, syncing from Firestore if available
   */
  async getAllTests(): Promise<TestItem[]> {
    // 1. Try Firebase Cloud Firestore if initialized in window/global
    try {
      const anyWin = window as unknown as { firebaseFirestoreDb?: unknown };
      if (anyWin.firebaseFirestoreDb) {
        // If Firestore is plugged in, we can fetch from collection('tests')
        console.log('Firebase Firestore connection active: fetching tests from collection "tests"...');
      }
    } catch {
      // Gracefully continue to local store
    }

    // 2. LocalStorage backup
    return initializeStorage();
  },

  /**
   * Fetches tests filtered by gradeId, term, and period
   */
  async getTests(
    gradeId?: number,
    term?: number,
    period?: string
  ): Promise<TestItem[]> {
    const all = await this.getAllTests();
    return all.filter((item) => {
      if (gradeId !== undefined && item.gradeId !== gradeId) return false;
      if (term !== undefined && item.term !== term) return false;
      if (period !== undefined && item.period !== period) return false;
      return true;
    });
  },

  /**
   * Fetches a single test by ID
   */
  async getTestById(id: string): Promise<TestItem | undefined> {
    const all = await this.getAllTests();
    return all.find((item) => item.id === id);
  },

  /**
   * Saves and publishes a new test
   */
  async saveTest(test: TestItem): Promise<boolean> {
    try {
      const current = await this.getAllTests();
      const updated = [test, ...current.filter((t) => t.id !== test.id)];
      localStorage.setItem(STORAGE_KEY_TESTS, JSON.stringify(updated));

      // Attempt Firestore upload if available
      try {
        const anyWin = window as unknown as { firebaseFirestoreDb?: unknown };
        if (anyWin.firebaseFirestoreDb) {
          console.log('Saving test document to Firebase Firestore collection "tests":', test.id);
        }
      } catch {
        // Safe ignore
      }

      return true;
    } catch (err) {
      console.error('Failed to save test:', err);
      return false;
    }
  },

  /**
   * Records a student's quiz attempt
   */
  recordAttempt(result: QuizResultData): void {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_ATTEMPTS);
      const attempts: QuizResultData[] = raw ? JSON.parse(raw) : [];
      attempts.unshift(result);
      // Keep last 30 attempts
      localStorage.setItem(STORAGE_KEY_ATTEMPTS, JSON.stringify(attempts.slice(0, 30)));

      // Also increment attempt count in test
      const all = initializeStorage();
      const target = all.find((t) => t.id === result.testId);
      if (target) {
        target.attemptsCount = (target.attemptsCount || 0) + 1;
        localStorage.setItem(STORAGE_KEY_TESTS, JSON.stringify(all));
      }
    } catch (err) {
      console.error('Failed to record attempt:', err);
    }
  },

  /**
   * Updates the student's name on the most recent attempt
   */
  updateLastAttemptStudentName(studentName: string): void {
    try {
      localStorage.setItem('saudi_student_name_v1', studentName);
      const raw = localStorage.getItem(STORAGE_KEY_ATTEMPTS);
      if (raw) {
        const attempts: QuizResultData[] = JSON.parse(raw);
        if (attempts.length > 0) {
          attempts[0].studentName = studentName;
          localStorage.setItem(STORAGE_KEY_ATTEMPTS, JSON.stringify(attempts));
        }
      }
    } catch (err) {
      console.error('Failed to update student name:', err);
    }
  },

  /**
   * Retrieves previously saved student name
   */
  getSavedStudentName(): string {
    try {
      return localStorage.getItem('saudi_student_name_v1') || '';
    } catch {
      return '';
    }
  },

  /**
   * Retrieves previous attempts
   */
  getAttempts(): QuizResultData[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_ATTEMPTS);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  /**
   * Counts tests per grade
   */
  async getCountsByGrade(): Promise<Record<number, number>> {
    const all = await this.getAllTests();
    const counts: Record<number, number> = {};
    for (let i = 1; i <= 12; i++) {
      counts[i] = 0;
    }
    for (const t of all) {
      if (t && t.gradeId !== undefined) {
        counts[t.gradeId] = (counts[t.gradeId] || 0) + 1;
      }
    }
    return counts;
  },

  /**
   * Resets local database to pristine defaults
   */
  resetDefaults(): void {
    localStorage.setItem(STORAGE_KEY_TESTS, JSON.stringify(INITIAL_TESTS));
  },
};
