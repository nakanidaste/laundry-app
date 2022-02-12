import styled from 'styled-components'

export const Container = styled.View`
    flex: 1;
    //justify-content: center;
    align-items: center;
    padding: 20px;
`
export const Card = styled.TouchableOpacity`
    background-color: #fff;
    width: 350px
    margin-bottom: 20px;
    border-radius: 10px;
    border-width: 1px;
    border-color: #55CB95;
    box-shadow: 1px 1px 5px #ccc;
`
export const UserInfo = styled.View`
    flex-direction: row;
    justify-content: flex-start;
`
export const IconPesanan = styled.View`
    width: 50px;
    height: 50px;
    padding: 10px;
`
export const UserInfoText = styled.View`
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;
`
export const TipeLayanan = styled.Text`
    font-size: 16px;
    font-weight: bold;
    font-family: 'TitilliumWeb-Bold'
    padding-top: 10px;
    padding-left: 5px;
`
export const Tanggal = styled.Text`
    font-size: 14px;
    font-family: 'TitilliumWeb-Regular'
    padding-left: 5px;
    padding-vertical: 5px;
`
export const DetailBiaya = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-right: 10px;
    width: 320px
`
export const JumlahItem = styled.Text`
    font-size: 16px;
    font-family: 'TitilliumWeb-Bold'
    padding-bottom: 10px;
    padding-left: 5px;
`
export const Biaya = styled.Text`
    font-size: 16px;
    font-family: 'TitilliumWeb-Bold'
    padding-bottom: 10px;
`
export const Status = styled.Text`
    font-size: 16px;
    font-family: 'TitilliumWeb-Bold'
    padding-bottom: 10px;
    padding-left: 5px;
    padding-top: 15px;
    color: ${props => props.active ? '#55CB95' : '#000'}
`