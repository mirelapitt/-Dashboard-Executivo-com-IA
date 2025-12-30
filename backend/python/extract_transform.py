import pandas as pd
import sqlite3

# Carregar dados brutos
df = pd.read_csv("../data/base_financeira.csv")

# Conectar ao banco
conn = sqlite3.connect("financeiro.db")

# Criar tabela
with open("../sql/create_tables.sql") as f:
    conn.executescript(f.read())

# Inserir dados
df.to_sql("financeiro", conn, if_exists="replace", index=False)

conn.close()
print("ETL finalizado com sucesso")
