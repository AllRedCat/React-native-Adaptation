import React, { useRef } from "react";
import { View, StyleSheet } from "react-native";
import MapView, {
    PROVIDER_GOOGLE,
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

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                provider={PROVIDER_DEFAULT}
                initialRegion={initialRegion}
                showsUserLocation={true}
                showsMyLocationButton={true}
                mapType={'mutedStandard'}
                showsScale={false}
                loadingEnabled={true}
                showsCompass={false}
                showsTraffic={false}
                showsIndoorLevelPicker={false}
                showsPointsOfInterest={false}
                style={styles.map}
            >

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