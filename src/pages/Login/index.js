import React, {useState, useContext} from 'react'
import { StyleSheet, View, Image, Text, useWindowDimensions, Platform } from 'react-native'
import { InputData, CustomButton } from '../../components'
import { WARNA_WARNING } from '../../utils/constant';
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

const Login = ({ navigation }) => {

    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
    })
    const [error, setError] = useState('')
    const { login } = useContext(AuthContext);

    const { email, password } = userInfo

    const {height} = useWindowDimensions()

    const handleOnChangeText = (value, fieldName) => {
        setUserInfo({ ...userInfo, [fieldName]: value })
    }

    const isValidForm = () => {
        // we will accept only if all of the field have value
        if(!isValidObjectField(userInfo)) return updateError('Required all fields!', setError)
        // only valid email id is allowed
        if(!isValidEmail(email)) return updateError('Invalid email!', setError)
        // password must have 8 or more characters
        if(!password.trim() || password.length < 8) return updateError('Password is less then 8 characters!', setError)

        return true
    }

    const onSignInPressed = () => {
        if(isValidForm()) {
            login(email, password)
        }
    }

    const onSignUpPressed = () => {
        navigation.navigate('SignUp')
    }

    const onForgetPasswordPressed = () => {
        navigation.navigate('ForgetPassword')
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
            <Image 
                source={require('../../assets/images/logo.png')} 
                style={[styles.logo, {height: height * 0.2}]} 
                resizeMode="contain"
            />

            {error ? <Text style={styles.errorMsg}>{error}</Text> : null}

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

            <CustomButton text="Sign In" onPress={onSignInPressed}/>

            <CustomButton 
                text="Forget password?" 
                onPress={onForgetPasswordPressed}
                type="TERTIARY"
            />

            <CustomButton 
                text="Sign In with Facebook" 
                onPress={onSignInFacebook}
                bgColor="#E7EAF4"
                fgColor="#4765A9"
            />
            <CustomButton 
                text="Sign In with Google" 
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
                text="Don't have an account? Create one" 
                onPress={onSignUpPressed}
                type="TERTIARY"
            />
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FBFC',
        padding: 20,
        alignItems: 'center'
    },
    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
    },
    errorMsg: {
        color: WARNA_WARNING
    }
})
