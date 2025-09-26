import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useAuth } from '@/hooks/use-auth';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Link, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passView, setPassView] = useState<boolean>(false);
  const { user, login, loading, error, clearError, checkAuth } = useAuth();

  const router = useRouter();

  useEffect(() => {
    // if(!loading) router.replace('/(protected)/home')
    checkAuth();
  }, [user]);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos')
      return;
    }

    await login(email, password);
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Login</ThemedText>

      <ThemedText>Email</ThemedText>
      <TextInput
        style={[styles.input, { color: useThemeColor({}, 'text') }]}
        placeholder="example@email.com"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          if (error) clearError();
        }}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <ThemedText>Senha</ThemedText>
      <View style={styles.passwordField}>
        <TextInput
          style={[styles.passwordInput, { color: useThemeColor({}, 'text') }]}
          placeholder="••••••••••••"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!passView}
        />
        <Pressable
          style={{ padding: 8 }}
          onPress={() => setPassView(prev => !prev)}
        >
          <IconSymbol name={passView ? 'eye.fill' : 'eye.slash.fill'} size={20} color="#fff" style={{ marginRight: 8 }} />
        </Pressable>
      </View>

      <Pressable
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Entrando...' : 'Entrar'}
        </Text>
      </Pressable>

      <Link href="/(auth)/register" style={styles.link}>
        <Text>Não tem conta? Cadastre-se</Text>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
  },
  passwordField: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },
  passwordInput: {
    padding: 15,
    width: '84%'
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    textAlign: 'center',
    color: '#007AFF',
  },
});