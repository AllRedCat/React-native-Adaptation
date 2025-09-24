import { Text, View } from "react-native";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { MapComponent } from "@/components/mapView";

export default function HomeScreen() {
    return (
        <SafeAreaProvider>
            <MapComponent />
            {/* <SafeAreaView>
                <View>
                    <Text>Home</Text>
                </View>
            </SafeAreaView> */}
        </SafeAreaProvider>
    )
}