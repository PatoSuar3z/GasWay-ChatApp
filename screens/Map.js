import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const Map = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [locationName, setLocationName] = useState("Cargando ubicación...");
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permiso de ubicación denegado.");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });

      // Obtener el nombre de la ubicación
      const [place] = await Location.reverseGeocodeAsync(location.coords);
      if (place) {
        setLocationName(`${place.name}, ${place.city}, ${place.country}`);
      } else {
        setLocationName("Ubicación desconocida");
      }
    })();
  }, []);

  if (!userLocation) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={userLocation}
          showsUserLocation={true}
        >
          <Marker
            coordinate={userLocation}
            title="Tu ubicación actual"
          />
        </MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: "#fff",
  },
  welcomeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20, 
    width: '100%', 
    paddingHorizontal: 20,
  },
  titleContainer: {
    alignSelf: 'flex-start',
    width: '100%',
    paddingLeft: 20,
    fontFamily : 'calibri'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  locationText: {
    fontSize: 16,
    marginBottom: 5,
  },
  coordinatesText: {
    fontSize: 16,
    marginBottom: 10,
  },
  mapContainer: {
    width: '95%',
    height: '50%',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default Map;
