import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { InputData } from '../../components'
import { WARNA_UTAMA } from '../../utils/constant'

const vip = () => {
    return (
        <View style={styles.page}>
            <InputData label="Jenis Pakaian" placeholder="Pilih"
            picker={true}/>

            <InputData label="Lama Penyucian" placeholder="Masukkan Estimasi Hari"
            keyboardType="number-pad"/>

            <InputData label="Alamat" placeholder="Masukkan Alamat"
            isTextArea={true}/>

            <InputData 
                label="Catatan" 
                placeholder="Pesan Catatan"
                //onChangeText={this.onChangeText}
                //value={this.state.jumlahPakaian}
                //namaState="jumlahPakaian"
            />

            <Text style= {styles.harga}>Harga Total : </Text>

            <TouchableOpacity style={styles.tombol}>
                <Text style={styles.textTombol}>Submit</Text>
            </TouchableOpacity>
        </View>
    )
}

export default vip

const styles = StyleSheet.create({
    page: {
        flex: 1,
        padding: 30,
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
        fontFamily: 'TitilliumWeb-Bold'
        
    }
})
