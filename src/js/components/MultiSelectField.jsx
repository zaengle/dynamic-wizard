import { fieldType } from '../types'

const MultiSelectField = ({ question, currentAnswer, setCurrentAnswer }) => {
  const handleOnChange = (option) => {
    if (currentAnswer.find(answer => answer.id === option.id)) {
      setCurrentAnswer(items => items.filter(item => item.id !== option.id))
    } else {
      setCurrentAnswer([...currentAnswer, option])
    }
  }

  return (
    <div className="flex flex-col gap-2" role="radiogroup">
      {question?.answers && question?.answers.map(answer => (
        <div key={answer.id} className="flex items-center">
          <input
            type="checkbox"
            id={answer.id}
            name={question.id}
            value={answer.id}
            className="h-4 w-4 text-blue-700 focus:ring-blue-500"
            checked={!!currentAnswer.find(ans => ans.id === answer.id)}
            onChange={() => handleOnChange(answer)}
          />
          <label htmlFor={answer.id} className="ml-3 font-medium">
            {answer.title}
          </label>
        </div>
      ))}
    </div>
  )
}

MultiSelectField.propTypes = fieldType

export default MultiSelectField
