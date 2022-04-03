import React, {useState, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
import {Bubble, GiftedChat, InputToolbar, Send} from 'react-native-gifted-chat';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Image,
} from 'react-native';
import COLORS from '../utilities/colors/Color';
import {SvgXml} from 'react-native-svg';
import Svgs from '../utilities/svgs/Svgs';
import STYLES from '../STYLES';
import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';
import {WebView} from 'react-native-webview';
import {Appbar, ActivityIndicator, Headline} from 'react-native-paper';

const ChatWithAdmin = ({navigation}) => {
  const [loading, setloading] = useState('true');
  const [dis, setDis] = useState('none');
  useEffect(() => {}, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <Appbar style={{backgroundColor: '#AD8DB4'}}>
        <Appbar.Action color="white" icon="arrow-left" onPress={() => navigation.goBack()} />
        <Headline style={{color:"white"}}>CHAT WITH ADMIN</Headline>
      </Appbar>

      {loading == 'true' ? (
        <ActivityIndicator size="large" style={{backgroundColor:'white',paddingTop: '30%'}} color="#AD8DB4" />
      ) : (
        <View></View>
      )}

      <WebView
        onLoad={() => {
          setloading('false');
          setDis('flex');
        }}
        style={{display: dis}}
        source={{uri: 'https://mtechub.com/sample/onecare_backend/chat.php'}}
      />
    </SafeAreaView>
  );
};
export default ChatWithAdmin;
