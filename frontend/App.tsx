import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './src/screens/HomeScreen';
import { ScenarioSelectScreen } from './src/screens/ScenarioSelectScreen';
import { ConversationScreen } from './src/screens/ConversationScreen';
import { FeedbackScreen } from './src/screens/FeedbackScreen';
import { Colors } from './src/constants/theme';
import { RootStackParamList } from './src/types/navigation';

const queryClient = new QueryClient();
const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="ScenarioSelect" 
            component={ScenarioSelectScreen}
            options={{ title: 'Setup Practice' }}
          />
          <Stack.Screen 
            name="Conversation" 
            component={ConversationScreen}
            options={{ 
              title: 'Practice Session',
              headerLeft: () => null,
            }}
          />
          <Stack.Screen 
            name="Feedback" 
            component={FeedbackScreen}
            options={{ 
              title: 'Your Results',
              headerLeft: () => null,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </QueryClientProvider>
  );
}