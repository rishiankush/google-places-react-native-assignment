import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Place } from "../types/Place";
import SearchBar from "../components/SearchBar";
import SearchHistory from "../components/SearchHistory";
import { getSearchHistory, savePlaceToHistory } from "../utils/storage";
import axios from "axios";

export default function HomeScreen() {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [history, setHistory] = useState<Place[]>([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const data = await getSearchHistory();
    setHistory(data);
  };

  const handlePlaceSelect = async (placeId: string, name: string) => {
    const res = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json`,
      {
        params: {
          key: 'AIzaSyCrtJPtB-oVcQSi4vlEk70ZN0P4f-lzNHA',
          place_id: placeId,
        },
      }
    );

    const result = res.data.result;
    const place: Place = {
      name: result.name || name,
      address: result.formatted_address,
      location: {
        lat: result.geometry.location.lat,
        lng: result.geometry.location.lng,
      },
    };

    setSelectedPlace(place);
    await savePlaceToHistory(place);
    await loadHistory();
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <SearchBar onSelectPlace={handlePlaceSelect} />
        <SearchHistory history={history} onSelect={(place) => setSelectedPlace(place)} />
      </ScrollView>

      <MapView
        provider="google"
        style={styles.map}
        region={
          selectedPlace
            ? {
                latitude: selectedPlace.location.lat,
                longitude: selectedPlace.location.lng,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }
            : {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }
        }
      >
        {selectedPlace && (
          <Marker
            coordinate={{
              latitude: selectedPlace.location.lat,
              longitude: selectedPlace.location.lng,
            }}
            title={selectedPlace.name}
            description={selectedPlace.address}
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  map: {
    width: Dimensions.get("window").width,
    height: 350,
  },
});
