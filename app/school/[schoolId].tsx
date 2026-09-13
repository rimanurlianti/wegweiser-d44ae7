import { useLocalSearchParams, router } from 'expo-router';
import { Button, Text } from 'heroui-native';
import { Check, ExternalLink, HelpCircle, Mail, Map, TriangleAlert } from 'lucide-react-native';
import { Linking, View } from 'react-native';

import { AppHeader, Screen, SectionTitle, SoftCard } from '@/components/wegweiser/UI';
import { getSchool } from '@/lib/wegweiser/data';
import { useWegweiserStore } from '@/lib/wegweiser/store';

function FactList({ items, icon }: { items: string[]; icon: 'check' | 'warn' | 'help' }) {
  return (
    <View className="gap-3">
      {items.map((item) => (
        <View key={item} className="flex-row items-start gap-3">
          {icon === 'check' ? (
            <Check size={18} color="#477054" />
          ) : icon === 'warn' ? (
            <TriangleAlert size={18} color="#ad653f" />
          ) : (
            <HelpCircle size={18} color="#66558f" />
          )}
          <Text type="body-sm" className="flex-1 leading-5">
            {item}
          </Text>
        </View>
      ))}
    </View>
  );
}

export default function SchoolDetailScreen() {
  const { schoolId } = useLocalSearchParams<{ schoolId: string }>();
  const { language, markSchoolViewed } = useWegweiserStore();
  const school = getSchool(schoolId);
  if (!school)
    return (
      <Screen>
        <AppHeader />
        <Text>
          {language === 'en'
            ? 'School information is unavailable.'
            : 'Schulinformationen sind nicht verfügbar.'}
        </Text>
      </Screen>
    );
  const openMap = () => {
    markSchoolViewed(school.id);
    router.push({ pathname: '/school-map/[schoolId]', params: { schoolId: school.id } });
  };
  const email = () => {
    markSchoolViewed(school.id);
    router.push({ pathname: '/email/[schoolId]', params: { schoolId: school.id } });
  };
  return (
    <Screen>
      <AppHeader compact />
      <View className="mb-7 gap-2">
        <Text type="body-xs" className="bg-peach self-start rounded-full px-3 py-1.5 font-semibold">
          {language === 'en' ? 'Demo school data' : 'Demo-Schuldaten'}
        </Text>
        <Text.Heading type="h1">{school.name}</Text.Heading>
        <Text color="muted">
          {school.programme[language]} · {school.neighbourhood}
        </Text>
      </View>
      <View className="gap-5">
        <SoftCard tone="lilac">
          <SectionTitle title={language === 'en' ? 'Matches' : 'Passt dazu'} />
          <FactList items={school.matches[language]} icon="check" />
        </SoftCard>
        <SoftCard tone="peach">
          <SectionTitle
            title={language === 'en' ? 'Potential mismatches' : 'Mögliche Unterschiede'}
          />
          <FactList items={school.mismatches[language]} icon="warn" />
        </SoftCard>
        <SoftCard>
          <SectionTitle
            title={language === 'en' ? 'Missing information' : 'Fehlende Informationen'}
          />
          <FactList items={school.missingInformation[language]} icon="help" />
        </SoftCard>
        <SoftCard>
          <SectionTitle
            title={language === 'en' ? 'Official information' : 'Offizielle Informationen'}
          />
          <View className="gap-3">
            <Text type="body-sm">
              {language === 'en' ? 'Source date' : 'Stand'}: {school.sourceDate}
            </Text>
            <Text type="body-sm">{school.address}</Text>
            <Button
              variant="outline"
              onPress={() => void Linking.openURL(school.officialWebsiteUrl)}
            >
              <Button.Label>
                {language === 'en' ? 'Official website' : 'Offizielle Website'}{' '}
                <ExternalLink size={16} />
              </Button.Label>
            </Button>
            <Button
              variant="outline"
              onPress={() => void Linking.openURL(school.entryRequirementsUrl)}
            >
              <Button.Label>
                {language === 'en'
                  ? 'Entry requirements resource'
                  : 'Informationen zu Voraussetzungen'}{' '}
                <ExternalLink size={16} />
              </Button.Label>
            </Button>
          </View>
        </SoftCard>
        <View className="flex-row gap-3">
          <Button variant="secondary" className="h-14 flex-1" onPress={openMap}>
            <Button.Label>
              <Map size={17} /> {language === 'en' ? 'Show on map' : 'Auf Karte'}
            </Button.Label>
          </Button>
          <Button className="h-14 flex-1" onPress={email}>
            <Button.Label>
              <Mail size={17} /> {language === 'en' ? 'Draft email in German' : 'E-Mail entwerfen'}
            </Button.Label>
          </Button>
        </View>
      </View>
    </Screen>
  );
}
