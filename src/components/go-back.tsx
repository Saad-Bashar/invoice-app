import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import t from '../theme/'
import { useNavigation } from '@react-navigation/core';

export default function GoBack() {
    const navigation = useNavigation()
    return (
        <Pressable onPress={() => navigation.goBack()} style={[t.flexRow, t.itemsCenter, t.mL5, t.mT5]}>
            <AntDesign name="left" size={14} color="black" />
            <Text style={[t.mL4, t.fontSansBold]}>Go back</Text>
        </Pressable>
    )
}
