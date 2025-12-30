import pandas as pd
import sqlite3
from sklearn.linear_model import LinearRegression
import numpy as np

conn = sqlite3.connect("financeiro.db")
df = pd.read_sql("SELECT * FROM financeiro", conn)

# Modelo preditivo simples (receita)
X = np.arange(len(df)).reshape(-1, 1)
y = df["receita"].values

model = LinearRegression()
model.fit(X, y)

df["previsao_receita"] = model.predict(X)

df.to_csv("../data/financeiro_tratado.csv", index=False)

conn.close()
