import Button from "@/components/ui/Button";
import { COLORS } from "@/utils/theme";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { MotiImage } from "moti";
import { StyleSheet, Text, View } from "react-native";

export default function AdminPortal() {
  return (
    <LinearGradient
      colors={[COLORS.background, COLORS.mint, COLORS.primaryLight]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        {/* Animacion con Moti */}
        <MotiImage
          source={require("../../assets/resources/404.png")}
          style={styles.logo}
          from={{ translateY: 0 }}
          animate={{
            translateY: -8,
            translateX: [0, -6, 6, -4, 4, -2, 2, 0],
          }}
          transition={{
            translateY: {
              type: "timing",
              duration: 2000,
              loop: true,
              repeatReverse: true,
            },
            translateX: {
              type: "timing",
              duration: 600,
              loop: true,
            },
          }}
        />

        <Text style={styles.title}>
          Página no encontrada.{"\n"} Por favor, vuelve a la página principal.

          <Button
            title="Volver a la página principal"
            variant="ghost"
            onPress={() => {
              router.replace("/auth/login");
              console.log("Se ha vuelto a la página principal");
            }}
            />
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    width: 350,
    height: 350,
    resizeMode: "contain",
    marginBottom: -80,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
    textAlign: "center",
  },
});