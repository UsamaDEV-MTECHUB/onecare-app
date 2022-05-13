import React from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, Dimensions } from "react-native";
import COLORS from './utilities/colors/Color';



const STYLES = StyleSheet.create({


    container: {
        flex: 1,


        paddingHorizontal: '5%',
        paddingVertical: '5%',
        //  height: '100%',
        backgroundColor: COLORS.black101010,
        // backgroundColor: 'red'
    },
    withoutpaddingcontainer: {
        flex: 1, //width: Dimensions.get('window').width,
        // height: Dimensions.get('window').height,
        backgroundColor: COLORS.black101010
    },
    // fontSize25_000000_Roboto_Regular_38: {
    //     fontSize: 30,
    //     fontFamily: 'Roboto-Regular',
    //     //color: '#1C1A1A'
    //     // color: COLORS.black000000_38
    // },//


    fontSize38_lightPinkAD8DB4_Arial_Bold: {
        fontSize: 38,
        fontFamily: 'Arial',
        fontWeight: '700',
        color: COLORS.lightPinkAD8DB4,

    },


    fontSize34_lightPinkAD8DB4_Arial_Bold: {
        fontSize: 34,
        fontFamily: 'Arial',
        fontWeight: '700',
        color: COLORS.lightPinkAD8DB4,

    },

    fontSize21_whiteFFFFFF_Arial_SemiBold: {
        fontSize: 21,
        fontFamily: 'Arial',
        fontWeight: '600',
        color: COLORS.whiteFFFFFF,

    },
    fontSize18_grey585858_Arial_Regular: {
        fontSize: 18,
        fontFamily: 'Arial',
        fontWeight: '400',
        color: COLORS.grey585858,

    },
    fontSize18_greyA9A9A9_Arial_Regular: {
        fontSize: 18,
        fontFamily: 'Arial',
        fontWeight: '400',
        color: COLORS.greyA9A9A9,

    },
    fontSize16_grey585858_Arial_Regular: {
        fontSize: 16,
        fontFamily: 'Arial',
        fontWeight: '400',
        color: COLORS.grey585858,

    },
    fontSize15_whiteFFFFFF_Arial_Bold: {
        fontSize: 15,
        fontFamily: 'Arial',
        fontWeight: '700',
        color: COLORS.whiteFFFFFF,

    },
    fontSize12_grey585858_Arial_Regular: {
        fontSize: 12,
        fontFamily: 'Arial',
        fontWeight: '400',
        color: COLORS.grey585858,

    },

    fontSize12_whiteFFFFFF_Arial_Regular: {
        fontSize: 12,
        fontFamily: 'Arial',
        fontWeight: '400',
        color: COLORS.whiteFFFFFF,

    },
    fontSize11_grey63697B_Arial_SemiBold: {
        fontSize: 11,
        fontFamily: 'Arial',
        fontWeight: '600',
        color: COLORS.grey63697B,

    },
    fontSize9_grey444444_Arial_Regular: {
        fontSize: 14,
        fontFamily: 'Arial',
        fontWeight: '400',
        color: COLORS.grey444444,

    },

    // fontSize13_whiteFFFFFF_MADE_TOMMY_Regular_PERSONAL_USE_Regular_47: {
    //     fontSize: 13,
    //     fontFamily: 'MADE TOMMY Regular_PERSONAL USE',
    //     color: COLORS.whiteFFFFFF_47
    // },

    // fontSize21_whiteFFFFFF_MADE_TOMMY_Regular_PERSONAL_USE_Regular: {
    //     fontSize: 21,
    //     fontFamily: 'MADE TOMMY Regular_PERSONAL USE',
    //     //fontWeight: "4",
    //     color: COLORS.whiteFFFFFF,

    // },



});

export default STYLES;