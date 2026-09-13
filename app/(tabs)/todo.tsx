import { router } from 'expo-router';
import { Button, Text } from 'heroui-native';
import { Check, Circle, ExternalLink } from 'lucide-react-native';
import { Linking, View } from 'react-native';

import { AppHeader, Screen, SoftCard } from '@/components/wegweiser/UI';
import { getSchool } from '@/lib/wegweiser/data';
import { tasksForSelectedSchool, useWegweiserStore } from '@/lib/wegweiser/store';
import type { ActionTask } from '@/lib/wegweiser/types';

const buckets: ActionTask['bucket'][] = [
  'now',
  'this-week',
  'open-day',
  'application',
  'confirm-deadline',
];
const bucketLabels: Record<ActionTask['bucket'], { en: string; de: string }> = {
  now: { en: 'Now', de: 'Jetzt' },
  'this-week': { en: 'This week', de: 'Diese Woche' },
  'open-day': { en: 'Before an open day', de: 'Vor einem Tag der offenen Tür' },
  application: { en: 'Before the application deadline', de: 'Vor der Bewerbungsfrist' },
  'confirm-deadline': { en: 'Confirm deadline with the school', de: 'Frist mit der Schule klären' },
};

function openTask(task: ActionTask) {
  if (task.linkType === 'school' && task.schoolId)
    router.push({ pathname: '/school/[schoolId]', params: { schoolId: task.schoolId } });
  else if (task.url) void Linking.openURL(task.url);
}

export default function TodoScreen() {
  const { language, selectedSchoolId, completedTaskIds, toggleTask } = useWegweiserStore();
  const school = selectedSchoolId ? getSchool(selectedSchoolId) : undefined;
  const tasks = tasksForSelectedSchool(selectedSchoolId);
  return (
    <Screen>
      <AppHeader compact />
      <View className="mb-7 gap-2">
        <Text.Heading type="h1">
          {language === 'en' ? 'Your action plan' : 'Euer Aktionsplan'}
        </Text.Heading>
        <Text color="muted">
          {school
            ? language === 'en'
              ? `Next steps for ${school.name}.`
              : `Nächste Schritte für ${school.name}.`
            : language === 'en'
              ? 'View a school to create its action plan.'
              : 'Öffnet eine Schule, um einen Aktionsplan zu erstellen.'}
        </Text>
      </View>
      {tasks.length === 0 ? (
        <SoftCard tone="lilac">
          <Text className="leading-6">
            {language === 'en'
              ? 'Your plan will appear here after you view or save a school.'
              : 'Euer Plan erscheint hier, nachdem ihr eine Schule angesehen oder gespeichert habt.'}
          </Text>
          <Button className="mt-4" onPress={() => router.push('/options')}>
            <Button.Label>{language === 'en' ? 'View my options' : 'Meine Optionen'}</Button.Label>
          </Button>
        </SoftCard>
      ) : (
        <View className="gap-7">
          {buckets.map((bucket) => {
            const group = tasks.filter((task) => task.bucket === bucket);
            if (!group.length) return null;
            return (
              <View key={bucket} className="gap-3">
                <Text.Heading type="h4">{bucketLabels[bucket][language]}</Text.Heading>
                {group.map((task) => {
                  const done = completedTaskIds.includes(task.id);
                  return (
                    <SoftCard key={task.id}>
                      <View className="flex-row items-start gap-3">
                        <Button
                          isIconOnly
                          variant={done ? 'primary' : 'outline'}
                          size="sm"
                          onPress={() => toggleTask(task.id)}
                          accessibilityLabel={done ? 'Mark incomplete' : 'Mark done'}
                        >
                          {done ? <Check size={18} color="#fffaf2" /> : <Circle size={18} />}
                        </Button>
                        <View className="flex-1 gap-2">
                          <Text
                            className={`font-semibold ${done ? 'text-muted line-through' : 'text-foreground'}`}
                          >
                            {task.title}
                          </Text>
                          <Text type="body-sm" color="muted" className="leading-5">
                            {task.why}
                          </Text>
                          <Button
                            variant="tertiary"
                            size="sm"
                            className="self-start"
                            onPress={() => openTask(task)}
                          >
                            <Button.Label>
                              {language === 'en'
                                ? 'Open related information'
                                : 'Zugehörige Information öffnen'}{' '}
                              <ExternalLink size={14} />
                            </Button.Label>
                          </Button>
                          {task.verifiedDate ? (
                            <Text type="body-xs">{task.verifiedDate}</Text>
                          ) : bucket === 'confirm-deadline' ? (
                            <Text type="body-xs" className="text-warning font-semibold">
                              {language === 'en'
                                ? 'Confirm deadline with the school'
                                : 'Frist mit der Schule klären'}
                            </Text>
                          ) : null}
                        </View>
                      </View>
                    </SoftCard>
                  );
                })}
              </View>
            );
          })}
        </View>
      )}
    </Screen>
  );
}
