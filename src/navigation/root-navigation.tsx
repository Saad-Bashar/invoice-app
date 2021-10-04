import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/home-screen';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';



const Stack = createNativeStackNavigator();

function RootNavigation() {
  return (
    <SafeAreaProvider>
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default RootNavigation;