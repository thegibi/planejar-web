# API Endpoint - Aplicações

## GET `/api/applications`

Este endpoint permite buscar todas as aplicações cadastradas no sistema com suporte a paginação, busca e filtros.

### Parâmetros de Query (opcionais)

| Parâmetro | Tipo | Padrão | Descrição |
|-----------|------|--------|-----------|
| `page` | number | 1 | Página atual para paginação |
| `limit` | number | 10 | Número de itens por página (máximo recomendado: 100) |
| `search` | string | "" | Termo de busca (nome da fazenda ou cultura do plantio) |
| `farmId` | number | - | ID da fazenda para filtrar aplicações específicas |

### Exemplos de Uso

#### 1. Buscar todas as aplicações (página 1, limite 10)
```
GET /api/applications
```

#### 2. Buscar com paginação
```
GET /api/applications?page=2&limit=20
```

#### 3. Buscar por termo (fazenda ou cultura)
```
GET /api/applications?search=milho
```

#### 4. Filtrar por fazenda específica
```
GET /api/applications?farmId=123
```

#### 5. Combinando parâmetros
```
GET /api/applications?page=1&limit=15&search=fungicida&farmId=5
```

### Resposta de Sucesso (200)

```json
{
  "applications": [
    {
      "id": 1,
      "applicationDate": "2025-10-20T00:00:00.000Z",
      "plotIds": [1, 2, 3],
      "inputIds": [5, 8, 12],
      "flowRate": 200.5,
      "rowSpacing": 0.5,
      "farmId": 1,
      "plantingId": 2,
      "createdAt": "2025-10-15T10:30:00.000Z",
      "updatedAt": "2025-10-15T10:30:00.000Z",
      "farm": {
        "id": 1,
        "name": "Fazenda São João",
        "location": "Sinop - MT",
        "owner": {
          "name": "João Silva"
        }
      },
      "planting": {
        "id": 2,
        "crop": "Milho",
        "varieties": ["Pioneer 30F53", "DKB 240"],
        "plantingDate": "2025-09-15T00:00:00.000Z",
        "population": 65000
      },
      "plots": [
        {
          "id": 1,
          "name": "Talhão 1",
          "area": 10.5
        },
        {
          "id": 2,
          "name": "Talhão 2",
          "area": 8.3
        }
      ],
      "inputs": [
        {
          "id": 5,
          "class": "Fungicida",
          "commercialBrand": "Opera",
          "activeIngredient": "Epoxiconazole + Piraclostrobina",
          "unitOfMeasure": "L"
        },
        {
          "id": 8,
          "class": "Herbicida",
          "commercialBrand": "Roundup",
          "activeIngredient": "Glifosato",
          "unitOfMeasure": "L"
        }
      ]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": false
  }
}
```

### Estrutura de Dados

#### Application (Aplicação)
| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | number | ID único da aplicação |
| `applicationDate` | string (ISO) | Data da aplicação |
| `plotIds` | number[] | Array de IDs dos talhões aplicados |
| `inputIds` | number[] | Array de IDs dos insumos utilizados |
| `flowRate` | number \| null | Vazão em L/ha (opcional) |
| `rowSpacing` | number \| null | Espaçamento entre fileiras em metros (opcional) |
| `farmId` | number | ID da fazenda |
| `plantingId` | number | ID do plantio |
| `createdAt` | string (ISO) | Data de criação do registro |
| `updatedAt` | string (ISO) | Data da última atualização |

#### Farm (Fazenda - relacionamento)
| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | number | ID da fazenda |
| `name` | string | Nome da fazenda |
| `location` | string | Localização da fazenda |
| `owner.name` | string | Nome do proprietário |

#### Planting (Plantio - relacionamento)
| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | number | ID do plantio |
| `crop` | string | Cultura plantada |
| `varieties` | string[] | Array de variedades utilizadas |
| `plantingDate` | string (ISO) | Data do plantio |
| `population` | number | População de plantas |

#### Plot (Talhão - relacionamento)
| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | number | ID do talhão |
| `name` | string | Nome do talhão |
| `area` | number | Área do talhão em hectares |

#### Input (Insumo - relacionamento)
| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | number | ID do insumo |
| `class` | string | Classe do insumo (Fungicida, Herbicida, etc.) |
| `commercialBrand` | string | Marca comercial |
| `activeIngredient` | string | Ingrediente ativo |
| `unitOfMeasure` | string | Unidade de medida |

#### Pagination (Paginação)
| Campo | Tipo | Descrição |
|-------|------|-----------|
| `page` | number | Página atual |
| `limit` | number | Limite de itens por página |
| `total` | number | Total de registros encontrados |
| `totalPages` | number | Número total de páginas |
| `hasNext` | boolean | Se existe próxima página |
| `hasPrev` | boolean | Se existe página anterior |

### Resposta de Erro (500)

```json
{
  "error": "Erro interno do servidor"
}
```

### Filtros de Busca

O parâmetro `search` realiza busca insensível a caso nos seguintes campos:
- Nome da fazenda (`farm.name`)
- Cultura do plantio (`planting.crop`)

### CORS

Este endpoint inclui headers CORS para permitir acesso de aplicações web e móveis:
- `Access-Control-Allow-Origin: *`
- `Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS`
- `Access-Control-Allow-Headers: Content-Type, Authorization`

### Notas Importantes

1. **Performance**: As consultas são otimizadas com `Promise.all` para buscar relacionamentos em paralelo
2. **Ordenação**: As aplicações são ordenadas pela data de aplicação (mais recentes primeiro)
3. **Relacionamentos**: Os arrays `plotIds` e `inputIds` são resolvidos automaticamente nos objetos `plots` e `inputs`
4. **Paginação**: Sempre use paginação para melhor performance em grandes datasets

### Casos de Uso Comuns

#### Mobile App - Listar aplicações recentes
```javascript
fetch('/api/applications?limit=20')
  .then(response => response.json())
  .then(data => {
    console.log('Aplicações:', data.applications);
    console.log('Total:', data.pagination.total);
  });
```

#### Dashboard - Aplicações de uma fazenda específica
```javascript
fetch(`/api/applications?farmId=${farmId}&page=1&limit=50`)
  .then(response => response.json())
  .then(data => {
    // Processar aplicações da fazenda
  });
```

#### Relatórios - Buscar por cultura
```javascript
fetch('/api/applications?search=soja&limit=100')
  .then(response => response.json())
  .then(data => {
    // Aplicações relacionadas à soja
  });
```