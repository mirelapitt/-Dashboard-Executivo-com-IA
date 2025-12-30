SELECT
    mes,
    receita,
    custo,
    (receita - custo) AS lucro,
    ROUND((receita - custo) / receita * 100, 2) AS margem_percentual,
    pedidos,
    clientes,
    ROUND(receita / pedidos, 2) AS ticket_medio
FROM financeiro
ORDER BY mes;
