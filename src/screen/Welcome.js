import React, {useState, useRef,useEffect} from 'react';
import PropTypes from 'prop-types';

import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Linking,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import Svgs from '../utilities/svgs/Svgs';
import STYLES from '../STYLES';
import COLORS from '../utilities/colors/Color';
import {Card} from 'react-native-paper';
import Button1 from '../comp/Button1';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';

const Welcome = ({route, navigation}) => {
    const [statePhoneNo, setStatePhoneNo] = useState('');
  const {routeName} = route.params;
  const dialCall = () => {
    
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${1234567890}';
    } else {
      phoneNumber = 'telprompt:${1234567890}';
    }

    Linking.openURL(phoneNumber);
  };
  const getData = async () => {
    try {
  

      const valuex = await AsyncStorage.getItem('userData');
      var x = JSON.parse(valuex);
      //  console.log((x.email))
      setStatePhoneNo(x.phoneno);
    } catch (e) {
      // error reading value
    }
  };
  const removeAsyncStorage = async () => {
    try {
      AsyncStorage.getAllKeys()
        .then(keys => AsyncStorage.multiRemove(keys))
        .then(() => {
          console.log('all async data remove');
          RNRestart.Restart();
        });
    } catch (rx) {
      console.log(rx);
    }

    navigation.navigate('MobileNumber');
  };
  useEffect(() => {
    getData();
  });
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.whiteFFFFFF,
      }}>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.whiteFFFFFF,
          marginHorizontal: '8%',
          marginVertical: '5%',
        }}>
        <View style={{alignItems: 'center', marginTop: '5%'}}>
          <Text style={STYLES.fontSize38_lightPinkAD8DB4_Arial_Bold}>
            Welcome
          </Text>
          <View style={{marginTop: '2%'}}>
            <Text style={STYLES.fontSize18_grey585858_Arial_Regular}>
              {routeName}
            </Text>
          </View>
        </View>

        <Card
          style={{
            flex: 0.42,
            borderRadius: 17,
            backgroundColor: COLORS.whiteFFFFFF,
            borderColor: COLORS.grey707070_43,
            marginTop: '5%',
          }}
          onPress={() => {
            navigation.navigate('ChatWithAdmin');
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <SvgXml xml={Svgs.chatWithAdmin} />
            <View style={{marginTop: '5%'}}>
              <Text style={STYLES.fontSize18_greyA9A9A9_Arial_Regular}>
                CHAT WITH ADMIN
              </Text>
            </View>
          </View>
        </Card>

        <Card
          style={{
            flex: 0.42,
            borderRadius: 17,
            backgroundColor: COLORS.whiteFFFFFF,
            borderColor: COLORS.grey707070_43,
            marginTop: '15%',
          }}
          onPress={() => {
            dialCall();
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <SvgXml xml={Svgs.callAdmin} />
            <View style={{marginTop: '5%'}}>
              <Text style={STYLES.fontSize18_greyA9A9A9_Arial_Regular}>
                CALL ADMIN
              </Text>
            </View>
          </View>
        </Card>

        <View style={{flex: 0.15, justifyContent: 'flex-end',zIndex:9999}}>
          <Button1
            text="LOGOUT"
            onPress={() => {
              //navigation.navigate("MobileNumber")
              removeAsyncStorage();
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

Welcome.propTypes = {};

export default Welcome;
