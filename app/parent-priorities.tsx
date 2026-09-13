import { router } from 'expo-router';
import { Button, Text } from 'heroui-native';
import { useState } from 'react';
import { View } from 'react-native';

import { AppHeader, ChoiceGroup, Screen, StepProgress } from '@/components/wegweiser/UI';
import { useWegweiserStore } from '@/lib/wegweiser/store';

const questions = [
  {
    key: 'optionsOpen',
    en: 'How important is keeping many future options open?',
    de: 'Wie wichtig ist es, viele Möglichkeiten offenzuhalten?',
    choices: [
      ['very', 'Very', 'Sehr'],
      ['somewhat', 'Somewhat', 'Teilweise'],
      ['not-main', 'Not the main priority', 'Nicht die Hauptpriorität'],
    ],
  },
  {
    key: 'commute',
    en: 'What commute range is acceptable?',
    de: 'Welche Fahrtzeit ist akzeptabel?',
    choices: [
      [20, '20 minutes', '20 Minuten'],
      [30, '30 minutes', '30 Minuten'],
      [45, '45 minutes', '45 Minuten'],
      [60, '60 minutes', '60 Minuten'],
      [75, '75 minutes', '75 Minuten'],
    ],
  },
  {
    key: 'vocationalFocus',
    en: 'Is a clear vocational or subject focus welcome?',
    de: 'Ist ein klarer beruflicher oder fachlicher Schwerpunkt willkommen?',
    choices: [
      ['yes', 'Yes', 'Ja'],
      ['maybe', 'Maybe', 'Vielleicht'],
      ['no', 'No', 'Nein'],
    ],
  },
  {
    key: 'support',
    en: 'What practical or support consideration matters?',
    de: 'Welche praktische Unterstützung ist wichtig?',
    choices: [
      ['language', 'Language support', 'Sprachförderung'],
      ['structure', 'Structure', 'Struktur'],
      ['accessibility', 'Accessibility', 'Barrierefreiheit'],
      ['none', 'None stated', 'Keine genannt'],
      ['unsure', 'Unsure', 'Unsicher'],
    ],
  },
  {
    key: 'hope',
    en: 'What is the biggest hope for the next step?',
    de: 'Was ist die größte Hoffnung für den nächsten Schritt?',
    choices: [
      ['academic', 'Academic progression', 'Akademischer Fortschritt'],
      ['career', 'Career exploration', 'Berufliche Orientierung'],
      ['wellbeing', 'Confidence / wellbeing', 'Selbstvertrauen / Wohlbefinden'],
      ['flexibility', 'Flexibility', 'Flexibilität'],
    ],
  },
] as const;
export default function ParentPrioritiesScreen() {
  const { language, profile, updateParent } = useWegweiserStore();
  const [step, setStep] = useState(0);
  const q = questions[step];
  const key = q.key;
  return (
    <Screen>
      <AppHeader compact />
      <StepProgress
        current={step + 1}
        total={5}
        label={language === 'en' ? 'Parent priorities' : 'Prioritäten der Eltern'}
      />
      <Text.Heading type="h2" className="mb-2">
        {q[language]}
      </Text.Heading>
      {step === 1 ? (
        <Text type="body-sm" color="muted" className="mb-5">
          {language === 'en'
            ? `Reality-check choice: ${profile.reality.maxCommute} minutes. You can revise it here.`
            : `Aus dem Realitätscheck: ${profile.reality.maxCommute} Minuten. Hier könnt ihr es ändern.`}
        </Text>
      ) : null}
      <ChoiceGroup
        value={profile.parent[key]}
        choices={q.choices.map((o) => ({
          value: o[0],
          label: language === 'en' ? o[1] : o[2],
        }))}
        onChange={(value) => updateParent({ [key]: value })}
      />
      <View className="mt-8 flex-row gap-3">
        {step > 0 ? (
          <Button variant="secondary" className="h-14 flex-1" onPress={() => setStep(step - 1)}>
            <Button.Label>{language === 'en' ? 'Back' : 'Zurück'}</Button.Label>
          </Button>
        ) : null}
        <Button
          className="h-14 flex-1"
          onPress={() => (step < 4 ? setStep(step + 1) : router.push('/profile'))}
        >
          <Button.Label>{language === 'en' ? 'Continue' : 'Weiter'}</Button.Label>
        </Button>
      </View>
    </Screen>
  );
}
