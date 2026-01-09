import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONTS, SHADOWS, SIZES } from "../../utils/theme";

interface SocialButtonProps {
  onPress: () => void;
  title?: string;        
  icon?: any;            
  loading?: boolean;
  disabled?: boolean;
  style?: any;          
}

export default function SocialButton({
  onPress,
  title,
  icon = require("../../../assets/social/google.webp"),
  loading = false,
  disabled = false,
  style,
}: SocialButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[
        styles.base,
        isDisabled && styles.disabled,
        style,
      ]}
      activeOpacity={0.7}
      disabled={isDisabled}
      onPress={onPress}
    >
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator color={COLORS.primary} />
        ) : (
          <>
            <Image source={icon} style={styles.icon} />
            <Text style={styles.text}>{title}</Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: COLORS.card,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.card,
  },

  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    width: 22,
    height: 22,
    resizeMode: "contain",
    marginRight: 12,
  },

  text: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.medium,
    color: COLORS.text,
  },

  disabled: {
    opacity: 0.4,
  },
});