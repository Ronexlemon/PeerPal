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
        <Text style={styles.text}>One for All, All for One</Text>
        <View style={styles.buttonstart}>
          {account ? (
            <View style={styles.buttonConnect}><View style={styles.button}><Button  title="START" onPress={() => navigation.navigate("Market")} /></View>
            <Connect/>
            </View>
            
            
          ) : (<View >
            {showConnect && <Button  title="Connect"  onPress={handleConnectPress} />}
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
        marginTop:"20%"

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
        height:"50%",
        
        justifyContent:"space-around"
    },
    button:{
        height:40,

    }

})