import React,{useState} from "react"
import { StyleSheet,SafeAreaView,View,Text,Image, Button,TouchableOpacity,Pressable,TextInput,ScrollView } from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DropDownPicker from "react-native-dropdown-picker";
import { useContract,useContractRead,useContractWrite } from "@thirdweb-dev/react-native";

import { PeerPalAddress,ghoerc20 } from "./Address/address";
import { ethers } from "ethers";

import PeerPalAbi from "../components/Abi/PeerPal.json"
import { peerabi } from "./Abi/peerabi";
import { erc20abi } from "./Abi/peerabi";

export default function MarketPage({navigation}:any){
    const [open,setOpen] = useState<boolean>(false);
    const [openDrop,setOpenDrop] = useState<boolean>(false);
    const [approve,setAppove] = useState<boolean>(false);

    const [selectedOption, setSelectedOption] = useState<any>('ETH');
    const [selectedOptionLoan, setSelectedOptionLoan] = useState<any>('GHO');
    
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpenLoan, setIsDropdownOpenLoan] = useState(false);

  const [collateralvalue,setCollateralValue] = useState<any>();
  const [loanValue,setLoanValue] = useState<any>();


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
const {mutateAsync:ApproveToken} = useContractWrite(conterc20,"approve");
const approvegho = async ()=>{
  try{
const data = await ApproveToken({ args: [PeerPalAddress, ethers.utils.parseEther("1")] });
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
 
   setAppove(true);
 }

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
                {data.map((item:any, index:any) => (
        <View key={index} style={styles.item}>
            <View style={styles.cardHeader}>
        <Text style={styles.headerText}>Loan Details</Text>
      </View>
      <View style={styles.cardContent}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Loan ETH:</Text>
          <Text style={styles.detailValue}>{item.loan}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Collateral GHO:</Text>
          <Text style={styles.detailValue}>{item.collateral}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Interest GHO:</Text>
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
        <Text style={styles.buttonText}>Lend</Text>
      </TouchableOpacity>
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
              { label: "ETH", value: "ETH" },
              { label: "GHO", value: "GHO" },
            ]}
            setOpen={setIsDropdownOpen}
            setValue={handleOptionChange}
            setItems={() => {}}
            containerStyle={{ maxHeight: 120 }} // Set a max height for dropdown options
          />
          <TextInput
      style={styles.textInput}
      placeholder="0.004 ETH"
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
              { label: "GHO", value: "GHO" },
            ]}
            setOpen={setIsDropdownOpenLoan}
            setValue={handleOptionChangeLoan}
            setItems={() => {}}
            containerStyle={{ maxHeight: 120 }} // Set a max height for dropdown options
          />
           <TextInput
      style={styles.textInput}
      placeholder="4 GHO"
      placeholderTextColor="green"
      onChangeText={setLoanValue}
      value={loanValue}
      
      
    />
    
              <View  style={styles.confirmButtons}>
                <Button color="red" title="Close" onPress={() => setOpen(false)} />
                {approve?<Button color="green" title="Confirm" onPress={() => setOpen(false)} />:<Button  title="Approve" onPress={handleApprove} />}
                 
                
              </View>
          
    
          </View>
         

        </View>
      )}

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
    createRequest:{
        
        color:"white",
        width:"100%",
        marginTop:"30%",
        justifyContent:"flex-end",
        alignContent:"flex-end",
        flexDirection:"row",
        marginRight:"3%"

    }

})