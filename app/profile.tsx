import { router } from 'expo-router';
import { Button, Text } from 'heroui-native';
import { View } from 'react-native';

import { AppHeader, Screen, SectionTitle, SoftCard } from '@/components/wegweiser/UI';
import { useWegweiserStore } from '@/lib/wegweiser/store';

const labels: Record<string, { en: string; de: string }> = {
  technology: { en: 'Technology', de: 'Technologie' },
  'health-social': { en: 'Health & social care', de: 'Gesundheit & Soziales' },
  'business-languages': { en: 'Business & languages', de: 'Wirtschaft & Sprachen' },
  arts: { en: 'Arts & creative', de: 'Kunst & Kreatives' },
  broad: { en: 'Broad academic', de: 'Breit akademisch' },
  unsure: { en: 'Unsure', de: 'Unsicher' },
  more: { en: 'More challenge', de: 'Mehr Herausforderung' },
  balanced: { en: 'Balanced', de: 'Ausgewogen' },
  gradual: { en: 'Gradual support', de: 'Schrittweise Unterstützung' },
  independent: { en: 'Independent', de: 'Selbstständig' },
  collaborative: { en: 'Collaborative', de: 'Gemeinsam' },
  structured: { en: 'Structured', de: 'Strukturiert' },
  practical: { en: 'Practical / projects', de: 'Praxis / Projekte' },
  abitur: { en: 'Abitur', de: 'Abitur' },
  ausbildung: { en: 'Ausbildung', de: 'Ausbildung' },
  open: { en: 'Keep options open', de: 'Optionen offenhalten' },
  commute: { en: 'Avoid too much commute', de: 'Keine lange Fahrt' },
  narrow: { en: 'Avoid narrow focus', de: 'Kein enger Schwerpunkt' },
  large: { en: 'Avoid large school', de: 'Keine große Schule' },
  'low-challenge': { en: 'Enough challenge', de: 'Genug Herausforderung' },
  other: { en: 'Other consideration', de: 'Anderer Punkt' },
  very: { en: 'Future options: very important', de: 'Zukunftsoptionen: sehr wichtig' },
  somewhat: { en: 'Future options: somewhat important', de: 'Zukunftsoptionen: teilweise wichtig' },
  'not-main': { en: 'Options not main priority', de: 'Optionen nicht Hauptpriorität' },
  yes: { en: 'Vocational focus welcome', de: 'Beruflicher Schwerpunkt willkommen' },
  maybe: { en: 'Maybe a vocational focus', de: 'Vielleicht beruflicher Schwerpunkt' },
  no: { en: 'Prefer broad focus', de: 'Breite Ausrichtung bevorzugt' },
  language: { en: 'Language support', de: 'Sprachförderung' },
  structure: { en: 'Structure', de: 'Struktur' },
  accessibility: { en: 'Accessibility', de: 'Barrierefreiheit' },
  none: { en: 'No support stated', de: 'Keine Unterstützung genannt' },
  academic: { en: 'Academic progression', de: 'Akademischer Fortschritt' },
  career: { en: 'Career exploration', de: 'Berufliche Orientierung' },
  wellbeing: { en: 'Confidence & wellbeing', de: 'Selbstvertrauen & Wohlbefinden' },
  flexibility: { en: 'Flexibility', de: 'Flexibilität' },
};

export default function ProfileScreen() {
  const { language, profile, finishProfile } = useWegweiserStore();
  const localize = (value: string | number) =>
    typeof value === 'number'
      ? `${value} ${language === 'en' ? 'minutes' : 'Minuten'}`
      : (labels[value]?.[language] ?? value);
  const student = Object.values(profile.student);
  const parent = Object.values(profile.parent);
  const agreement =
    profile.student.direction === 'open' || profile.parent.optionsOpen === 'very'
      ? language === 'en'
        ? 'You both want to preserve future options.'
        : 'Ihr möchtet beide zukünftige Möglichkeiten offenhalten.'
      : language === 'en'
        ? 'You both want a next step that fits the current direction.'
        : 'Ihr möchtet einen Schritt, der zur aktuellen Richtung passt.';
  const discuss =
    profile.student.direction === 'ausbildung' && profile.parent.hope === 'academic'
      ? language === 'en'
        ? 'Discuss how practical learning and academic progression could work together.'
        : 'Besprecht, wie Praxis und akademischer Fortschritt zusammenpassen können.'
      : language === 'en'
        ? 'Compare focus, learning environment and travel time for each option.'
        : 'Vergleicht Schwerpunkt, Lernumgebung und Fahrtzeit jeder Option.';
  const chip = (value: string | number, tone: 'student' | 'parent', index: number) => (
    <Text
      key={`${value}-${index}`}
      type="body-sm"
      className={`rounded-full px-3 py-2 font-semibold ${tone === 'student' ? 'bg-lilac' : 'bg-peach'}`}
    >
      {localize(value)}
    </Text>
  );
  return (
    <Screen>
      <AppHeader compact />
      <View className="mb-6 gap-2">
        <Text type="body-sm" className="text-accent font-semibold tracking-widest uppercase">
          {language === 'en' ? 'Together' : 'Gemeinsam'}
        </Text>
        <Text.Heading type="h1">
          {language === 'en' ? 'Shared profile' : 'Gemeinsames Profil'}
        </Text.Heading>
      </View>
      <View className="gap-5">
        <SoftCard tone="lilac">
          <SectionTitle
            title={
              language === 'en' ? 'Student priorities' : 'Prioritäten der Schülerin / des Schülers'
            }
          />
          <View className="flex-row flex-wrap gap-2">
            {student.map((v, i) => chip(v, 'student', i))}
          </View>
        </SoftCard>
        <SoftCard tone="peach">
          <SectionTitle
            title={language === 'en' ? 'Parent priorities' : 'Prioritäten der Eltern'}
          />
          <View className="flex-row flex-wrap gap-2">
            {parent.map((v, i) => chip(v, 'parent', i))}
          </View>
        </SoftCard>
        <SoftCard>
          <SectionTitle
            title={language === 'en' ? 'What you agree on' : 'Worin ihr übereinstimmt'}
          />
          <Text className="leading-6">{agreement}</Text>
        </SoftCard>
        <SoftCard>
          <SectionTitle
            title={language === 'en' ? 'What to discuss' : 'Was ihr besprechen solltet'}
          />
          <Text className="leading-6">{discuss}</Text>
        </SoftCard>
        <Button
          className="h-14"
          onPress={() => {
            finishProfile();
            router.replace('/options');
          }}
        >
          <Button.Label>
            {language === 'en' ? 'See three pathways' : 'Drei Wege ansehen'}
          </Button.Label>
        </Button>
        <Button
          variant="secondary"
          className="h-14"
          onPress={() => router.push('/student-priorities')}
        >
          <Button.Label>{language === 'en' ? 'Edit profile' : 'Profil bearbeiten'}</Button.Label>
        </Button>
      </View>
    </Screen>
  );
}
