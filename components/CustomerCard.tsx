import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { CSSProperties } from 'react'
import useCustomerOrders from '../hooks/useCustomerOrders';
import { useTailwind } from 'tailwind-rn';
import { useNavigation } from '@react-navigation/native';
import { CustomersScreenNavigationProp } from '../screens/CustomersScreen';
import { Card, Icon } from '@rneui/themed';

type Props = {
    userId: string;
    name: string;
    email: string;
};

const CustomerCard = ({ userId, name, email }: Props) => {
    //using the useCustomerOrders hook to pull in the  appropriate information based on the customers id
    const { loading, error, orders } = useCustomerOrders(userId)
    //using tailwind
    const tw = useTailwind()
    //using navigation prop
    const navigation = useNavigation<CustomersScreenNavigationProp>();
    return (
        <TouchableOpacity onPress={() => (orders.length === 0) ? null : navigation.navigate("myModal", { name: name, userId: userId })}>
            <Card containerStyle={[tw("p-5 rounded-lg"),]}>
                <View>
                    <View style={tw("flex-row justify-between")}>
                        <View>
                            <Text style={tw("text-2xl font-bold")}>{name}</Text>
                            <Text style={[tw("text-sm"), { color: "#59c1cc" }]}>ID: {userId}</Text>
                        </View>

                        <View style={tw("flex-row items-center justify-end")}>
                            <Text style={{ color: "#59c1cc" }}>{loading ? <ActivityIndicator size="small" color="#59c1cc" /> : `${orders.length}x`}</Text>
                            <Icon
                                style={tw("mb-5 ml-auto")}
                                name="box"
                                type="entypo"
                                color="#59c1cc"
                                size={50}
                            />
                        </View>
                    </View>
                </View>
                <Card.Divider />
                <Text>{email}</Text>
            </Card>
        </TouchableOpacity>
    );
};

export default CustomerCard;