import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { Container } from '../../styles/CardStyles';
import { CardKiloan } from '../../components';
import { LoadingCardPesanan } from '../../effect';
import firestore from '@react-native-firebase/firestore'

const Pesanan = () => {

    const[pesanan, setPesanan] = useState(null)
    const[loading, setLoading] = useState(true)

    useEffect(() => {
        
        const fecthPesanan = async () => {
            try {
                const list = [];

                await firestore()
                .collection('Kiloan')
                .get()
                .then((querySnapshot) => {
                    //console.log('Total Kiloan: ', querySnapshot.size)

                    querySnapshot.forEach(doc => {
                        const {alamat, berat, catatan, createdAt, harga, lamaPenyucian, tipeLayanan, status, displayStatus, userId} = doc.data();
                        list.push({
                           id: doc.id,
                           alamat: alamat,
                           berat: berat,
                           catatan: catatan,
                           tanggal: createdAt,
                           harga: harga,
                           lamaPenyucian: lamaPenyucian,
                           tipeLayanan: tipeLayanan,
                           userId: userId,
                           status: status,
                           displayStatus: displayStatus
                        })
                    })
                })

                await firestore()
                .collection('Satuan')
                .get()
                .then((querySnapshot) => {
                    //console.log('Total Kiloan: ', querySnapshot.size)

                    querySnapshot.forEach(doc => {
                        const {alamat, jumlahPakaian, catatan, createdAt, harga, lamaPenyucian, tipeLayanan, status, displayStatus, userId} = doc.data();
                        list.push({
                           id: doc.id,
                           alamat: alamat,
                           jumlahPakaian: jumlahPakaian,
                           catatan: catatan,
                           tanggal: createdAt,
                           harga: harga,
                           lamaPenyucian: lamaPenyucian,
                           tipeLayanan: tipeLayanan,
                           userId: userId,
                           status: status,
                           displayStatus: displayStatus
                        })
                    })
                })

                setPesanan(list);

                if(loading) {
                    setLoading(false)
                }
                
            } catch(e) {
                console.log(e)
            }
        }

        fecthPesanan();
    }, []);
    
        return (
        <View style={styles.page}>
            <View style={styles.header}>
                <Text style={styles.title}>Pesanan</Text>
                <View style={styles.garis}/>
            </View>
            <Container>
                {loading ? <LoadingCardPesanan/> :
                <FlatList
                    data={pesanan}
                    renderItem={({ item }) => <CardKiloan item={item} />}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                /> }
            </Container>     
        </View>
        )
}

export default Pesanan

const styles = StyleSheet.create({
    page: {
        flex: 1
    },
    header: {
        paddingHorizontal: 30,
        paddingTop: 30
    },
    title: {
        fontSize: 20,
        fontFamily: 'TitilliumWeb-Bold',
    },
    garis: {
        borderWidth: 1,
        marginTop: 10
    }
})
