import { router } from 'expo-router';
import { Button, Text } from 'heroui-native';
import { ArrowRight, CircleHelp } from 'lucide-react-native';
import { View } from 'react-native';

import {
  AppHeader,
  GuidanceNotice,
  Screen,
  SoftCard,
  StatusBadge,
} from '@/components/wegweiser/UI';
import { pathwayCards } from '@/lib/wegweiser/data';
import { realityCheck } from '@/lib/wegweiser/realityCheck';
import { useWegweiserStore } from '@/lib/wegweiser/store';
import type { PathwayId } from '@/lib/wegweiser/types';

function fitReason(pathwayId: PathwayId, interest: string, hope: string, language: 'en' | 'de') {
  const interestName = (
    {
      technology: 'technology',
      'health-social': 'health and social care',
      'business-languages': 'business and languages',
      arts: 'creative subjects',
      broad: 'broad academic study',
      unsure: 'keeping interests open',
    } as Record<string, string>
  )[interest];
  const hopeName = (
    {
      academic: 'academic progression',
      career: 'career exploration',
      wellbeing: 'confidence and wellbeing',
      flexibility: 'flexibility',
    } as Record<string, string>
  )[hope];
  if (language === 'de')
    return `Berücksichtigt das Interesse der Schülerin oder des Schülers (${interestName}) und das Elternziel (${hopeName}).`;
  return `Connects the student’s interest in ${interestName} with the parent priority of ${hopeName}.`;
}

const tradeoffs: Record<PathwayId, { en: string; de: string }> = {
  'gymnasiale-oberstufe': {
    en: 'A broad academic route can mean less early career specialisation.',
    de: 'Ein breiter akademischer Weg bietet anfangs weniger berufliche Spezialisierung.',
  },
  'berufliches-gymnasium': {
    en: 'The vocational focus narrows subject choice. Confirm programme entry conditions.',
    de: 'Der berufliche Schwerpunkt verengt die Fächerwahl. Zugangsvoraussetzungen klären.',
  },
  ausbildung: {
    en: 'This practical route is not the same as a direct broad Abitur pathway.',
    de: 'Dieser praktische Weg ist nicht dasselbe wie ein direkter breiter Abiturweg.',
  },
};

export default function OptionsScreen() {
  const { language, profile, selectPathway } = useWegweiserStore();
  const result = realityCheck(profile.reality);
  return (
    <Screen>
      <AppHeader compact />
      <View className="mb-7 gap-2">
        <Text type="body-sm" className="text-accent font-semibold tracking-widest uppercase">
          {language === 'en' ? 'Three transparent options' : 'Drei transparente Optionen'}
        </Text>
        <Text.Heading type="h1">{language === 'en' ? 'Your pathways' : 'Eure Wege'}</Text.Heading>
        <Text color="muted">
          {language === 'en'
            ? 'These are starting points for a family conversation, not a ranking.'
            : 'Diese Optionen sind Gesprächsanfänge, keine Rangliste.'}
        </Text>
      </View>
      <View className="gap-5">
        {pathwayCards.map((pathway) => {
          const check = result.items.find((item) => item.pathwayId === pathway.id);
          const status = check?.status ?? 'needs-confirmation';
          return (
            <SoftCard
              key={pathway.id}
              tone={pathway.id === 'berufliches-gymnasium' ? 'peach' : 'lilac'}
            >
              <View className="gap-4">
                <StatusBadge status={status} language={language} />
                <View className="gap-1">
                  <Text.Heading type="h3">{pathway.name[language]}</Text.Heading>
                  <Text color="muted">{pathway.focus[language]}</Text>
                </View>
                <View className="gap-1">
                  <Text className="font-semibold">
                    {language === 'en' ? 'Why this may fit' : 'Warum das passen könnte'}
                  </Text>
                  <Text type="body-sm" className="leading-5">
                    {fitReason(pathway.id, profile.student.interest, profile.parent.hope, language)}
                  </Text>
                </View>
                <View className="gap-1">
                  <Text className="font-semibold">
                    {language === 'en' ? 'Important to clarify' : 'Wichtig zu klären'}
                  </Text>
                  <Text type="body-sm" className="leading-5">
                    {tradeoffs[pathway.id][language]}
                  </Text>
                </View>
                {status === 'not-recommended' ? (
                  <View className="bg-danger/10 flex-row gap-2 rounded-2xl p-3">
                    <CircleHelp size={18} color="#9a3d3d" />
                    <Text type="body-sm" className="flex-1 leading-5">
                      {check?.verificationQuestion}
                    </Text>
                  </View>
                ) : (
                  <Button
                    size="lg"
                    onPress={() => {
                      selectPathway(pathway.id);
                      router.push({
                        pathname: '/schools/[pathwayId]',
                        params: { pathwayId: pathway.id },
                      });
                    }}
                  >
                    <Button.Label>
                      {language === 'en' ? 'Explore schools' : 'Schulen erkunden'}{' '}
                      <ArrowRight size={17} />
                    </Button.Label>
                  </Button>
                )}
              </View>
            </SoftCard>
          );
        })}
      </View>
      <GuidanceNotice />
    </Screen>
  );
}
