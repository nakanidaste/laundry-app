import { View } from 'react-native'
import React from 'react'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const LoadingName = () => {
  return (
    <SkeletonPlaceholder>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ width: 120, height: 20, borderRadius: 4 }} />
        </View>
    </SkeletonPlaceholder>
  )
}

export default LoadingName
