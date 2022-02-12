import { View } from 'react-native'
import React from 'react'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const LoadingCardPesanan = () => {
  return (
    <SkeletonPlaceholder>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 15 }}>
            <View style={{ width: 350, height: 130, borderRadius: 4 }} />
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 15 }}>
            <View style={{ width: 350, height: 130, borderRadius: 4 }} />
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 15 }}>
            <View style={{ width: 350, height: 130, borderRadius: 4 }} />
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 15 }}>
            <View style={{ width: 350, height: 130, borderRadius: 4 }} />
        </View>
    </SkeletonPlaceholder>
  )
}

export default LoadingCardPesanan