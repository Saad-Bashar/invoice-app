import React, {useState, useEffect} from 'react'
import { View, TextInput, ViewStyle, StyleSheet, Pressable, Image, Platform, LayoutAnimation, UIManager } from 'react-native'
import Text from './text/Text'
import t from '../theme/'
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import Button from './button';
import dayjs from 'dayjs';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}



export default function Input({ label, style, onChangeText, value } : { label: string, style?: ViewStyle[], onChangeText?: (text: string) => void, value?: any }) {
    return (
        <View style={[t.flex1, t.mT5]}>
            <Text style={[t.mB1, t.textPrimary]}>{label}</Text>
            <TextInput
                style={[styles.input, style]}
                autoCorrect={false}
                onChangeText={onChangeText}
                value={value}
            />
        </View>
    )
}

export const DatePicker = ({callback}: {callback: (arg: string) => void}) => {
    const [isModalVisible, setModalVisible] = React.useState(false);
    const [date, setDate] = React.useState(new Date());

    const renderDatePicker = () => {
        const contentOut = (
            <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                display="spinner"
                onChange={(event:any, selectedDate: any) => {
                    setDate(selectedDate);
                    callback(selectedDate.toString() || date.toString());
                }}
            />
        )

        if(Platform.OS === 'ios') {
            return (
                <Modal
                    style={[t.flex1]}
                    onBackButtonPress={() => setModalVisible(false)}
                    onBackdropPress={() => setModalVisible(false)}
                    isVisible={isModalVisible}>
                        <View style={[t.bgWhite, t.rounded]}>
                            {contentOut}
                            <Button 
                                title="Confirm" 
                                preset='primary' 
                                style={[t.mB2, t.mL2, t.mR2]} 
                                onPress={() => {
                                    setModalVisible(false);
                                }}
                            />
                        </View>
                        
                </Modal> 
            )
           
        } else if (isModalVisible) {
            return contentOut;
               
        }
    }

    return (
        <View style={[t.flex1, t.mT5]}>
            <Text style={[t.mB1, t.textPrimary]}>Invoice Date</Text>
            <Pressable 
                onPress={() => setModalVisible(true)} 
                style={[styles.input, t.flexRow, t.justifyBetween, t.itemsCenter]}
            >
                <Text>
                    {dayjs(date).format('MMMM DD, YYYY')}
                </Text>

                <Image
                    source={require('../../assets/calendar.png')}
                />

            </Pressable>
            
            {renderDatePicker()}
        </View>
    )
}

export const Picker = ({ callback } :  {callback: (arg: string) => void }) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      {label: 'Net 30 Days', value: '30days'},
      {label: 'Net 15 Days', value: '15days'},
      {label: '1 week', value: '1week'}
    ]);
    
    useEffect(() => {
        if(value) {
            callback(value);
        }
    }, [value])
    
    return (
        <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={[t.bgTransparent]}
        />
    );

}


export const ItemListInputs = ({ callback } :  {callback: (arg: any) => void }) => {
    const [numInputs, setNumInputs] = useState(1);
    const [inputValues, setInputValues] = useState<any>([]);

    useEffect(() => {
        if(inputValues.length > 0) {
            callback(inputValues);
        }
    }, [inputValues])

    const setInputValue = (index: number, value: string, k?: any) => {
        let copyOfInputValues = [...inputValues];
        copyOfInputValues[index] = {
            ...copyOfInputValues[index],
            [k]: value
        }
        setInputValues(copyOfInputValues);        
    }

    const addInput = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        setNumInputs(numInputs + 1);
    }

    const removeInput = (i: number) => {
        if (numInputs > 1) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
            let copyOfInputValues = [...inputValues];
            copyOfInputValues.splice(i, 1);
            setInputValues(copyOfInputValues);
            setNumInputs(numInputs - 1);
        }
    }
    
    const inputs: JSX.Element[] = [];
	for (let i = 0; i < numInputs; i ++)
	{
        let totalPrice = 0;
        if (inputValues[i]?.price && inputValues[i]?.qty) {
            totalPrice = parseInt(inputValues[i]?.qty) * parseInt(inputValues[i]?.price)
        }

		inputs.push(
			<View key={i.toString()}>
                <Input 
                    label="Item Name" 
                    onChangeText={(text) => {
                        setInputValue(i, text, 'name');
                    }} 
                    value={inputValues[i]?.name}
                />
                <View style={[t.flexRow, t.justifyBetween]}>
                    <View style={[t.flexRow, t.flex1]}>
                        <Input 
                            label="Qty" 
                            style={[t.mR4]} 
                            onChangeText={(text) => {
                                setInputValue(i, text, 'qty');
                            }} 
                            value={inputValues[i]?.qty}
                        /> 
                        <Input 
                            label="Price"
                            onChangeText={(text) => {
                                setInputValue(i, text, 'price');
                            }}  
                            value={inputValues[i]?.price}
                        />
                        <View style={[t.mL4, t.mT6]}>
                            <Text style={[t.textPrimary]}>Total</Text>
                            <Text style={[t.top4]}>
                                {totalPrice}
                            </Text>
                        </View>
                    </View>
                    
                    <Pressable onPress={() => removeInput(i)} style={[t.justifyEnd, t.itemsEnd, t.mL6, t.bottom1 ]}>
                        <Image source={require('../../assets/delete.png')} />
                    </Pressable>
                </View>                       
            </View>
		);
	}

    return (
        <View style={[t.mL5, t.mR5, t.mT8]}>
            <Text style={[t.textPrimary, t.fontSansBold, t.mT5, {color: "#7C5DFA"}]}>
                Item List
            </Text>

            {inputs}

            <Button onPress={addInput} title="+ Add an item" />
        </View>
    )

}

const styles = StyleSheet.create({
    input: {
        height: 48, 
        borderWidth: 1, 
        borderColor: '#DFE3FA', 
        padding: 10, 
        borderRadius: 4
    },
    datePicker: {}
})

