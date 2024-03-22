import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import { DatetimeLocalField, Form, Label, Submit } from '@redwoodjs/forms'
import { StartBetInput } from '$api/types/graphql'
import BetCell from 'src/components/Bet/BetCell'

interface BetStartFormProps {
  id: number
}

const START_BET_MUTATION = gql`
  mutation StartBet($input: StartBetInput) {
    startBet(input: $input)
  }
`

const BetStartForm = ({ id }: BetStartFormProps) => {
  const [startBet, { loading, error }] = useMutation(START_BET_MUTATION, {
    onCompleted: () => {
      toast.success('Bet Started')
      navigate(routes.betList())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSubmit = (input: StartBetInput) => {
    startBet({ variables: { input: Object.assign(input, { id }) } })
  }

  return (
    <>
      <BetCell id={id} />
      <Form onSubmit={onSubmit}>
        <Label
          name="startTime"
          className="rw-label uppercase"
          errorClassName="rw-label rw-label-error"
        >
          start Time
        </Label>
        <DatetimeLocalField name="startTime" />

        <Label
          name="endTime"
          className="rw-label uppercase"
          errorClassName="rw-label rw-label-error"
        >
          end Time
        </Label>
        <DatetimeLocalField name="endTime" />

        <div className="rw-button-group">
          <Submit disabled={loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </>
  )
}

export default BetStartForm
