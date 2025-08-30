import { useState } from "react";

interface Pergunta {
  pergunta: string;
  opcoes: string[];
  resposta: string;
}

const quizData: Pergunta[] = [
  {
    pergunta: "Qual é o maior rio do Paraná?",
    opcoes: ["Rio Paraná", "Rio Iguaçu", "Rio Tibagi", "Rio Negro"],
    resposta: "Rio Iguaçu",
  },
  {
    pergunta: "Qual a condição ambiental do Rio Iguaçu próximo ao colégio?",
    opcoes: ["Ótima", "Boa", "Ruim", "Excelente"],
    resposta: "Ruim",
  },
  {
    pergunta: "Qual personagem da cartilha representa a capivara?",
    opcoes: ["Mia", "Yara", "Guiro", "Rubi"],
    resposta: "Mia",
  },
  {
    pergunta:
      "Segundo o IBGE (2013), o Rio Iguaçu é o ___ rio mais poluído do Brasil.",
    opcoes: ["Primeiro", "Segundo", "Terceiro", "Quarto"],
    resposta: "Segundo",
  },
  {
    pergunta: "Qual destes animais está classificado como 'Criticamente em perigo'?",
    opcoes: ["Onça-pintada", "Capivara", "Tatu-galinha", "Gralha-azul"],
    resposta: "Onça-pintada",
  },
];

const Quiz = () => {
  const [respostas, setRespostas] = useState<(string | null)[]>(
    Array(quizData.length).fill(null)
  );
  const [finalizado, setFinalizado] = useState(false);

  const handleResposta = (index: number, opcao: string) => {
    if (respostas[index] !== null) return; // evita clicar 2x
    const novasRespostas = [...respostas];
    novasRespostas[index] = opcao;
    setRespostas(novasRespostas);

    // verifica se acabou
    if (novasRespostas.every((r) => r !== null)) {
      setFinalizado(true);
    }
  };

  const score = respostas.filter(
    (r, i) => r === quizData[i].resposta
  ).length;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-8">
        Quiz: Valorização e Conservação do Rio Iguaçu
      </h1>

      {quizData.map((q, i) => (
        <div
          key={i}
          className="mb-6 p-4 border-l-4 border-green-700 bg-green-50 rounded-md"
        >
          <p className="font-semibold mb-3">
            {i + 1}. {q.pergunta}
          </p>
          <div className="grid gap-2">
            {q.opcoes.map((opcao) => {
              const respostaUsuario = respostas[i];
              let estilo = "bg-gray-100 hover:bg-gray-200";
              if (respostaUsuario) {
                if (opcao === q.resposta) {
                  estilo = "bg-green-500 text-white";
                } else if (opcao === respostaUsuario) {
                  estilo = "bg-red-500 text-white";
                } else {
                  estilo = "bg-gray-200";
                }
              }
              return (
                <button
                  key={opcao}
                  className={`p-2 rounded-md transition ${estilo}`}
                  onClick={() => handleResposta(i, opcao)}
                >
                  {opcao}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {finalizado && (
        <div className="text-center mt-8 animate-fade-in-up">
            <p className="text-xl font-bold text-green-700 mb-6">
            🎉 Você acertou {score} de {quizData.length} questões! 🎉
             </p>

            <a href="/"
      className="inline-block bg-nature-green text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-md hover:bg-green-700 transition"
            >
             📖 Voltar para a Cartilha
             </a>
  </div>
      )}
    </div>
  );
};

export default Quiz;
