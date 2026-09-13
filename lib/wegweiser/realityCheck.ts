import { BERLIN_RULE_CARD } from './data';
import type {
  PathwayId,
  RealityCheckItem,
  RealityCheckResult,
  RealityProfile,
  RealityStatus,
} from './types';

const PATHWAYS: PathwayId[] = ['gymnasiale-oberstufe', 'berufliches-gymnasium', 'ausbildung'];

function item(
  pathwayId: PathwayId,
  status: RealityStatus,
  explanation: string,
  question: string,
): RealityCheckItem {
  return {
    pathwayId,
    status,
    explanation,
    questionToVerify: question,
    verificationQuestion: question,
    sourceLabel: BERLIN_RULE_CARD.label,
    sourceDate: BERLIN_RULE_CARD.date,
  } as RealityCheckItem;
}

export function realityCheck(profile: RealityProfile): RealityCheckResult {
  const supportedLocation = profile.city.trim().toLowerCase() === 'berlin';
  if (!supportedLocation) {
    return {
      supportedLocation: false,
      status: 'not-recommended',
      summary:
        'Wegweiser currently supports Berlin. Local rules for this location are being added.',
      items: [],
    };
  }

  const upperSecondaryStatus: RealityStatus =
    profile.transitionStatement === 'eligible'
      ? 'currently-open'
      : profile.transitionStatement === 'not-yet-eligible'
        ? 'not-recommended'
        : 'needs-confirmation';
  const vocationalStatus: RealityStatus =
    profile.transitionStatement === 'not-yet-eligible'
      ? 'needs-confirmation'
      : upperSecondaryStatus;
  const trainingStatus: RealityStatus =
    profile.grade === '10' ? 'currently-open' : 'needs-confirmation';

  const checks = [
    item(
      'gymnasiale-oberstufe',
      upperSecondaryStatus,
      upperSecondaryStatus === 'currently-open'
        ? 'The current school has stated that this transition is eligible. Confirm the receiving school’s requirements.'
        : upperSecondaryStatus === 'not-recommended'
          ? 'The current information does not support treating this as an active option yet. This is not a legal admission decision.'
          : 'Based on the demo rule card, confirm this transition status with your current school.',
      'Can you confirm in writing whether the student currently meets the transition conditions for a gymnasiale Oberstufe?',
    ),
    item(
      'berufliches-gymnasium',
      vocationalStatus,
      vocationalStatus === 'currently-open'
        ? 'The school statement supports exploring this route, while each programme’s entry requirements still need checking.'
        : 'The demo information is not enough to confirm the transition. Ask about both the qualification and programme-specific conditions.',
      'Which documented qualification and course-level conditions should we verify for a berufliches Gymnasium?',
    ),
    item(
      'ausbildung',
      trainingStatus,
      profile.grade === '10'
        ? 'A practical training-oriented route can be explored; exact programme and employer requirements vary.'
        : 'For Grade 9, timing and the intended qualification need confirmation before treating this route as ready.',
      'Which training-preparation or Ausbildung routes match the student’s expected qualification and transition year?',
    ),
  ];

  const status = PATHWAYS.map(
    (id) => checks.find((check) => check.pathwayId === id)?.status,
  ).includes('currently-open')
    ? 'currently-open'
    : 'needs-confirmation';
  return {
    supportedLocation: true,
    status,
    summary:
      'This prototype compares the information you entered with a local demo rule card. It does not decide eligibility or admission.',
    items: checks,
  };
}
