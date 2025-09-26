import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuth } from "@/hooks/use-auth";
import { useThemeColor } from "@/hooks/use-theme-color";
import { router } from "expo-router";
import { useEffect } from "react";
import { Pressable, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
    const { logout, user } = useAuth();

    useEffect(() => {

    }, []);

    const handleLogout = async () => {
        await logout();
        router.replace('/(auth)/login');
    }

    return (
        <SafeAreaProvider
            style={{ backgroundColor: useThemeColor({ light: '#fff', dark: '#000' }, 'background') }}
        >
            <SafeAreaView style={styles.container}>
                <ThemedView style={styles.content}>
                    <ThemedText style={styles.title}>Profile</ThemedText>
                </ThemedView>
                <ThemedView
                    style={{
                        margin: 10,
                        borderRadius: 30
                    }}
                >
                    <Pressable
                    style={styles.btn_logout}
                    onPress={handleLogout}
                    // disabled={loading}
                    >
                        <ThemedText type="subtitle">
                            Log-Out
                        </ThemedText>
                    </Pressable>
                </ThemedView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    content: {
        padding: 20,
        borderRadius: 30,
        margin: 10
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
    },
    envText: {
        fontSize: 14,
        fontFamily: 'monospace',
        padding: 10,
        borderRadius: 5,
    },
    btn_logout: {
        backgroundColor: '#af0000',
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
});