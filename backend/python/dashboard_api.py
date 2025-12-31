from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import random
from datetime import datetime

app = FastAPI()

# CORS - permite frontend acessar
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def gerar_dados():
    """Gera dados aleatórios"""
    meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
    dados = []
    for mes in meses:
        receita = round(random.uniform(40000, 70000), 2)
        despesas = round(random.uniform(25000, 45000), 2)
        dados.append({
            'mes': mes,
            'receita': receita,
            'despesas': despesas,
            'lucro': round(receita - despesas, 2),
            'clientes': random.randint(800, 1500),
            'pedidos': random.randint(2500, 4500)
        })
    return dados

@app.get("/")
def home():
    return {
        "message": "Dashboard Executivo API funcionando!",
        "status": "online",
        "rotas": ["/financeiro", "/kpis", "/insights", "/performance", "/distribuicao", "/generate_insights", "/metrics_ai", "/extract_transform"]
    }

@app.get("/financeiro")
def financeiro():
    dados = gerar_dados()
    total_receita = sum(d['receita'] for d in dados)
    total_despesas = sum(d['despesas'] for d in dados)
    total_lucro = sum(d['lucro'] for d in dados)
    return {
        "success": True,
        "dados": dados,
        "resumo": {
            "total_receita": round(total_receita, 2),
            "total_despesas": round(total_despesas, 2),
            "total_lucro": round(total_lucro, 2),
            "margem_lucro": round((total_lucro / total_receita * 100), 2)
        }
    }

@app.get("/kpis")
def kpis():
    return {
        "success": True,
        "kpis": [
            {"title": "Receita Total", "value": "R$ 328.450", "change": "+12.5%", "trend": "up"},
            {"title": "Novos Clientes", "value": "1.284", "change": "+8.2%", "trend": "up"},
            {"title": "Pedidos", "value": "3.847", "change": "-2.4%", "trend": "down"},
            {"title": "Taxa de Conversão", "value": "3.24%", "change": "+0.8%", "trend": "up"}
        ]
    }

@app.get("/insights")
def insights():
    return {
        "success": True,
        "insights": [
            {"type": "success", "title": "Meta Superada", "message": "Vendas superaram meta em 11,7%"},
            {"type": "warning", "title": "Atenção Marketing", "message": "Marketing 2,5% abaixo da meta"},
            {"type": "info", "title": "Melhor Performance", "message": "TI teve 95% de performance"}
        ]
    }

@app.get("/generate_insights")
def generate_insights():
    dados = gerar_dados()
    receitas = [d['receita'] for d in dados]
    media = sum(receitas) / len(receitas)
    previsao = round(sum(receitas[-3:]) / 3, 2)
    return {
        "success": True,
        "insights": [
            {"tipo": "tendencia", "titulo": "Tendência detectada", "detalhes": f"Média: R$ {media:,.2f}"},
            {"tipo": "previsao", "titulo": "Previsão próximo mês", "detalhes": f"R$ {previsao:,.2f}"}
        ]
    }

@app.get("/performance")
def performance():
    departamentos = ['Vendas', 'Marketing', 'Operações', 'TI', 'RH']
    dados = []
    for dept in departamentos:
        perf = round(random.uniform(70, 98), 1)
        meta = round(random.uniform(75, 90), 1)
        dados.append({
            "departamento": dept,
            "performance": perf,
            "meta": meta,
            "status": "acima" if perf >= meta else "abaixo"
        })
    return {"success": True, "dados": dados}

@app.get("/distribuicao")
def distribuicao():
    return {
        "success": True,
        "dados": [
            {"name": "Vendas", "value": 35, "color": "#667eea"},
            {"name": "Marketing", "value": 25, "color": "#764ba2"},
            {"name": "Operações", "value": 20, "color": "#f093fb"},
            {"name": "TI", "value": 15, "color": "#4facfe"},
            {"name": "Outros", "value": 5, "color": "#38ef7d"}
        ]
    }

@app.get("/metrics_ai")
def metrics_ai():
    return {
        "success": True,
        "metricas": {
            "acuracia_modelo": "89.5%",
            "dados_analisados": 12450,
            "insights_gerados": 47
        }
    }

@app.get("/extract_transform")
def extract_transform():
    return {
        "success": True,
        "etl_status": {
            "ultima_execucao": datetime.now().isoformat(),
            "registros_processados": 8547,
            "status": "concluido"
        }
    }
