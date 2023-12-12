import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_ORDERS } from '../graphql/queries'

const useOrders = () => {
    const { loading, error, data } = useQuery(GET_ORDERS);
    const [orders, setOrders] = useState<Order[]>([]);

    //creating a useEffect to get the data from the graphql query backend after it renders
    useEffect(() => {
        if (!data) return;
        //so if there's data create a new orders object
        const orders: Order[] = data.getOrders.map(({ value }: OrderResponse) => ({
            Address: value.Address,
            City: value.City,
            Lat: value.Lat,
            Lng: value.Lng,
            carrier: value.carrier,
            createdAt: value.createdAt,
            shippingCost: value.shippingCost,
            trackingId: value.trackingId,
            trackingItems: value.trackingItems,
        }));
        setOrders(orders);
    }, [data]);
// since it's a custom hook we'll not be returning jsx but rather be returning the loading state, error and orders
    return {loading, error, orders};
}

export default useOrders