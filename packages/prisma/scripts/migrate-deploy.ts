import { executePrismaCommand } from './executeCommand'

if (process.env.DATABASE_URL?.startsWith('postgres')) {
  executePrismaCommand('prisma migrate deploy')
} else {
  console.error('DATABASE_URL deve iniciar com "postgres" para deploy de migração.')
  process.exit(1)
}