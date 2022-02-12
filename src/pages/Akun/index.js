import React, {useContext, useState, useEffect} from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Alert, Platform } from 'react-native'
import { AuthContext } from '../../loginscreen/AuthProvider';
import { WARNA_UTAMA } from '../../utils/constant';
import { UploadProgress } from '../../components'
import { LoadingNameAkun } from '../../effect';
import BottomSheet from 'reanimated-bottom-sheet'
import Animated from 'react-native-reanimated';
import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage';

const Akun = () => {
    const {user, logout} = useContext(AuthContext);
    const [nama, setNama] = useState('')
    const [image, setImage] = useState("file:///storage/emulated/0/Android/data/com.coba/files/Pictures/cb425056-724e-44ae-8298-d9fb6eb88ee1.jpg")
    const [uploading, setUploading] = useState(false)
    const [progress, setProgress] = useState(0)
    const [loading, setLoading] = useState(true)

    const bs = React.createRef(null)
    const fall = new Animated.Value(1)

    useEffect(() => {
        let cek = true;
        function fetchData() {
        if (cek) {
            firestore()
            .collection('users')
            .doc(user.uid)
            .get()
            .then(doc => {
                setNama(doc.data().nama)
                setImage(doc.data().userImg)
            })
            .catch((e) => {
                console.log('Error has occured: ' + e )
            }) }

            if(loading) {
                setLoading(false)
            }
        }
        fetchData()
        return () => {
            cek = false
        }
    }, [user])

    const submitPhoto = async ({ imageUri }) => {
        const uploadUri = imageUri;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

        // Add timestamp to file name
        const extension = filename.split('.').pop();
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + Date.now() + '.' + extension;

        setUploading(true)
        setProgress(0)

        //submit photo to storage
        const storageRef = storage().ref(`profile_picture/${filename}`)
        const task = storageRef.putFile(uploadUri);
        
        //set Progress
        task.on('state_changed', taskSnapshot => {
            console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
            
        setProgress(
            Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100
        )
        });

        try {
            await task

            //update profile
            const url = await storageRef.getDownloadURL()
            const update = firestore().collection('users').doc(user.uid).update({ userImg: url })
            
            await update

            setUploading(false)
            setImage(url)

            Alert.alert(
                'Image uploaded!',
                'Your image has been uploaded successfully'
            )

            return url;

        } catch(e) {
            console.log(e);
            return null
        }   
    }

    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 300,
            cropping: true,
        }).then(image => {
            console.log(image);
            const imageUri = Platform.OS === 'android' ? image.path : image.sourceURL
            bs.current.snapTo(1);
            submitPhoto({imageUri})   
        });
    }

    const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true
        }).then(image => {
            console.log(image);
            const imageUri = Platform.OS === 'android' ? image.path : image.sourceURL
            bs.current.snapTo(1);   
            submitPhoto({imageUri})
        });
    }

    const renderInner = () => (
        <View style={styles.panel}>
            <View style={{alignItems: 'center'}}>
                <Text style={styles.panelTitle}>Upload Photo</Text>
                <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
            </View>
            <TouchableOpacity style={styles.panelButton}>
                    <Text style={styles.panelButtonTitle} onPress={takePhotoFromCamera}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.panelButton}>
                    <Text style={styles.panelButtonTitle} onPress={choosePhotoFromLibrary}>Choose From Library</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.panelButton} onPress={() => bs.current.snapTo(1)}>
                    <Text style={styles.panelButtonTitle}>Cancel</Text>
            </TouchableOpacity>
        </View>
    )

    const renderHeader = () => (
        <View style={styles.renderHeader}>
            <View style={styles.panelHeader}>
                <View style={styles.panelHandle}></View>
            </View>
        </View>
    )
       
    return (
        <>
        <View>
        <BottomSheet
            ref={bs}
            snapPoints={[330, 0]}
            renderContent={renderInner}
            renderHeader={renderHeader}
            initialSnap={1}
            callbackNode={fall}
        />
        <Animated.View
            style={{opacity: Animated.add(0.5, Animated.multiply(fall, 1.0))}}>
            <ScrollView
                contentContainerStyle={{justifyContent: 'center', alignItems: 'center',}}
                showsVerticalScrollIndicator={false}>
                <View style={styles.view}>
                <View></View>
                <View></View>
                </View>

                <View style={styles.nama}>
                <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
                <Image
                    style={styles.userImg}
                    source={{
                        uri: image,
                    }}/>
                </TouchableOpacity>
                {loading ? <LoadingNameAkun/> :
                <Text style={styles.username}>{nama}</Text> }
                {loading ? <LoadingNameAkun/> :
                <Text style={styles.email}>{user?.email}</Text> }
                </View>
                
                <TouchableOpacity style={styles.userBtn}>
                <Image 
                    style={styles.icon}
                    source={require('../../assets/images/support.png')}/>
                <Text style= {styles.userBtnText}>Customer Service</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.userBtn}>
                <Image 
                    style={styles.icon}
                    source={require('../../assets/images/version.png')}/>
                <Text style= {styles.userBtnText}>Version</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.logout}
                    onPress={() => logout()}>
                    <Image 
                    style={styles.icon}
                    source={require('../../assets/images/logout.png')}/>
                    <Text style= {styles.userBtnText}>Log Out</Text>
                </TouchableOpacity>
               
            </ScrollView>
            </Animated.View>
        </View>
        {uploading ? <UploadProgress process={progress}/> : null}
        </>
)}

export default Akun

const styles = StyleSheet.create({
    view: {
        padding: 10,
        width: '100%',
        backgroundColor: WARNA_UTAMA,
        height: 150
    },
    header: {
        width: 30,
        height: 30
    },
    nama: {
        alignItems: 'center'
    },
    userImg: {
        width: 140,
        height: 140,
        borderRadius: 100,
        marginTop: -70,
        marginBottom: 10
    },
    username: {
        fontSize: 25,
        fontFamily: 'TitilliumWeb-Bold',
    },
    email: {
        fontSize: 15,
        fontFamily: 'TitilliumWeb-Regular'
    },
    userBtn: {
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: "#fff",
        width: '90%',
        padding: 20,
        paddingBottom: 22,
        borderRadius: 10,
        shadowOpacity: 80,
        elevation: 15,
        marginTop: 20,
    },
    logout:{
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: "#fff",
        width: '90%',
        padding: 20,
        paddingBottom: 22,
        borderRadius: 10,
        shadowOpacity: 80,
        elevation: 15,
        marginTop: 20,
        marginBottom: 30
    },
    icon: {
        width: 20,
        height: 20
    },
    userBtnText: {
        fontSize: 16,
        color: "#818181",
        fontFamily: 'TitilliumWeb-Bold',
        marginLeft: 10
    },
    renderHeader: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: {width: -1, height: -3},
        shadowRadius: 2,
        shadowOpacity: 0.4,
        // elevation: 5,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
    },
    panelHeader: {
        alignItems: 'center'
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10
    },
    panelTitle: {
        fontSize: 27,
        height: 35,
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
    },
    panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: WARNA_UTAMA,
        alignItems: 'center',
        marginVertical: 7,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
    
})
