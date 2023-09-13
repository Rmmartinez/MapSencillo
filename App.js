import React, { useState } from 'react';
import * as Location from 'expo-location';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
const carImage = require('./assets/image/car.png')

export default function App() {
  const [origin, setOrigin] = useState({
    latitude: -33.301657,
    longitude: -66.337808,
  });

  const [destination, setDestination] = useState({
    latitude: -33.306528,
    longitude: -66.323082,
  });

  React.useEffect(() => {
    getLocationPermission();
  }, [])


  async function getLocationPermission(){
    let {status} = await Location.requestForegroundPermissionsAsync();
    if(status !== 'granted'){
      alert('Permiso denegado');
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    const current = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    }
    setOrigin(current);
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04,
        }}
      >
        <Marker
          draggable={true}
          coordinate={origin}
          image={carImage}
          onDragEnd={(event) => setOrigin(event.nativeEvent.coordinate)}
        />
        <Marker
          draggable={true}
          coordinate={destination}
          onDragEnd={(event) => setDestination(event.nativeEvent.coordinate)}
        />

        <Polyline
          coordinates={[
            { latitude: origin.latitude, longitude: origin.longitude },
            { latitude: destination.latitude, longitude: destination.longitude },
          ]}
          strokeColor="#EF33C4"
          strokeWidth={4}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    flex: 1,
  },
});
