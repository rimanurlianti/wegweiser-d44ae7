import { router } from 'expo-router';
import { Button, Text } from 'heroui-native';
import { useState } from 'react';
import { TextInput, View } from 'react-native';

import { AppHeader, ChoiceGroup, Screen, StepProgress } from '@/components/wegweiser/UI';
import { useWegweiserStore } from '@/lib/wegweiser/store';
import type { RealityProfile } from '@/lib/wegweiser/types';

type RealityChoiceKey =
  | 'grade'
  | 'schoolType'
  | 'transitionStatement'
  | 'qualificationInfo'
  | 'hasUpperSecondary'
  | 'maxCommute';

const copy = {
  en: {
    titles: [
      'Where are you planning?',
      'Current stage',
      'Current school type',
      'Official transition statement',
      'Information on the current report',
      'Upper-secondary connection',
      'Travel preference',
    ],
    city: 'City',
    postcode: 'Postcode',
    year: 'Intended transition school year',
    grade: 'Current year',
    back: 'Back',
    next: 'Continue',
    summary: 'See reality check',
    outside: 'Wegweiser currently supports Berlin. Local rules for this location are being added.',
    step: 'Reality check',
  },
  de: {
    titles: [
      'Wo plant ihr?',
      'Aktuelle Situation',
      'Aktuelle Schulart',
      'Offizielle Aussage zum Übergang',
      'Angaben im aktuellen Zeugnis',
      'Verbindung zur Oberstufe',
      'Fahrtzeit',
    ],
    city: 'Stadt',
    postcode: 'Postleitzahl',
    year: 'Geplantes Übergangsschuljahr',
    grade: 'Aktuelle Klassenstufe',
    back: 'Zurück',
    next: 'Weiter',
    summary: 'Realitätscheck ansehen',
    outside: 'Wegweiser unterstützt derzeit Berlin. Lokale Regeln für diesen Ort werden ergänzt.',
    step: 'Realitätscheck',
  },
};
const options = {
  grade: [
    ['9', 'Klasse 9', 'Grade 9'],
    ['10', 'Klasse 10', 'Grade 10'],
  ],
  schoolType: [
    ['gymnasium', 'Gymnasium', 'Gymnasium'],
    ['iss', 'Integrierte Sekundarschule (ISS)', 'Integrated secondary school (ISS)'],
    ['gemeinschaftsschule', 'Gemeinschaftsschule', 'Community school'],
    ['vocational', 'Berufliche Schule', 'Vocational school'],
    ['other', 'Andere', 'Other'],
    ['unsure', 'Ich bin nicht sicher', 'I’m not sure'],
  ],
  transitionStatement: [
    ['eligible', 'Berechtigt', 'Eligible'],
    ['may-be-eligible', 'Möglicherweise berechtigt', 'May be eligible'],
    ['not-yet-eligible', 'Noch nicht berechtigt', 'Not yet eligible'],
    ['no-statement', 'Keine Aussage', 'No statement'],
    ['unsure', 'Ich bin nicht sicher', 'I’m not sure'],
  ],
  qualificationInfo: [
    [
      'upper-secondary-confirmed',
      'Übergang zur Oberstufe offiziell bestätigt',
      'Upper-secondary transition officially confirmed',
    ],
    [
      'qualification-expected',
      'Voraussichtlicher Abschluss ist angegeben',
      'Expected qualification is shown',
    ],
    [
      'course-levels-listed',
      'Kursniveaus oder relevante Fächer sind angegeben',
      'Course levels or relevant subjects are listed',
    ],
    ['not-shown', 'Keine relevante Angabe erkennbar', 'No relevant information shown'],
    ['unsure', 'Ich bin nicht sicher', 'I’m not sure'],
  ],
  hasUpperSecondary: [
    ['yes', 'Ja', 'Yes'],
    ['no', 'Nein', 'No'],
    ['unsure', 'Nicht sicher', 'Unsure'],
  ],
  maxCommute: [
    [20, '20 Minuten', '20 minutes'],
    [30, '30 Minuten', '30 minutes'],
    [45, '45 Minuten', '45 minutes'],
    [60, '60 Minuten', '60 minutes'],
    [75, '75 Minuten', '75 minutes'],
  ],
} as const satisfies {
  [K in RealityChoiceKey]: readonly (readonly [RealityProfile[K], string, string])[];
};

export default function RealityCheckScreen() {
  const { language, profile, updateReality } = useWegweiserStore();
  const [step, setStep] = useState(0);
  const c = copy[language];
  const reality = profile.reality;
  const choose = <K extends keyof RealityProfile>(key: K, value: RealityProfile[K]) =>
    updateReality({ [key]: value });
  const choiceFor = (key: RealityChoiceKey) => (
    <ChoiceGroup<RealityProfile[RealityChoiceKey]>
      value={reality[key]}
      choices={options[key].map((item) => ({
        value: item[0],
        label: language === 'de' ? item[1] : item[2],
      }))}
      onChange={(value) => choose(key, value)}
    />
  );
  return (
    <Screen keyboard>
      <AppHeader compact />
      <StepProgress current={step + 1} total={7} label={c.step} />
      <Text.Heading type="h2" className="mb-6">
        {c.titles[step]}
      </Text.Heading>
      <View className="gap-5">
        {step === 0 ? (
          <>
            <View className="gap-2">
              <Text className="font-semibold">{c.city}</Text>
              <TextInput
                value={reality.city}
                onChangeText={(city) => updateReality({ city })}
                className="border-border bg-card text-foreground h-14 rounded-2xl border px-4"
              />
            </View>
            <View className="gap-2">
              <Text className="font-semibold">{c.postcode}</Text>
              <TextInput
                keyboardType="number-pad"
                value={reality.postcode}
                onChangeText={(postcode) => updateReality({ postcode })}
                className="border-border bg-card text-foreground h-14 rounded-2xl border px-4"
              />
            </View>
            {reality.city.trim().toLowerCase() !== 'berlin' ? (
              <View className="bg-warning/15 rounded-2xl p-4">
                <Text className="leading-6">{c.outside}</Text>
              </View>
            ) : null}
          </>
        ) : null}
        {step === 1 ? (
          <>
            <Text className="font-semibold">{c.grade}</Text>
            {choiceFor('grade')}
            <View className="gap-2">
              <Text className="font-semibold">{c.year}</Text>
              <TextInput
                value={reality.transitionYear}
                onChangeText={(transitionYear) => updateReality({ transitionYear })}
                className="border-border bg-card text-foreground h-14 rounded-2xl border px-4"
              />
            </View>
          </>
        ) : null}
        {step === 2 ? choiceFor('schoolType') : null}
        {step === 3 ? choiceFor('transitionStatement') : null}
        {step === 4 ? choiceFor('qualificationInfo') : null}
        {step === 5 ? choiceFor('hasUpperSecondary') : null}
        {step === 6 ? choiceFor('maxCommute') : null}
      </View>
      <View className="mt-8 flex-row gap-3">
        {step > 0 ? (
          <Button variant="secondary" className="h-14 flex-1" onPress={() => setStep((s) => s - 1)}>
            <Button.Label>{c.back}</Button.Label>
          </Button>
        ) : null}
        <Button
          className="h-14 flex-1"
          onPress={() => (step < 6 ? setStep((s) => s + 1) : router.push('/reality-summary'))}
        >
          <Button.Label>{step === 6 ? c.summary : c.next}</Button.Label>
        </Button>
      </View>
    </Screen>
  );
}
