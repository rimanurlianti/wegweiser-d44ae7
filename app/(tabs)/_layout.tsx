import { Home, ListChecks, Signpost } from 'lucide-react-native';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useThemeColor } from 'heroui-native';
import { useUniwind } from 'uniwind';

import { useWegweiserStore } from '@/lib/wegweiser/store';

export default function TabLayout() {
  const { theme } = useUniwind();
  const { language, resultsReady } = useWegweiserStore();
  const [background, border, accent, muted] = useThemeColor([
    'background',
    'border',
    'accent',
    'muted',
  ]);
  return (
    <>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      <Tabs
        screenOptions={{
          headerShown: false,
          sceneStyle: { backgroundColor: background },
          tabBarStyle: resultsReady
            ? { backgroundColor: background, borderTopColor: border, height: 68, paddingTop: 6 }
            : { display: 'none' },
          tabBarActiveTintColor: accent,
          tabBarInactiveTintColor: muted,
          tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: language === 'en' ? 'Home' : 'Start',
            tabBarIcon: ({ color, size }) => <Home color={color} size={size ?? 23} />,
          }}
        />
        <Tabs.Screen
          name="options"
          options={{
            title: language === 'en' ? 'My options' : 'Optionen',
            tabBarIcon: ({ color, size }) => <Signpost color={color} size={size ?? 23} />,
          }}
        />
        <Tabs.Screen
          name="todo"
          options={{
            title: language === 'en' ? 'To-do' : 'Aufgaben',
            tabBarIcon: ({ color, size }) => <ListChecks color={color} size={size ?? 23} />,
          }}
        />
      </Tabs>
    </>
  );
}
