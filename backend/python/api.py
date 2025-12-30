from fastapi import FastAPI
import pandas as pd

app = FastAPI()

@app.get("/financeiro")
def get_financeiro():
    df = pd.read_csv("../data/financeiro_tratado.csv")
    return df.to_dict(orient="records")

@app.get("/insights")
def get_insights():
    return [
        {
            "tipo": "positivo",
            "titulo": "Crescimento de Receita",
            "descricao": "Receita acima da média histórica",
            "impacto": "Alto"
        },
        {
            "tipo": "alerta",
            "titulo": "Custo Operacional",
            "descricao": "Custos cresceram mais rápido que a receita",
            "impacto": "Médio"
        }
    ]
