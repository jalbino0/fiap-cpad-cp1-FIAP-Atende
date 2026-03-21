import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { setores } from '../data/setores';
import { useAtendimento } from '../context/AtendimentoContext';

export default function Senha() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { senhaAtual, gerarSenha, finalizarSenha, cancelarSenha } = useAtendimento();

  const setor = setores.find((item) => item.id === id);

  const handleGerarSenha = () => {
    if (setor) {
      gerarSenha(setor);
    }
  };

  const handleFinalizar = () => {
    finalizarSenha();
    router.replace('/historico');
  };

  const handleCancelar = () => {
    cancelarSenha();
    router.replace('/historico');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.titulo}>Minha Senha</Text>
        <Text style={styles.subtitulo}>Gere sua senha de atendimento aqui.</Text>

        {!senhaAtual ? (
          <View style={styles.card}>
            <Text style={styles.cardTitulo}>Pronto para ser atendido?</Text>
            <Text style={styles.cardTexto}>
              Você está gerando uma senha para o setor{' '}
              <Text style={styles.destaque}>{setor?.nome || 'selecionado'}</Text>.
            </Text>

            <Pressable style={styles.botaoPrincipal} onPress={handleGerarSenha}>
              <Ionicons name="ticket-outline" size={18} color="#ffffff" />
              <Text style={styles.botaoPrincipalTexto}>Gerar Minha Senha</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.card}>
            <View style={styles.senhaBox}>
              <Text style={styles.senhaLabel}>Sua senha é</Text>
              <Text style={styles.senhaCodigo}>{senhaAtual.codigo}</Text>
              <Text style={styles.senhaSetor}>{senhaAtual.setorNome}</Text>
            </View>

            <View style={styles.metricas}>
              <View style={styles.metricaCard}>
                <Ionicons name="people-outline" size={28} color="#ff1493" />
                <Text style={styles.metricaNumero}>{senhaAtual.posicao}</Text>
                <Text style={styles.metricaTexto}>Posição na fila</Text>
              </View>

              <View style={styles.metricaCard}>
                <Ionicons name="time-outline" size={28} color="#ff1493" />
                <Text style={styles.metricaNumero}>~{senhaAtual.espera}</Text>
                <Text style={styles.metricaTexto}>min de espera</Text>
              </View>
            </View>

            <Pressable style={styles.botaoEscuro} onPress={handleFinalizar}>
              <Text style={styles.botaoEscuroTexto}>Fui atendido!</Text>
            </Pressable>

            <Pressable style={[styles.botaoEscuro, styles.cancelar]} onPress={handleCancelar}>
              <Text style={styles.botaoEscuroTexto}>Cancelar senha</Text>
            </Pressable>
          </View>
        )}

        <Pressable onPress={() => router.replace('/historico')}>
          <Text style={styles.link}>Ir para histórico</Text>
        </Pressable>
      </View>
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
    padding: 22,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  titulo: {
    color: '#ff1493',
    fontSize: 38,
    fontWeight: '800',
    marginTop: 18,
    textAlign: 'center',
  },
  subtitulo: {
    color: '#b3b3b3',
    fontSize: 18,
    marginTop: 8,
    marginBottom: 26,
    textAlign: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#222222',
    borderRadius: 18,
    padding: 22,
  },
  cardTitulo: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 10,
  },
  cardTexto: {
    color: '#b3b3b3',
    fontSize: 18,
    lineHeight: 28,
    textAlign: 'center',
    marginBottom: 26,
  },
  destaque: {
    color: '#ff1493',
    fontWeight: '800',
  },
  botaoPrincipal: {
    backgroundColor: '#ff1493',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  botaoPrincipalTexto: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '800',
  },
  senhaBox: {
    backgroundColor: '#ff1493',
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginBottom: 18,
  },
  senhaLabel: {
    color: '#ffe3f4',
    fontSize: 18,
    fontWeight: '700',
  },
  senhaCodigo: {
    color: '#ffffff',
    fontSize: 54,
    fontWeight: '900',
    marginVertical: 6,
  },
  senhaSetor: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  metricas: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 18,
  },
  metricaCard: {
    flex: 1,
    backgroundColor: '#232323',
    borderRadius: 14,
    paddingVertical: 22,
    alignItems: 'center',
  },
  metricaNumero: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: '800',
    marginTop: 8,
  },
  metricaTexto: {
    color: '#b3b3b3',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 4,
  },
  botaoEscuro: {
    backgroundColor: '#070707',
    borderColor: '#2a2a2a',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelar: {
    marginTop: 12,
  },
  botaoEscuroTexto: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '800',
  },
  link: {
    color: '#ff1493',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 18,
  },
});