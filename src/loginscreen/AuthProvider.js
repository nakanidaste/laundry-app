import React, { createContext, useState } from "react";
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'; 
import { Alert } from 'react-native'

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    
    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login: async (email, password) => {
                    try {
                        await auth().signInWithEmailAndPassword(email, password);
                    } catch(e) {
                        console.log(e)
                        Alert.alert('Email/Password Salah')
                    }  
                },
                register: async (email, password, nama) => {
                    try {
                        await auth().createUserWithEmailAndPassword(email, password).then(cred => {
                               firestore()
                                .collection('users')
                                .doc(cred.user.uid)
                                .set({
                                    email: email,
                                    password: password,
                                    nama: nama,
                                    createdAt: firestore.Timestamp.fromDate(new Date()),
                                    userImg: null
                                })
                        })
                    } catch(e) {
                        console.log(e);
                    }
                },
                logout: async () => {
                    try {
                        await auth().signOut();                        
                    } catch(e) {
                        console.log(e);
                    }
                }
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}