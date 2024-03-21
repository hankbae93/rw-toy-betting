import { Metadata } from '@redwoodjs/web'
import BetList from 'src/components/Bet/BetList'

const BetListPage = () => {
  return (
    <>
      <Metadata title="BetList" description="BetList page" />

      <BetList />
    </>
  )
}

export default BetListPage
