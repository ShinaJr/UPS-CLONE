import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GET_ORDERS } from '../graphql/queries'


const useCustomerOrders = (userId: string) => {
    const { loading, error, data } = useQuery(GET_ORDERS)
    const [orders, setOrders] = useState<Order[]>([])

    useEffect(() => {
        if (!data) return;
        //so if there's data, we then create a new orders object with type Order []
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
        //filtered our orders based on the customer id
        const customerOrders = orders.filter(order => order.trackingItems.customer_id === userId);
        //now we set the orders to the customerOrders
        setOrders(customerOrders);
    }, [data, userId]);

    return { loading, error, orders };

}
export default useCustomerOrders