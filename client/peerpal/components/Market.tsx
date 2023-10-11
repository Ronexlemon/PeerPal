import React,{useState,useEffect} from "react"
import { StyleSheet,SafeAreaView,View,Text,Image, Button,TouchableOpacity,Pressable,TextInput,ScrollView, Alert,ActivityIndicator } from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import DatePicker from 'react-native-datepicker';
import DatePicker from 'react-native-date-picker'


import DropDownPicker from "react-native-dropdown-picker";
import { Transaction, useContract,useContractRead,useContractWrite } from "@thirdweb-dev/react-native";

import { PeerPalAddress,ghoerc20 } from "./Address/address";
import { ethers } from "ethers";

import PeerPalAbi from "../components/Abi/PeerPal.json"
import { peerabi } from "./Abi/peerabi";
import { erc20abi } from "./Abi/peerabi";
import { hexValue } from "ethers/lib/utils";

export default function MarketPage({navigation}:any){
  const [loading,setLoadingActivity] = useState<boolean>(false);
    const [open,setOpen] = useState<boolean>(false);
    const [openDrop,setOpenDrop] = useState<boolean>(false);
    const [approve,setAppove] = useState<boolean>(false);

    const [selectedOption, setSelectedOption] = useState<any>('ETH');
    const [selectedOptionLoan, setSelectedOptionLoan] = useState<any>('GHO');
    
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpenLoan, setIsDropdownOpenLoan] = useState(false);

  const [collateralvalue,setCollateralValue] = useState<any>();
  const [loanValue,setLoanValue] = useState<any>();
  const [interestValue,setInterestValue] = useState<any>();

  const [date, setDate] = useState(new Date());
  const [duration, setDuration] = useState<any>();
  const [opendate, setOpenDate] = useState(false)

  const [requests,setRequests] = useState<any>([]);

  const [loanIndex,setLoanIndex] = useState<any>();

  const [ethvalue,setEthValue] = useState<any>();

  const [lendopen,setLendOpen] = useState<boolean>(true);

    const data:any =[{"loan":12,"collateral":13,"Interest":3,"days":60,"status":"request"},{"loan":12,"collateral":13,"Interest":3,"days":60,"status":"request"},
{"loan":12,"collateral":13,"Interest":3,"days":60,"status":"request"},{"loan":12,"collateral":13,"Interest":3,"days":60,"status":"request"}]
const handleOptionChange = (option: any) => {
  setSelectedOption(option);
};
const handleOptionChangeLoan = (option: any) => {
  setSelectedOptionLoan(option);
};

const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'}
  ]);
  const ETHPriceFeed = "0x59F1ec1f10bD7eD9B938431086bC1D9e233ECf41";
  const ETHAddress = "0x914d7fec6aac8cd542e72bca78b30650d45643d7";

  const LinkPriceFeed = "0xFadA8b0737D4A3AE7118918B7E69E689034c0127" //"0xaC3E04999aEfE44D508cB3f9B972b0Ecd07c1efb";
  const LinkToken= "0xD9692f1748aFEe00FACE2da35242417dd05a8615"// "0x7273ebbB21F8D8AcF2bC12E71a08937712E9E40c";
