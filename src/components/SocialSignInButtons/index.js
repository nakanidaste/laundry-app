import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CustomButton } from '..';

const SocialSignInButtons = () => {

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
        <>
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
            <CustomButton 
                text="Sign Up with Apple" 
                onPress={onSignInApple}
                bgColor="#E3E3E3"
                fgColor="#363636"
            />
        </>
    );
};

export default SocialSignInButtons;

const styles = StyleSheet.create({});
