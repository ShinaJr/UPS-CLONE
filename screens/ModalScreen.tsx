import { View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'
import { Icon } from '@rneui/themed'
import { useTailwind } from 'tailwind-rn'
import { CompositeNavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabStackParamList } from '../navigator/TabNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigator/RootNavigator';
import useCustomerOrders from '../hooks/useCustomerOrders';
import { FlatList } from 'react-native';
import DeliveryCard from '../components/DeliveryCard';

//creating a composite navigation prop for the modal screen bavigation
type ModalScreenNavigationProp =
    CompositeNavigationProp<
        BottomTabNavigationProp<TabStackParamList>,
        NativeStackNavigationProp<RootStackParamList, "myModal">
    >;
//create a modalscreen route prop
type ModalScreenRouteProp = RouteProp<RootStackParamList, "myModal">;

const ModalScreen = () => {
    const tw = useTailwind();
    const navigation = useNavigation<ModalScreenNavigationProp>();
    //access the props passed from the previous screen
    // const route = useRoute<ModalScreenRouteProp>();
    //destructuring the route 
    const { params: { name, userId } } = useRoute<ModalScreenRouteProp>();
    //pulling in the information using the useCustomerOrders hook based on the userId
    const { loading, error, orders } = useCustomerOrders(userId)
    return (
        <SafeAreaView>
            <View>
                <TouchableOpacity onPress={() => navigation.goBack()} style={tw("absolute right-5 top-5 z-10")}>
                    <Icon name="closecircle" type='antdesign' />
                </TouchableOpacity>
                <View style={{ marginTop: 10 }}>
                    <View style={[tw("py-5 border-b"), { borderColor: "#59c1cc" }]}>
                        <Text style={[tw("text-center text-xl font-bold"), { color: "#59c1cc" }]}>{name}</Text>
                        <Text style={tw("text-center italic text-sm")}>deliveries</Text>
                    </View>
                </View>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 200 }}
                    data={orders}
                    keyExtractor={(order) => order.trackingId}
                    renderItem={({ item: order }) => <DeliveryCard order={order} />}
                />

            </View>
        </SafeAreaView>
    )
}

export default ModalScreen