from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="API Financeira - Dashboard Executivo")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/financeiro")
def financeiro():
    return [
        {"mes": "Jan", "receita": 450000, "despesas": 320000, "lucro": 130000},
        {"mes": "Fev", "receita": 480000, "despesas": 340000, "lucro": 140000},
        {"mes": "Mar", "receita": 520000, "despesas": 360000, "lucro": 160000},
        {"mes": "Abr", "receita": 490000, "despesas": 350000, "lucro": 140000},
    ]

