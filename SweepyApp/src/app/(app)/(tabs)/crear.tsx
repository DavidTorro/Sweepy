import RequireAuth from "@/components/auth/RequireAuth";
import { useCreateAnuncioForm } from "@/hooks/useCreateAnuncioForm";
import { useAnunciosStore } from "@/stores/anuncios.store";
import { anunciosService } from "@/services/anunciosService";
import { crearStyles } from "@/styles/pages/app/crearStyles";
import { theme } from "@/utils/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
    Alert,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CrearScreen() {
  const [photos, setPhotos] = useState<string[]>([]);
  const { crearAnuncio, anuncios } = useAnunciosStore();

  const categories = useMemo(() => {
    const cats = anunciosService.getCategories(anuncios);
    return cats.length ? cats : ["electrónica", "muebles", "otros"];
  }, [anuncios]);

  const conditions = useMemo(() => {
    const conds = Array.from(new Set(anuncios.map((a) => a.condition)));
    return conds.length ? conds : ["excelente", "bueno", "usado"];
  }, [anuncios]);

  const form = useCreateAnuncioForm({
    onSubmit: async (data) => {
      if (photos.length === 0) {
        Alert.alert("Añade fotos", "Sube al menos 1 foto (máx 10)");
        return;
      }
      if (photos.length > 10) {
        Alert.alert("Demasiadas fotos", "Máximo 10 fotos por anuncio");
        return;
      }

      const priceNumber = parseFloat(data.price);
      if (Number.isNaN(priceNumber) || priceNumber <= 0) {
        form.setFieldError("price", "El precio debe ser mayor a 0");
        return;
      }

      crearAnuncio({
        title: data.title,
        description: data.description,
        price: priceNumber,
        category: data.category,
        condition: data.condition as "Nuevo" | "Como nuevo" | "Buen estado" | "Aceptable",
        imagenes: photos,
        usuarioId: "1", // TODO: obtener del store de auth
      });
      Alert.alert("✓ Éxito", "Tu anuncio ha sido publicado correctamente");
      form.reset();
      setPhotos([]);
    },
  });

  return (
    <RequireAuth>
      <SafeAreaView style={styles.container} edges={["top"]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Crear anuncio</Text>
            <Text style={styles.headerSubtitle}>
              Rellena los detalles de tu artículo
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Fotos */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Fotos</Text>
              <Text style={styles.sectionSubtitle}>
                Mínimo 1 foto, máximo 10
              </Text>
              <View style={styles.photosContainer}>
                <TouchableOpacity style={styles.addPhotoButton}>
                  <Ionicons
                    name="camera"
                    size={40}
                    color={theme.colors.primary}
                  />
                  <Text style={styles.addPhotoText}>Añadir fotos</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Título */}
            <View style={styles.section}>
              <Text style={styles.label}>
                Título del anuncio <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Ej: iPhone 14 Pro, casi nuevo"
                placeholderTextColor="#ccc"
                value={form.values.title}
                onChangeText={(text) => form.setFieldValue("title", text)}
                maxLength={50}
              />
              <Text style={styles.charCount}>
                {form.values.title.length}/50
              </Text>
              {form.errors.title && (
                <Text style={styles.errorText}>{form.errors.title}</Text>
              )}
            </View>

            {/* Descripción */}
            <View style={styles.section}>
              <Text style={styles.label}>
                Descripción <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Describe el estado, características especiales, etc."
                placeholderTextColor="#ccc"
                value={form.values.description}
                onChangeText={(text) => form.setFieldValue("description", text)}
                multiline
                numberOfLines={4}
                maxLength={500}
                textAlignVertical="top"
              />
              <Text style={styles.charCount}>
                {form.values.description.length}/500
              </Text>
              {form.errors.description && (
                <Text style={styles.errorText}>{form.errors.description}</Text>
              )}
            </View>

            {/* Categoría */}
            <View style={styles.section}>
              <Text style={styles.label}>
                Categoría <Text style={styles.required}>*</Text>
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.categoriesContainer}
                contentContainerStyle={styles.categoriesContent}
              >
                {categories.map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    style={[
                      styles.categoryButton,
                      form.values.category === cat &&
                        styles.categoryButtonSelected,
                    ]}
                    onPress={() => form.setFieldValue("category", cat)}
                  >
                    <Text
                      style={[
                        styles.categoryButtonText,
                        form.values.category === cat &&
                          styles.categoryButtonTextSelected,
                      ]}
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              {form.errors.category && (
                <Text style={styles.errorText}>{form.errors.category}</Text>
              )}
            </View>

            {/* Estado */}
            <View style={styles.section}>
              <Text style={styles.label}>
                Estado <Text style={styles.required}>*</Text>
              </Text>
              <View style={styles.conditionsContainer}>
                {conditions.map((cond) => (
                  <TouchableOpacity
                    key={cond}
                    style={[
                      styles.conditionButton,
                      form.values.condition === cond &&
                        styles.conditionButtonSelected,
                    ]}
                    onPress={() => form.setFieldValue("condition", cond)}
                  >
                    <Text
                      style={[
                        styles.conditionButtonText,
                        form.values.condition === cond &&
                          styles.conditionButtonTextSelected,
                      ]}
                    >
                      {cond}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              {form.errors.condition && (
                <Text style={styles.errorText}>{form.errors.condition}</Text>
              )}
            </View>

            {/* Precio */}
            <View style={styles.section}>
              <Text style={styles.label}>
                Precio (€) <Text style={styles.required}>*</Text>
              </Text>
              <View style={styles.priceInputContainer}>
                <Text style={styles.priceSymbol}>€</Text>
                <TextInput
                  style={styles.priceInput}
                  placeholder="0.00"
                  placeholderTextColor="#ccc"
                  value={form.values.price}
                  onChangeText={(text) => form.setFieldValue("price", text)}
                  keyboardType="decimal-pad"
                />
              </View>
              {form.errors.price && (
                <Text style={styles.errorText}>{form.errors.price}</Text>
              )}
            </View>

            {/* Ubicación */}
            <View style={styles.section}>
              <Text style={styles.label}>Ubicación</Text>
              <TouchableOpacity style={styles.locationButton}>
                <Ionicons
                  name="location"
                  size={20}
                  color={theme.colors.primary}
                />
                <Text style={styles.locationButtonText}>Usar mi ubicación</Text>
              </TouchableOpacity>
            </View>

            {/* Botones de acción */}
            <View style={styles.actionsContainer}>
              <TouchableOpacity
                style={styles.publishButton}
                onPress={form.handleSubmit}
                disabled={form.isSubmitting}
              >
                <Text style={styles.publishButtonText}>
                  {form.isSubmitting ? "Publicando..." : "Publicar anuncio"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.draftButton}>
                <Text style={styles.draftButtonText}>
                  Guardar como borrador
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </RequireAuth>
  );
}

const styles = crearStyles;
