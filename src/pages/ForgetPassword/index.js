import React, {useState, useContext} from 'react'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { InputData, CustomButton, SocialSignInButtons } from '../../components'
import { WARNA_UTAMA } from '../../utils/constant';
import { AuthContext } from '../../loginscreen/AuthProvider';

const ForgetPassword = ({ navigation }) => {
    const [nama, setNama] = useState('')
    const {register, login} = useContext(AuthContext);

    const onSendPressed = () => {
        navigation.navigate('NewPassword')
    }

    const onSignInPressed = () => {
        navigation.navigate('Login')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reset your password</Text>
            
            <InputData 
                placeholder="Username" 
                value={nama} 
                setValue={setNama}
            />

            <CustomButton text="Send" onPress={onSendPressed}/>

            <CustomButton 
                text="Back to Sign In" 
                onPress={onSignInPressed}
                type="TERTIARY"
            />
        </View>
    )
};

export default ForgetPassword;

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
