import React, { useContext, useState, useEffect } from 'react'
import { Dimensions, ImageBackground, StyleSheet, Text, View, Image, FlatList } from 'react-native'
import { ScrollView } from 'react-native-virtualized-view';
import { ImageHeader, Logo } from '../../assets'
import { ButtonIcon, Saldo, CardHome } from '../../components'
import { LoadingName, LoadingCardHome } from '../../effect';
import { AuthContext } from '../../loginscreen/AuthProvider';
import { WARNA_ABU_ABU } from '../../utils/constant'
import firestore from '@react-native-firebase/firestore'

const Home = () => {
    const { user } = useContext(AuthContext);
    const [nama, setNama] = useState('')
    const [pesanan, setPesanan] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let cek = true;
        const fetchData = async () => {
            try {
                const list = []
                if (cek) {
                    await firestore()
                    .collection('users')
                    .doc(user.uid)
                    .get()
                    .then(doc => {
                        setNama(doc.data().nama)
                    })
                    
                    await firestore()
                    .collection('Kiloan')
                    .get()
                    .then((querySnapshot) => {
                        //console.log('Total Kiloan: ', querySnapshot.size)

                    querySnapshot.forEach(doc => {
                        const { status, displayStatus, tipeLayanan, userId} = doc.data();
                        list.push({
                            id: doc.id,
                            displayStatus: displayStatus,
                            tipeLayanan: tipeLayanan,
                            userId: userId
                        })
                    })
                })

                    await firestore()
                    .collection('Satuan')
                    .get()
                    .then((querySnapshot) => {
                        //console.log('Total Kiloan: ', querySnapshot.size)

                    querySnapshot.forEach(doc => {
                        const { status, displayStatus, tipeLayanan, userId} = doc.data();
                        list.push({
                            id: doc.id,
                            displayStatus: displayStatus,
                            tipeLayanan: tipeLayanan,
                            userId: userId
                        })
                    })
                })

            setPesanan(list)

            if(loading) {
                setLoading(false)
            }}
            } catch(e) {
            console.log(e) } 
        }

        fetchData()

        return () => {
            cek = false
            console.log(cek, user.uid)
        }
    }, [])

    return (
        <View style={styles.page}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <ImageBackground source={ImageHeader} style={styles.header}>
                <Image source={Logo} style={styles.logo}/>
                <View style={styles.hello}>
                    <Text style={styles.selamat}>Selamat Datang</Text>
                    {loading ? 
                    <LoadingName/> :
                    <Text style={styles.username}>{nama}</Text> }
                </View>
                </ImageBackground>
                <Saldo />
                <View style={styles.layanan}>
                <Text style={styles.label}>Layanan Kami</Text>
                <View style={styles.iconLayanan}>
                    <ButtonIcon title = "Kiloan" type = "layanan" goto = "Kiloan" />
                    <ButtonIcon title = "Satuan" type = "layanan" goto = "Satuan"/>
                    <ButtonIcon title = "VIP" type = "layanan" goto = "VIP"/>
                    <ButtonIcon title = "Karpet" type = "layanan"/>
                    <ButtonIcon title = "Setrika Saja" type = "layanan"/>
                    <ButtonIcon title = "Express" type = "layanan"/>
                </View>
                </View>
                <View style={styles.pesananAktif}>
                <Text style={styles.label}>Pesanan Aktif</Text>
                
                {loading ? <LoadingCardHome/> :
                <FlatList
                    data={pesanan}
                    renderItem={({ item }) => <CardHome item={item} />}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                /> }

                </View>
            </ScrollView>
        </View>
    )
}

export default Home

const windowWidht = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    page:{
        flex: 1,
        backgroundColor: 'white'  
    },
    header: {
        width: windowWidht,
        height: windowHeight * 0.27,
        paddingTop: 10,
        paddingHorizontal: 30
    },
    logo:{
        width: windowWidht * 0.25,
        height: windowHeight * 0.065
    },
    hello:{
        marginTop: windowHeight * 0.02
    },
    selamat:{
        fontSize: 24,
        fontFamily: 'TitilliumWeb-Regular'
    },
    username:{
        fontSize:18,
        fontFamily: 'TitilliumWeb-Bold'
    },
    layanan:{
        paddingLeft: 30,
        paddingTop: 15
    },
    label:{
        fontSize: 18,
        fontFamily: 'TitilliumWeb-Bold'
    },
    iconLayanan:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        flexWrap: 'wrap'
    },
    pesananAktif:{
        paddingTop: 10,
        paddingHorizontal: 30,
        backgroundColor: WARNA_ABU_ABU,
        flex: 1,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20
    }

})
