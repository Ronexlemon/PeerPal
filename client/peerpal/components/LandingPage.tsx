import React from "react"
import { StyleSheet,SafeAreaView,View,Text,Image, Button, TouchableOpacity } from "react-native"
import Connect from "./ConnectWallet"
import { useState } from "react"
import { Account } from "@thirdweb-dev/react-native"

export default function LandingPage({navigation}:any){
const [account,setAccount] = useState<boolean>(false);
const [showConnect, setShowConnect] = useState<boolean>(true);

  const handleConnectPress = () => {
    // Toggle the visibility of the Connect component
    setShowConnect(false);
    setAccount(true);
    
  };

    return(
        <View style={styles.container}>
        <Image source={require("../assests/logo.png")} style={styles.imagelogo} />
        <Text style={styles.text}>Your Assets, Your Control</Text>
        <View style={styles.buttonstart}>
          {account ? (
            <View style={styles.buttonConnect}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Market")}
            >
              <Text style={styles.buttonText}>START</Text>
            </TouchableOpacity>
            <View style={styles.button}>
              <Connect />
            </View>
          </View>
            
            
          ) : (<View >
            {showConnect && <TouchableOpacity    onPress={handleConnectPress} ><Text style={styles.buttonText}>LAUNCH</Text></TouchableOpacity>}
            </View>
            
            
          )}
        </View>
        
      </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#0883B8",
        flex:1,
         alignItems:"center",
         width:"100%"

    },
    imagelogo:{
        
        marginTop:"30%"
    },
    text:{
        color:"black",
        fontSize:30,
        marginTop:"20%",
        fontFamily:"cochin",
        fontStyle: "italic", // Use fontStyle to set the text to italic
  fontWeight: "bold" 

    },
    buttonstart:{
        backgroundColor: "#0883B8",
        color:"White",
        width:"100%",
        marginTop:"30%",
        flexDirection:"row",
        justifyContent:"space-around"
        
       

    },
    buttonConnect:{
        flexDirection:"row",
        width:"100%",
        height:"60%",
        
        justifyContent:"space-around"
    },
    button:{
        height:40,

    },
   
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },

})