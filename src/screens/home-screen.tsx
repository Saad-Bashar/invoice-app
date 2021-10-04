import React from 'react'
import { View, Text, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux';
import { decrement, increment, selectCount } from '../redux/counterSlice';
import { useAppDispatch } from '../redux/store';

export default function Home() {
    const count = useSelector(selectCount) // getting the counter value
    const dispatch = useAppDispatch(); // will use dispatch to call actions
    return (
        <SafeAreaView>
            <Text>Counter Value = {count}</Text>
            <Button title="increment" onPress={() => dispatch(increment())}/>
            <Button title="decrement" onPress={() => dispatch(decrement())}/>
        </SafeAreaView>
    );
}
