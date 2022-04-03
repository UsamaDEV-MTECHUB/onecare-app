import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Checkbox, TouchableRipple, ActivityIndicator} from 'react-native-paper';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import Svgs from '../utilities/svgs/Svgs';
import STYLES from '../STYLES';
import COLORS from '../utilities/colors/Color';
import SweetAlert from 'react-native-sweet-alert';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const CELL_COUNT = 4;
import Button1 from '../comp/Button1';
import {NavigationContainer} from '@react-navigation/native';
import BaseUrl from '../route/BaseUrl';

const Verification = ({route, navigation}) => {
  const {routeOtpCode, routeCombinePhoneNo} = route.params;
  console.log(routeOtpCode + 'routeotpcode');
  const [value, setValue] = useState('');
  const [stateShowAlert, setStateShowAlert] = useState(false);
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const [stateIsValidOTPCode, setStateIsValidOTPCode] = useState(true);
  const [stateActivityIndicator, setStateActivityIndicator] = useState(false);

  const Continue = () => {
    console.log(value);
    console.log(typeof value + 'typeof value');

    if (value.length == 4) {
      setStateIsValidOTPCode(true);
    }

    if (value.length != 4) {
      //  console.log(stateData.password + 'password')
      //  setStateIsValidOTPCode(false)
    }
    let a = parseInt(value);
    console.log(typeof a + 'typeof a');
    console.log(a);

    //   navigation.navigate("Welcome")
    if (value.length == 4) {
      if (a === routeOtpCode) {
        console.log(`${BaseUrl}+ 'customer/userProfile.php'+
            phoneno: ${routeCombinePhoneNo},                  
          `);
        setStateActivityIndicator(true);
        fetch(BaseUrl + 'customer/userProfile.php', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phoneno: routeCombinePhoneNo,
          }),
        })
          .then(response => response.json())
          .then(json => {
            //setStateShowAlert(false)
            setStateActivityIndicator(false);
            console.log(json);
            if (json[0].message == 'user not exsist') {
              navigation.navigate('CompleteProfile', {
                routeCombinePhoneNo: routeCombinePhoneNo,
              });
            } else {
              navigation.navigate('Welcome');
            }
          })
          .catch(error => {
            console.error(error);
          });
        //     navigation.navigate("Welcome")
        //     SweetAlert.showAlertWithOptions({
        //         title: 'Login Sucessful',
        //         //  subTitle: '',
        //         confirmButtonTitle: 'OK',
        //         confirmButtonColor: '#000',
        //         confirmButtonColor: '#000',

        //         style: 'success',
        //         //cancellable: true
        //     },
        //         // callback => console.log('callback')
        //     );
      } else {
        Alert.alert('Enter wrong otp');
      }
    }
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingVertical: '2%',
        backgroundColor: COLORS.white,
      }}>
      <ScrollView>
        <View
          style={{
            marginTop: '25%',
            marginHorizontal: '5%',
            alignSelf: 'center',
          }}>
          <SvgXml xml={Svgs.logo} />
        </View>

        <View
          style={{
            marginHorizontal: '5%',
            marginTop: '20%', //alignSelf: "center",
          }}>
          <View style={{alignItems: 'center'}}>
            <Text style={STYLES.fontSize34_lightPinkAD8DB4_Arial_Bold}>
              Verification
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Text
              style={[
                STYLES.fontSize18_grey585858_Arial_Regular,
                {textAlign: 'center'},
              ]}>
              Insert Your Code Here
            </Text>
            <Text
              style={[
                STYLES.fontSize18_grey585858_Arial_Regular,
                {textAlign: 'center',marginTop:20},
              ]}>
              Your temp Code is : {routeOtpCode}
            </Text>
          </View>
        </View>

        <CodeField
          ref={ref}
          {...prop}
          // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) =>
            value == '' ? (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {console.log(index)}
                {console.log('a')}
                {console.log(symbol)}
                {console.log(isFocused)}
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            ) : (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {console.log(index)}
                {console.log(symbol)}

                {console.log(isFocused)}
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )
          }
        />

        {stateIsValidOTPCode == false ? (
          <Text
            style={{
              marginHorizontal: '10%',
              marginTop: '5%',
              color: 'red',
            }}>
            Enter Valid OTP Code{' '}
          </Text>
        ) : null}

        <View
          style={{
            flexDirection: 'row',
            marginTop: '5%',

            width: '75%',
            alignSelf: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={STYLES.fontSize16_grey585858_Arial_Regular}>
            Resend Code{' '}
          </Text>
          <TouchableRipple
            onPress={() => {
              navigation.goBack();
            }}>
            <Text style={STYLES.fontSize16_grey585858_Arial_Regular}>
              Change Number{' '}
            </Text>
          </TouchableRipple>
        </View>

        <View
          style={{
            marginHorizontal: '10%',
            marginTop: '50%',
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

Verification.propTypes = {};

export default Verification;

const styles = StyleSheet.create({
  //   root: {flex: 1, padding: 20,backgroundColor:'green'},

  codeFieldRoot: {
    width: '70%',
    alignSelf: 'center',
    //backgroundColor: 'red'
    marginTop: '15%',
  },
  cell: {
    width: 45,

    height: 50,
    lineHeight: 48,
    fontSize: 20,
    borderBottomWidth: 2,
    color: COLORS.black000000,
    borderColor: COLORS.black000000_30,
    textAlign: 'center',
    marginTop: '6%',
    //backgroundColor:'orange'
  },
  focusCell: {
    borderColor: '#000',
  },
});
