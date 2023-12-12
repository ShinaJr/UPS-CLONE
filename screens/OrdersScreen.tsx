import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useTailwind } from 'tailwind-rn';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabStackParamList } from '../navigator/TabNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigator/RootNavigator';
import useOrders from '../hooks/useOrders';
import { Button, Image } from '@rneui/themed';
import OrderCard from '../components/OrderCard';

//create a composite navigation prop to target the nested navigation to remove the header
export type OrdersScreenNavigationProp =
    CompositeNavigationProp<
        BottomTabNavigationProp<TabStackParamList, "Orders">,
        NativeStackNavigationProp<RootStackParamList>
    >

const OrdersScreen = () => {
    //getting the navigation
    const navigation = useNavigation<OrdersScreenNavigationProp>();
    const tw = useTailwind();
    //pulling in our useOrders custom hook
    const { loading, error, orders } = useOrders()
    //needing a boolean toggle for our state using a useState hook
    const [ascending, setAscending] = useState<boolean>(false)
    //removing the header and changing the color of the tab Orders using a useLayout Effect
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            tabBarLabel: ({ focused, color }) => (
                <Text style={{ color: focused ? "#EB6A7C" : color, fontSize: 10 }}>orders</Text>
            )
        });
    }, []);
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: "#EB6A7C", }}>
            <Image
                source={{ uri: "https://Links.papareact.com/m51" }}
                containerStyle={tw("w-full h-64")}
                PlaceholderContent={<ActivityIndicator size="large" color="#000" />}
            />
            <View>
                <Button
                    color={"pink"}
                    titleStyle={{ color: "gray", fontWeight: "400" }}
                    style={tw("py-2 px-5")}
                    onPress={() => setAscending(!ascending)}
                >
                    {ascending ? `Showing: Oldest First` : `Showing: Most Recent First`}
                </Button>
                {/* pylling in data from the orders and applying a sorting logic */}
                <View style={{ marginBottom: 70 }}>
                    {orders?.sort((a, b) => {
                        if (ascending) {
                            return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
                        } else {
                            return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1;
                        }
                    }).map(order => (
                        <OrderCard key={order.trackingId} item={order} />
                    ))
                    }
                </View>
            </View>
        </ScrollView>

    )
}

export default OrdersScreen