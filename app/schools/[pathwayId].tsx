import { useLocalSearchParams, router } from 'expo-router';
import { Button, Text } from 'heroui-native';
import { ExternalLink, MapPin } from 'lucide-react-native';
import { Linking, Pressable, View } from 'react-native';

import MapView from '@/components/MapView';
import { AppHeader, Screen, SoftCard } from '@/components/wegweiser/UI';
import { getPathway, schoolCards } from '@/lib/wegweiser/data';
import { useWegweiserStore } from '@/lib/wegweiser/store';
import type { PathwayId, SchoolCard } from '@/lib/wegweiser/types';

export default function SchoolsScreen() {
  const { pathwayId } = useLocalSearchParams<{ pathwayId: PathwayId }>();
  const { language, profile, selectedSchoolId, selectSchool } = useWegweiserStore();
  const pathway = getPathway(pathwayId);
  const schools = schoolCards
    .filter((school) => school.pathwayId === pathwayId)
    .sort(
      (a, b) =>
        Math.abs(Number(a.postcode.slice(0, 2)) - Number(profile.reality.postcode.slice(0, 2))) -
          Math.abs(Number(b.postcode.slice(0, 2)) - Number(profile.reality.postcode.slice(0, 2))) ||
        a.commuteMinutes - b.commuteMinutes,
    )
    .slice(0, 3);
  const openDetail = (school: SchoolCard) => {
    selectSchool(school.id);
    router.push({ pathname: '/school/[schoolId]', params: { schoolId: school.id } });
  };
  const markers = schools.map((school, index) => ({
    id: school.id,
    coordinate: { latitude: school.latitude, longitude: school.longitude },
    title: `${index + 1}. ${school.name}`,
    description: school.neighbourhood,
    color: school.id === selectedSchoolId ? ('orange' as const) : ('purple' as const),
    onPress: () => openDetail(school),
    onCalloutPress: () => openDetail(school),
  }));
  return (
    <Screen>
      <AppHeader compact />
      <View className="mb-6 gap-2">
        <Text.Heading type="h1">
          {pathway?.name[language] ?? (language === 'en' ? 'School options' : 'Schuloptionen')}
        </Text.Heading>
        <Text color="muted">
          {language === 'en'
            ? `Showing options within your ${profile.reality.maxCommute}-minute travel preference.`
            : `Optionen für eure Fahrtzeit-Präferenz von ${profile.reality.maxCommute} Minuten.`}
        </Text>
        <Text type="body-xs" color="muted">
          {language === 'en'
            ? 'Commutes are demo estimates from the postcode area, not your exact home.'
            : 'Fahrtzeiten sind Demo-Schätzungen aus dem PLZ-Gebiet, nicht von eurer genauen Adresse.'}
        </Text>
      </View>
      <View className="gap-4">
        {schools.map((school, index) => (
          <Pressable key={school.id} onPress={() => openDetail(school)} accessibilityRole="button">
            <SoftCard className={selectedSchoolId === school.id ? 'border-accent border-2' : ''}>
              <View className="gap-3">
                <View className="flex-row items-start justify-between gap-3">
                  <View className="flex-1">
                    <Text
                      type="body-xs"
                      className="bg-peach text-foreground mb-2 self-start rounded-full px-2.5 py-1 font-semibold"
                    >
                      {language === 'en' ? 'Demo school data' : 'Demo-Schuldaten'}
                    </Text>
                    <Text.Heading type="h3">
                      {index + 1}. {school.name}
                    </Text.Heading>
                    <Text type="body-sm" color="muted">
                      {school.programme[language]}
                    </Text>
                  </View>
                  <View className="bg-lilac items-center rounded-2xl px-3 py-2">
                    <MapPin size={18} color="#24304a" />
                    <Text type="body-xs" className="font-semibold">
                      ~{school.commuteMinutes} min
                    </Text>
                  </View>
                </View>
                <Text type="body-sm">
                  {school.neighbourhood} · {school.address}
                </Text>
                <Text type="body-sm" className="leading-5">
                  {school.whyFit[language]}
                </Text>
                <View className="flex-row flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onPress={() => void Linking.openURL(school.officialWebsiteUrl)}
                  >
                    <Button.Label>
                      {language === 'en' ? 'Official website' : 'Offizielle Website'}{' '}
                      <ExternalLink size={14} />
                    </Button.Label>
                  </Button>
                  <Button size="sm" onPress={() => openDetail(school)}>
                    <Button.Label>
                      {language === 'en' ? 'View fit & questions' : 'Passung & Fragen'}
                    </Button.Label>
                  </Button>
                </View>
              </View>
            </SoftCard>
          </Pressable>
        ))}
      </View>
      <View className="border-border mt-7 overflow-hidden rounded-3xl border">
        <MapView
          style={{ height: 330, width: '100%' }}
          initialRegion={{
            latitude: 52.515,
            longitude: 13.39,
            latitudeDelta: 0.18,
            longitudeDelta: 0.2,
          }}
          markers={markers}
        />
      </View>
    </Screen>
  );
}
