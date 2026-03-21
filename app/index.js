import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function Login() {
  const router = useRouter();
  const [rm, setRm] = useState('');
  const [senha, setSenha] = useState('');

  const entrar = () => {
    router.replace('/home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.topo}>
          <Text style={styles.logo}>FIAP Atende</Text>
          <Text style={styles.subtitulo}>
            Acesse o sistema para acompanhar filas e atendimentos.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.titulo}>Entrar</Text>

          <Text style={styles.label}>RM</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu RM"
            placeholderTextColor="#7d7d7d"
            value={rm}
            onChangeText={setRm}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            placeholderTextColor="#7d7d7d"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />

          <Pressable style={styles.botao} onPress={entrar}>
            <Text style={styles.botaoTexto}>Entrar</Text>
          </Pressable>

          <Pressable onPress={entrar}>
            <Text style={styles.link}>Acessar rapidamente</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050505',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 22,
  },
  topo: {
    marginBottom: 28,
  },
  logo: {
    color: '#ff1493',
    fontSize: 42,
    fontWeight: '800',
    marginBottom: 10,
  },
  subtitulo: {
    color: '#b3b3b3',
    fontSize: 16,
    lineHeight: 24,
  },
  card: {
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#222222',
    borderRadius: 18,
    padding: 22,
  },
  titulo: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 20,
  },
  label: {
    color: '#d6d6d6',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 8,
  },
  input: {
    backgroundColor: '#0a0a0a',
    borderWidth: 1,
    borderColor: '#2a2a2a',
    borderRadius: 12,
    color: '#ffffff',
    fontSize: 16,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 8,
  },
  botao: {
    backgroundColor: '#ff1493',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 18,
  },
  botaoTexto: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '800',
  },
  link: {
    color: '#ff1493',
    textAlign: 'center',
    marginTop: 18,
    fontSize: 15,
    fontWeight: '700',
  },
});
