import React, {useContext} from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { IconPesananAktif, IconKiloan, IconSatuan } from '../../assets'
import { AuthContext } from '../../loginscreen/AuthProvider';
import { WARNA_ABU_ABU, WARNA_UTAMA, WARNA_WARNING } from '../../utils/constant'

const CardHome = ({ item }) => {

    const {user} = useContext(AuthContext);

    return (
        <>
        {user.uid === item.userId ?
        <View style={styles.container}>
            {item.tipeLayanan === 'Kiloan' ? <IconKiloan/> : <IconSatuan/>}
            <View style={styles.text}>
                <Text style={styles.title}>Pesanan {item.id}</Text>
                <Text style={styles.status}>{item.displayStatus}</Text>
            </View>
        </View> : null }
        </>
    )
}

export default CardHome

const windowWidht = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        padding: 17,
        flexDirection: 'row',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
	    width: 0,
	    height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
        marginVertical: windowHeight * 0.02,
        alignItems: 'center'
    },
    text:{
        marginLeft: windowWidht * 0.03
    },
    title:{
        fontSize: 16,
        fontFamily: 'TitilliumWeb-SemiBold',
        marginBottom: 5
    },
    status: {
        fontSize: 14,
        fontFamily: 'TitilliumWeb-Light',
        color: WARNA_WARNING
    }
})
