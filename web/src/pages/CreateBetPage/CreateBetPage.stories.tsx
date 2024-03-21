import type { Meta, StoryObj } from '@storybook/react'

import CreateBetPage from './CreateBetPage'

const meta: Meta<typeof CreateBetPage> = {
  component: CreateBetPage,
}

export default meta

type Story = StoryObj<typeof CreateBetPage>

export const Primary: Story = {}
