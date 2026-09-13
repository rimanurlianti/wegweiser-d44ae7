export type Language = 'en' | 'de';
export type RealityStatus = 'currently-open' | 'needs-confirmation' | 'not-recommended';
export type Grade = '9' | '10';
export type SchoolType =
  | 'gymnasium'
  | 'iss'
  | 'gemeinschaftsschule'
  | 'vocational'
  | 'other'
  | 'unsure';
export type TransitionStatement =
  | 'eligible'
  | 'may-be-eligible'
  | 'not-yet-eligible'
  | 'no-statement'
  | 'unsure';
export type QualificationInfo =
  | 'upper-secondary-confirmed'
  | 'qualification-expected'
  | 'course-levels-listed'
  | 'not-shown'
  | 'unsure';
export type TernaryAnswer = 'yes' | 'no' | 'unsure';
export type PathwayId = 'gymnasiale-oberstufe' | 'berufliches-gymnasium' | 'ausbildung';

export interface RealityProfile {
  city: string;
  postcode: string;
  grade: Grade;
  transitionYear: string;
  schoolType: SchoolType;
  transitionStatement: TransitionStatement;
  qualificationInfo: QualificationInfo;
  hasUpperSecondary: TernaryAnswer;
  maxCommute: 20 | 30 | 45 | 60 | 75;
}

export interface StudentPriorities {
  interest: 'technology' | 'health-social' | 'business-languages' | 'arts' | 'broad' | 'unsure';
  challenge: 'more' | 'balanced' | 'gradual';
  environment: 'independent' | 'collaborative' | 'structured' | 'practical';
  direction: 'abitur' | 'ausbildung' | 'open' | 'unsure';
  avoid: 'commute' | 'narrow' | 'large' | 'low-challenge' | 'other';
}

export interface ParentPriorities {
  optionsOpen: 'very' | 'somewhat' | 'not-main';
  commute: 20 | 30 | 45 | 60 | 75;
  vocationalFocus: 'yes' | 'maybe' | 'no';
  support: 'language' | 'structure' | 'accessibility' | 'none' | 'unsure';
  hope: 'academic' | 'career' | 'wellbeing' | 'flexibility';
}

export interface FamilyProfile {
  reality: RealityProfile;
  student: StudentPriorities;
  parent: ParentPriorities;
}

export interface RealityCheckItem {
  pathwayId: PathwayId;
  status: RealityStatus;
  explanation: string;
  sourceLabel: string;
  sourceDate: string;
  verificationQuestion: string;
}

export interface RealityCheckResult {
  supportedLocation: boolean;
  status: RealityStatus;
  summary: string;
  items: RealityCheckItem[];
}

export interface PathwayCard {
  id: PathwayId;
  name: { en: string; de: string };
  focus: { en: string; de: string };
  resourceUrl: string;
  sourceLabel: string;
  sourceDate: string;
}

export interface SchoolCard {
  id: string;
  pathwayId: PathwayId;
  name: string;
  programme: { en: string; de: string };
  tags: string[];
  neighbourhood: string;
  address: string;
  postcode: string;
  latitude: number;
  longitude: number;
  commuteMinutes: number;
  officialWebsiteUrl: string;
  entryRequirementsUrl: string;
  sourceDate: string;
  whyFit: { en: string; de: string };
  matches: { en: string[]; de: string[] };
  mismatches: { en: string[]; de: string[] };
  missingInformation: { en: string[]; de: string[] };
}

export interface GuidancePathway {
  pathwayId: PathwayId;
  status: RealityStatus;
  whyFit: string;
  tradeOff: string;
  alternativeQuestion?: string;
}

export interface GuidanceSchool {
  schoolId: string;
  matches: string[];
  potentialMismatches: string[];
  missingInformation: string[];
  visitQuestions: string[];
}

export interface ActionTask {
  id: string;
  bucket: 'now' | 'this-week' | 'open-day' | 'application' | 'confirm-deadline';
  title: string;
  why: string;
  linkType: 'school' | 'website' | 'resource';
  schoolId?: string;
  url?: string;
  verifiedDate?: string;
}

export interface GuidanceOutput {
  pathways: GuidancePathway[];
  schools: GuidanceSchool[];
  counsellorQuestion: string;
  germanEmail: { subject: string; body: string };
  tasks: ActionTask[];
}
