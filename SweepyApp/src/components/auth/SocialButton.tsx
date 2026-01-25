import { socialButtonStyles } from "@/styles/components/SocialButtonStyles";
import {
    ActivityIndicator,
    Image,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { COLORS } from "../../utils/constants/theme";

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
      style={[styles.base, isDisabled && styles.disabled, style]}
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

const styles = socialButtonStyles;