//gho contract
const { contract:conterc20 } = useContract(ghoerc20,erc20abi);
const {mutateAsync:ApproveToken,isSuccess:approveSuccess} = useContractWrite(conterc20,"approve");
const approvegho = async ()=>{
  try{
const data = await ApproveToken({ args: [PeerPalAddress, ethers.utils.parseEther(collateralvalue)] });
setAppove(true);
  }catch(error){
    console.log("error for approve",error);
    console.info("contract Approve successs", data);
  }

} 

  //functions
  const { contract } = useContract(PeerPalAddress,peerabi);
  const { mutateAsync: allowCollateralToken, isLoading } = useContractWrite(contract, "allowCollateralToken")

  const call = async () => {
    try {
      const data = await allowCollateralToken({ args: [LinkToken, LinkPriceFeed] });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  }
  //allowToken

  const { mutateAsync: allowToken, isLoading:Loading } = useContractWrite(contract, "allowToken")

  const callAllowToken = async () => {
    try {
      const data = await allowToken({ args: [ETHAddress,ETHPriceFeed] });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  }
  const handleApprove =async()=>{
    //await call();
   //await callAllowToken();
   await approvegho();
   setLoadingActivity(true)
   setTimeout(() => {
    setAppove(true);
    setLoadingActivity(false); // You can remove this line if it's not needed
  }, 1000); //
   
   

 }
//conversion toseconds 
const convertToSeconds = (timeValue:any) => {
  const selectedTime:any = new Date(timeValue); // Create a Date object from the selected time
  const currentTime:any = new Date(); // Create a Date object for the current time

  const differenceInSeconds = Math.floor((selectedTime - currentTime) / 1000); // Calculate the difference in seconds

  return differenceInSeconds;
};

//create request
const { mutateAsync: createRequest, isLoading:requestloading } = useContractWrite(contract, "createRequest")
const createRequests = async () => {
  try {
    const data = await createRequest({ args: [duration,ethers.utils.parseEther(loanValue),ethers.utils.parseEther(collateralvalue), ETHAddress, LinkToken,ethers.utils.parseEther(interestValue)] });
    console.info("contract call successs", data);
  } catch (err) {
    console.error("contract call failure", err);
  }
}

const handlecreaterequest = async ()=>{
  try{
    if(duration !=null && loanValue !=null && interestValue !=null && collateralvalue !=null ){
      await createRequests();
    }else{
      Alert.alert("please input all")
    }

  }catch(error){
    console.log("the error to create request is", error);
  }
}

//getAll requests
const { data:getAllRequest, isLoading:getrequestData } = useContractRead(contract, "getAllRequest");

// const handleDurationChange = (event) => {
//   const timeValue = event.target.value;
//   const seconds = convertToSeconds(timeValue);

//   setDuration(parseInt(seconds)); // Convert the duration to an integer and update the state
// };  

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

//lending token

const { mutateAsync: lendToken, isLoading:istokenLended } = useContractWrite(contract, "lend")

  const lendtoken = async () => {
    
    try {
      const data = await lendToken( {  args: [loanIndex],overrides:{value: ethvalue}});
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  }
  const handleLendConfirm =async ()=>{
    try{
      
      if( loanIndex !=null){
        await lendtoken();
        Alert.alert("Successful");
      }else{
        Alert.alert("please try again");
      }
      
  
    }catch(error){
      console.log("Error to lend token",error);
    }
  }
const handleLend = async(_index:any,_ethvalue:any)=>{
   setLoanIndex(_index);
   setEthValue(_ethvalue);
   setLendOpen(false);
  
}
useEffect(()=>{
  if(approveSuccess){
    //setLoadingActivity(false);
    console.log("success",approveSuccess);
  }
},[approveSuccess])
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
           
           <TouchableOpacity style={styles.createRequest}  
        onPress={() => setOpen(!open)}>
         
            <Text>Create Request</Text>
            

           </TouchableOpacity>

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
                {getAllRequest?.map((item:any, index:any) => (
        <View key={index} style={styles.item}>
            <View style={styles.cardHeader}>
        <Text style={styles.headerText}>Loan Details</Text>
      </View>
      <View style={styles.cardContent}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Loan ETH:</Text>
          <Text style={styles.detailValue}>{Number(item.tokenAmountToBorrow)/10**18}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Collateral GHO:</Text>
          <Text style={styles.detailValue}>{Number(item.collateralAmount)/10**18}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Interest ETH:</Text>
          <Text style={styles.detailValue}>{Number(item.interest)/10**18}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Deadline:</Text>
          <Text style={styles.detailValue}>{convertSecondsToDHMS( Number(item.duration)-currentTimeInSeconds()).days} days {convertSecondsToDHMS( Number(item.duration)-currentTimeInSeconds()).hours} hrs {convertSecondsToDHMS( Number(item.duration)-currentTimeInSeconds()).minutes} min </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Status:</Text>
          <Text style={[styles.detailValue, { color: item.lended ? 'red' : 'green' }]}>{item.lended?<Text>Close</Text>:<Text>Open</Text>} </Text>
        </View>
      </View>
      {lendopen?<TouchableOpacity style={styles.lendButton} onPress={()=>{handleLend(index,item.tokenAmountToBorrow)}}>
        <Text style={styles.buttonText}>Lend</Text>
      </TouchableOpacity>:<TouchableOpacity style={styles.lendButton} onPress={handleLendConfirm}>
        <Text style={styles.buttonTextConfrim}>Confirm</Text>
      </TouchableOpacity>}
      
    </View>
      ))}
                </ScrollView>
                
           
{/* Open Card */}
{open && (
        <View style={styles.openCard}>
          <View style={styles.itemCardViews}>
            <Text style={{color:"black"}}>Collateral</Text>
            <DropDownPicker
            open={isDropdownOpen}
            value={selectedOption}
            items={[
              { label: "GHO", value: "GHO" },
              { label: "LINK", value: "LINK" },
            ]}
            setOpen={setIsDropdownOpen}
            setValue={handleOptionChange}
            setItems={() => {}}
            containerStyle={{ maxHeight: 120 }} // Set a max height for dropdown options
          />
          <TextInput
      style={styles.textInput}
      placeholder="10 GHO"
      placeholderTextColor="green"
      onChangeText={setCollateralValue}
      value={collateralvalue}
      
      
      
    />
     <Text style={{color:"black"}}>Loan</Text>
            <DropDownPicker
            open={isDropdownOpenLoan}
            value={selectedOptionLoan}
            items={[
              { label: "ETH", value: "ETH" },
              { label: "USDC", value: "USDC" },
            ]}
            setOpen={setIsDropdownOpenLoan}
            setValue={handleOptionChangeLoan}
            setItems={() => {}}
            containerStyle={{ maxHeight: 120 }} // Set a max height for dropdown options
          />
           <TextInput
      style={styles.textInput}
      placeholder="0.001 ETH"
      placeholderTextColor="green"
      onChangeText={setLoanValue}
      value={loanValue}
      
      
    />
    <Text style={{color:"black"}}>Interest</Text>
     <TextInput
      style={styles.textInput}
      placeholder="0.01 ETH"
      placeholderTextColor="green"
      onChangeText={setInterestValue}
      value={interestValue}
      
      
    />
    <Button color="red" title="Duration" onPress={() => setOpenDate(true)} />
    <DatePicker
        modal
        open={opendate}
        date={date}
        onConfirm={(date:any) => {
          setOpenDate(false)
          const timeinsec = convertToSeconds(date);
          setDuration(timeinsec);
          setDate(date)
        }}
        onCancel={() => {
          setOpenDate(false)
        }}
      />
    
              <View  style={styles.confirmButtons}>
                <Button color="red" title="Close" onPress={() => setOpen(false)} />
                {approve?<Button color="green" title="Confirm" onPress={handlecreaterequest} />:<Button  title="Approve" onPress={handleApprove} />}
                 
                
              </View>
          
    
          </View>
         

        </View>
      )}
{loading ? (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color="green" />
          <Text>Waiting ...</Text>
        </View>
      ) : null}

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
  buttonTextConfrim: {
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
    gap:20
    

      },
    text:{
        color:"black",
        fontSize:30,
        marginTop:"20%"

    },
    createRequest:{
        
        color:"white",
        width:"100%",
        marginTop:"30%",
        justifyContent:"flex-end",
        alignContent:"flex-end",
        flexDirection:"row",
        marginRight:"3%"

    },
    datePickerStyle: {
      width: 200,
      marginTop: 20,
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