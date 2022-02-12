import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Pesanan, Akun, Splash, Login, Satuan, Kiloan, vip, SignUp, ConfirmEmail, ForgetPassword, NewPassword } from '../pages';
import auth from '@react-native-firebase/auth'
import { AuthContext } from '../loginscreen/AuthProvider'
import BottomNavigator from '../components/BottomNavigator';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainApps = () => {
    return (
      <Tab.Navigator tabBar={props => <BottomNavigator {...props} />} >
        <Tab.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <Tab.Screen name="Pesanan" component={Pesanan} options={{ headerShown: false }}/>
        <Tab.Screen name="Akun" component={Akun} options={{ headerShown: false }}/>
      </Tab.Navigator>
    )
}

const Router = () => {

    const { user, setUser } = useContext(AuthContext);
    const {initializing, setInitializing} = useState(true);

    const onAuthStateChanged = (user) => {
        setUser(user); 
        if(initializing) setInitializing(false);
    }

    useEffect(() => {
        const subsciber = auth().onAuthStateChanged(onAuthStateChanged);
        return subsciber;
    }, []);

    if(initializing) return null;

    return (
    
    <Stack.Navigator initialRouteName='Splash'>
        { user ? <Stack.Screen name="MainApps" component={MainApps} options={{ headerShown: false }}/> : <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>}
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }}/>
        <Stack.Screen name="Satuan" component={Satuan} />
        <Stack.Screen name="Kiloan" component={Kiloan} />
        <Stack.Screen name="VIP" component={vip} />
        <Stack.Screen name="Pesanan" component={Pesanan} options={{ headerShown: false }}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }}/>
        <Stack.Screen name="ConfirmEmail" component={ConfirmEmail} options={{ headerShown: false }}/>
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{ headerShown: false }}/>
        <Stack.Screen name="NewPassword" component={NewPassword} options={{ headerShown: false }}/>
    </Stack.Navigator>
    
    )
}

export default Router

const styles = StyleSheet.create({})
