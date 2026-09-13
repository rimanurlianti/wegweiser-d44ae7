import { Button, Text } from 'heroui-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { AppHeader, ChoiceGroup, Screen, StepProgress } from '@/components/wegweiser/UI';
import { useWegweiserStore } from '@/lib/wegweiser/store';
import type { ParentPriorities } from '@/lib/wegweiser/types';

export default function ParentScreen() {
  const [step, setStep] = useState(0);
  const { language, profile, updateParent } = useWegweiserStore();
  const questions: Array<{
    key: keyof ParentPriorities;
    en: string;
    de: string;
    options: Array<[string | number, string, string]>;
  }> = [
    {
      key: 'optionsOpen',
      en: 'How important is keeping many future options open?',
      de: 'Wie wichtig ist es, viele spätere Optionen offenzuhalten?',
      options: [
        ['very', 'Very', 'Sehr'],
        ['somewhat', 'Somewhat', 'Etwas'],
        ['not-main', 'Not the main priority', 'Nicht die Hauptpriorität'],
      ],
    },
    {
      key: 'commute',
      en: 'What commute range is acceptable?',
      de: 'Welche Fahrzeit ist akzeptabel?',
      options: [20, 30, 45, 60, 75].map((v) => [v, `${v} minutes`, `${v} Minuten`]),
    },
    {
      key: 'vocationalFocus',
      en: 'Is a clear vocational or subject focus welcome?',
      de: 'Ist ein klarer beruflicher oder fachlicher Schwerpunkt willkommen?',
      options: [
        ['yes', 'Yes', 'Ja'],
        ['maybe', 'Maybe', 'Vielleicht'],
        ['no', 'No', 'Nein'],
      ],
    },
    {
      key: 'support',
      en: 'What practical or support consideration matters?',
      de: 'Welche praktische Unterstützung ist wichtig?',
      options: [
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
      options: [
        ['academic', 'Academic progression', 'Schulischer Fortschritt'],
        ['career', 'Career exploration', 'Berufsorientierung'],
        ['wellbeing', 'Confidence & wellbeing', 'Selbstvertrauen & Wohlbefinden'],
        ['flexibility', 'Flexibility', 'Flexibilität'],
      ],
    },
  ];
  const q = questions[step];
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
      <Text type="body-sm" color="muted" className="mb-6">
        {language === 'en'
          ? 'There is no perfect answer. Choose what matters most now.'
          : 'Es gibt keine perfekte Antwort. Wählen Sie, was jetzt am wichtigsten ist.'}
      </Text>
      <ChoiceGroup
        value={profile.parent[q.key]}
        onChange={(value) => updateParent({ [q.key]: value })}
        choices={q.options.map(([value, en, de]) => ({
          value,
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
          onPress={() => (step === 4 ? router.push('/profile') : setStep(step + 1))}
        >
          <Button.Label>{language === 'en' ? 'Next' : 'Weiter'}</Button.Label>
        </Button>
      </View>
    </Screen>
  );
}
