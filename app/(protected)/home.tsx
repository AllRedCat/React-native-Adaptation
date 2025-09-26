import { Text, View } from "react-native";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { MapComponent } from "@/components/mapView";
import { useEffect } from "react";

export default function HomeScreen() {

    return (
        <SafeAreaProvider>
            <MapComponent />
        </SafeAreaProvider>
    )
}