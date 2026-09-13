import { router } from 'expo-router';
import { Button, Text } from 'heroui-native';
import { Compass, Signpost } from 'lucide-react-native';
import { View } from 'react-native';

import { AppHeader, GuidanceNotice, Screen, SoftCard } from '@/components/wegweiser/UI';
import { useWegweiserStore } from '@/lib/wegweiser/store';

export default function HomeScreen() {
  const { language, resultsReady } = useWegweiserStore();
  return (
    <Screen>
      <AppHeader />
      {resultsReady ? (
        <View className="gap-6">
          <View className="bg-accent h-14 w-14 items-center justify-center rounded-3xl">
            <Compass size={27} color="#fffaf2" />
          </View>
          <View className="gap-2">
            <Text.Heading type="h1">
              {language === 'en'
                ? 'Your next steps, in one place.'
                : 'Eure nächsten Schritte an einem Ort.'}
            </Text.Heading>
            <Text color="muted" className="leading-6">
              {language === 'en'
                ? 'Review your shared profile, compare pathways, and keep the practical plan moving.'
                : 'Prüft euer gemeinsames Profil, vergleicht Wege und arbeitet den Plan ab.'}
            </Text>
          </View>
          <SoftCard tone="lilac">
            <Text.Heading type="h4">
              {language === 'en' ? 'Continue together' : 'Gemeinsam weitermachen'}
            </Text.Heading>
            <Button className="mt-4 h-14" onPress={() => router.push('/options')}>
              <Button.Label>
                {language === 'en' ? 'View my options' : 'Meine Optionen'}
              </Button.Label>
            </Button>
            <Button
              variant="secondary"
              className="mt-3 h-14"
              onPress={() => router.push('/profile')}
            >
              <Button.Label>
                {language === 'en' ? 'Edit shared profile' : 'Gemeinsames Profil bearbeiten'}
              </Button.Label>
            </Button>
          </SoftCard>
          <GuidanceNotice />
        </View>
      ) : (
        <View className="min-h-[630px] flex-1 justify-between gap-10 py-5">
          <View className="gap-8">
            <View className="bg-accent h-16 w-16 items-center justify-center rounded-3xl">
              <Signpost size={31} color="#fffaf2" strokeWidth={2.2} />
            </View>
            <View className="gap-4">
              <Text.Heading type="h1" className="text-5xl leading-[58px]">
                {language === 'en'
                  ? 'A clearer next step for your family.'
                  : 'Ein klarerer nächster Schritt für eure Familie.'}
              </Text.Heading>
              <Text className="text-muted text-xl leading-8">
                {language === 'en'
                  ? 'Explore realistic education pathways and school options together.'
                  : 'Entdeckt gemeinsam realistische Bildungswege und Schuloptionen.'}
              </Text>
            </View>
          </View>
          <View>
            <Button
              size="lg"
              className="h-16 rounded-2xl"
              onPress={() => router.push('/reality-check')}
            >
              <Button.Label className="text-lg">
                {language === 'en' ? 'Start together' : 'Gemeinsam starten'}
              </Button.Label>
            </Button>
            <GuidanceNotice />
          </View>
        </View>
      )}
    </Screen>
  );
}
