import React from 'react'
import { Pressable, View, StyleSheet, ViewStyle } from 'react-native'
import Text from './text/Text'
import t from '../theme'

const backgroundColor = {
    primary: "#7C5DFA",
    default: "#F9FAFE",
    secondary: "#373B53"
}

const textColor = {
    primary: "#FFFFFF",
    default: "#7E88C3",
    secondary: "#888EB0"
}

export default function Button({title, onPress, preset = 'default', style}: {title: string, onPress?: () => void, preset?: 'default' | 'secondary' | 'primary', style?: ViewStyle[] | ViewStyle}) {
    const btnBG = {backgroundColor:backgroundColor[preset]}
    const btnTextColor = {color: textColor[preset]}
    return (
        <Pressable 
            onPress={onPress} 
            style={[t.justifyCenter, t.itemsCenter, styles.button, t.mT5, btnBG, style ]}>
            <Text style={[t.textPrimary, t.fontSansBold, t.textSm, styles.title, btnTextColor, t.pX2, t.textCenter]}>{title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#F9FAFE',
        height: 48,
        borderRadius: 24,
    },
    title: {
        color: '#7E88C3'
    }
})
