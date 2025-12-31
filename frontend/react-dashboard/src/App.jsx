import { useEffect, useState } from "react";

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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-purple-400"></div>
          <h2 className="mt-6 text-2xl font-bold text-white">Carregando Dashboard...</h2>
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Premium */}
      <header className="bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 shadow-2xl">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black text-white flex items-center gap-4 mb-2">
                <span className="text-5xl">📊</span>
                Dashboard Executivo
              </h1>
              <p className="text-purple-100 text-sm font-medium">Análise Financeira e Operacional</p>
            </div>
            <div className="text-right">
              <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl px-6 py-3 border border-white border-opacity-30">
                <p className="text-white text-xs font-semibold uppercase tracking-wider mb-1">Período</p>
                <p className="text-white text-lg font-bold">Dezembro 2025</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-10">
        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {kpis.map((kpi, index) => {
            const emoji = emojiMap[kpi.title] || "💰";
            const isPositive = kpi.trend === "up";
            const colors = [
              { bg: "from-blue-500 to-blue-600", shadow: "shadow-blue-500/50" },
              { bg: "from-green-500 to-green-600", shadow: "shadow-green-500/50" },
              { bg: "from-pink-500 to-pink-600", shadow: "shadow-pink-500/50" },
              { bg: "from-cyan-500 to-cyan-600", shadow: "shadow-cyan-500/50" }
            ];
            
            return (
              <div
                key={index}
                className={`bg-gradient-to-br ${colors[index].bg} rounded-2xl p-8 text-white shadow-2xl ${colors[index].shadow} hover:scale-105 hover:shadow-3xl transition-all duration-300 relative overflow-hidden group`}
              >
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white opacity-5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <p className="text-white text-opacity-80 text-xs font-bold uppercase tracking-wider mb-2">
                        {kpi.title}
                      </p>
                      <p className="text-5xl font-black mb-3">{kpi.value}</p>
                    </div>
                    <span className="text-6xl opacity-20">{emoji}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{isPositive ? "↗" : "↘"}</span>
                    <span className="bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold">
                      {kpi.change}
                    </span>
                    <span className="text-xs opacity-80 ml-1">vs mês anterior</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Resumo Financeiro Card */}
        {dadosFinanceiros && dadosFinanceiros.resumo && (
          <div className="bg-white rounded-3xl shadow-2xl p-10 mb-10 border border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-5xl">💎</span>
              <h2 className="text-3xl font-black text-gray-800">Resumo Financeiro</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
                <p className="text-blue-700 text-sm font-bold uppercase tracking-wider mb-3">💵 Receita Total</p>
                <p className="text-4xl font-black text-blue-900 mb-2">
                  R$ {dadosFinanceiros.resumo.total_receita.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="text-xs text-blue-600 font-medium">Janeiro a Dezembro</p>
              </div>
              
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl border-l-4 border-red-500 hover:shadow-xl transition-shadow">
                <p className="text-red-700 text-sm font-bold uppercase tracking-wider mb-3">💸 Despesas Total</p>
                <p className="text-4xl font-black text-red-900 mb-2">
                  R$ {dadosFinanceiros.resumo.total_despesas.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="text-xs text-red-600 font-medium">Custos operacionais</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl border-l-4 border-green-500 hover:shadow-xl transition-shadow">
                <p className="text-green-700 text-sm font-bold uppercase tracking-wider mb-3">✅ Lucro Total</p>
                <p className="text-4xl font-black text-green-900 mb-2">
                  R$ {dadosFinanceiros.resumo.total_lucro.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="text-xs text-green-600 font-medium">Resultado líquido</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl border-l-4 border-purple-500 hover:shadow-xl transition-shadow">
                <p className="text-purple-700 text-sm font-bold uppercase tracking-wider mb-3">📊 Margem de Lucro</p>
                <p className="text-4xl font-black text-purple-900 mb-2">
                  {dadosFinanceiros.resumo.margem_lucro}%
                </p>
                <p className="text-xs text-purple-600 font-medium">Performance geral</p>
              </div>
            </div>
          </div>
        )}

        {/* Tabela de Dados Mensais */}
        {dadosFinanceiros && dadosFinanceiros.dados && (
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-10 py-8">
              <div className="flex items-center gap-3">
                <span className="text-5xl">📈</span>
                <h2 className="text-3xl font-black text-white">Análise Mensal Detalhada</h2>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-100 to-gray-200">
                    <th className="px-8 py-6 text-left text-sm font-black text-gray-700 uppercase tracking-wider">Mês</th>
                    <th className="px-8 py-6 text-left text-sm font-black text-gray-700 uppercase tracking-wider">Receita</th>
                    <th className="px-8 py-6 text-left text-sm font-black text-gray-700 uppercase tracking-wider">Despesas</th>
                    <th className="px-8 py-6 text-left text-sm font-black text-gray-700 uppercase tracking-wider">Lucro</th>
                    <th className="px-8 py-6 text-left text-sm font-black text-gray-700 uppercase tracking-wider">Clientes</th>
                    <th className="px-8 py-6 text-left text-sm font-black text-gray-700 uppercase tracking-wider">Pedidos</th>
                  </tr>
                </thead>
                <tbody>
                  {dadosFinanceiros.dados.map((item, index) => (
                    <tr 
                      key={index} 
                      className={`border-b border-gray-100 hover:bg-purple-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                    >
                      <td className="px-8 py-6">
                        <span className="text-lg font-black text-gray-900">{item.mes}</span>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-base font-bold text-blue-600">
                          R$ {item.receita.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-base font-bold text-red-600">
                          R$ {item.despesas.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-base font-black text-green-600">
                          R$ {item.lucro.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <span className="inline-block bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-bold">
                          {item.clientes.toLocaleString('pt-BR')}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <span className="inline-block bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-bold">
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
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 mt-16">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="flex items-center justify-between">
            <p className="text-gray-400 text-sm">
              Dashboard Executivo © 2025 • Desenvolvido para análise de dados financeiros e operacionais
            </p>
            <p className="text-gray-500 text-xs">
              Powered by React + FastAPI
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
