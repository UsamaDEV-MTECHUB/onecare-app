import React, { useState, useEffect } from 'react';

import { Image, View, TextInput, ScrollView } from 'react-native';
import { TouchableRipple, Text } from 'react-native-paper';

import { SvgXml } from 'react-native-svg';

import STYLES from '../STYLES';
import COLORS from '../utilities/colors/Color';
import Svgs from '../utilities/svgs/Svgs';

const Button1 = (props) => {
    return (
        <TouchableRipple style={{
            zIndex:-9,
            alignItems: 'center',
            paddingHorizontal: '7%',
            paddingVertical: '5%',
            justifyContent: 'center',
            borderRadius: 16,
            backgroundColor: COLORS.lightPinkAD8DB4,
            

        }} onPress={props.onPress}>
            <Text style={STYLES.fontSize15_whiteFFFFFF_Arial_Bold}>
                {props.text}
            </Text>

        </TouchableRipple>
    );
};

export default Button1;