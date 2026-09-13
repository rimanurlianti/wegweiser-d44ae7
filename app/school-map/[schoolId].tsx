import { useLocalSearchParams, router } from 'expo-router';
import { Button, Text } from 'heroui-native';
import { View } from 'react-native';

import MapView from '@/components/MapView';
import { AppHeader, Screen, SoftCard } from '@/components/wegweiser/UI';
import { getSchool } from '@/lib/wegweiser/data';
import { useWegweiserStore } from '@/lib/wegweiser/store';

export default function SchoolMapScreen() {
  const { schoolId } = useLocalSearchParams<{ schoolId: string }>();
  const language = useWegweiserStore((state) => state.language);
  const school = getSchool(schoolId);
  if (!school) return null;
  return (
    <Screen>
      <AppHeader compact />
      <Text.Heading type="h2" className="mb-4">
        {school.name}
      </Text.Heading>
      <View className="border-border overflow-hidden rounded-3xl border">
        <MapView
          style={{ width: '100%', height: 520 }}
          initialRegion={{
            latitude: school.latitude,
            longitude: school.longitude,
            latitudeDelta: 0.035,
            longitudeDelta: 0.035,
          }}
          markers={[
            {
              id: school.id,
              coordinate: { latitude: school.latitude, longitude: school.longitude },
              title: school.name,
              description: school.address,
              color: 'orange',
            },
          ]}
        />
      </View>
      <SoftCard className="mt-4">
        <Text className="font-semibold">{school.address}</Text>
        <Text type="body-sm" color="muted">
          {language === 'en'
            ? 'Demo location — not the user’s home location.'
            : 'Demo-Standort – nicht der Wohnort der Nutzer.'}
        </Text>
      </SoftCard>
      <Button variant="secondary" className="mt-5 h-14" onPress={() => router.back()}>
        <Button.Label>{language === 'en' ? 'Back to school' : 'Zurück zur Schule'}</Button.Label>
      </Button>
    </Screen>
  );
}
