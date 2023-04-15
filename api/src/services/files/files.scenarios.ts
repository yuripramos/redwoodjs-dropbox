import type { Prisma, File } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.FileCreateArgs>({
  file: {
    one: {
      data: { name: 'String', path: 'String', size: 697715, type: 'String' },
    },
    two: {
      data: { name: 'String', path: 'String', size: 6878405, type: 'String' },
    },
  },
})

export type StandardScenario = ScenarioData<File, 'file'>
