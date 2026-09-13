import { router } from 'expo-router';
import { Button, Text } from 'heroui-native';
import { View } from 'react-native';

import {
  AppHeader,
  GuidanceNotice,
  Screen,
  SoftCard,
  StatusBadge,
} from '@/components/wegweiser/UI';
import { realityCheck } from '@/lib/wegweiser/realityCheck';
import { useWegweiserStore } from '@/lib/wegweiser/store';

export default function RealitySummaryScreen() {
  const { language, profile, finishReality } = useWegweiserStore();
  const result = realityCheck(profile.reality);
  return (
    <Screen>
      <AppHeader compact />
      <View className="mb-6 gap-2">
        <Text type="body-sm" className="text-accent font-semibold tracking-widest uppercase">
          {language === 'en' ? 'Facts before expectations' : 'Fakten vor Erwartungen'}
        </Text>
        <Text.Heading type="h1">
          {language === 'en' ? 'Reality check summary' : 'Zusammenfassung des Realitätschecks'}
        </Text.Heading>
        <Text color="muted" className="leading-6">
          {result.summary}
        </Text>
      </View>
      {!result.supportedLocation ? (
        <SoftCard tone="peach">
          <StatusBadge status="not-recommended" language={language} />
          <Text className="mt-4 leading-6">
            Wegweiser currently supports Berlin. Local rules for this location are being added.
          </Text>
        </SoftCard>
      ) : (
        <View className="gap-4">
          {result.items.map((item) => (
            <SoftCard key={item.pathwayId}>
              <View className="gap-3">
                <StatusBadge status={item.status} language={language} />
                <Text className="leading-6">{item.explanation}</Text>
                <View>
                  <Text type="body-xs" color="muted">
                    {language === 'en' ? 'Source' : 'Quelle'}
                  </Text>
                  <Text type="body-sm">
                    {item.sourceLabel} · {item.sourceDate}
                  </Text>
                </View>
                <View>
                  <Text type="body-xs" color="muted">
                    {language === 'en' ? 'Exact question to ask' : 'Genaue Frage'}
                  </Text>
                  <Text type="body-sm" className="leading-5">
                    {item.verificationQuestion}
                  </Text>
                </View>
              </View>
            </SoftCard>
          ))}
        </View>
      )}
      <GuidanceNotice />
      <Button
        className="mt-5 h-14"
        isDisabled={!result.supportedLocation}
        onPress={() => {
          finishReality();
          router.push('/student-priorities');
        }}
      >
        <Button.Label>
          {language === 'en' ? 'Continue to priorities' : 'Weiter zu Prioritäten'}
        </Button.Label>
      </Button>
      <Button
        variant="secondary"
        className="mt-3 h-14"
        onPress={() => router.replace('/reality-check')}
      >
        <Button.Label>{language === 'en' ? 'Edit answers' : 'Antworten bearbeiten'}</Button.Label>
      </Button>
    </Screen>
  );
}
