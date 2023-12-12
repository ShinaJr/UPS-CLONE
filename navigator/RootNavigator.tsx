import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import ModalScreen from '../screens/ModalScreen';
import OrderScreen from '../screens/OrderScreen';

//creating a type definition for the rootstack 
export type RootStackParamList = {
    main: undefined,
    myModal: { userId: string, name: string },
    Order: { order: Order};
}
const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
    return (
        <RootStack.Navigator>
            <RootStack.Group>
                <RootStack.Screen name="main" component={TabNavigator} />
            </RootStack.Group>
            <RootStack.Group screenOptions={{ presentation: "modal", animation: 'slide_from_bottom' }}>
                <RootStack.Screen options={{ headerShown: false }} name="myModal" component={ModalScreen} />
            </RootStack.Group>
            <RootStack.Group>
                <RootStack.Screen name="Order" component={OrderScreen} />
            </RootStack.Group>
        </RootStack.Navigator>
    )
}

export default RootNavigator;