import { useAnunciosStore } from "@/stores/anuncios.store";
import { anunciosService } from "@/services/anunciosService";
import { explorarStyles } from "@/styles/pages/app/explorarStyles";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExplorarScreen() {
  const { anuncios } = useAnunciosStore();
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [searchText, setSearchText] = useState("");

  const categories = useMemo(() => {
    const cats = anunciosService.getCategories(anuncios);
    return ["Todos", ...cats];
  }, [anuncios]);

  const products = useMemo(() => {
    const filters = {
      category: selectedCategory !== "Todos" ? selectedCategory : undefined,
    } as const;

    return anunciosService.searchAndSort(
      anuncios,
      searchText,
      { key: "price", order: "asc" },
      filters
    );
  }, [anuncios, searchText, selectedCategory]);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Sweepy</Text>
          <View style={styles.searchButton}>
            <Ionicons name="search" size={20} color="#999" />
            <TextInput
              style={styles.searchPlaceholder}
              placeholder="Buscar artículos..."
              placeholderTextColor="#999"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                category === selectedCategory && styles.categoryButtonActive,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  category === selectedCategory && styles.categoryTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Products Grid */}
        <View style={styles.productsGrid}>
          {products.map((product) => (
            <TouchableOpacity key={product.id} style={styles.productCard}>
              <Image
                source={{
                  uri:
                    product.imagenes?.[0] ??
                    "https://via.placeholder.com/200/CCCCCC/FFFFFF?text=Foto",
                }}
                style={styles.productImage}
              />
              <View style={styles.productInfo}>
                <Text style={styles.productTitle} numberOfLines={2}>
                  {product.title}
                </Text>
                <Text style={styles.productPrice}>€{product.price}</Text>
                <View style={styles.productMeta}>
                  <Ionicons name="pricetag" size={14} color="#999" />
                  <Text style={styles.productLocation}>{product.category}</Text>
                </View>
                <Text style={styles.productTime}>
                  {new Date(product.createdAt).toLocaleDateString()}
                </Text>
              </View>
              <TouchableOpacity style={styles.favoriteButton}>
                <Ionicons name="heart-outline" size={20} color="#FF3B30" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = explorarStyles;
