import { Button, Text } from 'heroui-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { AppHeader, ChoiceGroup, Screen, StepProgress } from '@/components/wegweiser/UI';
import { useWegweiserStore } from '@/lib/wegweiser/store';

const questions = [
  {
    key: 'interest',
    en: 'What subjects or areas interest you most?',
    de: 'Welche Fächer oder Bereiche interessieren dich am meisten?',
    options: [
      ['technology', 'Technology', 'Technik'],
      ['health-social', 'Health & social care', 'Gesundheit & Soziales'],
      ['business-languages', 'Business & languages', 'Wirtschaft & Sprachen'],
      ['arts', 'Arts & creative', 'Kunst & Kreatives'],
      ['broad', 'Broad academic', 'Breit akademisch'],
      ['unsure', 'Unsure', 'Unsicher'],
    ],
  },
  {
    key: 'challenge',
    en: 'How much academic challenge do you want?',
    de: 'Wie viel schulische Herausforderung möchtest du?',
    options: [
      ['more', 'More challenge', 'Mehr Herausforderung'],
      ['balanced', 'Balanced', 'Ausgewogen'],
      ['gradual', 'Gradual support', 'Schrittweise Unterstützung'],
    ],
  },
  {
    key: 'environment',
    en: 'What learning environment feels best?',
    de: 'Welche Lernumgebung passt am besten?',
    options: [
      ['independent', 'Independent', 'Selbstständig'],
      ['collaborative', 'Collaborative', 'Gemeinsam'],
      ['structured', 'Structured', 'Strukturiert'],
      ['practical', 'Practical / project-based', 'Praktisch / projektbasiert'],
    ],
  },
  {
    key: 'direction',
    en: 'Which future direction feels closest?',
    de: 'Welche Richtung passt gerade am ehesten?',
    options: [
      ['abitur', 'Abitur', 'Abitur'],
      ['ausbildung', 'Ausbildung', 'Ausbildung'],
      ['open', 'Keep options open', 'Optionen offenhalten'],
      ['unsure', 'Unsure', 'Unsicher'],
    ],
  },
  {
    key: 'avoid',
    en: 'What do you not want in your next school?',
    de: 'Was möchtest du an deiner nächsten Schule nicht?',
    options: [
      ['commute', 'Too much commute', 'Zu langer Schulweg'],
      ['narrow', 'Narrow focus', 'Zu enger Schwerpunkt'],
      ['large', 'Large school', 'Große Schule'],
      ['low-challenge', 'Too little challenge', 'Zu wenig Herausforderung'],
      ['other', 'Other', 'Etwas anderes'],
    ],
  },
] as const;

export default function StudentScreen() {
  const [step, setStep] = useState(0);
  const { language, profile, updateStudent } = useWegweiserStore();
  const q = questions[step];
  const key = q.key;
  const value = profile.student[key];
  const select = (next: string) => updateStudent({ [key]: next });
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
      <Text.Heading type="h2" className="mb-2">
        {q[language]}
      </Text.Heading>
      <Text type="body-sm" color="muted" className="mb-6">
        {language === 'en'
          ? 'Choose what feels closest today. You can edit it later.'
          : 'Wähle, was heute am ehesten passt. Du kannst es später ändern.'}
      </Text>
      <ChoiceGroup
        value={value}
        onChange={select}
        choices={q.options.map(([option, en, de]) => ({
          value: option,
          label: language === 'en' ? en : de,
        }))}
      />
      <View className="mt-8 flex-row gap-3">
        <Button
          variant="outline"
          className="flex-1"
          onPress={() => (step === 0 ? router.back() : setStep(step - 1))}
        >
          <Button.Label>{language === 'en' ? 'Back' : 'Zurück'}</Button.Label>
        </Button>
        <Button
          className="flex-1"
          onPress={() => (step === 4 ? router.push('/parent') : setStep(step + 1))}
        >
          <Button.Label>{language === 'en' ? 'Next' : 'Weiter'}</Button.Label>
        </Button>
      </View>
    </Screen>
  );
}
