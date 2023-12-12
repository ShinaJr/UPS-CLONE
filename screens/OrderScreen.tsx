import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useTailwind } from 'tailwind-rn'
import { CompositeNavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { TabStackParamList } from '../navigator/TabNavigator'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigator/RootNavigator'
import DeliveryCard from '../components/DeliveryCard'

//created a composite navigation prop to target the nested navigation to remove the header
export type OrdersScreenNavigationProp =
    CompositeNavigationProp<
        BottomTabNavigationProp<TabStackParamList, "Orders">,
        NativeStackNavigationProp<RootStackParamList>
    >
//created a modalscreen route prop
type OrderScreenRouteProp = RouteProp<RootStackParamList, "Order">;
const OrderScreen = () => {
    const tw = useTailwind();
    const navigation = useNavigation<OrdersScreenNavigationProp>();
    //access the props passed from the previous screen
    // const route = useRoute<OrderScreenRouteProp>();
    //destructuring the route 
    const { params: { order } } = useRoute<OrderScreenRouteProp>();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: order.trackingItems.customer.name,
            headerTitleAlign: "center",
            headerTintColor: "#eb6a7c",
            headerTitleStyle: { color: "#000" },
            headerBackTitle: "Deliveries",
        })
    }, [])
    return (
        <View style={tw("-mt-2")}>
            <DeliveryCard order={order} fullWidth />
        </View>
    )
}

export default OrderScreen