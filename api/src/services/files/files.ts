import * as Filestack from 'filestack-js'
import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const files: QueryResolvers['files'] = () => {
  return db.file.findMany()
}

export const file: QueryResolvers['file'] = ({ id }) => {
  return db.file.findUnique({
    where: { id },
  })
}

export const createFile: MutationResolvers['createFile'] = ({ input }) => {
  return db.file.create({
    data: input,
  })
}

export const updateFile: MutationResolvers['updateFile'] = ({ id, input }) => {
  return db.file.update({
    data: input,
    where: { id },
  })
}

const isValidURL = (string: string) => {
  try {
    // eslint-disable-next-line no-new
    new URL(string)
    return true
  } catch (error) {
    return false
  }
}

export const deleteFile: MutationResolvers['deleteFile'] = async ({ id }) => {
  const client = Filestack.init(process.env.REDWOOD_ENV_FILESTACK_API_KEY)

  const file = await db.file.findUnique({ where: { id } })

  //unique part of the Filestack file's url.
  if (isValidURL(file.path)) {
    const handle = file.path.split('/').pop()
    const security = Filestack.getSecurity(
      {
        expiry: new Date().getTime() + 5 * 60 * 1000,
        handle,
        call: ['remove'],
      },
      process.env.REDWOOD_ENV_FILESTACK_SECRET
    )

    await client.remove(handle, security)
  }

  return db.file.delete({
    where: { id },
  })
}
