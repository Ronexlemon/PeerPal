import React,{useState,useEffect} from "react"
import { StyleSheet,SafeAreaView,View,Text,Image, Button,TouchableOpacity,Pressable,TextInput,ScrollView,ActivityIndicator } from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DropDownPicker from "react-native-dropdown-picker";
import { peerabi } from "./Abi/peerabi";
import { erc20abi } from "./Abi/peerabi";
import { PeerPalAddress,ghoerc20 } from "./Address/address";
import { ethers } from "ethers";
import { Transaction, useContract,useContractRead,useContractWrite,useAddress } from "@thirdweb-dev/react-native";

import { Account } from "@thirdweb-dev/react-native";
import { useUser } from "@thirdweb-dev/react-native";





export default function LiquidatePage({navigation}:any){
  const [loanIndex,setLoanIndex] = useState<any>();
  const [userAddress,setUserAddress] = useState<any>();
  const [repayopen,setrepayopen] = useState<boolean>(false);

  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);


  const [loading,setLoadingActivity] = useState<boolean>(true);
  //functions
  const { contract } = useContract(PeerPalAddress,peerabi);
    
//userAddress
const { user, isLoggedIn, isLoading:userloading } = useUser();
const address = useAddress();
//getAlluserRequests
const add = "0x65E28C9C4Ef1a756d8df1c507b7A84eFcF606fd4"
const { data:userRequests, isLoading } = useContractRead(contract, "getMyRequest", [address]);


//conversion toseconds 
const convertToSeconds = (timeValue:any) => {
  const selectedTime:any = new Date(timeValue); // Create a Date object from the selected time
  const currentTime:any = new Date(); // Create a Date object for the current time

  const differenceInSeconds = Math.floor((selectedTime - currentTime) / 1000); // Calculate the difference in seconds

  return differenceInSeconds;
};

//convertSeconds to days
const currentTimeInSeconds = ()=>{
  const current_time_seconds = Math.floor(Date.now() / 1000);
  return current_time_seconds;
}

const convertSecondsToDHMS = (seconds:any) => {
const secondsInDay = 24 * 60 * 60;
const secondsInHour = 60 * 60;
const secondsInMinute = 60;

const days = Math.floor(seconds / secondsInDay);
seconds %= secondsInDay;

const hours = Math.floor(seconds / secondsInHour);
seconds %= secondsInHour;

const minutes = Math.floor(seconds / secondsInMinute);
seconds %= secondsInMinute;

return {
  days,
  hours,
  minutes,
  seconds
};
};

//get all
const { data:dashboardData, isLoading:dashboardload,isSuccess } = useContractRead(contract, "getAllDashBoard", [address])




const { mutateAsync: liquidate, isLoading:liquidateloading } = useContractWrite(contract, "liquidate")

  const liquidateLoan = async () => {
    try {
      const data = await liquidate({ args: [loanIndex] });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  }
const handlePayout = async()=>{
await liquidateLoan();
}
const handleRepaySetIndex =(index:any)=>{
  setLoanIndex(index);
  setrepayopen(true);

}
    const data:any =[{"loan":12,"collateral":13,"Interest":3,"days":60,"status":"request"},{"loan":12,"collateral":13,"Interest":3,"days":60,"status":"request"},
{"loan":12,"collateral":13,"Interest":3,"days":60,"status":"request"},{"loan":12,"collateral":13,"Interest":3,"days":60,"status":"request"}]

//cALL R
useEffect(()=>{
  setUserAddress(user?.address);
  console.log("user Address",address);
  if(isSuccess){
    setLoadingActivity(false);
  }


},[loading])
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
                {dashboardData?.map((item:any, index:any) => (
        <View key={index} style={styles.item}>
            
      <View style={styles.cardContent}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>borrower </Text>
          <Text style={styles.detailValue}>{(item.borrower).substring(0,8)}...{(item.borrower).substring(9,17)}</Text>
        </View>
        <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Loan ETH:</Text>
          <Text style={styles.detailValue}>{Number(item.tokenBorrowed)/10**18}</Text>
        </View>
        <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Collateral GHO:</Text>
          <Text style={styles.detailValue}>{Number(item.collateral)/10**18}</Text>
        </View>
        <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Interest GHO:</Text>
          <Text style={styles.detailValue}>{Number(item._profit)/10**18}</Text>
        </View>
       
      </View>
      {repayopen && selectedCardIndex === index? <TouchableOpacity style={styles.lendButton} onPress={handlePayout}>
        <Text style={styles.buttonTextGreen}>Confirm</Text>
      </TouchableOpacity>: <TouchableOpacity style={styles.lendButton} onPress={()=>{setSelectedCardIndex(index);handleRepaySetIndex(index)}}>
        <Text style={styles.buttonText}>Liquidate</Text>
      </TouchableOpacity>}
     
    </View>
      ))}
      {/* {loading ? (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color="green" />
          <Text>...</Text>
        </View>
      ) : null} */}
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
    backgroundColor: '#AED6F1',
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
  buttonTextGreen: {
    color: 'green',
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
    activityIndicatorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)', // Add a semi-transparent background
    },

   

})