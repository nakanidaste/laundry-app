import React, {useState, useContext} from 'react'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { InputData, CustomButton, SocialSignInButtons } from '../../components'
import { WARNA_UTAMA } from '../../utils/constant';
import { AuthContext } from '../../loginscreen/AuthProvider';

const ConfirmEmail = ({ navigation }) => {

    const [code, setCode] = useState('')
    const {register, login} = useContext(AuthContext);

    const onConfirmPressed = () => {
        console.warn("Confirm")
    }

    const onSignInPressed = () => {
        navigation.navigate('Login')
    }

    const onResendPressed = () => {
        console.warn("Resend Code")
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Confirm your email</Text>
            
            <InputData 
                placeholder="Enter your confirmation code" 
                value={code} 
                setValue={setCode}
            />

            <CustomButton text="Confirm" onPress={onConfirmPressed}/>

            <CustomButton 
                text="Back to Sign In" 
                onPress={onSignInPressed}
                type="SECONDARY"
            />

            <CustomButton 
                text="Resend Code" 
                onPress={onResendPressed}
                type="TERTIARY"
            />
        </View>
    )
};

export default ConfirmEmail;

const styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: '#F9FBFC',
        padding: 20,
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: WARNA_UTAMA,
        margin: 10
    },
    text: {
        color: 'grey',
        marginVertical: 10
    },
});
