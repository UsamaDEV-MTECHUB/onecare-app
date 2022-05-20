import React, {useState, useRef,useEffect} from 'react';
import PropTypes from 'prop-types';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors, ActivityIndicator, TextInput,Button} from 'react-native-paper';
import {Text, View, TouchableOpacity, ScrollView, Alert} from 'react-native';
import {SvgXml} from 'react-native-svg';
import Svgs from '../utilities/svgs/Svgs';
import STYLES from '../STYLES';

import COLORS from '../utilities/colors/Color';
import Button1 from '../comp/Button1';

import CountryPicker from 'react-native-country-picker-modal';
import BaseUrl from '../route/BaseUrl';
import { firebase } from '@react-native-firebase/app';
import database from '@react-native-firebase/database';

const DemoChat = ({navigation}) => {

  const [countryCode, setCountryCode] = useState('');
  const addData = ()=>{
    console.log(Math.floor(Math.random() * 99999999999999999))
    // firebase.database().ref('users/').set({
    //   name:'sdfsdfggh'
    // })
  }
  const readData = ()=>{
    firebase.database()
    .ref('users/')
    .once('value')
    .then(snapshot => {
      console.log('User data: ', snapshot.val());
    })
  }

  useEffect(() => {
    // getData();
    const firebaseConfig = {
      apiKey: "AIzaSyCXtui0cbGJcLJhOFjRAUaj1SdSGXOpNgA",
      authDomain: "my-test-project-3b397.firebaseapp.com",
      databaseURL: "https://my-test-project-3b397-default-rtdb.firebaseio.com",
      projectId: "my-test-project-3b397",
      storageBucket: "my-test-project-3b397.appspot.com",
      messagingSenderId: "255746375081",
      appId: "1:255746375081:web:9dfb1d1e85298a977c58b8"
    };
  });
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingVertical: '2%',
        backgroundColor: Colors.white,
      }}>
     <Text>Demo Chat</Text>
     <Button
     style={{
      marginTop:100,
      backgroundColor:'lightgreen',
      width:300,
      alignSelf:'center'
    }}
     onPress={()=>{
      //  console.log('sdfg')
      addData()
     }}
     >
       Add Data
     </Button>
     <Button
     style={{
       marginTop:50,
       backgroundColor:'lightgreen',
       width:300,
       alignSelf:'center'
     }}
     onPress={()=>{
      //  console.log('sdfg')
      readData()
     }}
     >
       Read Data
     </Button>
    </SafeAreaView>
  );
};

DemoChat.propTypes = {};

export default DemoChat;
