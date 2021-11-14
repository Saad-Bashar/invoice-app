import React from "react";
import { LogBox, StyleSheet, Text, View } from "react-native";
import store from "./src/redux/store";
import { Provider } from "react-redux";
import RootNavigation from "./src/navigation/root-navigation";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { useFonts } from "expo-font";
import { ThemeProvider } from "./src/context/theme-context";
import FlashMessage from "react-native-flash-message";


const persistor = persistStore(store);

LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);

export default function App() {
  const [loaded] = useFonts({
    "Spartan-Bold": require("./assets/fonts/Spartan-Bold.ttf"),
    "Spartan-Medium": require("./assets/fonts/Spartan-Medium.ttf"),
  });

  if (!loaded) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider>
            <RootNavigation />
            <FlashMessage position="top" />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
