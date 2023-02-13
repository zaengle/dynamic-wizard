import PropTypes from 'prop-types'
import { answerType, questionType } from '../types'

const Answers = ({ questions, answers }) => {
  return (
    <ol className="list-decimal text-left space-y-4">
      {
        answers.map((answer) => {
          let question = questions.find(question => question.id === answer.id)

          return (
            answer.answer.length !== 0 && <li key={question.id}>
              <p className="font-bold">
                {question.title}
              </p>
              <div>
                <ul className="list-disc ml-5">
                  {answer.answer.map(answer => (
                    <li key={answer.id}>
                      {answer.title}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          )
        })
      }
    </ol>
  )
}

export default Answers

Answers.propTypes = {
  questions: PropTypes.arrayOf(questionType).isRequired,
  answers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    answer: PropTypes.arrayOf(answerType).isRequired,
  })).isRequired,
}
