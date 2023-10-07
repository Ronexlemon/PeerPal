import React,{useState} from "react"
import { StyleSheet,SafeAreaView,View,Text,Image, Button,TouchableOpacity,Pressable,TextInput,ScrollView } from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DropDownPicker from "react-native-dropdown-picker";



export default function PayoutPage({navigation}:any){
    

    const data:any =[{"loan":12,"collateral":13,"Interest":3,"days":60,"status":"request"},{"loan":12,"collateral":13,"Interest":3,"days":60,"status":"request"},
{"loan":12,"collateral":13,"Interest":3,"days":60,"status":"request"},{"loan":12,"collateral":13,"Interest":3,"days":60,"status":"request"}]



    return(
        <View style={styles.container}>
           
            <View style={styles.topNav}>
                <View style={styles.topNavLeft}>
                <TouchableOpacity onPress={()=>navigation.navigate("Home")}><Text>Home</Text></TouchableOpacity>

                </View>
                <View style={styles.topNavRight}>
                
                <TouchableOpacity onPress={()=>navigation.navigate("Market")}><Text>Market</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate("Liquidate")}><Text>Liquidate</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate("Payout")}><Text>Payout</Text></TouchableOpacity>
                </View>
          
            </View>
           
           

           {/* <View style={styles.Items}>
                
                <Text>Loan</Text>
            <Text>Collateral</Text>
            <Text>Interest</Text>
            <Text>Term</Text>
            <Text>Status</Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
           
           
                </View> */}
                <ScrollView  style={styles.scrollview}>
                {data.map((item:any, index:any) => (
        <View key={index} style={styles.item}>
            <View style={styles.cardHeader}>
        <Text style={styles.headerText}>Loan Details</Text>
      </View>
      <View style={styles.cardContent}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Loan Base:</Text>
          <Text style={styles.detailValue}>{item.loan}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Collateral Link:</Text>
          <Text style={styles.detailValue}>{item.collateral}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Interest Link:</Text>
          <Text style={styles.detailValue}>{item.Interest}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Deadline:</Text>
          <Text style={styles.detailValue}>{item.days} days</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Status:</Text>
          <Text style={[styles.detailValue, { color: item.status === 'Approved' ? 'green' : 'red' }]}>{item.status}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.lendButton}>
        <Text style={styles.buttonText}>Repay</Text>
      </TouchableOpacity>
    </View>
      ))}
                </ScrollView>
                
           


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
    scrollview:{
        width:"100%",
        
        


    },
    card:{
        color:"orange"

    },
    topNav:{
        flexDirection: 'row',
        justifyContent:"space-evenly",
        marginTop:"2%",

    },
    topNavRight:{
        flexDirection: 'row',
        justifyContent:"space-evenly",
        marginTop:"2%",
        marginLeft:"1%",
        width:"80%"

    },
    topNavLeft:{
        flexDirection: 'row',
        justifyContent:"space-evenly",
        marginTop:"2%",
        marginRight:"5%"
        

    },
  
  cardHeader: {
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    paddingBottom: 10,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  cardContent: {},
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  textInput: {
    borderWidth: 1, // Add a border
    borderColor: "black", // Set border color to black
    padding: 10, // Add padding
    width:"100%",
    color:"green"
    
  },
  detailLabel: {
    color: 'gray',
    fontSize: 16,
  },
  detailValue: { 
    fontSize: 16,
    color:"black"
  },
  lendButton: {
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
    cardItems:{
        flexDirection: 'row',
        justifyContent:"space-evenly",
        marginTop:"2%",

    },
    Items:{
        flexDirection: 'row',
        justifyContent:"space-evenly",
        marginTop:"2%",
        
        width:"100%",
        borderBottomWidth:1,
        

    },
    ItemsTokens:{
        flexDirection: 'row',
        justifyContent:"space-evenly",
        marginTop:"2%",
        
        width:"100%",
        borderBottomWidth:1

    },
    openCard: {
        backgroundColor: "white",
        justifyContent:"center",
        padding: 20,
        marginTop:"50%",
        borderRadius: 10,
        elevation: 3,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        width:"100%",
        height:"70%",
        position: "absolute"

      },
      confirmButtons:{
        flexDirection: "row",
        justifyContent:"space-between",
        width:"100%"

      },
    item: {
    //     flexDirection: 'column', // Arrange items horizontally
    //     // justifyContent: 'space-evenly', // Space between items
    //    backgroundColor:"white",
    //    color:"black",
    //     borderBottomWidth: 1,
    //     borderColor: 'gray',
    //     width: '95%', // Adjust the width as needed
    //     height:"30%",
    //     margin: 10,
    //     marginRight:20,

    //     borderRadius:10,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    elevation: 5,


      },
      itemCardViews:{
        // flexDirection:"row",
        // width:"100%",
        // justifyContent:"space-between",
        // paddingLeft:20,
        // paddingRight:20,
        flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    gap:84
    

      },
    text:{
        color:"black",
        fontSize:30,
        marginTop:"20%"

    },
   

})