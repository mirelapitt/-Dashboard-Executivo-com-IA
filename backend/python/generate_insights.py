print("Insights gerados com IA")
import pandas as pd

df = pd.read_csv("../data/financeiro_tratado.csv")

insights = []

if df["receita"].iloc[-1] > df["receita"].mean():
    insights.append("Receita atual acima da média histórica")

if df["previsao_receita"].iloc[-1] > df["receita"].iloc[-1]:
    insights.append("Modelo indica crescimento no próximo período")

for i in insights:
    print("•", i)

