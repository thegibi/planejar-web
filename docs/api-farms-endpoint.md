# API Endpoint - Fazendas

## GET `/api/farms`

Este endpoint permite buscar todas as fazendas cadastradas no sistema com suporte a paginação e busca.

### Parâmetros de Query (opcionais)

| Parâmetro | Tipo | Padrão | Descrição |
|-----------|------|--------|-----------|
| `page` | number | 1 | Página atual para paginação |
| `limit` | number | 20 | Número de itens por página (máximo recomendado: 100) |
| `search` | string | "" | Termo de busca (nome da fazenda, proprietário ou localização) |

### Exemplos de Uso

#### 1. Buscar todas as fazendas (página 1, limite 20)
```
GET /api/farms
```

#### 2. Buscar com paginação
```
GET /api/farms?page=2&limit=10
```

#### 3. Buscar por termo
```
GET /api/farms?search=São João
```

#### 4. Combinando parâmetros
```
GET /api/farms?page=1&limit=5&search=Rafael
```

### Resposta de Sucesso (200)

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Faz. São João",
      "location": "Sinop",
      "area": 850,
      "calculatedArea": 50,
      "sprayTank": "1500",
      "fertilizerSpreader": "Lancer 1500",
      "owner": {
        "id": 4,
        "name": "EVANDRO GIBICOSKI",
        "phone": "48998463847",
        "email": "evandrogibicoski@gmail.com"
      },
      "plots": [
        {
          "id": 1,
          "name": "TH10",
          "area": 50
        }
      ],
      "stats": {
        "totalPlots": 1,
        "totalPlantings": 0
      }
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalItems": 3,
    "itemsPerPage": 20,
    "hasNextPage": false,
    "hasPreviousPage": false
  }
}
```

### Resposta de Erro (500)

```json
{
  "success": false,
  "error": "Erro interno do servidor",
  "message": "Não foi possível carregar as fazendas"
}
```

### Campos Retornados

#### Fazenda
- `id`: ID único da fazenda
- `name`: Nome da fazenda
- `location`: Localização/cidade
- `area`: Área total cadastrada (ha)
- `calculatedArea`: Área real baseada nos talhões (ha)
- `sprayTank`: Capacidade do tanque de pulverização
- `fertilizerSpreader`: Tipo do distribuidor de adubo

#### Proprietário
- `id`: ID do proprietário
- `name`: Nome completo
- `phone`: Telefone de contato
- `email`: Email de contato

#### Talhões (plots)
- `id`: ID do talhão
- `name`: Nome do talhão
- `area`: Área do talhão (ha)

#### Estatísticas
- `totalPlots`: Total de talhões cadastrados
- `totalPlantings`: Total de plantios realizados

#### Paginação
- `currentPage`: Página atual
- `totalPages`: Total de páginas
- `totalItems`: Total de itens encontrados
- `itemsPerPage`: Itens por página
- `hasNextPage`: Se existe próxima página
- `hasPreviousPage`: Se existe página anterior

### Notas de Implementação

1. **Busca**: A busca é case-insensitive e procura em nome da fazenda, nome do proprietário e localização
2. **Performance**: O endpoint já inclui contadores otimizados para estatísticas
3. **Área Calculada**: `calculatedArea` é a soma real das áreas dos talhões, pode diferir de `area`
4. **Paginação**: Recomenda-se usar paginação para listas grandes (limit máximo sugerido: 100)