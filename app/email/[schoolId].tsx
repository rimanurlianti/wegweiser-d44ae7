import * as Clipboard from 'expo-clipboard';
import { useLocalSearchParams, router } from 'expo-router';
import { Button, Text } from 'heroui-native';
import { Check, Copy } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { TextInput, View } from 'react-native';

import { AppHeader, Screen, SoftCard } from '@/components/wegweiser/UI';
import { getSchool } from '@/lib/wegweiser/data';
import { useWegweiserStore } from '@/lib/wegweiser/store';

export default function EmailDraftScreen() {
  const { schoolId } = useLocalSearchParams<{ schoolId: string }>();
  const language = useWegweiserStore((state) => state.language);
  const school = getSchool(schoolId);
  const initial = useMemo(
    () =>
      school
        ? {
            subject: `Fragen zum Bildungsgang an der ${school.name}`,
            body: `Sehr geehrte Damen und Herren,\n\nwir interessieren uns für den Bildungsgang „${school.programme.de}“ für das kommende Übergangsschuljahr.\n\nDazu haben wir zwei Fragen:\n1. ${school.missingInformation.de[0] ?? 'Welche aktuellen Zugangsvoraussetzungen gelten?'}\n2. ${school.missingInformation.de[1] ?? 'Welche Unterlagen werden für die Bewerbung benötigt?'}\n\nKönnten Sie uns außerdem Informationen zu einem Beratungstermin, Tag der offenen Tür oder zu den aktuellen Bewerbungsanforderungen senden?\n\nMit freundlichen Grüßen\nFamilie Muster`,
          }
        : { subject: '', body: '' },
    [school],
  );
  const [subject, setSubject] = useState(initial.subject);
  const [body, setBody] = useState(initial.body);
  const [copied, setCopied] = useState(false);
  if (!school) return null;
  const copyEmail = async () => {
    await Clipboard.setStringAsync(`Betreff: ${subject}\n\n${body}`);
    setCopied(true);
  };
  return (
    <Screen keyboard>
      <AppHeader compact />
      <View className="mb-6 gap-2">
        <Text.Heading type="h1">
          {language === 'en' ? 'German email draft' : 'Deutscher E-Mail-Entwurf'}
        </Text.Heading>
        <Text color="muted">
          {language === 'en'
            ? 'Edit the wording before sending it from your own email app.'
            : 'Bearbeitet den Text vor dem Senden in eurer E-Mail-App.'}
        </Text>
      </View>
      <SoftCard>
        <View className="gap-5">
          <View className="gap-2">
            <Text className="font-semibold">Betreff</Text>
            <TextInput
              value={subject}
              onChangeText={setSubject}
              className="border-border bg-background text-foreground min-h-14 rounded-2xl border px-4"
            />
          </View>
          <View className="gap-2">
            <Text className="font-semibold">E-Mail</Text>
            <TextInput
              multiline
              value={body}
              onChangeText={setBody}
              textAlignVertical="top"
              className="border-border bg-background text-foreground min-h-[370px] rounded-2xl border p-4 text-base leading-6"
            />
          </View>
        </View>
      </SoftCard>
      <View className="mt-5 gap-3">
        <Button className="h-14" onPress={() => void copyEmail()}>
          <Button.Label>
            {copied ? <Check size={18} /> : <Copy size={18} />}{' '}
            {copied
              ? language === 'en'
                ? 'Email copied'
                : 'E-Mail kopiert'
              : language === 'en'
                ? 'Copy email'
                : 'E-Mail kopieren'}
          </Button.Label>
        </Button>
        <Button
          variant="secondary"
          className="h-14"
          onPress={() => router.replace({ pathname: '/school/[schoolId]', params: { schoolId } })}
        >
          <Button.Label>{language === 'en' ? 'Back to school' : 'Zurück zur Schule'}</Button.Label>
        </Button>
      </View>
    </Screen>
  );
}
