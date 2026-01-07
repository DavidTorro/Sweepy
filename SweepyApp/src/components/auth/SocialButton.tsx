import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONTS, SHADOWS, SIZES } from "../../utils/theme";

interface GoogleButtonProps {
  onPress: () => void;
}

export default function SocialButton({ onPress }: GoogleButtonProps) {
  return (
    <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={onPress}>
      <View style={styles.content}>

        <Image
          source={require("../../../assets/social/google.webp")}
          style={styles.icon}
        />

        <Text style={styles.text}>Continuar con Google</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "85%",
    backgroundColor: COLORS.card,
    paddingVertical: 14,
    borderRadius: 999,
    justifyContent: "center",
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
});
