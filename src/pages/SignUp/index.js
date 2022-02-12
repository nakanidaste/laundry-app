import React, {useState, useContext} from 'react'
import { StyleSheet, View, Text, Platform } from 'react-native'
import { InputData, CustomButton } from '../../components'
import { WARNA_UTAMA, WARNA_WARNING } from '../../utils/constant';
import { AuthContext } from '../../loginscreen/AuthProvider';

const isValidObjectField = (obj) => {
    return Object.values(obj).every(value => value.trim())
}

const updateError = (error, stateUpdater) => {
    stateUpdater(error)
    setTimeout(() => {
        stateUpdater('')
    }, 2500)
}

const isValidEmail = (value) => {
    const regx = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return regx.test(value)
}

const SignUp = ({ navigation }) => {

    const [userInfo, setUserInfo] = useState({
        nama: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const [error, setError] = useState('')
    const { register } = useContext(AuthContext);

    const {nama, email, password, confirmPassword} = userInfo

    const handleOnChangeText = (value, fieldName) => {
        setUserInfo({ ...userInfo, [fieldName]: value })
    }

    const isValidForm = () => {
        // we will accept only if all of the field have value
        if(!isValidObjectField(userInfo)) return updateError('Required all fields!', setError)
        // if valid name with 3 or more characters
        if(!nama.trim() || nama.length < 3) return updateError('Invalid name!', setError)
        // only valid email id is allowed
        if(!isValidEmail(email)) return updateError('Invalid email!', setError)
        // password must have 8 or more characters
        if(!password.trim() || password.length < 8) return updateError('Password is less then 8 characters!', setError)
        // password and confirm password must be the same
        if(password !== confirmPassword) return updateError('Password does not match!', setError)

        return true
    }

    const onRegisterPressed = () => {
        if(isValidForm()) {
            register(email, password, nama)
            navigation.navigate('ConfirmEmail')
        }
    }

    const onSignInPressed = () => {
        navigation.navigate('Login')
    }

    const onTermsOfUsePressed = () => {
        console.warn("Terms of Use")
    }

    const onPrivacyPressed = () => {
        console.warn("Privacy Policy")
    }

    const onSignInFacebook = () => {
        console.warn("Sign Up with Facebook")
    }

    const onSignInGoogle = () => {
        console.warn("Sign Up with Google")
    }

    const onSignInApple = () => {
        console.warn("Sign Up with Apple")
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create an account</Text>
            
            {error ? <Text style={styles.errorMsg}>{error}</Text> : null}

            <InputData 
                placeholder="Full Name" 
                value={nama} 
                setValue={(value) => handleOnChangeText(value, 'nama')}
            />
            <InputData 
                placeholder="Email" 
                value={email} 
                setValue={(value) => handleOnChangeText(value, 'email')}
                autoCapitalize='none'
            />
            <InputData 
                placeholder="Password" 
                value={password} 
                setValue={(value) => handleOnChangeText(value, 'password')}
                secureTextEntry={true}
            />
            <InputData 
                placeholder="Repeat Password" 
                value={confirmPassword} 
                setValue={(value) => handleOnChangeText(value, 'confirmPassword')}
                secureTextEntry={true}
            />

            <CustomButton text="Register" onPress={onRegisterPressed}/>

            <Text style={styles.text}>
                By registering, you confirm that you accept our{' '} 
                <Text style={styles.link} onPress={onTermsOfUsePressed}>Term of Use</Text> and{' '} 
                <Text style={styles.link} onPress={onPrivacyPressed}>Privacy Policy</Text>
            </Text>

            <CustomButton 
                text="Sign Up with Facebook" 
                onPress={onSignInFacebook}
                bgColor="#E7EAF4"
                fgColor="#4765A9"
            />
            <CustomButton 
                text="Sign Up with Google" 
                onPress={onSignInGoogle}
                bgColor="#FAE9EA"
                fgColor="#DD4D44"
            />

            {Platform.OS === 'ios' ? 
            <CustomButton 
                text="Sign In with Apple" 
                onPress={onSignInApple}
                bgColor="#E3E3E3"
                fgColor="#363636"
            /> : null }

            <CustomButton 
                text="Have an account? Sign In" 
                onPress={onSignInPressed}
                type="TERTIARY"
            />
        </View>
    )
};

export default SignUp;

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
    link: {
        color: WARNA_UTAMA
    },
    errorMsg: {
        color: WARNA_WARNING
    }
});
