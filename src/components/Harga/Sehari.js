import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { WARNA_UTAMA } from '../../utils/constant'

const Sehari = ({ label, onChangeText, namaState, value, defaultValue }) => {
    return (
        <View style= {styles.container}>
        
            <Text style= {styles.harga}>Harga Total : {label} </Text>
            {/* <TextInput 
                style= {styles.textInput}
                editable={false}
                onChangeText={(text) => onChangeText(namaState, text)}
                defaultValue={defaultValue}
                value={value} >
            </TextInput> */}
        
        </View>
    )
}

export default Sehari

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        color: 'red'
    },
    harga: {
        marginTop: 20,
        marginBottom: 20,
        flexDirection: 'row',
        fontFamily: 'TitilliumWeb-Bold',
        fontSize: 16,
        paddingLeft: 120,
    },
    textInput: {
        flex: 1,
        fontFamily: 'TitilliumWeb-Bold',
        fontSize: 16,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 45,
        marginTop: 10,
        borderColor: WARNA_UTAMA
    }

})
