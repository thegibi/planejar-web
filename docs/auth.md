# Sistema de Autenticação - Planejar

## 🔐 Autenticação Implementada

O sistema de autenticação foi implementado usando **NextAuth.js** com **Prisma** e **PostgreSQL**.

## ✅ Funcionalidades

- ✅ **Login com email/senha**
- ✅ **Registro de novos usuários**
- ✅ **Proteção de rotas**
- ✅ **Middleware de validação de sessão**
- ✅ **Hash seguro de senhas** (bcryptjs)
- ✅ **Persistência de sessão**
- ✅ **Logout funcional**

## 🚀 Como Usar

### 1. Usuário Administrador
Já foi criado um usuário administrador padrão:
- **Email:** `admin@planejar.com`
- **Senha:** `admin123`

### 2. Acessar o Sistema
1. Acesse `http://localhost:3000`
2. Será redirecionado para `/auth/signin`
3. Use as credenciais do administrador ou crie uma nova conta

### 3. Criar Novos Usuários
- Acesse `/auth/signup` para criar uma nova conta
- Ou use a API `POST /api/auth/register`

## 🛡️ Proteção de Rotas

### Middleware Automático
Todas as rotas são protegidas automaticamente, exceto:
- `/auth/signin` - Página de login
- `/auth/signup` - Página de registro
- `/api/auth/*` - APIs de autenticação

### Rotas Protegidas
Todas as outras rotas requerem autenticação:
- `/` - Home
- `/clients/*` - Clientes
- `/farms/*` - Fazendas
- `/plots/*` - Talhões
- `/inputs/*` - Insumos
- etc.

## 🔧 Configuração Técnica

### Banco de Dados
Novos models adicionados ao Prisma:
```prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  password      String?
  accounts      Account[]
  sessions      Session[]
}

model Account { ... }
model Session { ... }
model VerificationToken { ... }
```

### Variáveis de Ambiente
Arquivo `.env.local`:
```env
NEXTAUTH_SECRET=sua-chave-secreta-super-segura-aqui
NEXTAUTH_URL=http://localhost:3000
```

### APIs Disponíveis

#### Autenticação (NextAuth)
- `GET/POST /api/auth/signin` - Login
- `GET/POST /api/auth/signout` - Logout
- `GET /api/auth/session` - Sessão atual

#### Registro Customizado
- `POST /api/auth/register` - Criar novo usuário
```json
{
  "name": "Nome do Usuário",
  "email": "email@exemplo.com",
  "password": "senha123"
}
```

## 🎨 Interface de Usuário

### Páginas de Autenticação
- **Login:** `/auth/signin` - Design clean com logo Planejar
- **Registro:** `/auth/signup` - Formulário de criação de conta

### Layout Principal
- **Sidebar:** Mostra informações do usuário logado
- **Botão de Logout:** Na parte inferior do sidebar
- **Proteção Automática:** Redirecionamento automático se não autenticado

## 🔄 Fluxo de Autenticação

1. **Usuário acessa qualquer rota**
2. **Middleware verifica sessão**
3. **Se não autenticado:** Redireciona para `/auth/signin`
4. **Se autenticado:** Permite acesso normal
5. **Logout:** Limpa sessão e redireciona para login

## 🛠️ Scripts Utilitários

### Criar Usuário Administrador
```bash
npx tsx scripts/create-admin.ts
```

### Migrations do Banco
```bash
npx prisma migrate dev --name nome-da-migration
npx prisma generate
```

## 🔒 Segurança

- **Senhas:** Hash com bcryptjs (salt rounds: 12)
- **Sessions:** JWT tokens seguros
- **CSRF Protection:** Proteção automática do NextAuth
- **Middleware:** Validação de sessão em todas as rotas

## ⚡ Próximos Passos

- [ ] Recuperação de senha
- [ ] Verificação de email
- [ ] Autenticação com Google/GitHub
- [ ] Roles e permissões
- [ ] Auditoria de login

---

**✅ Sistema de autenticação completo e funcional!**