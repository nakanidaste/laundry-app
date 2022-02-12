import React, { useEffect } from 'react'
import { StyleSheet, ImageBackground, Image } from 'react-native'
import { Background, Logo } from '../../assets'
import auth from '@react-native-firebase/auth'

function Splash({ navigation }){

    useEffect(() => {
        setTimeout(function (){
            auth().onAuthStateChanged((user) => {
                if (user != null){
                    navigation.reset({
                        index: 1,
                        routes: [{name: 'MainApps'}]
                    })
                } else {
                    navigation.reset({
                        index: 1,
                        routes: [{name: 'Login'}]
                    })
                }
            })
        },3000)
    }, [navigation]);

    return (
        <ImageBackground source={Background} style={styles.background}>
            <Image source={Logo} style={styles.logo} />
        </ImageBackground>
    )
}

export default Splash

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        width: 222,
        height: 105
    }
})
