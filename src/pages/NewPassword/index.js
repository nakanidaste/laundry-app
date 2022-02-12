import React, {useState, useContext} from 'react'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { InputData, CustomButton, SocialSignInButtons } from '../../components'
import { WARNA_UTAMA } from '../../utils/constant';
import { AuthContext } from '../../loginscreen/AuthProvider';

const NewPassword = ({ navigation }) => {
    const [code, setCode] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const {register, login} = useContext(AuthContext);

    const onSubmitPressed = () => {
        console.warn("Submit")
    }

    const onSignInPressed = () => {
        navigation.navigate('Login')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reset your password</Text>
            
            <InputData 
                placeholder="Code" 
                value={code} 
                setValue={setCode}
            />

            <InputData 
                placeholder="Enter your new password" 
                value={newPassword} 
                setValue={setNewPassword}
            />

            <CustomButton text="Submit" onPress={onSubmitPressed}/>

            <CustomButton 
                text="Back to Sign In" 
                onPress={onSignInPressed}
                type="TERTIARY"
            />
        </View>
    )
};

export default NewPassword;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FBFC',
        padding: 20,
        alignItems: 'center',
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
