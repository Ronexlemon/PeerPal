import {
  ConnectWallet,
  localWallet,
  metamaskWallet,
  rainbowWallet,
  ThirdwebProvider,
} from '@thirdweb-dev/react-native';
import React from 'react';
import {StyleSheet, Text, useColorScheme, View,SafeAreaView} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {TW_CLIENT_ID} from '@env';
import Counter from './components/Counter';
import LandingPage from './components/LandingPage';
import MarketPage from './components/Market';
import PayoutPage from './components/Payout';
import LiquidatePage from './components/Liquidate';

import { NavigationAction, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const stack = createNativeStackNavigator();
const App = () => {
  
  return (
    
<ThirdwebProvider
      activeChain="mumbai"
       clientId={TW_CLIENT_ID} // uncomment this line after you set your clientId in the .env file
      supportedWallets={[metamaskWallet(), rainbowWallet(), localWallet()]}>
     {/* <AppInner /> */}
     <NavigationContainer>
      <stack.Navigator>
        <stack.Screen name='Home' component={LandingPage}/>
        <stack.Screen name='Market' component={MarketPage}/>
        <stack.Screen name='Counter' component={Counter}/>
        <stack.Screen name='Liquidate' component={LiquidatePage}/>
        <stack.Screen name='Payout' component={PayoutPage}/>
      </stack.Navigator>

     </NavigationContainer>
     
    </ThirdwebProvider>
   
    
  );
};

const AppInner = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const textStyles = {
    color: isDarkMode ? Colors.white : Colors.black,
    ...styles.heading,
  };

  return (
    <SafeAreaView style={styles.view}>
     
      {/* <ConnectWallet />
      <Counter/> */}
      {/* <LandingPage/> */}
      {/* <MarketPage/> */}
      <PayoutPage/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,               // Set flex to 1 to occupy the whole screen vertically
    backgroundColor: "black",
    alignItems: 'center',  //
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default App;
