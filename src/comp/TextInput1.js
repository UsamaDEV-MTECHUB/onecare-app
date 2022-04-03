import React from 'react';
import PropTypes from 'prop-types';
import { TextInput, Text } from 'react-native-paper';
import COLORS from '../utilities/colors/Color';
import STYLES from '../STYLES';

const TextInput1 = props => {
    return (
        <>
            <Text style={STYLES.fontSize9_grey444444_Arial_Regular}>{props.text}</Text>
            <TextInput
                // autoCapitalize="none"
                onChangeText={props.onChangeText}
                placeholder={props.placeholder}
                selectionColor={COLORS.black000000}
                activeUnderlineColor={'#AD8DB4'}
                style={{
                    color: COLORS.black000000,
                    // borderBottomWidth: 1,
                    borderBottomColor: COLORS.black272727_30,
                    height: 35,
                    backgroundColor: COLORS.whiteFFFFFF

                }}
            />
        </>

    );
};

TextInput1.propTypes = {

};

export default TextInput1;