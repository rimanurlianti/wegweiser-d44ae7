import { Button, Text, useThemeColor } from 'heroui-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { TextInput, View } from 'react-native';

import {
  AppHeader,
  ChoiceGroup,
  GuidanceNotice,
  Screen,
  SoftCard,
  StatusBadge,
  StepProgress,
} from '@/components/wegweiser/UI';
import { getPathway } from '@/lib/wegweiser/data';
import { realityCheck } from '@/lib/wegweiser/realityCheck';
import { useWegweiserStore } from '@/lib/wegweiser/store';
import type {
  Grade,
  QualificationInfo,
  SchoolType,
  TernaryAnswer,
  TransitionStatement,
} from '@/lib/wegweiser/types';

const commuteOptions = [20, 30, 45, 60, 75] as const;

export default function RealityScreen() {
  const [step, setStep] = useState(0);
  const { language, profile, updateReality, finishReality } = useWegweiserStore();
  const muted = useThemeColor('muted');
  const r = profile.reality;
  const isBerlin = r.city.trim().toLowerCase() === 'berlin';
  const check = realityCheck(r);
  const total = 9;
  const next = () => setStep((value) => Math.min(total - 1, value + 1));
  const previous = () => (step === 0 ? router.back() : setStep((value) => value - 1));
  const finish = () => {
    finishReality();
    router.push('/student');
  };

  const question = (() => {
    if (step === 0)
      return (
        <View className="gap-4">
          <TextInput
            value={r.city}
            onChangeText={(city) => updateReality({ city })}
            placeholder="Berlin"
            placeholderTextColor={muted}
            className="border-border bg-card text-foreground min-h-14 rounded-2xl border px-4 text-base"
            accessibilityLabel="City"
          />
          <TextInput
            value={r.postcode}
            onChangeText={(postcode) => updateReality({ postcode })}
            placeholder={language === 'en' ? 'Postcode' : 'Postleitzahl'}
            placeholderTextColor={muted}
            keyboardType="number-pad"
            maxLength={5}
            className="border-border bg-card text-foreground min-h-14 rounded-2xl border px-4 text-base"
            accessibilityLabel="Postcode"
          />
          {!isBerlin ? (
            <SoftCard tone="peach">
              <Text>
                {language === 'en'
                  ? 'Wegweiser currently supports Berlin. Local rules for this location are being added.'
                  : 'Wegweiser unterstützt derzeit Berlin. Lokale Regeln für diesen Ort werden ergänzt.'}
              </Text>
            </SoftCard>
          ) : null}
        </View>
      );
    if (step === 1)
      return (
        <ChoiceGroup<Grade>
          value={r.grade}
          onChange={(grade) => updateReality({ grade })}
          choices={[
            { value: '9', label: language === 'en' ? 'Grade 9' : 'Klasse 9' },
            { value: '10', label: language === 'en' ? 'Grade 10' : 'Klasse 10' },
          ]}
        />
      );
    if (step === 2)
      return (
        <TextInput
          value={r.transitionYear}
          onChangeText={(transitionYear) => updateReality({ transitionYear })}
          placeholder="2027/28"
          placeholderTextColor={muted}
          className="border-border bg-card text-foreground min-h-14 rounded-2xl border px-4 text-base"
        />
      );
    if (step === 3)
      return (
        <ChoiceGroup<SchoolType>
          value={r.schoolType}
          onChange={(schoolType) => updateReality({ schoolType })}
          choices={[
            { value: 'gymnasium', label: 'Gymnasium' },
            { value: 'iss', label: 'Integrierte Sekundarschule (ISS)' },
            { value: 'gemeinschaftsschule', label: 'Gemeinschaftsschule' },
            {
              value: 'vocational',
              label: language === 'en' ? 'Vocational school' : 'Berufliche Schule',
            },
            { value: 'other', label: language === 'en' ? 'Other' : 'Andere' },
            { value: 'unsure', label: language === 'en' ? 'I’m not sure' : 'Ich bin nicht sicher' },
          ]}
        />
      );
    if (step === 4)
      return (
        <ChoiceGroup<TransitionStatement>
          value={r.transitionStatement}
          onChange={(transitionStatement) => updateReality({ transitionStatement })}
          choices={[
            { value: 'eligible', label: language === 'en' ? 'Eligible' : 'Berechtigt' },
            {
              value: 'may-be-eligible',
              label: language === 'en' ? 'May be eligible' : 'Möglicherweise berechtigt',
            },
            {
              value: 'not-yet-eligible',
              label: language === 'en' ? 'Not yet eligible' : 'Noch nicht berechtigt',
            },
            { value: 'no-statement', label: language === 'en' ? 'No statement' : 'Keine Aussage' },
            { value: 'unsure', label: language === 'en' ? 'I’m not sure' : 'Ich bin nicht sicher' },
          ]}
        />
      );
    if (step === 5)
      return (
        <ChoiceGroup<QualificationInfo>
          value={r.qualificationInfo}
          onChange={(qualificationInfo) => updateReality({ qualificationInfo })}
          choices={[
            {
              value: 'upper-secondary-confirmed',
              label:
                language === 'en'
                  ? 'The report confirms an upper-secondary transition'
                  : 'Das Zeugnis bestätigt den Übergang in die Oberstufe',
            },
            {
              value: 'qualification-expected',
              label:
                language === 'en'
                  ? 'An expected school qualification is shown'
                  : 'Ein erwarteter Schulabschluss ist angegeben',
            },
            {
              value: 'course-levels-listed',
              label:
                language === 'en'
                  ? 'Relevant course levels are listed'
                  : 'Relevante Kursniveaus sind angegeben',
            },
            {
              value: 'not-shown',
              label: language === 'en' ? 'None of these are shown' : 'Nichts davon ist angegeben',
            },
            { value: 'unsure', label: language === 'en' ? 'I’m not sure' : 'Ich bin nicht sicher' },
          ]}
        />
      );
    if (step === 6)
      return (
        <ChoiceGroup<TernaryAnswer>
          value={r.hasUpperSecondary}
          onChange={(hasUpperSecondary) => updateReality({ hasUpperSecondary })}
          choices={[
            { value: 'yes', label: language === 'en' ? 'Yes' : 'Ja' },
            { value: 'no', label: language === 'en' ? 'No' : 'Nein' },
            { value: 'unsure', label: language === 'en' ? 'Unsure' : 'Unsicher' },
          ]}
        />
      );
    if (step === 7)
      return (
        <ChoiceGroup
          value={r.maxCommute}
          onChange={(maxCommute) => {
            updateReality({ maxCommute });
            useWegweiserStore.getState().updateParent({ commute: maxCommute });
          }}
          choices={commuteOptions.map((value) => ({
            value,
            label: `${value} ${language === 'en' ? 'minutes' : 'Minuten'}`,
          }))}
        />
      );
    return (
      <View className="gap-4">
        <SoftCard tone="lilac">
          <Text.Heading type="h4">
            {language === 'en' ? 'Reality check summary' : 'Zusammenfassung des Realitätschecks'}
          </Text.Heading>
          <Text type="body-sm" color="muted" className="mt-2">
            {check.summary}
          </Text>
        </SoftCard>
        {check.items.map((result) => (
          <SoftCard key={result.pathwayId}>
            <Text className="font-semibold">{getPathway(result.pathwayId)?.name[language]}</Text>
            <View className="my-3">
              <StatusBadge status={result.status} language={language} />
            </View>
            <Text type="body-sm">{result.explanation}</Text>
            <Text type="body-xs" color="muted" className="mt-3">
              {result.sourceLabel} · {result.sourceDate}
            </Text>
            <View className="bg-peach mt-4 rounded-2xl p-3">
              <Text type="body-sm" className="font-semibold">
                {language === 'en' ? 'Ask your current school' : 'Frage an die aktuelle Schule'}
              </Text>
              <Text type="body-sm" className="mt-1">
                {result.verificationQuestion}
              </Text>
            </View>
          </SoftCard>
        ))}
      </View>
    );
  })();

  const titles =
    language === 'en'
      ? [
          'Where do you live?',
          'Current school year',
          'Intended transition year',
          'Current school type',
          'What has the school officially stated?',
          'What does the current report show?',
          'Does the school have an upper-secondary programme?',
          'Maximum realistic one-way travel time',
          'Reality check summary',
        ]
      : [
          'Wo wohnen Sie?',
          'Aktuelle Klassenstufe',
          'Geplantes Übergangsschuljahr',
          'Aktuelle Schulart',
          'Was hat die Schule offiziell mitgeteilt?',
          'Was steht im aktuellen Zeugnis?',
          'Hat die Schule eine eigene oder kooperierende Oberstufe?',
          'Maximale realistische Fahrzeit pro Strecke',
          'Zusammenfassung des Realitätschecks',
        ];

  return (
    <Screen keyboard>
      <AppHeader compact />
      <StepProgress
        current={step + 1}
        total={total}
        label={language === 'en' ? 'Reality check' : 'Realitätscheck'}
      />
      <Text.Heading type="h2" className="mb-2">
        {titles[step]}
      </Text.Heading>
      <Text type="body-sm" color="muted" className="mb-6">
        {language === 'en'
          ? 'Use only information you can see or that the school has stated.'
          : 'Nutzen Sie nur sichtbare oder von der Schule bestätigte Informationen.'}
      </Text>
      {question}
      <View className="mt-8 flex-row gap-3">
        <Button variant="outline" className="flex-1" onPress={previous}>
          <Button.Label>{language === 'en' ? 'Back' : 'Zurück'}</Button.Label>
        </Button>
        <Button
          className="flex-1"
          isDisabled={step === 0 && (!isBerlin || r.postcode.length < 5)}
          onPress={step === total - 1 ? finish : next}
        >
          <Button.Label>
            {step === total - 1
              ? language === 'en'
                ? 'Continue'
                : 'Weiter'
              : language === 'en'
                ? 'Next'
                : 'Weiter'}
          </Button.Label>
        </Button>
      </View>
      <GuidanceNotice />
    </Screen>
  );
}
