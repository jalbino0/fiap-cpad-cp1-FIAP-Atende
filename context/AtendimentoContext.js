import React, { createContext, useContext, useState } from 'react';

const AtendimentoContext = createContext({});

export function AtendimentoProvider({ children }) {
  const [senhaAtual, setSenhaAtual] = useState(null);
  const [historico, setHistorico] = useState([]);

  function gerarSenha(setor) {
    const prefixo = setor.nome
      .split(' ')
      .map((palavra) => palavra[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

    const numero = Math.floor(Math.random() * 900 + 100);
    const senha = ${prefixo}-${numero};

    const novaSenha = {
      id: Date.now().toString(),
      codigo: senha,
      setorNome: setor.nome,
      posicao: Math.max(setor.fila - Math.floor(Math.random() * 3), 1),
      espera: setor.espera,
      status: 'Em andamento',
      data: new Date().toLocaleString('pt-BR'),
    };

    setSenhaAtual(novaSenha);
    setHistorico((estadoAnterior) => [novaSenha, ...estadoAnterior]);

    return novaSenha;
  }

  function finalizarSenha() {
    if (!senhaAtual) return;

    setHistorico((estadoAnterior) =>
      estadoAnterior.map((item) =>
        item.id === senhaAtual.id
          ? { ...item, status: 'Concluído' }
          : item
      )
    );

    setSenhaAtual(null);
  }

  function cancelarSenha() {
    if (!senhaAtual) return;

    setHistorico((estadoAnterior) =>
      estadoAnterior.map((item) =>
        item.id === senhaAtual.id
          ? { ...item, status: 'Cancelado' }
          : item
      )
    );

    setSenhaAtual(null);
  }

  return (
    <AtendimentoContext.Provider
      value={{
        senhaAtual,
        historico,
        gerarSenha,
        finalizarSenha,
        cancelarSenha,
      }}
    >
      {children}
    </AtendimentoContext.Provider>
  );
}

export function useAtendimento() {
  return useContext(AtendimentoContext);
}
