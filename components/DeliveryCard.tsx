import { View, Text } from 'react-native'
import React from 'react'
import { useTailwind } from 'tailwind-rn'
import { Card, Divider, Icon } from '@rneui/themed'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'

//creating a type definition for the props that'll be used in this component
type Props = {
    order: Order,
    fullWidth?: boolean //this is a type of an optional boolean
}


const DeliveryCard = ({ order, fullWidth }: Props) => {
    const tw = useTailwind();
    return (
        <Card containerStyle={[
            tw(`${fullWidth ? "rounded-none m-0" : "rounded-lg"} my-2`),
            {
                backgroundColor: fullWidth ? "#eb6a7c" : "#59c1cc",
                padding: 0,
                paddingTop: 16,
                shadowColor: "black",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
            }]}>
            <View style={fullWidth && { height: "100%" }}>
                <Icon name="box" type="entypo" size={50} color="#fff" />
                <View>
                    <Text style={tw("text-xs  text-center uppercase  text-white font-bold")}>{order.carrier} - {order.trackingId}</Text>
                    <Text style={tw("text-center text-lg  text-white font-bold")}>Expected Delivery: {new Date(order.createdAt).toLocaleDateString()}</Text>
                    <Divider color='white' />
                    <View style={tw("mx-auto pb-5")}>
                        <Text style={tw("text-center text-base text-white font-bold mt-5")}>Address</Text>
                        <Text style={tw("text-center text-sm text-white")}>{order.Address}, {order.City}</Text>
                        <Text style={tw("text-center text-sm text-white italic")}>Shipping Cost: ${order.shippingCost}</Text>
                    </View>
                </View> 

                <Divider color="white" />
                <View style={tw("p-5")}>
                    {/* //now looping through the order items to get each items */}
                    {order.trackingItems.items.map(item => (
                        <View>
                            <View key={item.item_id} style={tw("flex-row  justify-between items-center")}>
                                <Text style={tw("text-sm text-white italic")}>{item.name}</Text>
                                <Text style={tw("text-xl text-white")}>x {item.quantity}</Text>
                            </View>
                        </View>
                    ))}
                </View>
                <MapView initialRegion={{
                    latitude: order.Lat,
                    longitude: order.Lng,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }}
                    style={[tw("w-full"), {flexGrow:1}, !fullWidth && { height: 200 }]}
                    provider={PROVIDER_GOOGLE}
                    mapType="mutedStandard"
                >
                    {order.Lat && order.Lng && (
                        <Marker coordinate={{
                            latitude: order.Lat,
                            longitude: order.Lng,
                        }}
                            title="Delivery Location"
                            description={order.Address}
                            identifier='destination'
                            pinColor='red'
                        />
                    )}

                </MapView>
            </View>
        </Card>
    )
}

export default DeliveryCard