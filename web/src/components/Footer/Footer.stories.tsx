import type { ComponentMeta } from '@storybook/react'

import Footer from './Footer'

export const generated = () => {
  return <Footer />
}

export default {
  title: 'Footer',
  component: Footer,
} as ComponentMeta<typeof Footer>
