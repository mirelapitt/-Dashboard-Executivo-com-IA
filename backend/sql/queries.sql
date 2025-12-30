SELECT
    mes,
    receita,
    custo,
    (receita - custo) AS lucro,
    (receita - custo) / receita AS margem
FROM financeiro;
