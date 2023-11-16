import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';

//creating a type definition for the rootstack 
export type RootStackParamList = {
    main: undefined,
    MyModal: { userId: string, name: string },
    Order: any,
}
const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
    return (
        <RootStack.Navigator>
            <RootStack.Group>
                <RootStack.Screen name="main" component={TabNavigator} />
            </RootStack.Group>
        </RootStack.Navigator>
    )
}

export default RootNavigator;