import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, {useState, useRef} from 'react'
import { Pressable, ScrollView, View, Image, LayoutAnimation, Platform, UIManager } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../components/button'
import GoBack from '../components/go-back'
import Header from '../components/header'
import Input, { DatePicker, ItemListInputs, Picker } from '../components/input'
import Text from '../components/text/Text'
import t from '../theme/'
import { useFormik } from 'formik';
import {useDispatch} from 'react-redux'
import { addInvoice } from '../redux/invoiceSlice'
import { showMessage } from 'react-native-flash-message'


const Create = ({ navigation } : {navigation: NativeStackNavigationProp<any>}) => {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            companyStreetAdress: '',
            companyCity: '',
            companyPostalCode: '',
            companyCountry: '',
            clientName: '',
            clientEmail: '',
            clientStreetAdress: '',
            clientCity: '',
            clientPostalCode: '',
            clientCountry: '',
            invoiceDate: new Date(),
            invoiceType: '',
            projectDescription: '',
            itemList: [],
            status: 'draft'
        },
        onSubmit: values => {
            // TODO: add validation
            dispatch(addInvoice(values))
            showMessage({
                message: 'Invoice created',
                type: 'success',
            })
            navigation.goBack()
        },
    });


    return (
        <SafeAreaView style={[t.flex1]}>
            <ScrollView contentContainerStyle={[t.pB10]}>
                <Header />
                
                <GoBack />
                
                <View style={[t.mL5, t.mT5]}>
                    <Text preset="h2">New Invoice</Text>
                </View>

                <View style={[t.mT5]}>
                    <View style={[t.mL5, t.mR5]}>
                        <Text style={[t.textPrimary, t.fontSansBold, {color: "#7C5DFA"}]}>
                            Bill From
                        </Text>

                        
                        <Input 
                            label="Street address" 
                            onChangeText={formik.handleChange('companyStreetAdress')}
                        />
                        
                        <View style={[t.flexRow]}>
                            <Input 
                                label="City" 
                                style={[t.mR4]} 
                                onChangeText={formik.handleChange('companyCity')}
                            />
                            <Input 
                                label="Post Code" 
                                onChangeText={formik.handleChange('companyPostalCode')}
                            />
                        </View>
                        
                        <Input 
                            label="Country" 
                            onChangeText={formik.handleChange('companyCountry')}
                        />
                    </View>
                   
                    <View style={[t.hPx, t.bgGray500, t.mT5 ]} />
                    
                    <View style={[t.mL5, t.mR5]}>
                        <Text style={[t.textPrimary, t.fontSansBold, t.mT5, {color: "#7C5DFA"}]}>
                            Bill To
                        </Text>

                        <Input 
                            label="Client's Name" 
                            onChangeText={formik.handleChange('clientName')}
                        />

                        <Input 
                            label="Client's Email" 
                            onChangeText={formik.handleChange('clientEmail')}
                        />

                        <Input 
                            label="Street address" 
                            onChangeText={formik.handleChange('clientStreetAdress')}
                        />

                        <View style={[t.flexRow]}>
                            <Input 
                                label="City" 
                                style={[t.mR4]} 
                                onChangeText={formik.handleChange('clientCity')}
                            />
                            <Input 
                                label="Post Code" 
                                onChangeText={formik.handleChange('clientPostalCode')}
                            />
                        </View>
                        
                        <Input 
                            label="Country" 
                            onChangeText={formik.handleChange('clientCountry')}
                        />
                    </View>
                    
                    <View style={[t.mL5, t.mR5, t.mT5]}>
                        <DatePicker 
                            callback={(date) => formik.setFieldValue('invoiceDate', date)}
                        />
                    </View>

                    <View style={[t.mL5, t.mR5, t.mT5, {zIndex: 4}]}>
                        <Picker 
                            callback={(value) => {
                                formik.setFieldValue('invoiceType', value)
                            }}
                        />
                    </View>

                    <View style={[t.mL5, t.mR5, t.mT5]}>
                        <Input 
                            label="Project Description" 
                            onChangeText={formik.handleChange('projectDescription')}
                        />
                    </View>

                    
                    <ItemListInputs 
                        callback={(list) => {
                            formik.setFieldValue('itemList', list)
                        }}
                    />
                </View>
            </ScrollView>

            <View style={[t.pB4, t.pX4, t.bgWhite, t.flexRow, t.justifyEnd, t.itemsEnd]}>
                <Button
                    title="Save Draft"
                    onPress={() => {
                        formik.setFieldValue('status', 'draft')
                        formik.handleSubmit()
                    }}  
                    preset="secondary" 
                    style={[t.mR2]}               
                />

                <Button
                    title="Save & Send"
                    onPress={() => {
                        formik.setFieldValue('status', 'pending')
                        formik.handleSubmit()
                    }}  
                    preset="primary"                  
                />
            </View>
        </SafeAreaView>
    )
}

export default Create
