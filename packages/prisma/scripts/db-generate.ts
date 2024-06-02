import { executePrismaCommand } from './executeCommand'

executePrismaCommand('prisma generate', { force: true })
console.log('db generate rodando.')