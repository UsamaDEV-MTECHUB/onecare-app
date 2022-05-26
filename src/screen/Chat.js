import React, {useState, useRef, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Colors,
  ActivityIndicator,
  Button,
  Appbar,
  Badge,
} from 'react-native-paper';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  FlatList,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import Svgs from '../utilities/svgs/Svgs';
import STYLES from '../STYLES';

import COLORS from '../utilities/colors/Color';
import Button1 from '../comp/Button1';

import CountryPicker from 'react-native-country-picker-modal';
import BaseUrl from '../route/BaseUrl';
import {firebase} from '@react-native-firebase/app';
import database from '@react-native-firebase/database';
import {GiftedChat} from 'react-native-gifted-chat';

const Chat = ({route, navigation}) => {
  const {username, phoneno} = route.params;

  const [messages, setMessages] = useState([]);
  const [readDataCount, setreadDataCount] = useState(0);
  const [sms, setSms] = useState('');
  const [p, setP] = useState('');
  const flatListRef = React.useRef();
  const renderItem = ({item,index}) => (
  
    <>
      {
     
      item.from == phoneno || item.to == phoneno ? (
        item.from == 'admin'  ? (
          <View
            style={{
              backgroundColor: 'lightgrey',
              width: '60%',
              marginLeft: 10,
              padding: 10,
              borderBottomEndRadius: 10,
              borderTopEndRadius: 10,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 10,
              marginVertical: 5,
              zIndex: -999,
            }}>
            <Text
              style={{
                fontSize: 15,
                color: 'black',
              }}>
              {item.message
              }
            </Text>
            <Badge
              style={{
                alignSelf: 'flex-start',
                marginTop: 5,
              }}>
              Admin
            </Badge>
          </View>
        ) : (
          <View
            style={{
              backgroundColor: 'lightgrey',
              color: 'black',
              width: '60%',
              marginRight: 10,
              padding: 10,
              borderBottomLeftRadius: 10,
              borderTopEndRadius: 10,
              borderTopLeftRadius: 10,
              marginVertical: 5,
              alignSelf: 'flex-end',
              zIndex: -999,
            }}>
            <Text
              style={{
                fontSize: 15,
                color: 'black',
              }}>
              {item.message}
            </Text>
          </View>
        )
      ) : null}
    </>
    
  );
  const addData = () => {
    if (sms.length == 0) {
      console.log('emplt fild');
    } else {
      const id = firebase.database().ref('/users').push().key;

      const d = new Date();
      let text = d.toString();

      setMessages(messages => [
        ...messages,
        {
          id: text,
          from: phoneno,
          to: 'admin',
          message: sms,
        },
      ]);

      setSms('');
      firebase
        .database()
        .ref('messages/' + id)
        .set({
          id: text,
          from: phoneno,
          to: 'admin',
          message: sms,
        })
        .then(() => {
          // setMessages('')
          console.log('message sent');
        });
    }
  };
  const readData =  () => {
    
     
  };

  useEffect(() => {
   if(readDataCount == 0){
     setreadDataCount(1)
   }
    // firebase credentails
    const firebaseConfig = {
      apiKey: 'AIzaSyCXtui0cbGJcLJhOFjRAUaj1SdSGXOpNgA',
      authDomain: 'my-test-project-3b397.firebaseapp.com',
      databaseURL: 'https://my-test-project-3b397-default-rtdb.firebaseio.com',
      projectId: 'my-test-project-3b397',
      storageBucket: 'my-test-project-3b397.appspot.com',
      messagingSenderId: '255746375081',
      appId: '1:255746375081:web:9dfb1d1e85298a977c58b8',
    };
    // firebase credentails end
   
    // read data from firebase
    if (readDataCount == 1) {
      console.log('data stop reading');
    } else {
      
      firebase
      .database()
      .ref('messages/')
      .orderByChild('id')
      // .limitToLast()
      .once('value')
      .then(snapshot => {
        // ([snapshot.val()])
        if (snapshot.val() == null) {
          console.log('no data');
        } else {
          
          var x = Object.values(snapshot.val());
         
          snapshot.forEach(product => {
            
          
           
            setMessages(messages => [
              ...messages,
              {
                id: product.val().id,
                from: product.val().from,
                to: product.val().to,
                message: product.val().message,
              },
            ]);
           
           
          });
          
        }

        
      });
    
    }
    // read data from firebase end
    // checking changes in db
    // firebase
    //   .database()
    //   .ref('userlist/'+phoneno+'/')
    //   .set({

    //     username:username,
    //     phoneno:phoneno,
    //   })
    // checking changes in db end
    // check if database has a user or not

    firebase
      .database()
      .ref('userlist/')
      .once('value')
      .then(snapshot => {
        var x = Object.values(snapshot.val());
        // console.log(x);
        if (x.some(e => e.phoneno === phoneno)) {
          console.log('user has sms');
        } else {
          firebase
            .database()
            .ref('userlist/' + phoneno + '/')
            .set({
              username: username,
              phoneno: phoneno,
            })
            .then(() => {
              console.log('new use rregistered');
            });
        }
        firebase
          .database()
          .ref('messages/')
          .orderByChild('id')
          .limitToLast(1)
          .on('value', snapshot => {
            if (snapshot.val() == null) {
              console.log('no data');
            } else {
              // setMessages(Object.values(snapshot.val()));
              var x = Object.values(snapshot.val());
              // function to send sms to firebase
              
                snapshot.forEach(product => {
                  if (
                    product.val().from == 'admin' &&
                    product.val().to == phoneno 
                  ) { 
                    setMessages(messages => [
                      ...messages,
                      {
                        id: product.val().id,
                        from: product.val().from,
                        to: product.val().to,
                        message: product.val().message,
                      },
                    ]);
                   
                  }
                });
              
              

              // console.log(messages)
            }
          });
      });
    // check if database has a user or not end
   
          
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingVertical: '2%',
        backgroundColor: Colors.white,
        justifyContent: 'flex-end',
      }}>
      <Appbar
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          zIndex: 999,
          backgroundColor: COLORS.lightPinkAD8DB4,
        }}>
        <Appbar.Action
          icon="arrow-left"
          onPress={() => navigation.goBack()}
          color={'white'}
        />

        <Appbar.Content
          title="Chat With Admin"
          style={{alignSelf: 'center'}}
          titleStyle={{
            color: 'white',
          }}
        />
      </Appbar>
      <View
        style={{
          flexDirection: 'row-reverse',
          justifyContent: 'flex-start',
          alignItems: 'flex-end',
          backgroundColor: '#ffff',
          height: '83%',
          width: '100%',
          borderBottomWidth: 0.5,
          borderBottomColor: 'lightgrey',
          position: 'absolute',
          bottom: '10%',
          paddingTop: 5,
        }}
        contentContainerStyle={{
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}>
        {/* <>
        {messages.map((message) => {
            return (
              <View>
                <Text >{message.message}</Text>
              </View>
            );
          })}</> */}
        <FlatList
          style={{
            zIndex: -999,
          }}
          inverted={false}
          data={messages}
          ref={flatListRef}
          onContentSizeChange={() =>
            flatListRef.current.scrollToEnd({animated: true})
          }
          renderItem={renderItem}
          // keyExtractor={item => item.id}
          keyExtractor={(item, index) => `${index}`}
          // keyExtractor={(item, index) => index}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'flex-end',

          width: '100%',
          zIndex: 9999,
          backgroundColor: 'White',
        }}>
        <TextInput
          placeholder="Type Your Messasge"
          multiline={true}
          value={sms}
          numberOfLines={2}
          style={{
            width: '78%',
            maxHeight: 50,
            marginRight: '20%',
            color: 'black',
            backgroundColor: 'white',
          }}
          onChangeText={e => {
            setSms(e);
          }}
        />
        <Button
          style={{
            position: 'absolute',
            bottom: 5,
            right: 5,
          }}
          onPress={() => {
            addData();
          }}
          contentStyle={{
            backgroundColor: 'white',
          }}
          color={COLORS.lightPinkAD8DB4}>
          Send
        </Button>
      </View>
      {}
    </SafeAreaView>
  );
};

Chat.propTypes = {};

export default Chat;
