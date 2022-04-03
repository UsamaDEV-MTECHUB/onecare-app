import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, ActivityIndicator } from 'react-native-paper';
import { Text, View, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native'
import { SvgXml } from 'react-native-svg';
import Svgs from '../utilities/svgs/Svgs';
import STYLES from '../STYLES';

import COLORS from '../utilities/colors/Color';
import Button1 from '../comp/Button1';

import CountryPicker from 'react-native-country-picker-modal'
import BaseUrl from '../route/BaseUrl';
const MobileNumber = ({ navigation }) => {

    const phoneNoTextInput = useRef();
    const [countryCode, setCountryCode] = useState('')

    const [stateFirstCountryCode, setStateFirstCountryCode] = useState("+92")

    const [statePackageCountryCodeShow, setStatePackageCountryCodeShow] = useState(false)

    const [withFilter, setWithFilter] = useState(true)
    const [withAlphaFilter, setWithAlphaFilter] = useState(true)

    const [withModal, setWithModal] = useState(true)
    ////
    const [visible, setVisible] = useState(false)


    const [stateIsValidPhoneNo, setStateIsValidPhoneNo] = useState(true);
    const [statePhoneNo, setStatePhoneNo] = useState('');
    const [stateCombinePhoneNo, setStateCombinePhoneNo] = useState('');
    const [stateActivityIndicator, setStateActivityIndicator] = useState(false)



    const onSelect = (country) => {
        setCountryCode(country.cca2)
        setStateFirstCountryCode(country.callingCode)
        setStatePhoneNo('')
        setStateCombinePhoneNo('')
        phoneNoTextInput.current.clear();

        // console.log(country.cca2)
        console.log(country)
        // setCountryCode(country.callingCode)
        //   funcCountryNameSelect(country.name)
        //setCountry(country.name)
    }



    const Continue = () => {
        if (statePhoneNo == '') {
            setStateIsValidPhoneNo(false)
        }

        if (statePhoneNo != '') {
            console.log(stateCombinePhoneNo)
            //   navigation.navigate("Verification")
            console.log(`BaseUrl+ 'users/sendOtp.php'+
         phoneno: ${stateCombinePhoneNo},                  
       `)
            setStateActivityIndicator(true)
            fetch(BaseUrl + 'users/sendOtp.php', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    phoneno: stateCombinePhoneNo,


                })
            })
                .then((response) => response.json())
                .then((json) => {
                    //setStateShowAlert(false)
                    setStateActivityIndicator(false)
                    console.log(json)
                    if (json[0].message == "SMS sent sucessfully") {


                        navigation.navigate("Verification", {
                            routeOtpCode: json[0].code,
                            routeCombinePhoneNo: stateCombinePhoneNo
                        })
                    }

                    else {
                        Alert.alert('error')
                    }
                })
                .catch((error) => {

                    console.error(error);
                });



        }
        console.log(stateFirstCountryCode)
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            paddingVertical: '2%',
            backgroundColor: Colors.white
        }}>
            <ScrollView>
                <View style={{
                    marginTop: "25%",
                    marginHorizontal: '5%',
                    alignSelf: "center"
                }}>
                    <SvgXml xml={Svgs.logo} />
                </View>


                <View style={{
                    marginHorizontal: '5%',
                    marginTop: "30%", //alignSelf: "center",

                }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={STYLES.fontSize34_lightPinkAD8DB4_Arial_Bold}>Mobile Number</Text>


                    </View>
                    <View style={{
                        alignItems: 'center',

                    }}>
                        <Text style={[STYLES.fontSize18_grey585858_Arial_Regular,
                        { textAlign: 'center' }]}>the code will be sent to full mobile number</Text>
                    </View>
                </View>




                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                    , marginTop: '10%', marginHorizontal: '5%'
                }}>
                    <View style={{
                        flex: 0.30,

                        height: 50,
                        justifyContent: 'center',
                        borderWidth: 1,
                        borderColor: COLORS.grey707070_40


                    }}>

                        {statePackageCountryCodeShow == false ?
                            <TouchableOpacity
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-evenly'
                                }}
                                onPress={() => {
                                    setVisible(true)
                                    setStatePackageCountryCodeShow(true)
                                }}>
                                <SvgXml xml={Svgs.pakFlag} />
                                <Text style={{ color: COLORS.black000000, }}>{stateFirstCountryCode}</Text>
                                <SvgXml xml={Svgs.phoneNoRightArrow} />
                            </TouchableOpacity>
                            :
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-evenly'
                            }}>
                                <CountryPicker

                                    //  containerButtonStyle={STYLES1.viewcountrynamepicker}
                                    {...{
                                        countryCode,
                                        //country,
                                        withEmoji: true,
                                        withFilter,
                                        withFlag: true,
                                        withCallingCode: true,
                                        withFlagButton: true,
                                        withCallingCodeButton: true,

                                        withAlphaFilter,

                                        withModal,

                                        onSelect,
                                        modalProps: {
                                            visible,
                                        },

                                        // visible: true,
                                        onClose: () => setVisible(false),
                                        onOpen: () => setVisible(true),
                                    }}
                                />
                                <SvgXml xml={Svgs.phoneNoRightArrow} />
                            </View>
                        }



                    </View>

                    <View style={{
                        height: 50,
                        flex: 0.65,

                    }}>


                        <Text
                            style={STYLES.fontSize9_grey444444_Arial_Regular}>Phone No</Text>


                        <TextInput
                            ref={phoneNoTextInput}
                            keyboardType='numeric'
                            style={{
                                color: COLORS.black000000,
                                borderBottomWidth: 1,
                                borderBottomColor: COLORS.black272727_30,
                                flex: 1,
                                // height: 35,

                            }}
                            onChangeText={(text) => {
                                setStatePhoneNo(text)
                                setStateIsValidPhoneNo(true)
                                setStateCombinePhoneNo(stateFirstCountryCode + text)
                            }} />


                    </View>

                </View>

                <View style={{ marginLeft: "40%" }}>
                    {stateIsValidPhoneNo == false ? <Text style={{ color: 'red' }}>Enter Valid PhoneNo</Text> : null}
                </View>


                <View style={{
                    marginHorizontal: '10%',
                    marginTop: '60%'
                }}>
                    {stateActivityIndicator ?
                        <ActivityIndicator animating={stateActivityIndicator} color={COLORS.lightPinkAD8DB4} /> :
                        <Button1 text="Continue" onPress={() => {
                            Continue()
                        }} />
                    }
                </View>


            </ScrollView>
        </SafeAreaView >
    );
};

MobileNumber.propTypes = {

};

export default MobileNumber;