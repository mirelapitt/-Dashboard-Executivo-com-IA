import { useEffect, useState } from "react";
import "./Dashboard.css";

function App() {
  const [dadosFinanceiros, setDadosFinanceiros] = useState(null);
  const [kpis, setKpis] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Buscar dados financeiros
    fetch("http://127.0.0.1:8000/financeiro")
      .then((response) => response.json())
      .then((data) => {
        setDadosFinanceiros(data);
        console.log("Dados recebidos:", data);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados financeiros:", error);
      });

    // Buscar KPIs
    fetch("http://127.0.0.1:8000/kpis")
      .then((response) => response.json())
      .then((data) => {
        setKpis(data.kpis);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar KPIs:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <div className="spinner"></div>
          <h2 className="loading-text">Carregando Dashboard...</h2>
        </div>
      </div>
    );
  }

  const emojiMap = {
    "Receita Total": "💰",
    "Novos Clientes": "👥",
    "Pedidos": "🛒",
    "Taxa de Conversão": "📈"
  };

  return (
    <div>
      {/* Header Premium */}
      <header>
        <div className="header-content">
          <div>
            <h1 className="header-title">
              <span className="header-title-emoji">📊</span>
              Dashboard Executivo
            </h1>
            <p className="header-subtitle">Análise Financeira e Operacional</p>
          </div>
          <div className="period-badge">
            <p className="period-label">Período</p>
            <p className="period-value">Dezembro 2025</p>
          </div>
        </div>
      </header>

      <main>
        {/* KPI Cards Grid */}
        <div className="kpi-grid">
          {kpis.map((kpi, index) => {
            const emoji = emojiMap[kpi.title] || "💰";
            const isPositive = kpi.trend === "up";
            
            return (
              <div key={index} className={`kpi-card kpi-card-${index + 1}`}>
                <div className="kpi-bg-circle kpi-bg-circle-1"></div>
                <div className="kpi-bg-circle kpi-bg-circle-2"></div>
                
                <div className="kpi-content">
                  <div className="kpi-header">
                    <div>
                      <p className="kpi-label">{kpi.title}</p>
                      <p className="kpi-value">{kpi.value}</p>
                    </div>
                    <span className="kpi-emoji">{emoji}</span>
                  </div>
                  
                  <div className="kpi-footer">
                    <span className="kpi-arrow">{isPositive ? "↗" : "↘"}</span>
                    <span className="kpi-change">{kpi.change}</span>
                    <span className="kpi-subtext">vs mês anterior</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Resumo Financeiro Card */}
        {dadosFinanceiros && dadosFinanceiros.resumo && (
          <div className="summary-card">
            <div className="summary-header">
              <span className="summary-emoji">💎</span>
              <h2 className="summary-title">Resumo Financeiro</h2>
            </div>
            
            <div className="summary-grid">
              <div className="summary-item summary-item-1">
                <p className="summary-label">💵 Receita Total</p>
                <p className="summary-value">
                  R$ {dadosFinanceiros.resumo.total_receita.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="summary-description">Janeiro a Dezembro</p>
              </div>
              
              <div className="summary-item summary-item-2">
                <p className="summary-label">💸 Despesas Total</p>
                <p className="summary-value">
                  R$ {dadosFinanceiros.resumo.total_despesas.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="summary-description">Custos operacionais</p>
              </div>
              
              <div className="summary-item summary-item-3">
                <p className="summary-label">✅ Lucro Total</p>
                <p className="summary-value">
                  R$ {dadosFinanceiros.resumo.total_lucro.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="summary-description">Resultado líquido</p>
              </div>
              
              <div className="summary-item summary-item-4">
                <p className="summary-label">📊 Margem de Lucro</p>
                <p className="summary-value">
                  {dadosFinanceiros.resumo.margem_lucro}%
                </p>
                <p className="summary-description">Performance geral</p>
              </div>
            </div>
          </div>
        )}

        {/* Tabela de Dados Mensais */}
        {dadosFinanceiros && dadosFinanceiros.dados && (
          <div className="table-card">
            <div className="table-header">
              <span className="table-emoji">📈</span>
              <h2 className="table-title">Análise Mensal Detalhada</h2>
            </div>
            
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Mês</th>
                    <th>Receita</th>
                    <th>Despesas</th>
                    <th>Lucro</th>
                    <th>Clientes</th>
                    <th>Pedidos</th>
                  </tr>
                </thead>
                <tbody>
                  {dadosFinanceiros.dados.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <span className="td-month">{item.mes}</span>
                      </td>
                      <td>
                        <span className="td-receita">
                          R$ {item.receita.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </td>
                      <td>
                        <span className="td-despesas">
                          R$ {item.despesas.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </td>
                      <td>
                        <span className="td-lucro">
                          R$ {item.lucro.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </td>
                      <td>
                        <span className="badge badge-clientes">
                          {item.clientes.toLocaleString('pt-BR')}
                        </span>
                      </td>
                      <td>
                        <span className="badge badge-pedidos">
                          {item.pedidos.toLocaleString('pt-BR')}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Footer Profissional */}
      <footer>
        <div className="footer-content">
          <p className="footer-text">
            Dashboard Executivo © 2025 • Desenvolvido para análise de dados financeiros e operacionais
          </p>
          <p className="footer-powered">
            Powered by React + FastAPI
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
