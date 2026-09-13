import { getSchool, pathwayCards, schoolCards } from './data';
import type {
  ActionTask,
  FamilyProfile,
  GuidanceOutput,
  PathwayCard,
  RealityCheckResult,
  SchoolCard,
} from './types';

export interface GuidanceService {
  generateGuidance(
    profile: FamilyProfile,
    realityCheckResult: RealityCheckResult,
    pathways: PathwayCard[],
    schools: SchoolCard[],
  ): Promise<GuidanceOutput>;
}

function interestLabel(profile: FamilyProfile) {
  const labels: Record<FamilyProfile['student']['interest'], string> = {
    technology: 'technology',
    'health-social': 'health and social care',
    'business-languages': 'business and languages',
    arts: 'creative subjects',
    broad: 'a broad academic mix',
    unsure: 'keeping interests open',
  };
  return labels[profile.student.interest];
}

function parentLabel(profile: FamilyProfile) {
  if (profile.parent.hope === 'academic') return 'academic progression';
  if (profile.parent.hope === 'career') return 'career exploration';
  if (profile.parent.hope === 'wellbeing') return 'confidence and wellbeing';
  return 'future flexibility';
}

export function createActionTasks(schoolId: string): ActionTask[] {
  const school = getSchool(schoolId);
  return [
    {
      id: `${schoolId}-requirements`,
      bucket: 'now',
      title: 'Compare the school’s official entry requirements',
      why: 'This separates confirmed criteria from assumptions.',
      linkType: 'resource',
      schoolId,
      url: school?.entryRequirementsUrl,
    },
    {
      id: `${schoolId}-email`,
      bucket: 'this-week',
      title: 'Send the German email draft',
      why: 'Direct answers can resolve the most important missing information.',
      linkType: 'school',
      schoolId,
    },
    {
      id: `${schoolId}-event`,
      bucket: 'open-day',
      title: 'Book or attend an information event',
      why: 'A visit helps compare the learning environment with the family profile.',
      linkType: 'website',
      schoolId,
      url: school?.officialWebsiteUrl,
    },
    {
      id: `${schoolId}-counsellor`,
      bucket: 'this-week',
      title: 'Ask the current-school counsellor to confirm the transition status',
      why: 'The prototype does not determine legal eligibility.',
      linkType: 'resource',
      schoolId,
      url: 'https://www.berlin.de/sen/bildung/schule-und-beruf/',
    },
    {
      id: `${schoolId}-documents`,
      bucket: 'confirm-deadline',
      title: 'Gather documents listed on the official application page',
      why: 'Requirements and dates can change; use only the school’s current list.',
      linkType: 'resource',
      schoolId,
      url: school?.entryRequirementsUrl,
    },
  ];
}

export const demoGuidanceService: GuidanceService = {
  async generateGuidance(profile, check, pathways, schools) {
    const selectedSchool = schools[0] ?? schoolCards[0];
    const missing = selectedSchool.missingInformation.en;
    return {
      pathways: pathways.map((pathway) => {
        const status =
          check.items.find((entry) => entry.pathwayId === pathway.id)?.status ??
          'needs-confirmation';
        return {
          pathwayId: pathway.id,
          status,
          whyFit: `The student’s interest in ${interestLabel(profile)} can be considered alongside the parent priority of ${parentLabel(profile)}.`,
          tradeOff:
            pathway.id === 'gymnasiale-oberstufe'
              ? 'A broad academic route can mean less early career specialisation.'
              : pathway.id === 'berufliches-gymnasium'
                ? 'The vocational focus narrows subject choice and entry conditions need checking.'
                : 'This practical route is not the same as a direct broad Abitur pathway.',
          alternativeQuestion:
            status === 'not-recommended'
              ? check.items.find((entry) => entry.pathwayId === pathway.id)?.verificationQuestion
              : undefined,
        };
      }),
      schools: schools.map((school) => ({
        schoolId: school.id,
        matches: school.matches.en,
        potentialMismatches: school.mismatches.en,
        missingInformation: school.missingInformation.en,
        visitQuestions: school.missingInformation.en,
      })),
      counsellorQuestion:
        'Can you confirm in writing which transition routes the student’s current official record supports?',
      germanEmail: {
        subject: `Fragen zum Bildungsgang an der ${selectedSchool.name}`,
        body: `Sehr geehrte Damen und Herren,\n\nwir interessieren uns für den Bildungsgang „${selectedSchool.programme.de}“ für das kommende Übergangsschuljahr.\n\nDazu haben wir zwei Fragen:\n1. ${missing[0] ?? 'Welche aktuellen Zugangsvoraussetzungen gelten?'}\n2. ${missing[1] ?? 'Welche Unterlagen werden für die Bewerbung benötigt?'}\n\nKönnten Sie uns außerdem Informationen zu einem Beratungstermin, Tag der offenen Tür oder zu den aktuellen Bewerbungsanforderungen senden?\n\nMit freundlichen Grüßen\nFamilie Muster`,
      },
      tasks: createActionTasks(selectedSchool.id),
    };
  },
};

export async function generateGuidance(
  profile: FamilyProfile,
  realityCheckResult: RealityCheckResult,
  pathways: PathwayCard[] = pathwayCards,
  schools: SchoolCard[] = schoolCards,
): Promise<GuidanceOutput> {
  // A future server endpoint may be selected with EXPO_PUBLIC_GUIDANCE_ENDPOINT.
  // It must receive source facts only and return the same structured JSON shape.
  // Reality statuses are always applied from realityCheck(), never from AI output.
  return demoGuidanceService.generateGuidance(profile, realityCheckResult, pathways, schools);
}
