import type { PathwayCard, SchoolCard } from './types';

export const GUIDANCE_NOTICE = {
  en: 'Guidance, not admissions advice. Verify requirements directly with the school.',
  de: 'Orientierung, keine Zulassungsberatung. Bitte Anforderungen direkt mit der Schule prüfen.',
};

export const BERLIN_RULE_CARD = {
  id: 'berlin-demo-transition-2026',
  label: 'Berlin demo rule card',
  date: '2026-08-15',
  disclaimer:
    'Prototype logic only. Confirm every transition requirement with the current and receiving school.',
  officialResourceUrl: 'https://www.berlin.de/sen/bildung/schule-und-beruf/',
};

export const pathwayCards: PathwayCard[] = [
  {
    id: 'gymnasiale-oberstufe',
    name: { en: 'Gymnasiale Oberstufe', de: 'Gymnasiale Oberstufe' },
    focus: { en: 'Broad Abitur pathway', de: 'Breiter Weg zum Abitur' },
    resourceUrl: 'https://www.berlin.de/sen/bildung/schule-und-beruf/abitur/',
    sourceLabel: 'Berlin education portal',
    sourceDate: '2026-08-15',
  },
  {
    id: 'berufliches-gymnasium',
    name: { en: 'Berufliches Gymnasium', de: 'Berufliches Gymnasium' },
    focus: { en: 'Abitur with a vocational focus', de: 'Abitur mit beruflichem Schwerpunkt' },
    resourceUrl: 'https://www.berlin.de/sen/bildung/schule-und-beruf/berufliche-bildung/',
    sourceLabel: 'Berlin education portal',
    sourceDate: '2026-08-15',
  },
  {
    id: 'ausbildung',
    name: { en: 'Ausbildung-oriented pathway', de: 'Ausbildungsorientierter Weg' },
    focus: {
      en: 'Practical professional route with later options',
      de: 'Praxisnaher Berufsweg mit späteren Anschlussmöglichkeiten',
    },
    resourceUrl: 'https://www.berlin.de/sen/bildung/schule-und-beruf/berufliche-bildung/',
    sourceLabel: 'Berlin education portal',
    sourceDate: '2026-08-15',
  },
];

