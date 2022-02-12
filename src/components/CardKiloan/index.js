import React, { useContext, useState, useEffect, useRef } from 'react'
import { Modal, View, StyleSheet, Image, Text, TouchableOpacity, Animated } from 'react-native'
import { Card, UserInfo, TipeLayanan, UserInfoText, Tanggal, DetailBiaya, JumlahItem, Biaya, Status } from '../../styles/CardStyles';
import { AuthContext } from '../../loginscreen/AuthProvider';
import { WARNA_UTAMA } from '../../utils/constant';
import moment from 'moment';

const ModalPop = ({visible, children}) => {

    const [showModal, setShowModal] = useState(visible)
    const scaleValue = useRef(new Animated.Value(0)).current

    useEffect(() => {
        toggleModal()
    }, [visible])

    const toggleModal = () => {
        if(visible) {
            setShowModal(true)
            Animated.spring(scaleValue, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            }).start()
        } else {
            setTimeout(() => setShowModal(false), 200)
            Animated.timing(scaleValue, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }).start()
        }
    }

        return (
            <Modal transparent visible = {showModal}>
                <View style={styles.modalBackground}>
                    <Animated.View 
                        style={[styles.modalContainer, {transform:[{scale:scaleValue}]}]}>
                        {children}
                    </Animated.View>
                </View>
            </Modal>
        )
}

const CardKiloan = ({item}) => {

    const {user} = useContext(AuthContext);
    const [visible, setVisible] = useState(false)
    
    if (item.tipeLayanan === 'Kiloan') {

    return (
        <>
        {user.uid === item.userId ?
        <Card onPress={() => setVisible(true)}>
            
            <ModalPop visible={visible}>
                <View style={styles.modalView}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => setVisible(false)}>
                        <Image 
                            source={require('../../assets/images/cancel.png')}
                            style={styles.cancelIcon}
                        />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.logoContainer}>
                    <Image source={require('../../assets/images/logo.png')} style={styles.logo}/>
                </View>
                <Text style={styles.textHeader}>Detail Order</Text>
                
                <View style={styles.detailOrder}>
                <View style={styles.detailContainer}>
                    <Text style={styles.text}>Order ID            : </Text>
                    <Text style={styles.text}>Tanggal Order : </Text>
                    <Text style={styles.text}>Tipe Layanan   : </Text>
                    <Text style={styles.text}>Quantity            : </Text>
                    <Text style={styles.text}>Lama Proses    : </Text>
                    <Text style={styles.text}>Alamat               : </Text>
                    <Text style={styles.text}>Catatan              : </Text>
                </View>
                <View style={styles.dataContainer}>
                    <Text style={styles.text}>{item.id}</Text>
                    <Text style={styles.text}>{moment(item.tanggal.toDate()).format('MMMM Do YYYY, h:mm:ss a')}</Text>
                    <Text style={styles.text}>{item.tipeLayanan}</Text>
                    <Text style={styles.text}>{item.berat} Kg</Text>
                    <Text style={styles.text}>{item.lamaPenyucian} Hari</Text>
                    <Text style={styles.text}>{item.alamat}</Text>
                    <Text style={styles.text}>{item.catatan}</Text>
                </View>
                </View>
                <View style={styles.gap}/>
                <View style={styles.detailOrder}>
                <View style={styles.detailContainer}>
                    <Text style={styles.text}>Ongkir                : </Text>
                    <Text style={styles.text}>Biaya                  : </Text>
                    <Text style={styles.total}>Total                   : </Text>
                </View>
                <View style={styles.dataContainer}>
                    <Text style={styles.text}>Rp 12.000</Text>
                    <Text style={styles.text}>Rp 10.000</Text>
                    <Text style={styles.total}>Rp 22.000</Text>
                </View>
                </View>
            </ModalPop>

            <UserInfo>
                <UserInfoText>
                    <TipeLayanan>{item.tipeLayanan}</TipeLayanan>
                    <Tanggal>{moment(item.tanggal.toDate()).format('MMMM Do YYYY, h:mm:ss a')}</Tanggal>
                    <DetailBiaya>
                    <JumlahItem>{item.berat} Kg</JumlahItem>
                    <Biaya>Rp 10.000 {item.harga}</Biaya>
                    </DetailBiaya>
                    <Status active={item.status} >{item.displayStatus}</Status>
                </UserInfoText>
            </UserInfo>
        </Card> : null}
        </>
    )
    } else {
        return (
        <>
        {user.uid === item.userId ?
        <Card>
            <UserInfo>
                <UserInfoText>
                    <TipeLayanan>{item.tipeLayanan}</TipeLayanan>
                    <Tanggal>{moment(item.tanggal.toDate()).format('MMMM Do YYYY, h:mm:ss a')}</Tanggal>
                    <DetailBiaya>
                    <JumlahItem>{item.jumlahPakaian} Potong</JumlahItem>
                    <Biaya>Rp 10.000 {item.harga}</Biaya>
                    </DetailBiaya>
                    <Status active={item.status} >{item.displayStatus}</Status>
                </UserInfoText>
            </UserInfo>
        </Card> : null}
        </>
    )
    }
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        width: '90%',
        backgroundColor: WARNA_UTAMA,
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 20,
        elevation: 20
    },
    modalView: {
        alignItems: 'center'
    },
    header: {
        width: '100%',
        height: 10,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    cancelIcon: {
        height: 30,
        width: 30
    },
    logoContainer: {
        alignItems: 'center'
    },
    logo: {
        height: 55,
        width: 120
    },
    textHeader: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'TitiliumWeb-Bold',
        textAlign: 'center'
    },
    detailOrder: {
        flexDirection: 'row',
        width: '100%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'green',
        shadowColor: "#000",
        shadowOffset: {
	    width: 0,
	    height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
        backgroundColor: 'white'
    },
    detailContainer: {
        flexDirection: 'column',
        width: '40%',
    },
    dataContainer: {
        flexDirection: 'column',
        width: '60%',
        alignItems: 'flex-end',
    },
    gap: {
        marginVertical: 10
    },
    text: {
        fontFamily: 'TitilliumWeb-Bold',
        fontSize: 13,
        padding: 5
    },
    total: {
        padding: 5,
        fontSize: 13,
        fontFamily: 'TitilliumWeb-Bold'
    }
})

export default CardKiloan

