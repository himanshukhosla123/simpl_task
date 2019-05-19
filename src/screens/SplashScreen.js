import React, {Component} from 'react';
import {StyleSheet,View,Image,Text} from 'react-native';

export default class App extends Component{
  render() {
    return (<View style={styles.container}>          
            <Image  
                style={styles.logo} 
                resizeMode="contain"
                source={ require('./../assets/img/logo_xxl.png')  } />
                <Text style={styles.head}>
                  Simpl By Hk
                </Text>
      </View>
    );
  }
  componentDidMount(){
    setTimeout(() => {
      this.props.navigation.navigate("Home");
    }, 1500);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00d1c1',
  },
  logo: {
      height:220,
  },
  head:{
    color:"white",
    fontSize:16,
    padding:15
  }
});
