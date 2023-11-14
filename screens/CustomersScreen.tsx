import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useTailwind } from 'tailwind-rn';

const CustomersScreen = () => {
  const tw = useTailwind();
  return (
    <SafeAreaView style={tw("mt-10")}>
      <Text style={tw("text-blue-600")}>Customers Screen</Text>
    </SafeAreaView>

  )
}

export default CustomersScreen;
