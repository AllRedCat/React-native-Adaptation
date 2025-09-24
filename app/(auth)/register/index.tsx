import { useAuth } from '@/hooks/use-auth';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function LoginScreen() {
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPass, setConfirmPass] = useState<string>();

  const { register, loading } = useAuth();

  const handleRegister = () => {
    if (!name || !email || !password || !confirmPass) {
      Alert.alert('Erro', 'Preencha os campos corretamente');
      return;
    }

    if (password !== confirmPass) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <Text>Nome</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text>Telefone</Text>
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text>Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Text>Confirmar senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirmar senha"
        value={confirmPass}
        onChangeText={setConfirmPass}
        secureTextEntry
      />

      <Pressable
        style={styles.button}
        onPress={handleRegister}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Registrando...' : 'Registrar'}
        </Text>
      </Pressable>

      <Link href="/(auth)/login" style={styles.link}>
        <Text>Já possui conta? Entre</Text>
      </Link>
    </View>
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
    width: '100%',
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