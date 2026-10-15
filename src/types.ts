export type EducationalStage = 'elementary' | 'middle' | 'high';

export interface GradeInfo {
  id: number; // 1 to 12
  name: string; // e.g. "اختبارات الصف الأول ابتدائي"
  shortName: string; // e.g. "الصف الأول ابتدائي"
  levelTitle: string; // "الأول ابتدائي"
  easternNumber: string; // "١"
  stage: EducationalStage;
  stageName: string; // "المرحلة الابتدائية"
  badgeColor: string;
  iconName: string;
  description: string;
}

export type TermId = 1 | 2;

export interface TermInfo {
  id: TermId;
  name: string; // "الفصل الأول", "الفصل الثاني"
  fullName: (gradeName: string) => string;
  easternNumber: string;
}

export type PeriodId = 'first_period' | 'second_period' | 'final' | 'periodic';

export interface PeriodInfo {
  id: PeriodId;
  name: string; // "الفترة الأولى", "الفترة الثانية", "الاختبارات النهائية"
  fullName: (gradeName: string, termName: string) => string;
  easternNumber: string;
  badge: string;
}

export interface Question {
  id: string;
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
  explanation?: string;
  points?: number;
  imageUrl?: string;
}

export interface SeoTopicItem {
  title?: string;
  h3?: string;
  description?: string;
  content?: string;
}

export interface SeoArticle {
  h1: string;
  metaDescription: string;
  targetKeywords?: string[];
  keywords?: string[];
  introduction: string;
  importanceH2?: string;
  importanceContent?: string;
  importanceSection?: string;
  keyTopicsH2?: string;
  keyTopics?: {
    h3: string;
    content: string;
  }[];
  topicsCovered?: {
    title: string;
    description: string;
  }[];
  tipsH2?: string;
  tips?: string[];
  examTips?: string[];
  conclusion: string;
}

export interface TestItem {
  id: string;
  gradeId: number;
  term: TermId;
  period: PeriodId;
  testTitle: string;
  subject: string;
  durationMinutes: number;
  totalMarks: number;
  questions: Question[];
  seoArticle?: SeoArticle;
  authorName?: string;
  schoolName?: string;
  createdAt: string;
  attemptsCount?: number;
}

export interface QuizAnswer {
  questionId: string;
  selectedOptionIndex: number;
  isCorrect: boolean;
}

export interface QuizResultData {
  testId: string;
  testTitle: string;
  gradeName: string;
  termName: string;
  periodName: string;
  studentName: string;
  score: number;
  totalMarks: number;
  percentage: number;
  timeTakenSeconds: number;
  answers: QuizAnswer[];
  passed: boolean;
  date: string;
}
