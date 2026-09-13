import { router } from 'expo-router';
import { Button, Text } from 'heroui-native';
import { useState } from 'react';
import { View } from 'react-native';

import { AppHeader, ChoiceGroup, Screen, StepProgress } from '@/components/wegweiser/UI';
import { useWegweiserStore } from '@/lib/wegweiser/store';

const questions = [
  {
    key: 'interest',
    en: 'What subjects or areas interest you most?',
    de: 'Welche Fächer oder Bereiche interessieren dich am meisten?',
    choices: [
      ['technology', 'Technology', 'Technologie'],
      ['health-social', 'Health / social care', 'Gesundheit / Soziales'],
      ['business-languages', 'Business / languages', 'Wirtschaft / Sprachen'],
      ['arts', 'Arts / creative', 'Kunst / Kreatives'],
      ['broad', 'Broad academic', 'Breit akademisch'],
      ['unsure', 'Unsure', 'Unsicher'],
    ],
  },
  {
    key: 'challenge',
    en: 'How much academic challenge do you want?',
    de: 'Wie viel akademische Herausforderung möchtest du?',
    choices: [
      ['more', 'More challenge', 'Mehr Herausforderung'],
      ['balanced', 'Balanced', 'Ausgewogen'],
      ['gradual', 'Gradual support', 'Schrittweise Unterstützung'],
    ],
  },
  {
    key: 'environment',
    en: 'What learning environment feels best?',
    de: 'Welche Lernumgebung passt am besten?',
    choices: [
      ['independent', 'Independent', 'Selbstständig'],
      ['collaborative', 'Collaborative', 'Gemeinsam'],
      ['structured', 'Structured', 'Strukturiert'],
      ['practical', 'Practical / project-based', 'Praktisch / projektbasiert'],
    ],
  },
  {
    key: 'direction',
    en: 'Which future direction sounds closest right now?',
    de: 'Welche Richtung passt gerade am ehesten?',
    choices: [
      ['abitur', 'Abitur', 'Abitur'],
      ['ausbildung', 'Ausbildung', 'Ausbildung'],
      ['open', 'Keep options open', 'Optionen offenhalten'],
      ['unsure', 'Unsure', 'Unsicher'],
    ],
  },
  {
    key: 'avoid',
    en: 'What do you not want in your next school?',
    de: 'Was möchtest du an der nächsten Schule nicht?',
    choices: [
      ['commute', 'Too much commute', 'Zu lange Fahrt'],
      ['narrow', 'Narrow focus', 'Zu enger Schwerpunkt'],
      ['large', 'Large school', 'Zu große Schule'],
      ['low-challenge', 'Too little challenge', 'Zu wenig Herausforderung'],
      ['other', 'Other', 'Etwas anderes'],
    ],
  },
] as const;
export default function StudentPrioritiesScreen() {
  const { language, profile, updateStudent } = useWegweiserStore();
  const [step, setStep] = useState(0);
  const q = questions[step];
  const key = q.key;
  return (
    <Screen>
      <AppHeader compact />
      <StepProgress
        current={step + 1}
        total={5}
        label={
          language === 'en' ? 'Student priorities' : 'Prioritäten der Schülerin / des Schülers'
        }
      />
      <Text.Heading type="h2" className="mb-6">
        {q[language]}
      </Text.Heading>
      <ChoiceGroup
        value={profile.student[key]}
        choices={q.choices.map((o) => ({ value: o[0], label: language === 'en' ? o[1] : o[2] }))}
        onChange={(value) => updateStudent({ [key]: value })}
      />
      <View className="mt-8 flex-row gap-3">
        {step > 0 ? (
          <Button variant="secondary" className="h-14 flex-1" onPress={() => setStep(step - 1)}>
            <Button.Label>{language === 'en' ? 'Back' : 'Zurück'}</Button.Label>
          </Button>
        ) : null}
        <Button
          className="h-14 flex-1"
          onPress={() => (step < 4 ? setStep(step + 1) : router.push('/parent-priorities'))}
        >
          <Button.Label>{language === 'en' ? 'Continue' : 'Weiter'}</Button.Label>
        </Button>
      </View>
    </Screen>
  );
}
