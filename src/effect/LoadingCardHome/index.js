import { View } from 'react-native'
import React from 'react'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const LoadingCardHome = () => {
  return (
    <SkeletonPlaceholder>
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
            <View style={{ width: 350, height: 70, borderRadius: 4 }} />
        </View>
    </SkeletonPlaceholder>
  )
}

export default LoadingCardHome
