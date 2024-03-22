import type { Meta, StoryObj } from '@storybook/react'

import BetDetailPage from './BetDetailPage'

const meta: Meta<typeof BetDetailPage> = {
  component: BetDetailPage,
}

export default meta

type Story = StoryObj<typeof BetDetailPage>

export const Primary: Story = {}
