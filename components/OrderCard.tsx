import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native';
import { Card, Icon } from '@rneui/themed';
import { useTailwind } from 'tailwind-rn';
import { useNavigation } from '@react-navigation/native';
import { OrdersScreenNavigationProp } from '../screens/OrdersScreen';
import { ActivityIndicator } from 'react-native';

type Props = {
    item: Order;
}
const OrderCard = ({ item }: Props) => {
    const tw = useTailwind();
    //using navigation prop
    const navigation = useNavigation<OrdersScreenNavigationProp>();

    return (
        <TouchableOpacity onPress={() => navigation.navigate("Order", { order: item })}>
            <Card containerStyle={tw("px-5 rounded-lg")}>
                <View style={tw("flex-row justify-between items-center")}>
                    <View>
                        <Icon
                            name='truck-delivery'
                            color={"#eb6a7c"}
                            type='material-community'
                        />
                        <Text style={{ fontSize: 10 }}>{new Date(item.createdAt).toDateString()}</Text>
                    </View>
                    <View>
                        <Text style={[tw("text-gray-400"), { fontSize: 10 }]}>{item.carrier} - {item.trackingId}</Text>
                        <Text style={tw("text-gray-500 text-xl")}>{item.trackingItems.customer.name}</Text>
                    </View>
                    <View style={tw("flex-row items-center")}>
                        <Text style={[tw("text-sm"), { color: "#eb6a7c" }]}>{item.trackingItems.items.length}x</Text>
                        <Icon
                            name='box'
                            style={tw("ml-2")}
                            type='feather' />
                    </View>
                </View>
            </Card>
        </TouchableOpacity>
    )
}

export default OrderCard