import React from "react";
import { useTheme } from "@react-navigation/native";
import { ActivityIndicator, View } from "react-native";

const LoadingSpinner = ({ size, spacing }) => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        padding: spacing || 4,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.bc,
      }}
    >
      <ActivityIndicator size={size} animating={true} />
    </View>
  );
};

export default LoadingSpinner;
