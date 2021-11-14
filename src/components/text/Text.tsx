import React from 'react';
import { Text as ReactNativeText, TextStyle, StyleSheet } from 'react-native';
import { presets, TextPresets } from './text.preset'

export interface TextProps {
    children?: React.ReactNode;
    style?: TextStyle | TextStyle[];
    preset?: TextPresets;
    textColor?: string;
    centered?: boolean;
}

export default function Text(props: TextProps) {
    const {
        preset = 'default',
        children,
        textColor,
        style: styleOverride,
        ...rest
    } = props;

    const styles = StyleSheet.compose(presets[preset] || presets.default, styleOverride);

    return (
        <ReactNativeText {...rest} style={[styles]}>
            {children}
        </ReactNativeText>
    );
}