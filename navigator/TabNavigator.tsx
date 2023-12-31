import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import CustomersScreen from '../screens/CustomersScreen';
import OrdersScreen from '../screens/OrdersScreen';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed';

export type TabStackParamList = {
    Customers: undefined;
    Orders: undefined;

};
const Tab = createBottomTabNavigator<TabStackParamList>();

const TabNavigator = () => {
    //getting the navigation object to remove the header immediately the screen mounts
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarActiveTintColor: "#59c1cc",
            tabBarInactiveTintColor: "gray",
            tabBarIcon: ({ focused, color, size }) => {
                if (route.name === "Customers") {
                    return <Icon name="users" type="entypo" color={focused ? "#49c1cc" : "gray"} />
                } else if (route.name === "Orders") {
                    return <Icon name="box" type="entypo" color={focused ? "#eb6a7c" : "gray"} />

                }
            },
        })}>
            <Tab.Screen name="Customers" component={CustomersScreen} />
            <Tab.Screen name="Orders" component={OrdersScreen} />
        </Tab.Navigator>
    )
}

export default TabNavigator