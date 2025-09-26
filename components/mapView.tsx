import { getParkinLots } from "@/lib/parkingLots";
import { ParkingLot } from "@/types/parkingLot";
import React, { useRef, useState, useEffect } from "react";
import { Platform, StyleSheet, View } from "react-native";
import MapView, {
    Marker,
    PROVIDER_DEFAULT,
    Region
} from 'react-native-maps';

interface MapComponentProps {
    initialRegion?: Region;
}

export const MapComponent: React.FC<MapComponentProps> = ({
    initialRegion = {
        latitude: -18.9113,
        longitude: -48.2622,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121
    }
}) => {
    const mapRef = useRef<MapView>(null);

    // Public parking lots information
    const [parkingLots, setParkingLots] = useState<Array<ParkingLot>>([]);

    useEffect(() => {
        async function fetchParkingLots() {
            const data = await getParkinLots();
            setParkingLots(data || []);
        }
        fetchParkingLots();
    }, [parkingLots]);

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                provider={PROVIDER_DEFAULT}
                initialRegion={initialRegion}
                showsUserLocation={true}
                showsMyLocationButton={true}
                mapType={Platform.OS === 'ios' ? 'mutedStandard' : 'standard'}
                showsScale={false}
                loadingEnabled={true}
                showsTraffic={false}
                showsIndoorLevelPicker={false}
                showsPointsOfInterest={false}
                style={styles.map}
            >
                {/* <Marker
                    coordinate={{ latitude: -18.9113, longitude: -48.2611 }}
                    pinColor="#009999"
                /> */}
                {parkingLots.map((lot) => (
                    <Marker
                        key={lot.id}
                        coordinate={{ latitude: lot.latitude, longitude: lot.longitude }}
                        title={lot.name}
                        description={lot.address}
                        pinColor="#009900"
                    />
                ))}
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    }
})