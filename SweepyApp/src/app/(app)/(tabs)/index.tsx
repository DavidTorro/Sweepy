import { explorarStyles } from "@/styles/pages/app/explorarStyles";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  location: string;
  category: string;
  timestamp: string;
}

export default function ExplorarScreen() {
  const [products] = useState<Product[]>([
    {
      id: "1",
      title: "iPhone 14 Pro",
      price: 800,
      image: "https://via.placeholder.com/200/007AFF/FFFFFF?text=iPhone+14",
      location: "Madrid",
      category: "Electrónica",
      timestamp: "hace 2 horas",
    },
    {
      id: "2",
      title: "Bicicleta de montaña",
      price: 250,
      image: "https://via.placeholder.com/200/34C759/FFFFFF?text=Bicicleta",
      location: "Barcelona",
      category: "Deportes",
      timestamp: "hace 1 día",
    },
    {
      id: "3",
      title: "Sofá gris 3 plazas",
      price: 150,
      image: "https://via.placeholder.com/200/FF9500/FFFFFF?text=Sofá",
      location: "Valencia",
      category: "Muebles",
      timestamp: "hace 3 días",
    },
    {
      id: "4",
      title: "MacBook Air M1",
      price: 900,
      image: "https://via.placeholder.com/200/5856D6/FFFFFF?text=MacBook",
      location: "Bilbao",
      category: "Electrónica",
      timestamp: "hace 5 horas",
    },
  ]);

  const categories = [
    "Todos",
    "Electrónica",
    "Muebles",
    "Deportes",
    "Ropa",
    "Libros",
  ];

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Sweepy</Text>
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons name="search" size={20} color="#999" />
            <Text style={styles.searchPlaceholder}>Buscar artículos...</Text>
          </TouchableOpacity>
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
                category === "Todos" && styles.categoryButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  category === "Todos" && styles.categoryTextActive,
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
                source={{ uri: product.image }}
                style={styles.productImage}
              />
              <View style={styles.productInfo}>
                <Text style={styles.productTitle} numberOfLines={2}>
                  {product.title}
                </Text>
                <Text style={styles.productPrice}>€{product.price}</Text>
                <View style={styles.productMeta}>
                  <Ionicons name="location" size={14} color="#999" />
                  <Text style={styles.productLocation}>{product.location}</Text>
                </View>
                <Text style={styles.productTime}>{product.timestamp}</Text>
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
