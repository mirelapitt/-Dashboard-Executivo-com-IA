import { useEffect, useState } from "react";

function App() {
  const [dados, setDados] = useState([]);
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/financeiro")
      .then(res => res.json())
      .then(data => setDados(data));

    fetch("http://127.0.0.1:8000/insights")
      .then(res => res.json())
      .then(data => setInsights(data));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard Executivo com IA</h1>

      <h2>Financeiro</h2>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Mês</th>
            <th>Receita</th>
            <th>Custo</th>
            <th>Previsão</th>
          </tr>
        </thead>
        <tbody>
          {dados.map((row, idx) => (
            <tr key={idx}>
              <td>{row.mes}</td>
              <td>{row.receita}</td>
              <td>{row.custo}</td>
              <td>{Math.round(row.previsao_receita)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Insights IA</h2>
      <ul>
        {insights.map((i, idx) => (
          <li key={idx}>
            <strong>{i.titulo}</strong> — {i.descricao} ({i.impacto})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

