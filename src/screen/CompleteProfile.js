import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {
  Checkbox,
  TouchableRipple,
  ActivityIndicator,
  Dialog,
  Paragraph,
  Button,
  TextInput,
  Modal,
  RadioButton,
  Headline,
} from 'react-native-paper';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import Svgs from '../utilities/svgs/Svgs';
import STYLES from '../STYLES';
import COLORS from '../utilities/colors/Color';
import TextInput1 from '../comp/TextInput1';
import Button1 from '../comp/Button1';
import BaseUrl from '../route/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CompleteProfile = ({route, navigation}) => {
  const {routeCombinePhoneNo} = route.params;
  const [stateActivityIndicator, setStateActivityIndicator] = useState(false);
  const [stateData, setStateData] = useState({
    fullName: '',
    email: '',
    gender: 'Select Gender',
  });

  const [stateAsyncLong, setStateAsyncLong] = useState();

  const [stateAsyncLat, setStateAsyncLat] = useState();

  const [stateAsyncAddress, setStateAsyncAddress] = useState();
  const [stateIsValidFullName, setStateIsValidFullName] = useState(true);
  const [stateIsValidEmail, setStateIsValidEmail] = useState(true);
  const [stateIsValidGender, setStateIsValidGender] = useState(true);

  // dialog
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  // dialog end
  // radio
  const [checked, setChecked] = useState('male');

  // radio end
  const handleValidEmail = val => {
    let reg = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w\w+)+$/;
    if (reg.test(val)) {
      console.log('true');
      return true;
    } else {
      console.log('false');
      return false;
    }
  };

  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('userData', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userData');
      console.log(JSON.parse(jsonValue));
    } catch (e) {
      // error reading value
    }
  };

  const Continue = () => {
    if (!handleValidEmail(stateData.email)) {
      setStateIsValidEmail(false);
    }

    if (stateData.email == '') {
      //   console.log(stateData.email + 'emailaddress')
      setStateIsValidEmail(false);
    }
    if (stateData.fullName == '') {
      //   console.log(stateData.email + 'emailaddress')
      setStateIsValidFullName(false);
    }

    if (stateData.gender == '') {
      //  console.log(stateData.password + 'password')
      setStateIsValidGender(false);
    }

    if (
      stateData.emailAddress != '' &&
      stateData.fullName != '' &&
      stateData.gender != '' &&
      handleValidEmail(stateData.email)
    ) {
      setStateActivityIndicator(true);
      fetch(BaseUrl + 'customer/updateProfile.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneno: routeCombinePhoneNo,
          email: stateData.email,
          gender: stateData.gender,
          name: stateData.fullName,
        }),
      })
        .then(response => response.json())
        .then(json => {
          storeData(json);
          getData();
          navigation.navigate('Welcome', {routeName: json.name});

          setStateActivityIndicator(false);
        })
        .catch(error => {
          console.error(error);
        });
    }
  };
  useEffect(() => {}, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingVertical: '2%',
        paddingHorizontal: '5%',
        backgroundColor: COLORS.whiteFFFFFF,
      }}>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={{
          backgroundColor: 'white',
          // paddingVertical: 60,
          paddingHorizontal: 30,
          height: '38%',
          marginHorizontal: '7%',
          borderRadius: 10,
        }}
        style={{
          zIndex: 9999,
        }}>
        <View>
          <Headline
            style={{
              paddingVertical: 5,
            }}>
            Select Gender
          </Headline>
          <TouchableRipple
            onPress={() => {
              setChecked('male');
              setStateData({
                ...stateData,
                gender: 'male',
              });
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 10,
              }}>
              <RadioButton
                color={COLORS.lightPinkAD8DB4}
                value="Male"
                status={checked === 'male' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('male')}
              />
              <Paragraph>Male</Paragraph>
            </View>
          </TouchableRipple>

          <TouchableRipple
            onPress={() => {
              setChecked('female');
              setStateData({
                ...stateData,
                gender: 'female',
              });
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 10,
           
              }}>
              <RadioButton
                color={COLORS.lightPinkAD8DB4}
                value="female"
                status={checked === 'female' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('female')}
              />

              <Paragraph>Female</Paragraph>
            </View>
          </TouchableRipple>
          <Text
            style={{
              marginTop: 30,
              backgroundColor: '#AD8DB4',
              marginBottom: 10,
              textAlign: 'center',
              padding: 10,
              color: 'white',
              borderRadius: 10,
            }}
            mode="contained"
            onPress={()=>{
              setStateData({
                ...stateData,
                gender: checked,
              });
              
              hideModal()
            }
            }>
            Submit
          </Text>
        </View>
      </Modal>
      <View
        style={{
          marginTop: '7%', // backgroundColor: 'red',
          width: '50%',
          alignItems: 'center',
          alignSelf: 'center',
          zIndex: -9,
        }}>
        <Text
          style={[
            STYLES.fontSize34_lightPinkAD8DB4_Arial_Bold,
            {
              textAlign: 'center',
            },
          ]}>
          Complete Profile
        </Text>
      </View>

      <View style={{marginTop: '15%', zIndex: -9}}>
        <TextInput
          label="Full Name"
          activeUnderlineColor="#AD8DB4"
          mode="flat"
          style={{backgroundColor: 'white'}}
          onChangeText={text => {
            setStateIsValidFullName(true);
            setStateData({
              ...stateData,
              fullName: text,
            });
          }}
        />
        {stateIsValidFullName == false ? (
          <Text style={{color: 'red'}}>Enter Valid Full Name</Text>
        ) : null}
      </View>

      <View style={{marginTop: '5%', zIndex: -9}}>
        <TextInput
          label="Email"
          activeUnderlineColor="#AD8DB4"
          mode="flat"
          style={{backgroundColor: 'white'}}
          onChangeText={text => {
            setStateIsValidEmail(true);
            setStateData({
              ...stateData,
              email: text,
            });
          }}
        />
        {stateIsValidEmail == false ? (
          <Text style={{color: 'red'}}>Enter Valid Email</Text>
        ) : null}
      </View>

      <View style={{marginTop: '5%', zIndex: -9}}>
        <TouchableRipple onPress={showModal}>
          <Text
            style={{
              paddingVertical: 20,
              paddingHorizontal: 10,
              borderBottomWidth: 1,
              color: 'grey',
              fontSize: 15,
              borderBottomColor: 'lightgrey',
            }}>
            {stateData.gender}
          </Text>
        </TouchableRipple>
        {/* <TextInput
          label="Gender"
            activeUnderlineColor="#AD8DB4"
            mode="flat"
            disabled
            value='select Gender'

            style={{backgroundColor:'white',borderBottom:1}}
            onChangeText={text => {
              setStateIsValidGender(true);
              setStateData({
                ...stateData,
                gender: text,
              });
            }}
          /> */}

        {stateIsValidGender == false ? (
          <Text style={{color: 'red'}}>Enter Valid Gender</Text>
        ) : null}
      </View>
      <View
        style={{
          marginTop: '65%', // backgroundColor: 'red',
          //justifyContent: 'flex-end'
        }}>
        {stateActivityIndicator ? (
          <ActivityIndicator
            animating={stateActivityIndicator}
            color={COLORS.lightPinkAD8DB4}
          />
        ) : (
          <Button1
            text="Continue"
            onPress={() => {
              Continue();
            }}
          />
        )}
        {/* </View> */}
      </View>
    </SafeAreaView>
  );
};

CompleteProfile.propTypes = {};

export default CompleteProfile;
