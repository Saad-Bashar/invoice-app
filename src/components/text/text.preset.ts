import { TextStyle } from "react-native"
import t from '../../theme/'

const BASE: TextStyle = {
    ...t.fontSans,
    ...t.textSm
}

const BOLD: TextStyle = {
    ...t.fontSansBold
}

export const presets = {
    default: BASE,
    bold: BOLD,
    h1: {
        ...BOLD,
        ...t.text3xl
    },
    h2: {
        ...BOLD,
        ...t.textXl
    },
    h3: {
        ...BOLD,
        ...t.textBase
    },
    body2: {
        ...BOLD,
        ...t.textXs
    }
}

/**
 * A list of preset names.
 */
 export type TextPresets = keyof typeof presets