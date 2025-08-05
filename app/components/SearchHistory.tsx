import React from "react";
import { FlatList, Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { Place } from "../types/Place";

interface Props {
  history: Place[];
  onSelect: (place: Place) => void;
}

export default function SearchHistory({ history, onSelect }: Props) {
  if (!history.length) return null;
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Search History</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.name + item.address}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onSelect(item)}>
            <Text style={styles.item}>{item.name} – {item.address}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 16 },
  header: { fontWeight: "bold", fontSize: 16, marginBottom: 8 },
  item: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    marginVertical: 4,
    borderRadius: 4,
  },
});
