import { fieldType } from '../types'

const SingleSelectField = ({ question, currentAnswer, setCurrentAnswer }) => {
  return (
    <div className="flex flex-col gap-2" role="radiogroup">
      {question?.answers && question?.answers.map(answer => (
        <div key={answer.id} className="flex items-center">
          <input
            type="radio"
            id={answer.id}
            name={question.id}
            value={answer.id}
            className="h-4 w-4 text-blue-700 focus:ring-blue-500"
            onChange={() => {
              setCurrentAnswer([answer])
            }}
            checked={
              currentAnswer.length !== 0
                ? currentAnswer[0].id === answer.id
                : false
            }
          />
          <label htmlFor={answer.id} className="ml-3 font-medium">
            {answer.title}
          </label>
        </div>
      ))}
    </div>
  )
}

SingleSelectField.propTypes = fieldType

export default SingleSelectField
