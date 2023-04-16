import type { ComponentMeta } from '@storybook/react'

import DragAndDropFile from './DragAndDropFile'

export const generated = () => {
  return <DragAndDropFile />
}

export default {
  title: 'DragAndDrop',
  component: DragAndDropFile,
} as ComponentMeta<typeof DragAndDropFile>
