-- Migração: Renomear tabela Client para Owner
-- Execute no seu banco de dados PostgreSQL

-- 1. Renomear a tabela Client para Owner
ALTER TABLE "Client" RENAME TO "Owner";

-- 2. Verificar se a renomeação funcionou
-- SELECT * FROM "Owner" LIMIT 5;