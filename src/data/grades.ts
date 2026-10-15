import { GradeInfo, TermInfo, PeriodInfo } from '../types';

export const GRADES_DATA: GradeInfo[] = [
  {
    id: 1,
    name: 'اختبارات الصف الأول ابتدائي',
    shortName: 'الصف الأول ابتدائي',
    levelTitle: 'الأول ابتدائي',
    easternNumber: '١',
    stage: 'elementary',
    stageName: 'المرحلة الابتدائية',
    badgeColor: 'emerald',
    iconName: 'BookOpen',
    description: 'تأسيس لغتي الجميلة والرياضيات والعلوم والدراسات الإسلامية لطلاب الصف الأول',
  },
  {
    id: 2,
    name: 'اختبارات الصف الثاني ابتدائي',
    shortName: 'الصف الثاني ابتدائي',
    levelTitle: 'الثاني ابتدائي',
    easternNumber: '٢',
    stage: 'elementary',
    stageName: 'المرحلة الابتدائية',
    badgeColor: 'emerald',
    iconName: 'Pencil',
    description: 'تمارين القراءة والكتابة والعمليات الحسابية والتربية الإسلامية',
  },
  {
    id: 3,
    name: 'اختبارات الصف الثالث ابتدائي',
    shortName: 'الصف الثالث ابتدائي',
    levelTitle: 'الثالث ابتدائي',
    easternNumber: '٣',
    stage: 'elementary',
    stageName: 'المرحلة الابتدائية',
    badgeColor: 'emerald',
    iconName: 'Sparkles',
    description: 'جداول الضرب والعلوم المطورة والمهارات اللغوية والتربية الفنية',
  },
  {
    id: 4,
    name: 'اختبارات الصف الرابع ابتدائي',
    shortName: 'الصف الرابع ابتدائي',
    levelTitle: 'الرابع ابتدائي',
    easternNumber: '٤',
    stage: 'elementary',
    stageName: 'المرحلة الابتدائية',
    badgeColor: 'emerald',
    iconName: 'Compass',
    description: 'الدراسات الاجتماعية وتاريخ وطني والكسور واللغة الإنجليزية',
  },
  {
    id: 5,
    name: 'اختبارات الصف الخامس ابتدائي',
    shortName: 'الصف الخامس ابتدائي',
    levelTitle: 'الخامس ابتدائي',
    easternNumber: '٥',
    stage: 'elementary',
    stageName: 'المرحلة الابتدائية',
    badgeColor: 'emerald',
    iconName: 'Calculator',
    description: 'العلوم الطبيعية والرياضيات والهندسة والمهارات الرقمية',
  },
  {
    id: 6,
    name: 'اختبارات الصف السادس ابتدائي',
    shortName: 'الصف السادس ابتدائي',
    levelTitle: 'السادس ابتدائي',
    easternNumber: '٦',
    stage: 'elementary',
    stageName: 'المرحلة الابتدائية',
    badgeColor: 'emerald',
    iconName: 'GraduationCap',
    description: 'سنة التخرج من المرحلة الابتدائية والاستعداد للمرحلة المتوسطة',
  },
  {
    id: 7,
    name: 'اختبارات الصف الأول متوسط',
    shortName: 'الصف الأول متوسط',
    levelTitle: 'الأول متوسط',
    easternNumber: '٧',
    stage: 'middle',
    stageName: 'المرحلة المتوسطة',
    badgeColor: 'teal',
    iconName: 'Atom',
    description: 'الجبر والأعداد الصحيحة والعلوم العامة ولغتي الخالدة',
  },
  {
    id: 8,
    name: 'اختبارات الصف الثاني متوسط',
    shortName: 'الصف الثاني متوسط',
    levelTitle: 'الثاني متوسط',
    easternNumber: '٨',
    stage: 'middle',
    stageName: 'المرحلة المتوسطة',
    badgeColor: 'teal',
    iconName: 'Layers',
    description: 'الهندسة والفيزياء التأسيسية والدراسات الاجتماعية الموسعة',
  },
  {
    id: 9,
    name: 'اختبارات الصف الثالث متوسط',
    shortName: 'الصف الثالث متوسط',
    levelTitle: 'الثالث متوسط',
    easternNumber: '٩',
    stage: 'middle',
    stageName: 'المرحلة المتوسطة',
    badgeColor: 'teal',
    iconName: 'Award',
    description: 'سنة الحصاد للمرحلة المتوسطة والاستعداد للانتقال للمرحلة الثانوية',
  },
  {
    id: 10,
    name: 'اختبارات الصف الأول ثانوي',
    shortName: 'الصف الأول ثانوي',
    levelTitle: 'الأول ثانوي (مسارات)',
    easternNumber: '١٠',
    stage: 'high',
    stageName: 'المرحلة الثانوية',
    badgeColor: 'amber',
    iconName: 'Cpu',
    description: 'نظام المسارات، التقنية الرقمية، الرياضيات ١، فيزياء وأحياء ١',
  },
  {
    id: 11,
    name: 'اختبارات الصف الثاني ثانوي',
    shortName: 'الصف الثاني ثانوي',
    levelTitle: 'الثاني ثانوي (مسارات)',
    easternNumber: '١١',
    stage: 'high',
    stageName: 'المرحلة الثانوية',
    badgeColor: 'amber',
    iconName: 'Binary',
    description: 'المسار العام، مسار علوم الحاسب والهندسة، الصحة والحياة، إدارة الأعمال',
  },
  {
    id: 12,
    name: 'اختبارات الصف الثالث ثانوي',
    shortName: 'الصف الثالث ثانوي',
    levelTitle: 'الثالث ثانوي (التخرج)',
    easternNumber: '١٢',
    stage: 'high',
    stageName: 'المرحلة الثانوية',
    badgeColor: 'amber',
    iconName: 'Trophy',
    description: 'السنة النهائية، التفاضل والتكامل، القدرات والتحصيلي ومشاريع التخرج',
  },
];

