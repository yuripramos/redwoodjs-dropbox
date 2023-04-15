import type { File } from '@prisma/client'
import * as Filestack from 'filestack-js'

import { files, file, createFile, updateFile, deleteFile } from './files'
import type { StandardScenario } from './files.scenarios'

describe('files', () => {
  scenario('returns all files', async (scenario: StandardScenario) => {
    const result = await files()

    expect(result.length).toEqual(Object.keys(scenario.file).length)
  })

  scenario('returns a single file', async (scenario: StandardScenario) => {
    const result = await file({ id: scenario.file.one.id })

    expect(result).toEqual(scenario.file.one)
  })

  scenario('creates a file', async () => {
    const result = await createFile({
      input: { name: 'String', path: 'String', size: 7230736, type: 'String' },
    })

    expect(result.name).toEqual('String')
    expect(result.path).toEqual('String')
    expect(result.size).toEqual(7230736)
    expect(result.type).toEqual('String')
  })

  scenario('updates a file', async (scenario: StandardScenario) => {
    const original = (await file({ id: scenario.file.one.id })) as File
    const result = await updateFile({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a file', async (scenario: StandardScenario) => {
    const original = await file({ id: scenario.file.one.id })
    expect(original).not.toEqual(null)

    // Mock Filestack initialization
    jest.spyOn(Filestack, 'init').mockReturnValue({ remove: () => {} } as any)

    // Mock Filestack.getSecurity
    jest
      .spyOn(Filestack, 'getSecurity')
      .mockReturnValue({ policy: 'mockPolicy', signature: 'mockSignature' })

    await deleteFile({ id: original.id }) // Delete the file
    const result = await file({ id: original.id }) // Try to fetch the deleted file

    expect(result).toEqual(null) // Expect the deleted file to be null
  })
})
