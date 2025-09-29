# Variáveis de Ambiente - Produção

## 🔧 Configuração Obrigatória para Produção

### NextAuth.js
```bash
# Secret para assinatura dos tokens JWT (OBRIGATÓRIO)
NEXTAUTH_SECRET="sua_chave_secreta_super_forte_aqui_32_chars_min"

# URL da aplicação em produção (OBRIGATÓRIO)
NEXTAUTH_URL="https://www.planejar.app"

# Ou use apenas (NextAuth.js detecta automaticamente)
# NEXTAUTH_URL_INTERNAL="https://www.planejar.app"
```

### Banco de Dados
```bash
# Connection string do PostgreSQL (OBRIGATÓRIO)
DATABASE_URL="postgresql://usuario:senha@host:port/database?sslmode=require"

# Alternativa com Prisma Accelerate (opcional)
# DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=sua_api_key"
```

### Configuração SSL (Produção)
```bash
# Força HTTPS (recomendado para produção)
NODE_ENV="production"
```

## 🚨 Checklist para Produção

### 1. Variáveis de Ambiente
- [ ] `NEXTAUTH_SECRET` definido (mínimo 32 caracteres)
- [ ] `NEXTAUTH_URL` definido como `https://www.planejar.app`
- [ ] `DATABASE_URL` configurado corretamente
- [ ] `NODE_ENV=production`

### 2. Domínio e DNS
- [ ] DNS configurado para `www.planejar.app`
- [ ] Certificado SSL válido
- [ ] Redirecionamento de `planejar.app` para `www.planejar.app`

### 3. Cookies e Segurança
- [ ] Cookies seguros habilitados (`secure: true`)
- [ ] SameSite configurado como `'lax'`
- [ ] Domain configurado como `.planejar.app`

### 4. Base de Dados
- [ ] Usuário admin criado (`npm run seed:admin`)
- [ ] Migrações executadas (`npx prisma migrate deploy`)
- [ ] Cliente Prisma gerado (`npx prisma generate`)

## 🔍 Debugging

### Logs para verificar problemas:
```bash
# Ativar debug do NextAuth
DEBUG="nextauth*"
```

### Comandos úteis:
```bash
# Verificar se admin existe
npm run verify:admin

# Criar usuário admin
npm run seed:admin

# Verificar conexão com banco
npx prisma studio
```

## 🌐 Configuração de Deploy

### Vercel (exemplo)
```bash
# No dashboard da Vercel, adicionar:
NEXTAUTH_SECRET=sua_chave_aqui
NEXTAUTH_URL=https://www.planejar.app
DATABASE_URL=sua_connection_string_aqui
NODE_ENV=production
```

### Outras Plataformas
- Railway: Configurar nas Environment Variables
- Render: Adicionar no Environment
- AWS/DigitalOcean: Configurar nas variáveis de ambiente

## ❗ Problemas Comuns

1. **Login não funciona**:
   - Verificar `NEXTAUTH_SECRET` (mínimo 32 chars)
   - Verificar `NEXTAUTH_URL` correto
   - Verificar certificado SSL

2. **Sessão não persiste**:
   - Verificar configuração de cookies
   - Verificar domínio `.planejar.app`
   - Verificar HTTPS

3. **Erro de banco de dados**:
   - Verificar `DATABASE_URL`
   - Executar migrações
   - Verificar se admin existe