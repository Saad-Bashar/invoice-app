import React from 'react'
import { View, Image } from 'react-native'
import t from '../theme/'

export default function Header() {
    return (
        <View style={[t.bgGray700, t.justifyBetween, t.flexRow, t.itemsCenter, t.pR5, t.h16 ]}>
            {/* @ts-ignore */}
            <Image style={[ t.h16 ]}  source={require('../../assets/logo.png')} />
            <View style={[t.flexRow, t.itemsCenter]}>
                 {/* @ts-ignore */}
                <Image style={[t.mR5]} source={require('../../assets/moon.png')} />
                <View style={[t.pL5, t.minHFull, t.justifyCenter, t.borderL, t.borderGray400]}>
                    <Image style={[]} source={require('../../assets/Oval.png')} />
                </View>
            </View>
        </View>
    )
}
