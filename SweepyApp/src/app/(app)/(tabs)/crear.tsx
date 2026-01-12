import { theme } from '@/utils/theme';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CrearScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [condition, setCondition] = useState<string | null>(null);

  const categories = [
    'Electrónica',
    'Muebles',
    'Ropa',
    'Deportes',
    'Libros',
    'Hogar',
    'Juguetes',
    'Otros',
  ];

  const conditions = ['Nuevo', 'Como nuevo', 'Buen estado', 'Aceptable'];

  const handlePublish = () => {
    if (!title.trim() || !price.trim() || !category || !condition) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return;
    }

    Alert.alert('✓ Éxito', 'Tu anuncio ha sido publicado correctamente');
    // Aquí irían las acciones para publicar
    setTitle('');
    setDescription('');
    setPrice('');
    setCategory(null);
    setCondition(null);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
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
                <Ionicons name="camera" size={40} color={theme.colors.primary} />
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
                      condition === cond && styles.conditionButtonTextSelected,
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
              <Ionicons name="location" size={20} color={theme.colors.primary} />
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
              <Text style={styles.draftButtonText}>Guardar como borrador</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#999',
  },
  form: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#999',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  required: {
    color: '#FF3B30',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#333',
  },
  textArea: {
    height: 100,
    paddingTop: 10,
  },
  charCount: {
    fontSize: 12,
    color: '#ccc',
    marginTop: 4,
    textAlign: 'right',
  },
  photosContainer: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: theme.colors.primary,
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  addPhotoButton: {
    alignItems: 'center',
    gap: 8,
  },
  addPhotoText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  categoriesContainer: {
    marginHorizontal: -8,
  },
  categoriesContent: {
    paddingHorizontal: 8,
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: 'white',
  },
  categoryButtonSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  categoryButtonText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#666',
  },
  categoryButtonTextSelected: {
    color: 'white',
  },
  conditionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  conditionButton: {
    flex: 1,
    minWidth: '48%',
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  conditionButtonSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  conditionButtonText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#666',
  },
  conditionButtonTextSelected: {
    color: 'white',
  },
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingHorizontal: 12,
  },
  priceSymbol: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginRight: 4,
  },
  priceInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  locationButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.primary,
  },
  actionsContainer: {
    gap: 10,
    marginTop: 16,
  },
  publishButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  publishButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  draftButton: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    paddingVertical: 12,
    alignItems: 'center',
  },
  draftButtonText: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});
