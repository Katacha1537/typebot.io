import { executePrismaCommand } from './executeCommand'

if (process.env.DATABASE_URL?.startsWith('postgres')) {
  executePrismaCommand('prisma migrate dev --create-only')
} else {
  console.error('DATABASE_URL deve iniciar com "postgres" para dev de migração.')
  process.exit(1)
}
