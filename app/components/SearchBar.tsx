import React, { useState, useEffect } from "react";
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, Keyboard } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

interface Prediction {
  description: string;
  place_id: string;
}

interface Props {
  onSelectPlace: (placeId: string, description: string) => void;
}

export default function SearchBar({ onSelectPlace }: Props) {
  const [query, setQuery] = useState("");
  const [predictions, setPredictions] = useState<Prediction[]>([]);

  useEffect(() => {
    if (query.length < 3) return;
    const fetchSuggestions = async () => {
      try {
        const res = await axios.get(
          `https://maps.googleapis.com/maps/api/place/autocomplete/json`,
          {
            params: {
              input: query,
              key: 'AIzaSyCrtJPtB-oVcQSi4vlEk70ZN0P4f-lzNHA',
            },
          }
        );
        setPredictions(res.data.predictions || []);
      } catch (err) {
        console.warn("Autocomplete error:", err);
      }
    };
    fetchSuggestions();
  }, [query]);

  return (
    <View style={styles.container}>
      <View style={styles.searchWrapper}>
        <Ionicons name="search-outline" size={20} color="#aaa" style={styles.icon} />
        <TextInput
          placeholder="Search for a place..."
          placeholderTextColor="#aaa"
          style={styles.input}
          value={query}
          onChangeText={setQuery}
        />
      </View>

      <FlatList
        data={predictions}
        keyExtractor={(item) => item.place_id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.item} 
            onPress={() => {
                onSelectPlace(item.place_id, item.description);
                setQuery("");
                setPredictions([]);
                Keyboard.dismiss()
            }}>
            <Text style={styles.itemText}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  item: {
    padding: 12,
    backgroundColor: "#fff",
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  itemText: {
    fontSize: 15,
    color: "#333",
  },
});
