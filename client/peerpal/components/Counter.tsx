import React, { useEffect, useState } from "react";
import { Web3Button, useContract, useContractWrite,useContractRead } from "@thirdweb-dev/react-native";
import { StyleSheet,Text,SafeAreaView , View,Button } from "react-native";

const Counter =()=>{
    

    const [check, setCheck]= useState<String>("hello");
    const [num, setNumber]= useState(0);
   // const ContractAddress = "0x05198c2783d3497361ca936a70E5643287dfD0B8"
    const { contract } = useContract("0x05198c2783d3497361ca936a70E5643287dfD0B8");
    const { mutateAsync: increment, isLoading } = useContractWrite(contract, "increment");
    const { data, isLoading:isit } = useContractRead(contract, "number")
    const call = async () => {

        try{
          increment

        }catch(error){
            console.log("error");
        }
    }
   
    const handleButtonClick =async () => {
        // Add your logic or function calls here
        try{
await increment({});
        }catch(error){
            console.log('Button pressed!',error);
        }
       
      };

    function alert(arg0: string) {
        throw new Error("Function not implemented.");
    }
useEffect(()=>{
    setNumber(data);
},[num])
    return(
       <SafeAreaView style={styles.container}>
 <View style={styles.buttonView}>
    <Button title="Increment" onPress={handleButtonClick}/>
    <Text>{num}</Text>
{/* <Web3Button contractAddress={ContractAddress} action={async (contract)=> await  contract?.call('increment')}>
            ADD
            

        </Web3Button> */}

 </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container:{
        
        
        justifyContent:"flex-start",
        alignItems: "center"

       
    },
    buttonView:{
       
        paddingTop: 8


        
    },
    textColor:{
        color:"green",
        fontSize: 24
    }

})

export default Counter;