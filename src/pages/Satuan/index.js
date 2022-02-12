import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert, TextInput } from 'react-native'
import { WARNA_UTAMA } from '../../utils/constant'
import { AuthContext } from '../../loginscreen/AuthProvider'
import firestore from '@react-native-firebase/firestore'

const Kiloan = ( {navigation} ) => {

    const {user} = useContext(AuthContext)
    const [jumlahPakaian, setJumlahPakaian] = useState('')
    const [lamaPenyucian, setLamaPenyucian] = useState('')
    const [alamat, setAlamat] = useState('')
    const [catatan, setCatatan] = useState('')
    const [harga, setHarga] = useState('')

    onSubmit = () => {
        if(setJumlahPakaian && setLamaPenyucian && setAlamat) {

            const satuanReferensi = firestore().collection('Satuan');
            const satuan = {
                tipeLayanan: 'Satuan',
                jumlahPakaian: jumlahPakaian,
                lamaPenyucian: lamaPenyucian,
                alamat: alamat,
                catatan: catatan,
                harga: harga,
                userId: user.uid,
                createdAt: firestore.Timestamp.fromDate(new Date()),
                status: false,
                displayStatus: 'Dalam Proses'
            }

            satuanReferensi
                .add(satuan)
                .then((data) => {
                    Alert.alert('Sukses');
                    navigation.replace('Pesanan');
                })
                .catch((error) => {
                    console.log("Error : ", error);
                })


        } else {
            Alert.alert('SEMUA DATA WAJIB DIISI')
        }
        
    }

    return (
        <View style={styles.page}>
            <Text style={styles.label}>Jumlah Cucian :</Text>
            <TextInput 
                placeholder="Masukkan Jumlah Cucian"
                style={styles.textInput}
                keyboardType="number-pad"
                value={jumlahPakaian} 
                onChangeText={text => setJumlahPakaian(text)}   
            />

            <Text style={styles.label}>Lama Penyucian :</Text>
            <TextInput 
                placeholder="Masukkan Estimasi Hari"
                style={styles.textInput}
                keyboardType="number-pad"
                value={lamaPenyucian} 
                onChangeText={text => setLamaPenyucian(text)}   
            />

            <Text style={styles.label}>Alamat :</Text>
            <TextInput 
                placeholder="Masukkan Alamat"
                style={styles.textInputArea}
                multiline={true}
                numberOfLines={4}
                value={alamat} 
                onChangeText={text => setAlamat(text)}   
            />

            <Text style={styles.label}>Catatan :</Text>
            <TextInput 
                placeholder="Pesan Catatan"
                style={styles.textInput}
                value={catatan} 
                onChangeText={text => setCatatan(text)}   
            />

            { lamaPenyucian <= 1 ?
                <Text style= {styles.harga}
                      onChangeText={text => setHarga(text)}
                      value={harga}
                      namaState="harga"> Harga Total : Rp {jumlahPakaian * 7000}
                </Text> : 
             (lamaPenyucian > 2 ?
                <Text style= {styles.harga}
                      onChangeText={text => setHarga(text)}
                      value={harga}
                      namaState="harga"> Harga Total : Rp {jumlahPakaian * 5000}
                </Text> :
                <Text style= {styles.harga}
                      onChangeText={text => setHarga(text)}
                      value={harga}
                      namaState="harga"> Harga Total : Rp {jumlahPakaian * 6000}
                </Text>
             )
            }

            <TouchableOpacity 
                style={styles.tombol}
                onPress={() => {onSubmit()}}>
                    <Text style={styles.textTombol}>Submit</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Kiloan

const styles = StyleSheet.create({
    page: {
        flex: 1,
        padding: 30
    },
    label: {
        fontSize: 16,
        fontFamily: 'TitilliumWeb-Regular',
        marginBottom: 5
    },
    textInput: {
        borderWidth: 1,
        borderColor: WARNA_UTAMA,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        fontFamily: 'TitilliumWeb-Regular',
    },
     textInputArea: {
        textAlignVertical: 'top',
        borderWidth: 1,
        borderColor: WARNA_UTAMA,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        fontFamily: 'TitilliumWeb-Regular',
    },
    tombol: {
        backgroundColor: WARNA_UTAMA,
        padding: 10,
        borderRadius: 5,
        marginTop: 10
    },
    textTombol: {
        color: 'white',
        fontFamily: 'TitilliumWeb-Bold',
        textAlign: 'center',
        fontSize: 18
    },
    harga: {
        marginTop: 20,
        marginBottom: 20,
        textAlign: 'right',
        fontFamily: 'TitilliumWeb-Bold',
        fontSize: 16
        
        
    }
})
