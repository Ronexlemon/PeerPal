import React from "react";
import { View,StyleSheet } from "react-native";

import { ConnectWallet } from "@thirdweb-dev/react-native";

export default function Connect()  {
  return (
    <View style={styles.container}>
      <ConnectWallet modalTitle="Start" />
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        backgroundColor: "black",
        width:"30%"

    }
})

