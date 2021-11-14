import React from 'react'
import { View,  TouchableOpacity, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux';
import Header from '../components/header';
import Text from '../components/text/Text';
import { useTheme } from '../context/theme-context';
import { Feather } from '@expo/vector-icons'; 


import { decrement, increment, selectCount } from '../redux/counterSlice';
import { useAppDispatch } from '../redux/store';
import t from '../theme/'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Button from '../components/button';
import { reset, selectInvoices } from '../redux/invoiceSlice';



export default function Home({ navigation }: {navigation: NativeStackNavigationProp<any>}) {
    const invoices = useSelector(selectInvoices)
    const dispatch = useAppDispatch(); // will use dispatch to call actions
    const { colors, setScheme, isDark} = useTheme();

    console.log(invoices)

    const renderItem = ({ item }: {item: any}) => {
        const { id, date, clientName, status  } = item;
        return (
            <View style={[t.bgWhite, t.rounded, t.p6, t.mB4]}>
                <View style={[t.flexRow, t.justifyBetween, t.itemsCenter]}>
                    <Text>
                        {`#${id}`}
                    </Text>
                    <Text>
                        {clientName}
                    </Text>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={[t.flex1]}>
            <Header />
            <View style={[t.pX6, t.pT8, t.flexRow, t.justifyBetween, t.itemsCenter]}>
                <View>
                    <Text preset="h2">Invoices</Text>
                    <Text style={{ color: "#888EB0"}}>7 invoices</Text>
                </View>
                <View>
                    <Text style={{ fontWeight: 'bold' }}>Filter</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("Create")} style={[{ height: 44, width: 90, borderRadius: 24, }, t.flexRow, t.itemsCenter, colors.bgPrimary]}>
                    <View style={[t.justifyCenter, t.itemsCenter, t.bgWhite, t.h8, t.w8, t.mL2, t.rounded, t.mR1  ]}>
                        <Feather name="plus" size={22} color={"#7C5DFA"} />
                    </View>
                    <Text style={[ colors.textWhite, t.fontSansBold ]}>
                        New
                    </Text>
                </TouchableOpacity>
            </View>

            {
                invoices.length > 0 ?
                    <FlatList 
                        data={invoices}
                        renderItem={renderItem}
                        keyExtractor={(item : any, index) => index.toString()}
                        contentContainerStyle={[t.pX6, t.pY6]}
                    /> 
                    : 
                    null
            }



            <Button
                title="RESET DATA"
                onPress={() => dispatch(reset())}
            />
        </SafeAreaView>
    );
}
