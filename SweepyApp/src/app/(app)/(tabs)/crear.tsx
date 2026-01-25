import RequireAuth from "@/components/auth/RequireAuth";
import { crearStyles } from "@/styles/pages/app/crearStyles";
import { theme } from "@/utils/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
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
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [condition, setCondition] = useState<string | null>(null);

  const categories = [
    "Electrónica",
    "Muebles",
    "Ropa",
    "Deportes",
    "Libros",
    "Hogar",
    "Juguetes",
    "Otros",
  ];

  const conditions = ["Nuevo", "Como nuevo", "Buen estado", "Aceptable"];

  const handlePublish = () => {
    if (!title.trim() || !price.trim() || !category || !condition) {
      Alert.alert("Error", "Por favor completa todos los campos obligatorios");
      return;
    }

    Alert.alert("✓ Éxito", "Tu anuncio ha sido publicado correctamente");
    // Aquí irían las acciones para publicar
    setTitle("");
    setDescription("");
    setPrice("");
    setCategory(null);
    setCondition(null);
  };

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
                value={title}
                onChangeText={setTitle}
                maxLength={50}
              />
              <Text style={styles.charCount}>{title.length}/50</Text>
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
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
                maxLength={500}
                textAlignVertical="top"
              />
              <Text style={styles.charCount}>{description.length}/500</Text>
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
                      category === cat && styles.categoryButtonSelected,
                    ]}
                    onPress={() => setCategory(cat)}
                  >
                    <Text
                      style={[
                        styles.categoryButtonText,
                        category === cat && styles.categoryButtonTextSelected,
                      ]}
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
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
                      condition === cond && styles.conditionButtonSelected,
                    ]}
                    onPress={() => setCondition(cond)}
                  >
                    <Text
                      style={[
                        styles.conditionButtonText,
                        condition === cond &&
                          styles.conditionButtonTextSelected,
                      ]}
                    >
                      {cond}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
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
                  value={price}
                  onChangeText={setPrice}
                  keyboardType="decimal-pad"
                />
              </View>
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
                onPress={handlePublish}
              >
                <Text style={styles.publishButtonText}>Publicar anuncio</Text>
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
