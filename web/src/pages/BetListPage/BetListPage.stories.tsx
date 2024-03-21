import type { Meta, StoryObj } from '@storybook/react'

import BetListPage from './BetListPage'

const meta: Meta<typeof BetListPage> = {
  component: BetListPage,
}

export default meta

type Story = StoryObj<typeof BetListPage>

export const Primary: Story = {}
