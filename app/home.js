import React from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { setores } from '../data/setores';
import SectorCard from '../components/SectorCard';

export default function Home() {
  const router = useRouter();

  const setorMaisRapido = [...setores].sort((a, b) => a.rapido - b.rapido)[0];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.logo}>FIAP Atende</Text>
        <Text style={styles.subtitulo}>
          Bem-vindo(a)! Acompanhe o status dos atendimentos.
        </Text>

        <View style={styles.destaque}>
          <Text style={styles.destaqueTitulo}>Atendimento mais rápido agora</Text>
          <Text style={styles.destaqueTexto}>
            {setorMaisRapido.nome} • {setorMaisRapido.rapido} min
          </Text>
        </View>

        <View style={styles.topoSecao}>
          <Text style={styles.tituloSecao}>Painel de Atendimento</Text>

          <Pressable onPress={() => router.push('/historico')}>
            <Text style={styles.linkHistorico}>Ver histórico</Text>
          </Pressable>
        </View>

        {setores.map((setor) => (
          <SectorCard
            key={setor.id}
            setor={setor}
            onPress={() => router.push(`/detalhes?id=${setor.id}`)}
          />
        ))}
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
  logo: {
    color: '#ff1493',
    fontSize: 40,
    fontWeight: '800',
    marginTop: 10,
  },
  subtitulo: {
    color: '#b3b3b3',
    fontSize: 16,
    marginTop: 8,
    marginBottom: 26,
  },
  destaque: {
    backgroundColor: '#111111',
    borderColor: '#222222',
    borderWidth: 1,
    borderRadius: 18,
    padding: 18,
    marginBottom: 26,
  },
  destaqueTitulo: {
    color: '#8d8d8d',
    fontSize: 14,
    marginBottom: 6,
  },
  destaqueTexto: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
  },
  topoSecao: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  tituloSecao: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: '800',
    flex: 1,
    marginRight: 12,
  },
  linkHistorico: {
    color: '#ff1493',
    fontSize: 15,
    fontWeight: '700',
  },
});