export const schoolCards: SchoolCard[] = [
  {
    id: 'nordstern-oberstufe',
    pathwayId: 'gymnasiale-oberstufe',
    name: 'Nordstern Gemeinschaftsschule',
    programme: { en: 'Broad upper-secondary programme', de: 'Breite gymnasiale Oberstufe' },
    tags: ['broad academic', 'languages', 'collaborative'],
    neighbourhood: 'Moabit',
    address: 'Lehrter Ufer 18, 10557 Berlin',
    postcode: '10557',
    latitude: 52.5265,
    longitude: 13.3654,
    commuteMinutes: 28,
    officialWebsiteUrl: 'https://www.berlin.de/sen/bildung/schule/',
    entryRequirementsUrl: 'https://www.berlin.de/sen/bildung/schule-und-beruf/abitur/',
    sourceDate: '2026-08-15',
    whyFit: {
      en: 'A broad programme may suit families who want to keep several academic directions open.',
      de: 'Ein breites Angebot kann zu Familien passen, die mehrere akademische Wege offenhalten möchten.',
    },
    matches: {
      en: ['Broad subject choice', 'Collaborative project blocks'],
      de: ['Breite Fächerwahl', 'Gemeinsame Projektblöcke'],
    },
    mismatches: {
      en: ['No specific vocational focus is listed'],
      de: ['Kein besonderer beruflicher Schwerpunkt angegeben'],
    },
    missingInformation: {
      en: [
        'Which course combinations will run next year?',
        'What transition documents are required?',
      ],
      de: [
        'Welche Kurskombinationen finden nächstes Jahr statt?',
        'Welche Übergangsunterlagen werden benötigt?',
      ],
    },
  },
  {
    id: 'spreebogen-kolleg',
    pathwayId: 'gymnasiale-oberstufe',
    name: 'Spreebogen Sekundarschule',
    programme: {
      en: 'Upper secondary with languages and social sciences',
      de: 'Oberstufe mit Sprachen und Gesellschaftswissenschaften',
    },
    tags: ['languages', 'social sciences', 'structured'],
    neighbourhood: 'Friedrichshain',
    address: 'Rudolfstraße 11, 10245 Berlin',
    postcode: '10245',
    latitude: 52.5038,
    longitude: 13.4502,
    commuteMinutes: 39,
    officialWebsiteUrl: 'https://www.berlin.de/sen/bildung/schule/',
    entryRequirementsUrl: 'https://www.berlin.de/sen/bildung/schule-und-beruf/abitur/',
    sourceDate: '2026-08-15',
    whyFit: {
      en: 'Its listed language and social-science emphasis supports broad academic exploration.',
      de: 'Der angegebene Sprach- und Gesellschaftsschwerpunkt unterstützt breite akademische Erkundung.',
    },
    matches: {
      en: ['Languages and social sciences', 'Structured orientation phase'],
      de: ['Sprachen und Gesellschaftswissenschaften', 'Strukturierte Einführungsphase'],
    },
    mismatches: {
      en: ['Commute may be near the family limit'],
      de: ['Der Schulweg könnte nahe an der Familiengrenze liegen'],
    },
    missingInformation: {
      en: [
        'Is learning support available in the orientation phase?',
        'When is the next information evening?',
      ],
      de: [
        'Gibt es Lernunterstützung in der Einführungsphase?',
        'Wann ist der nächste Informationsabend?',
      ],
    },
  },
  {
    id: 'tempelhofer-campus',
    pathwayId: 'gymnasiale-oberstufe',
    name: 'Tempelhofer Campus am Park',
    programme: {
      en: 'Upper secondary with arts and sciences',
      de: 'Oberstufe mit Kunst und Naturwissenschaften',
    },
    tags: ['arts', 'science', 'independent'],
    neighbourhood: 'Tempelhof',
    address: 'Parkring 7, 12101 Berlin',
    postcode: '12101',
    latitude: 52.4772,
    longitude: 13.3852,
    commuteMinutes: 44,
    officialWebsiteUrl: 'https://www.berlin.de/sen/bildung/schule/',
    entryRequirementsUrl: 'https://www.berlin.de/sen/bildung/schule-und-beruf/abitur/',
    sourceDate: '2026-08-15',
    whyFit: {
      en: 'Arts and science options may help a student keep interests open while preparing for Abitur.',
      de: 'Kunst- und Naturwissenschaftsangebote können Interessen offenhalten und auf das Abitur vorbereiten.',
    },
    matches: {
      en: ['Arts and science electives', 'Independent study periods'],
      de: ['Wahlangebote in Kunst und Naturwissenschaften', 'Selbstständige Lernzeiten'],
    },
    mismatches: {
      en: ['Travel is longer than the other demo options'],
      de: ['Der Schulweg ist länger als bei den anderen Demo-Optionen'],
    },
    missingInformation: {
      en: ['Which advanced courses are guaranteed?', 'Is accessibility support available?'],
      de: ['Welche Leistungskurse werden garantiert?', 'Welche Barrierefreiheitsangebote gibt es?'],
    },
  },
  {
    id: 'technikforum-berlin',
    pathwayId: 'berufliches-gymnasium',
    name: 'Technikforum Berlin',
    programme: { en: 'Vocational Gymnasium — technology', de: 'Berufliches Gymnasium — Technik' },
    tags: ['technology', 'project-based', 'abitur'],
    neighbourhood: 'Siemensstadt',
    address: 'Nonnendammallee 92, 13629 Berlin',
    postcode: '13629',
    latitude: 52.5379,
    longitude: 13.2678,
    commuteMinutes: 42,
    officialWebsiteUrl: 'https://www.berlin.de/sen/bildung/schule-und-beruf/berufliche-bildung/',
    entryRequirementsUrl: 'https://www.berlin.de/sen/bildung/schule-und-beruf/berufliche-bildung/',
    sourceDate: '2026-08-15',
    whyFit: {
      en: 'A technology focus combines academic progression with practical projects.',
      de: 'Der Technikschwerpunkt verbindet akademischen Fortschritt mit praktischen Projekten.',
    },
    matches: {
      en: ['Technology focus', 'Project-based modules'],
      de: ['Technikschwerpunkt', 'Projektbasierte Module'],
    },
    mismatches: {
      en: ['The subject focus is narrower than a general upper secondary school'],
      de: ['Der Fachschwerpunkt ist enger als an einer allgemeinen Oberstufe'],
    },
    missingInformation: {
      en: [
        'Which prior maths level is expected?',
        'Are workshop visits available before applying?',
      ],
      de: [
        'Welches Mathematikniveau wird erwartet?',
        'Sind Werkstattbesuche vor der Bewerbung möglich?',
      ],
    },
  },
  {
    id: 'handelshaus-bergmann',
    pathwayId: 'berufliches-gymnasium',
    name: 'Handelshaus am Bergmannkiez',
    programme: {
      en: 'Vocational Gymnasium — business and languages',
      de: 'Berufliches Gymnasium — Wirtschaft und Sprachen',
    },
    tags: ['business', 'languages', 'structured'],
    neighbourhood: 'Kreuzberg',
    address: 'Jüterboger Straße 21, 10965 Berlin',
    postcode: '10965',
    latitude: 52.4871,
    longitude: 13.3918,
    commuteMinutes: 34,
    officialWebsiteUrl: 'https://www.berlin.de/sen/bildung/schule-und-beruf/berufliche-bildung/',
    entryRequirementsUrl: 'https://www.berlin.de/sen/bildung/schule-und-beruf/berufliche-bildung/',
    sourceDate: '2026-08-15',
    whyFit: {
      en: 'Business and language modules connect an Abitur route with career exploration.',
      de: 'Wirtschafts- und Sprachmodule verbinden den Abiturweg mit beruflicher Orientierung.',
    },
    matches: {
      en: ['Business and language focus', 'Structured timetable'],
      de: ['Wirtschafts- und Sprachschwerpunkt', 'Strukturierter Stundenplan'],
    },
    mismatches: {
      en: ['Few arts subjects are listed'],
      de: ['Wenige künstlerische Fächer angegeben'],
    },
    missingInformation: {
      en: ['Which second languages can beginners choose?', 'What are the exact application steps?'],
      de: [
        'Welche zweiten Fremdsprachen sind für Anfänger möglich?',
        'Wie lauten die genauen Bewerbungsschritte?',
      ],
    },
  },
  {
    id: 'gesundheitscampus-pankow',
    pathwayId: 'berufliches-gymnasium',
    name: 'Gesundheitscampus Pankow',
    programme: {
      en: 'Vocational Gymnasium — health and social care',
      de: 'Berufliches Gymnasium — Gesundheit und Soziales',
    },
    tags: ['health-social', 'collaborative', 'abitur'],
    neighbourhood: 'Pankow',
    address: 'Mühlenstraße 64, 13187 Berlin',
    postcode: '13187',
    latitude: 52.5688,
    longitude: 13.4025,
    commuteMinutes: 46,
    officialWebsiteUrl: 'https://www.berlin.de/sen/bildung/schule-und-beruf/berufliche-bildung/',
    entryRequirementsUrl: 'https://www.berlin.de/sen/bildung/schule-und-beruf/berufliche-bildung/',
    sourceDate: '2026-08-15',
    whyFit: {
      en: 'The health and social-care focus may fit students motivated by people-centred work.',
      de: 'Der Gesundheits- und Sozialschwerpunkt kann zu Jugendlichen mit Interesse an Arbeit mit Menschen passen.',
    },
    matches: {
      en: ['Health and social-care focus', 'Collaborative case projects'],
      de: ['Gesundheits- und Sozialschwerpunkt', 'Gemeinsame Fallprojekte'],
    },
    mismatches: {
      en: ['Commute exceeds a 45-minute preference in the demo estimate'],
      de: ['Der Demo-Schätzwert überschreitet eine 45-Minuten-Präferenz'],
    },
    missingInformation: {
      en: [
        'Are placements part of the programme?',
        'What support is offered during the first term?',
      ],
      de: [
        'Gehören Praktika zum Bildungsgang?',
        'Welche Unterstützung gibt es im ersten Halbjahr?',
      ],
    },
  },
  {
    id: 'werkstatt-neukoelln',
    pathwayId: 'ausbildung',
    name: 'Werkstattzentrum Neukölln',
    programme: {
      en: 'Training preparation — craft and technology',
      de: 'Ausbildungsvorbereitung — Handwerk und Technik',
    },
    tags: ['technology', 'practical', 'training'],
    neighbourhood: 'Neukölln',
    address: 'Lahnstraße 38, 12055 Berlin',
    postcode: '12055',
    latitude: 52.4703,
    longitude: 13.4467,
    commuteMinutes: 37,
    officialWebsiteUrl: 'https://www.berlin.de/sen/bildung/schule-und-beruf/berufliche-bildung/',
    entryRequirementsUrl: 'https://www.berlin.de/sen/bildung/schule-und-beruf/berufliche-bildung/',
    sourceDate: '2026-08-15',
    whyFit: {
      en: 'Practical workshop learning supports early career exploration in technical fields.',
      de: 'Praktisches Werkstattlernen unterstützt frühe Berufsorientierung in technischen Feldern.',
    },
    matches: {
      en: ['Hands-on learning', 'Technical career exploration'],
      de: ['Praxisnahes Lernen', 'Technische Berufsorientierung'],
    },
    mismatches: {
      en: ['This is not a direct broad Abitur programme'],
      de: ['Dies ist kein direkter breiter Abitur-Bildungsgang'],
    },
    missingInformation: {
      en: ['Which partner employers are involved?', 'Which further qualifications can follow?'],
      de: [
        'Welche Partnerbetriebe sind beteiligt?',
        'Welche weiteren Abschlüsse können anschließen?',
      ],
    },
  },
  {
    id: 'berufsstarter-lichtenberg',
    pathwayId: 'ausbildung',
    name: 'Berufsstart Lichtenberg',
    programme: {
      en: 'Training preparation — business and services',
      de: 'Ausbildungsvorbereitung — Wirtschaft und Dienstleistungen',
    },
    tags: ['business', 'structured', 'training'],
    neighbourhood: 'Lichtenberg',
    address: 'Siegfriedstraße 77, 10365 Berlin',
    postcode: '10365',
    latitude: 52.5154,
    longitude: 13.4951,
    commuteMinutes: 45,
    officialWebsiteUrl: 'https://www.berlin.de/sen/bildung/schule-und-beruf/berufliche-bildung/',
    entryRequirementsUrl: 'https://www.berlin.de/sen/bildung/schule-und-beruf/berufliche-bildung/',
    sourceDate: '2026-08-15',
    whyFit: {
      en: 'A structured practical route can support career exploration before committing to training.',
      de: 'Ein strukturierter Praxisweg kann Berufsorientierung vor der Ausbildungsentscheidung unterstützen.',
    },
    matches: {
      en: ['Business practice', 'Structured coaching'],
      de: ['Wirtschaftspraxis', 'Strukturiertes Coaching'],
    },
    mismatches: {
      en: ['At the edge of the 45-minute travel preference'],
      de: ['An der Grenze der 45-Minuten-Präferenz'],
    },
    missingInformation: {
      en: ['How are placements matched?', 'What attendance requirements apply?'],
      de: ['Wie werden Praktikumsplätze vermittelt?', 'Welche Anwesenheitsregeln gelten?'],
    },
  },
  {
    id: 'sozialwerk-charlottenburg',
    pathwayId: 'ausbildung',
    name: 'Sozialwerk Charlottenburg',
    programme: {
      en: 'Training preparation — social and care fields',
      de: 'Ausbildungsvorbereitung — Soziales und Pflege',
    },
    tags: ['health-social', 'collaborative', 'training'],
    neighbourhood: 'Charlottenburg',
    address: 'Gierkezeile 29, 10585 Berlin',
    postcode: '10585',
    latitude: 52.5161,
    longitude: 13.3049,
    commuteMinutes: 31,
    officialWebsiteUrl: 'https://www.berlin.de/sen/bildung/schule-und-beruf/berufliche-bildung/',
    entryRequirementsUrl: 'https://www.berlin.de/sen/bildung/schule-und-beruf/berufliche-bildung/',
    sourceDate: '2026-08-15',
    whyFit: {
      en: 'People-centred projects offer practical insight into social and care professions.',
      de: 'Menschenbezogene Projekte geben praktische Einblicke in soziale und pflegerische Berufe.',
    },
    matches: {
      en: ['Social-care orientation', 'Collaborative projects'],
      de: ['Sozial-pflegerische Orientierung', 'Gemeinsame Projekte'],
    },
    mismatches: {
      en: ['The programme focus is specialised'],
      de: ['Der Bildungsgang ist fachlich spezialisiert'],
    },
    missingInformation: {
      en: [
        'Are introductory placements supervised?',
        'Which qualification is recorded on completion?',
      ],
      de: [
        'Werden Einstiegspraktika begleitet?',
        'Welcher Abschluss wird nach erfolgreichem Ende ausgewiesen?',
      ],
    },
  },
];

export const getPathway = (id: string) => pathwayCards.find((item) => item.id === id);
export const getSchool = (id: string) => schoolCards.find((item) => item.id === id);
