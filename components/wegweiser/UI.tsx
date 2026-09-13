import { Button, Card, Text, useThemeColor } from 'heroui-native';
import { Languages, Signpost } from 'lucide-react-native';
import type { PropsWithChildren, ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';

import { useWegweiserStore } from '@/lib/wegweiser/store';
import type { RealityStatus } from '@/lib/wegweiser/types';

export function AppHeader({ compact = false }: { compact?: boolean }) {
  const { language, setLanguage } = useWegweiserStore();
  const accent = useThemeColor('accent');
  return (
    <View className={`flex-row items-center justify-between ${compact ? 'mb-5' : 'mb-8'}`}>
      <View className="flex-row items-center gap-2.5">
        <View className="bg-accent/15 h-10 w-10 items-center justify-center rounded-2xl">
          <Signpost size={22} color={accent} strokeWidth={2.2} />
        </View>
        <Text.Heading type="h4">Wegweiser</Text.Heading>
      </View>
      <Button
        size="sm"
        variant="tertiary"
        onPress={() => setLanguage(language === 'en' ? 'de' : 'en')}
        accessibilityLabel={language === 'en' ? 'Switch to German' : 'Auf Englisch wechseln'}
      >
        <Button.Label className="flex-row items-center gap-2">
          <Languages size={16} color={accent} />
          <Text className="text-accent font-semibold">{language === 'en' ? 'DE' : 'EN'}</Text>
        </Button.Label>
      </Button>
    </View>
  );
}

export function Screen({ children, keyboard = false }: PropsWithChildren<{ keyboard?: boolean }>) {
  const content = (
    <ScrollView
      className="bg-background flex-1"
      contentContainerClassName="px-5 pb-safe-offset-10 pt-safe-offset-4 web:mx-auto web:w-full web:max-w-3xl"
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
  if (!keyboard) return content;
  return (
    <KeyboardAvoidingView
      className="bg-background flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {content}
    </KeyboardAvoidingView>
  );
}

export function StepProgress({
  current,
  total,
  label,
}: {
  current: number;
  total: number;
  label: string;
}) {
  return (
    <View className="mb-7 gap-2">
      <View className="flex-row items-center justify-between">
        <Text type="body-sm" color="muted">
          {label}
        </Text>
        <Text type="body-sm" className="text-accent font-semibold">
          {current}/{total}
        </Text>
      </View>
      <View className="bg-default-100 h-2 overflow-hidden rounded-full">
        <View
          className="bg-accent h-full rounded-full"
          style={{ width: `${Math.round((current / total) * 100)}%` }}
        />
      </View>
    </View>
  );
}

export interface Choice<T extends string | number> {
  value: T;
  label: string;
  description?: string;
}

export function ChoiceGroup<T extends string | number>({
  value,
  choices,
  onChange,
}: {
  value: T;
  choices: Choice<T>[];
  onChange: (value: T) => void;
}) {
  return (
    <View className="gap-3">
      {choices.map((choice) => {
        const selected = choice.value === value;
        return (
          <Button
            key={String(choice.value)}
            variant={selected ? 'primary' : 'outline'}
            size="lg"
            onPress={() => onChange(choice.value)}
            className="min-h-14 justify-start rounded-2xl px-4"
          >
            <Button.Label className="flex-1 items-start">
              <Text
                className={
                  selected
                    ? 'text-primary-foreground font-semibold'
                    : 'text-foreground font-semibold'
                }
              >
                {choice.label}
              </Text>
              {choice.description ? (
                <Text
                  type="body-sm"
                  className={selected ? 'text-primary-foreground/85 mt-1' : 'text-muted mt-1'}
                >
                  {choice.description}
                </Text>
              ) : null}
            </Button.Label>
          </Button>
        );
      })}
    </View>
  );
}

const statusStyles: Record<RealityStatus, string> = {
  'currently-open': 'bg-success/15 text-success',
  'needs-confirmation': 'bg-warning/15 text-warning',
  'not-recommended': 'bg-danger/12 text-danger',
};

export const statusLabel = (status: RealityStatus, language: 'en' | 'de') =>
  ({
    'currently-open': language === 'en' ? 'Currently open' : 'Derzeit offen',
    'needs-confirmation': language === 'en' ? 'Needs confirmation' : 'Muss bestätigt werden',
    'not-recommended':
      language === 'en'
        ? 'Not recommended with current information'
        : 'Mit aktuellen Angaben nicht empfohlen',
  })[status];

export function StatusBadge({
  status,
  language,
}: {
  status: RealityStatus;
  language: 'en' | 'de';
}) {
  return (
    <Text
      type="body-xs"
      className={`self-start rounded-full px-3 py-1.5 font-semibold ${statusStyles[status]}`}
    >
      {statusLabel(status, language)}
    </Text>
  );
}

export function SoftCard({
  children,
  tone = 'card',
  className = '',
}: PropsWithChildren<{ tone?: 'card' | 'lilac' | 'peach'; className?: string }>) {
  const toneClass = tone === 'lilac' ? 'bg-lilac' : tone === 'peach' ? 'bg-peach' : 'bg-card';
  return (
    <Card
      className={`border-border/70 rounded-3xl border p-5 shadow-none ${toneClass} ${className}`}
    >
      {children}
    </Card>
  );
}

export function GuidanceNotice() {
  const language = useWegweiserStore((state) => state.language);
  return (
    <View className="border-border bg-default-50 mt-7 rounded-2xl border px-4 py-3">
      <Text type="body-xs" color="muted" className="leading-5">
        {language === 'en'
          ? 'Guidance, not admissions advice. Verify requirements directly with the school.'
          : 'Orientierung, keine Zulassungsberatung. Bitte Anforderungen direkt mit der Schule prüfen.'}
      </Text>
    </View>
  );
}

export function SectionTitle({
  title,
  subtitle,
  trailing,
}: {
  title: string;
  subtitle?: string;
  trailing?: ReactNode;
}) {
  return (
    <View className="mb-4 flex-row items-start justify-between gap-4">
      <View className="flex-1 gap-1">
        <Text.Heading type="h4">{title}</Text.Heading>
        {subtitle ? (
          <Text type="body-sm" color="muted">
            {subtitle}
          </Text>
        ) : null}
      </View>
      {trailing}
    </View>
  );
}
