import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import store from './src/redux/store'
import { Provider } from 'react-redux'
import RootNavigation from './src/navigation/root-navigation';
import { persistStore } from "redux-persist"
import { PersistGate } from "redux-persist/integration/react"

const persistor = persistStore(store)

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigation />
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
