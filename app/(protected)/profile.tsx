import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { config, getApiUrl, isDebugMode, isDevelopment } from '../../constants/config';

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
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>Profile</Text>
                    <Text style={styles.subtitle}>Variáveis de Ambiente:</Text>
                    <Text style={styles.envText}>{envInfo}</Text>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        padding: 20,
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
        backgroundColor: '#f5f5f5',
        padding: 10,
        borderRadius: 5,
    },
});