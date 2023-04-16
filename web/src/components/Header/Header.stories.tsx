import type { ComponentMeta } from '@storybook/react'

import Header from './Header'

export const generated = () => {
  return <Header />
}

export default {
  title: 'Header',
  component: Header,
} as ComponentMeta<typeof Header>
