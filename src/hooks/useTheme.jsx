// useTheme.jsx
import { View, Text } from 'react-native'
import { useColorScheme } from 'react-native-appearance'
import { dark, light } from '../theme/'

/**
 * Chooses light or dark theme depending on the user's color scheme
 */
export default function useTheme() {
  const colorScheme = useColorScheme()
  return colorScheme === 'dark' ? dark : light
}