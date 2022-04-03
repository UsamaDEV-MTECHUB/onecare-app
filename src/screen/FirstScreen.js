import PropTypes from 'prop-types';

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ActivityIndicator, StyleSheet, Text, View, useColorScheme } from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import COLORS from '../utilities/colors/Color';
import {
    NavigationContainer
} from '@react-navigation/native';


const FirstScreen = ({ navigation }) => {
    
    return (
        < View style={{ flex: 1, backgroundColor: COLORS.whiteFFFFFF, justifyContent: 'center' }}>
        
                <ActivityIndicator animating={true} color={COLORS.lightPinkAD8DB4} /> 




            
        </View>

    );
};

FirstScreen.propTypes = {

};

export default FirstScreen;