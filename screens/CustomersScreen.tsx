import { StyleSheet, Text, TouchableOpacity, ScrollView, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useTailwind } from 'tailwind-rn';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabStackParamList } from '../navigator/TabNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigator/RootNavigator';
import { Image, Input } from '@rneui/themed';
import { ActivityIndicator } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_CUSTOMERS } from '../graphql/queries';
import CustomerCard from '../components/CustomerCard';


//create a composite navigation prop to target the nested navigation to remove the header
export type CustomersScreenNavigationProp =
  CompositeNavigationProp< 
    BottomTabNavigationProp<TabStackParamList, "Customers">,
    NativeStackNavigationProp<RootStackParamList>
  >

const CustomersScreen = () => {
  const tw = useTailwind();
  const navigation = useNavigation<CustomersScreenNavigationProp>();
  //using a uselayout effect hook to remove the header immediately the ui mounts
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])
  //creating a state to store the input when the text changes
  const [input, setInput] = useState<string>("")
  // console.log(input)

  //employ usequery from apollo to pull in the customer data from the getCustomerquery in graphql
  const { loading, error, data } = useQuery(GET_CUSTOMERS)
  if (loading) return <ActivityIndicator size="large" color="#59c1cc" style={{ flex: 1, justifyContent: "center" }} />
  if (error) return <View style={{ flex: 1, justifyContent: "center", }}><Text style={{ color: "red", fontSize: 15, justifyContent: "center", alignSelf: "center" }} >{`Couldn't load customers...`}</Text></View>

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: "#59c1cc" }}>
      <Image
        source={{ uri: "https://links.papareact.com/3jc" }}
        containerStyle={tw("w-full h-64")}
        PlaceholderContent={<ActivityIndicator size="large" color="#000" />}
      />
      <Input placeholder='Search by customer' value={input} onChangeText={setInput} containerStyle={tw("bg-white pt-5 pb-0 px-10")} />
      <View style={{ marginBottom: 70 }}>
      {data?.getCustomers?.filter((customer: CustomerList) => customer.value.name.toLowerCase().includes(input) || customer.value.name.toUpperCase().includes(input)).map(({ value: { email, name }, name: ID }: CustomerResponse) => (
        <CustomerCard key={ID} email={email} name={name} userId={ID} />
      ))}
      </View>
    </ScrollView>

  )
}

export default CustomersScreen;
