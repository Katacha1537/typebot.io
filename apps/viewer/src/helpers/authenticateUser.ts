import { User } from '@typebot.io/prisma'
import { NextApiRequest } from 'next'
import prisma from '@typebot.io/lib/prisma'

export const authenticateUser = async (
  req: NextApiRequest
): Promise<User | undefined> => {
  console.log('Starting user authentication')
  const token = extractBearerToken(req)
  console.log('Extracted token:', token)
  return authenticateByToken(token)
}

const authenticateByToken = async (
  apiToken?: string
): Promise<User | undefined> => {
  if (!apiToken) {
    console.log('No API token provided')
    return
  }
  console.log('Authenticating by token:', apiToken)
  const user = await prisma.user.findFirst({
    where: { apiTokens: { some: { token: apiToken } } },
  })
  console.log('User found:', user)
  return user as User
}

const extractBearerToken = (req: NextApiRequest) => {
  const authHeader = req.headers['authorization']
  console.log('Authorization header:', authHeader)
  return authHeader?.slice(7)
}
