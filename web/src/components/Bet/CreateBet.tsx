import {
  FieldError,
  Form,
  Label,
  SelectField,
  Submit,
  TextField,
} from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import { CreateBetInput } from '$api/types/graphql'
import { FormEventHandler, KeyboardEventHandler, useState } from 'react'
import { PlusCircleIcon, XCircleIcon } from '@heroicons/react/solid'

interface CreateBetProps {}

const CREATE_BET_MUTATION = gql`
  mutation CreateBet($input: CreateBetInput) {
    createBet(input: $input) {
      id
    }
  }
`

const CreateBet = ({}: CreateBetProps) => {
  const [betOptions, setBetOptions] = useState<CreateBetInput['betOptions']>([])
  const [betOptionContent, setBetOptionContent] = useState('')
  const [createBet, { loading, error }] = useMutation(CREATE_BET_MUTATION, {
    onCompleted: () => {
      toast.success('Post created')
      navigate(routes.betList())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onChangeBetOptionContent: FormEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setBetOptionContent(e.currentTarget.value)
  }

  const onKeyPressBetOptionContent: KeyboardEventHandler<HTMLInputElement> = (
    e
  ) => {
    e.preventDefault()

    if (e.key === 'Enter' && !!e.currentTarget.value) {
      addBetOptionContent()
    }
  }

  const addBetOptionContent = () => {
    setBetOptions((prev) => {
      const newArr = [...prev]
      newArr.push({ content: betOptionContent })

      console.log(newArr)
      return newArr
    })
    setBetOptionContent('')
  }

  const deleteBetOptionContent = (index: number) => {
    console.log('deleteBetOptionContent')
    setBetOptions((prev) => prev.filter((_, idx) => idx !== index))
  }

  const onSave = (input: CreateBetInput) => {
    const data = Object.assign(input, { betOptions })
    createBet({ variables: { input: data } })
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSave}>
        <Label
          name="title"
          className="rw-label uppercase"
          errorClassName="rw-label rw-label-error"
        >
          Title
        </Label>
        <TextField
          name="title"
          className="rw-input uppercase"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="title" className="rw-field-error" />

        <Label
          name="category"
          className="rw-label uppercase"
          errorClassName="rw-label rw-label-error"
        >
          Category
        </Label>
        <TextField
          name="category"
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="category" className="rw-field-error" />

        <Label
          name="betMode"
          className="rw-label uppercase"
          errorClassName="rw-label rw-label-error"
        >
          Bet Mode
        </Label>
        <SelectField name="betMode" className="rw-input">
          <option>ALL_IN</option>
          <option>HALF</option>
        </SelectField>

        <div>
          <h2 className="rw-label flex items-center gap-2">
            <p className="uppercase">Create Bet Option</p>
            <PlusCircleIcon
              onClick={addBetOptionContent}
              className="text-black-100 cursor-pointer hover:text-blue-200"
              width={20}
            />
          </h2>

          {betOptions.length > 0 && (
            <div className="mb-4 flex items-center gap-5 rounded-md bg-white p-4 shadow-md">
              {betOptions.map((betOption, index) => {
                return (
                  <div key={index}>
                    <p className="text-gray-600">Option {index + 1}</p>
                    <div className="flex gap-2">
                      <p className="text-lg font-semibold">
                        {betOption.content}
                      </p>
                      <button onClick={() => deleteBetOptionContent(index)}>
                        <XCircleIcon
                          className="cursor-pointer text-gray-600 "
                          width={20}
                        />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          <input
            className="rw-input"
            value={betOptionContent}
            onChange={onChangeBetOptionContent}
            onKeyPress={onKeyPressBetOptionContent}
            disabled={betOptions.length > 4}
          />
        </div>

        <div className="rw-button-group">
          <Submit
            // disabled={props.loading}
            className="rw-button rw-button-blue"
          >
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default CreateBet
