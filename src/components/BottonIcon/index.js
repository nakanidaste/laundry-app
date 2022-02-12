import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { IconAddSaldo, IconGetPoint, IconEkspress, IconKarpet, IconKiloan, IconSatuan, IconSetrikaSaja, IconVIP } from '../../assets'
import { WARNA_SEKUNDER } from '../../utils/constant'
import { useNavigation } from '@react-navigation/native';
        
const ButtonIcon = ({title, type, goto}) => {

    const navigation = useNavigation(); 

    const Icon = () => {
        if(title === "Add Saldo") return <IconAddSaldo/>

        if(title === "Get Point") return <IconGetPoint/>

        if(title === "Kiloan", goto === "Kiloan") return <IconKiloan/>

        if(title === "Karpet") return <IconKarpet/>

        if(title === "Express") return <IconEkspress/>

        if(title === "Satuan", goto === "Satuan") return <IconSatuan/>

        if(title === "Setrika Saja") return <IconSetrikaSaja/>

        if(title === "VIP") return <IconVIP/>

        return <IconAddSaldo/>
    }



    return (
        <TouchableOpacity style={styles.container(type)} onPress={() => navigation.navigate(goto)}>
            <View style={styles.icon(type)}>
                <Icon/>
            </View>
            <Text style={styles.text(type)}>{title}</Text>
        </TouchableOpacity>
    )
}

export default ButtonIcon

const styles = StyleSheet.create({
    container: (type) => ({
        marginBottom: type === 'layanan' ? 12 : 0,
        marginRight: type === 'layanan' ? 30 : 0,
    }),
   
    icon: (type) => ({
        backgroundColor: WARNA_SEKUNDER,
        padding: type === "layanan" ? 12 : 7,
        borderRadius: 10
    }),
    text: (type) => ({
        fontSize: type === "layanan" ? 14 : 10,
        fontFamily: type === "layanan" ? 'TitilliumWeb-Light' : 'TitilliumWeb-Regular',
        textAlign: 'center'
    })
})
