import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAtendimento } from '../context/AtendimentoContext';

export default function Historico() {
  const router = useRouter();
  const { historico } = useAtendimento();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity
          style={styles.voltar}
          onPress={() => router.replace('/home')}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={18} color="#ffffff" />
          <Text style={styles.voltarTexto}>Voltar ao início</Text>
        </TouchableOpacity>

        <Text style={styles.titulo}>Histórico</Text>
        <Text style={styles.subtitulo}>Acompanhe seus atendimentos anteriores.</Text>

        {historico.length === 0 ? (
          <View style={styles.vazio}>
            <Text style={styles.vazioTitulo}>Nenhum atendimento ainda</Text>
            <Text style={styles.vazioTexto}>
              Gere sua primeira senha para começar a visualizar seu histórico.
            </Text>
          </View>
        ) : (
          historico.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.linhaTopo}>
                <Text style={styles.codigo}>{item.codigo}</Text>
                <Text
                  style={[
                    styles.status,
                    item.status === 'Concluído'
                      ? styles.concluido
                      : item.status === 'Cancelado'
                      ? styles.cancelado
                      : styles.andamento,
                  ]}
                >
                  {item.status}
                </Text>
              </View>

              <Text style={styles.setor}>{item.setorNome}</Text>
              <Text style={styles.info}>Posição inicial: {item.posicao}</Text>
              <Text style={styles.info}>Espera estimada: ~{item.espera} min</Text>
              <Text style={styles.info}>Gerada em: {item.data}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050505',
  },
  content: {
    padding: 22,
    paddingBottom: 36,
  },
  voltar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24,
    paddingVertical: 8,
    paddingRight: 12,
    alignSelf: 'flex-start',
  },
  voltarTexto: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
  titulo: {
    color: '#ff1493',
    fontSize: 38,
    fontWeight: '800',
  },
  subtitulo: {
    color: '#b3b3b3',
    fontSize: 17,
    marginTop: 8,
    marginBottom: 24,
  },
  vazio: {
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#222222',
    borderRadius: 18,
    padding: 22,
  },
  vazioTitulo: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 10,
  },
  vazioTexto: {
    color: '#b3b3b3',
    fontSize: 16,
    lineHeight: 24,
  },
  card: {
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#222222',
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
  },
  linhaTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  codigo: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '900',
  },
  status: {
    fontSize: 13,
    fontWeight: '800',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    overflow: 'hidden',
  },
  concluido: {
    backgroundColor: '#1f3d2a',
    color: '#8cffb2',
  },
  cancelado: {
    backgroundColor: '#43212a',
    color: '#ff9bb7',
  },
  andamento: {
    backgroundColor: '#3a2d12',
    color: '#ffd27a',
  },
  setor: {
    color: '#ff1493',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 12,
    marginBottom: 10,
  },
  info: {
    color: '#b3b3b3',
    fontSize: 15,
    marginBottom: 6,
  },
});