export const TERMS_DATA: TermInfo[] = [
  {
    id: 1,
    name: 'اختبارات الفصل الأول',
    fullName: (gradeName: string) => `اختبارات الفصل الأول لـ ${gradeName}`,
    easternNumber: '١',
  },
  {
    id: 2,
    name: 'اختبارات الفصل الثاني',
    fullName: (gradeName: string) => `اختبارات الفصل الثاني لـ ${gradeName}`,
    easternNumber: '٢',
  },
];

export const ELEMENTARY_MIDDLE_PERIODS_DATA: PeriodInfo[] = [
  {
    id: 'first_period',
    name: 'اختبارات الفترة الأولى',
    fullName: (gradeName: string, termName: string) =>
      `اختبارات الفترة الأولى - لـ ${gradeName}، ${termName}`,
    easternNumber: '١',
    badge: 'الفترة ١',
  },
  {
    id: 'second_period',
    name: 'اختبارات الفترة الثانية',
    fullName: (gradeName: string, termName: string) =>
      `اختبارات الفترة الثانية - لـ ${gradeName}، ${termName}`,
    easternNumber: '٢',
    badge: 'الفترة ٢',
  },
  {
    id: 'final',
    name: 'الاختبارات النهائية',
    fullName: (gradeName: string, termName: string) =>
      `الاختبارات النهائية - لـ ${gradeName}، ${termName}`,
    easternNumber: 'ن',
    badge: 'النهائي',
  },
];

export const HIGH_SCHOOL_PERIODS_DATA: PeriodInfo[] = [
  {
    id: 'periodic',
    name: 'الاختبارات الفترية',
    fullName: (gradeName: string, termName: string) =>
      `الاختبارات الفترية - لـ ${gradeName}، ${termName}`,
    easternNumber: 'ف',
    badge: 'الفترية',
  },
  {
    id: 'final',
    name: 'الاختبارات النهائية',
    fullName: (gradeName: string, termName: string) =>
      `الاختبارات النهائية - لـ ${gradeName}، ${termName}`,
    easternNumber: 'ن',
    badge: 'النهائي',
  },
];

export const PERIODS_DATA: PeriodInfo[] = [
  ...ELEMENTARY_MIDDLE_PERIODS_DATA,
  HIGH_SCHOOL_PERIODS_DATA[0], // include periodic for generic lookup
];

export function getPeriodsForGrade(gradeIdOrInfo: number | GradeInfo): PeriodInfo[] {
  const grade = typeof gradeIdOrInfo === 'number' ? getGradeById(gradeIdOrInfo) : gradeIdOrInfo;
  if (grade && (grade.stage === 'high' || grade.id >= 10)) {
    return HIGH_SCHOOL_PERIODS_DATA;
  }
  return ELEMENTARY_MIDDLE_PERIODS_DATA;
}

export function getGradeById(id: number): GradeInfo | undefined {
  return GRADES_DATA.find((g) => g.id === id);
}

export function getTermById(id: number): TermInfo | undefined {
  return TERMS_DATA.find((t) => t.id === id);
}

export function getPeriodById(id: string): PeriodInfo | undefined {
  if (id === 'periodic') {
    return HIGH_SCHOOL_PERIODS_DATA.find((p) => p.id === 'periodic');
  }
  return PERIODS_DATA.find((p) => p.id === id);
}
