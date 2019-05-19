/* eslint-disable */
import React,{ Component } from 'react'
import {
    ToastAndroid,AppRegistry,BackHandler,StatusBar,Platform,Dimensions,AppState,View
} from 'react-native'
import {
  createStackNavigator,
  createBottomTabNavigator,
  createDrawerNavigator
} from "react-navigation";
import { fromTop,zoomOut, fromLeft } from "react-navigation-transitions";
// main tabs
import SplashScreen from './screens/SplashScreen'  
import Home from './screens/Home'  

const StackNavigator = createStackNavigator(
  {
     SplashScreen,
     Home
  },
  {
    initialRouteName: "SplashScreen",
    headerMode: "none",
    transitionConfig: () => fromLeft(),
  }
);

/**
 * navigator for drawer navigation
 */
const DrawerNavigator = createDrawerNavigator(
  {
    App: StackNavigator
  },
  {
    initialRouteName: "App",
    // drawerWidth: 300
  }
);

class SimplApp extends Component {
  
    state = {
      appState: AppState.currentState,
    }
  
    render() {    
      return (
       <View style={{flex:1}}>
        <StatusBar 
            hidden={false}
            translucent={true}
            backgroundColor="rgba(0, 187, 184,0.6)"
        />
            { Platform.OS === 'android' && Platform.Version >= 20 ?
                <View
                    style={{
                    height: 24,
                    backgroundColor: "#fff"
                    }}
                />
            : null }
            <DrawerNavigator /> 
        </View> 
        )
    }
}

export default SimplApp;
