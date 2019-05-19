import React, {Component} from 'react';
import {ToastAndroid, StyleSheet, Text, View,BackHandler,TouchableOpacity,Dimensions} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Icon, Button, Item, Input,ListItem,Left,Right,Radio } from 'native-base';
const {width}=Dimensions.get("window");

export default class App extends Component{

  constructor(props){
    super(props);
    this.state={
      amount:0,
      isUpiSelected:false
    };
  }
  componentWillMount() {
    this.backClickCount=0;
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
  }

  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
  }
  
  handleBackButton = () => {
    if(this.backClickCount == 0 ){
      this.backClickCount=1;
      setTimeout(() => {
        this.backClickCount=0;        
      },1000);
      ToastAndroid.show("Press back once again to exit",ToastAndroid.SHORT);
    }
    else 
      BackHandler.exitApp();

    return true;
  };  

  render() {
    let {amount,isUpiSelected}=this.state;
    return (
      <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.container}
            scrollEnabled={false}
          >
            <View style={styles.bgAqua}>
                <View style={styles.userInfo}>
                    <View style={styles.userDetailsCont}>
                      <View style={styles.userDetails}>
                        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name}>Himanshu Khosla</Text>
                        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.mobile}>9870763024</Text>
                      </View>
                      <View style={styles.userDetailsChngBtn}>
                        <Button small style={styles.chngBtn}
                          onPress={this.compingSoon.bind(this)}
                        >
                          <Text style={styles.chngBtnText}>CHANGE</Text>
                        </Button>
                      </View>
                    </View>
                    <TouchableOpacity style={styles.close}
                          onPress={this.compingSoon.bind(this)}>
                      <Icon name={"close"} type="MaterialCommunityIcons" style={styles.closeIcon}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.amountDetails}>
                  <Item style={styles.amountDetailsInput}>
                    <Icon active name='rupee' type="FontAwesome" 
                      style={styles.placeholderStyle} 
                    />
                    <Input placeholder='Enter Bill Amount'
                      placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                      style={styles.placeholderStyle}
                      value={amount}
                      defaultValue=""
                      onChangeText={this.onAmoutChange.bind(this)} 
                      keyboardType="numeric"
                      />
                  </Item>
                </View>
                <View style={styles.cardHead}>
                  <Text style={styles.payUsingText}>Pay Using</Text>
                </View>
            </View>
            <View style={styles.bgGrey}
            >
                <View style={styles.cardBody}>
                <ListItem style={styles.payItemRow}
                  onPress={()=>this.selectUpi(false)}>
                    <Radio 
                      selected={!isUpiSelected} 
                      style={styles.payItemInfoBtn}
                      color={"rgb(52, 70, 71)"}
                      selectedColor={"#00D1C1"}
                    />
                    <View style={styles.payItemInfoRow}>
                      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.payItemTitle}>Simpl: ₹2000 available</Text>
                      <Text numberOfLines={2} ellipsizeMode="tail" style={styles.payItemDesc}>₹ {amount} will be charged to your account</Text>
                    </View>
                </ListItem>
                <ListItem style={styles.payItemRow}
                  onPress={()=>this.selectUpi(true)}
                >
                    <Radio 
                      selected={isUpiSelected} 
                      style={styles.payItemInfoBtn}
                      color={"rgb(52, 70, 71)"}
                      selectedColor={"#00D1C1"}
                    />
                    <View style={styles.payItemInfoRow}>
                      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.payItemTitle}>UPI</Text>
                      <Text numberOfLines={2} ellipsizeMode="tail" style={styles.payItemDesc}>{
                        amount?`A payment request of amount ₹ ${amount} will be sent to your VPA`:"A payment request will be sent to your VPA"}</Text>
                    </View>
                </ListItem>
                </View>
                <TouchableOpacity 
                  style={styles.payBtn}
                  onPress={this.payBill.bind(this)}
                >
                  <Icon type="FontAwesome" 
                      style={styles.payBtnIcon} 
                      name="lock"
                  />
                  <Text 
                      style={styles.payBtnText}
                  >PAY BILL</Text>
                </TouchableOpacity>
            </View>
      </KeyboardAwareScrollView>
    );
  }

  selectUpi(isUpiSelected){
    this.setState({isUpiSelected:isUpiSelected});
  }

  onAmoutChange(amount){
    if(!amount)
      amount=0;
    this.setState({amount});
  }

  payBill(){
    let {amount,isUpiSelected}=this.state;
    if(amount){
      if(!isUpiSelected && amount>2000)  
        ToastAndroid.show("Not Enough Balance In Wallet !",ToastAndroid.SHORT);
      else if(!isUpiSelected)
        {
          alert(`Successfully paid amount ₹${amount} from the wallet!`);
          this.likeMyWork();
        }
      else{ 
      alert(`Successfully send request of amount ₹${amount} to the VPA!`); 
      this.likeMyWork();      
      } 
    }
    else 
    ToastAndroid.show("Enter Bill Amount To Proceed !",ToastAndroid.SHORT);
  }

  likeMyWork(){
    this.setState({
      amount:0,
      isUpiSelected:false
    });
    setTimeout(() => {
      alert("I Hope You liked my work!");
    },2000);

  }

  compingSoon(){
    alert("Coming Soon! It is still in development will be back in some time.");  
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  userDetailsCont:{
    flexDirection:"row",
    justifyContent:"flex-start"
  },
  close:{
    padding:8,
    marginTop:-4
  },
  chngBtnText:{
    color:"#00d1c1",
    fontSize: 12,
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: 0.92,
    textAlign: "center",  
    fontFamily: "SourceSansPro",
  },
  payItemTitle: {
    fontFamily: "SourceSansPro",
    fontSize: 15,
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#344647"
  }, 
  placeholderStyle:{
    fontFamily: "SourceSansPro",
    fontSize: 24,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "rgb(255, 255, 255)"
  },
  payItemDesc: {
    fontFamily: "SourceSansPro",
    fontSize: 13,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#77898a",
    paddingRight:16
  },
  payUsingText:{
    fontFamily: "SourceSansPro",
    fontSize: 13,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 16,
    letterSpacing: 0,
    color: "#77898a"
  },
  cardHead:{
    borderTopLeftRadius:4,
    borderTopRightRadius:4,
    backgroundColor: "#ffffff",
    padding:10,
    paddingLeft:16,
    borderBottomWidth:0.5,
    borderColor:"#eee"
  },
  cardBody:{
    borderBottomLeftRadius:4,
    borderBottomRightRadius:4,
    backgroundColor:"#ffffff",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation:1
  },
  payItemRow:{
    borderBottomWidth:0
  },
  payItemInfoRow:{
    paddingLeft:16
  },
  payItemInfoBtn:{
    alignSelf:"flex-start"
  },
  amountDetailsInput:{
    borderRadius: 4,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    borderStyle: "solid",
    borderWidth: 1,
    height:64,
    padding:16,
    borderColor: "rgba(255, 255, 255, 0.3)"
  },
  chngBtn:{
    minWidth:81,
    height:32,
    marginLeft:16,
    borderRadius: 4,
    justifyContent:"center",
    backgroundColor: "#ffffff"
  },
  name:{
    fontFamily: "SourceSansPro",
    fontSize: 18,
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#ffffff"
  },
  mobile:{
    fontFamily: "SourceSansPro",
    fontSize: 13,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 16,
    letterSpacing:0,
    color:"#fff" 
  },
  userInfo:{
    flexDirection:"row",
    justifyContent:"space-between"
  },
  payBtn:{
    height:52,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#00D1D6",
    marginTop:16
  },
  closeIcon:{
    fontSize:20,
    color:"#fff"
  },
  payBtnIcon:{
    color:"white",
    fontSize:15,
    textAlignVertical:"center"
  },
  payBtnText:{
    fontFamily: "SourceSansPro",
    fontSize: 16,
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing:0,
    paddingLeft:7,
    textAlign: "center",
    color: "#ffffff"
  },
  bgAqua:{
      backgroundColor:"#00d1c1",
      flex:3,
      paddingLeft:16,
      paddingRight:16,
      paddingTop:16,
      justifyContent:"space-between"
  },
  bgGrey:{
      flex:4,
      backgroundColor:"#f4f4f4",
      paddingLeft:16,
      paddingRight:16,
      paddingBottom:16,
      justifyContent:"space-between"
  }
});
