import { Metadata } from '@redwoodjs/web'
import BetCell from 'src/components/Bet/BetCell'

interface BetDetailPageProps {
  id: number
}

const BetDetailPage = ({ id }: BetDetailPageProps) => {
  return (
    <>
      <Metadata title="BetDetail" description="BetDetail page" />

      <BetCell id={id} />
    </>
  )
}

export default BetDetailPage
