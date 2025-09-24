import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { config, getApiUrl, isDebugMode, isDevelopment } from '../../constants/config';
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Link } from "expo-router";
import { useThemeColor } from "@/hooks/use-theme-color";

export default function ProfileScreen() {
    const [envInfo, setEnvInfo] = useState<string>('');

    useEffect(() => {
        // Exemplo de como usar as variáveis de ambiente
        const info = `
Ambiente: ${config.appEnv}
Debug Mode: ${isDebugMode() ? 'Ativado' : 'Desativado'}
API Base URL: ${config.apiBaseUrl}
Desenvolvimento: ${isDevelopment() ? 'Sim' : 'Não'}
URL da API completa: ${getApiUrl('/users')}
        `.trim();

        setEnvInfo(info);
        console.log('Configurações:', config);
    }, []);

    return (
        <SafeAreaProvider
            style={{ backgroundColor: useThemeColor({ light: '#fff', dark: '#000' }, 'background') }}
        >
            <SafeAreaView style={styles.container}>
                <ThemedView style={styles.content}>
                    <ThemedText style={styles.title}>Profile</ThemedText>
                    <ThemedText style={styles.subtitle}>Variáveis de Ambiente:</ThemedText>
                    <ThemedText style={styles.envText}>{envInfo}</ThemedText>
                </ThemedView>
                <ThemedView style={styles.content}>
                    <Link href="/modal">
                        <Link.Trigger>
                            <ThemedText type="subtitle">Step 2: Explore</ThemedText>
                        </Link.Trigger>
                        <Link.Preview />
                        <Link.Menu>
                            <Link.MenuAction title="Action" icon="cube" onPress={() => alert('Action pressed')} />
                            <Link.MenuAction
                                title="Share"
                                icon="square.and.arrow.up"
                                onPress={() => alert('Share pressed')}
                            />
                            <Link.Menu title="More" icon="ellipsis">
                                <Link.MenuAction
                                    title="Delete"
                                    icon="trash"
                                    destructive
                                    onPress={() => alert('Delete pressed')}
                                />
                            </Link.Menu>
                        </Link.Menu>
                    </Link>
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
});