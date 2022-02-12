import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

const InputData = ({value, setValue, placeholder, secureTextEntry, autoCapitalize}) => {
    return (
        <View style={styles.container}>
            <TextInput 
                placeholder={placeholder} 
                style={styles.input}
                value={value}
                onChangeText={setValue}
                secureTextEntry={secureTextEntry}
                autoCapitalize={autoCapitalize}
            />
        </View>
    )
}
export default InputData

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        borderColor: '#E8E8E8',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 5
    },
    input: {}
})
