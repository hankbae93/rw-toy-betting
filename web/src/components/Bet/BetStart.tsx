import { useParams } from '@redwoodjs/router'
import BetStartForm from 'src/components/Bet/BetStartForm'

const BetStart = () => {
  const params = useParams()

  return <BetStartForm id={+params.id} />
}

export default BetStart
