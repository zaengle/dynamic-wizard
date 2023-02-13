import { createRoot } from 'react-dom/client'
import { useState } from 'react'
import PropTypes from 'prop-types'

import SingleSelectField from './components/SingleSelectField'
import MultiSelectField from './components/MultiSelectField'
import SteppedRangeField from './components/SteppedRangeField'
import { questionType } from './types'
import Interstitial from './components/Interstitial'
import Answers from './components/Answers'

const Quiz = ({ questions }) => {
  const isQuestionsValid = Array.isArray(questions) || questions.length === 0

  const [currentStep, setCurrentStep] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(
    isQuestionsValid ? questions[currentStep] : null,
  )

  const [currentAnswer, setCurrentAnswer] = useState([])

  const [answers, setAnswers] = useState(
    isQuestionsValid &&
      questions.map((question) => {
        return { id: question.id, answer: [] }
      }),
  )

  const [stepHistory] = useState([])

  const isFirstStep = currentQuestion && questions[0].id === currentQuestion.id

  const isLastStep = currentQuestion && questions[questions.length - 1].id === currentQuestion.id

  const percentage = isQuestionsValid
    ? Number((((currentStep + 1) / questions.length) * 100).toFixed(0))
    : 0

  const goToStep = (stepIndex) => {
    if (stepIndex >= 0 && stepIndex < questions.length) {
      setCurrentStep(stepIndex)
      setCurrentQuestion(questions[stepIndex])
    } else {
      console.warn(
        [
          `Invalid step index [${stepIndex}] passed to 'goToStep'. `,
          `Ensure the given stepIndex is not out of boundaries.`,
        ].join(''),
      )
    }
  }

  const addAnswer = () => {
    setAnswers((prevState) => {
      const newState = prevState.map((answer) => {
        if (answer.id === currentQuestion.id) {
          return { ...answer, answer: currentAnswer }
        }
        return answer
      })
      return newState
    })
  }

  // This function is used to find the index of a question in the questions array by the question id
  const getIndex = id => questions.findIndex(question => question.id === id)

  const nextQuestion = () => {
    stepHistory.push(currentStep)
    // We need to sort the answers array with the first available question
    setCurrentAnswer(
      currentAnswer.sort(
        (a, b) => getIndex(a.proceedsTo) - getIndex(b.proceedsTo),
      ),
    )
    addAnswer()
    goToStep(getIndex(currentAnswer[0]?.proceedsTo))
    // We need to filter the answers array by the next question id and set it as the current answer for the next question
    let answer = answers.filter(
      answer => answer.id === currentAnswer[0]?.proceedsTo,
    )
    setCurrentAnswer(answer[0].answer)
  }

  const previousQuestion = () => {
    let id = stepHistory.pop()
    goToStep(id)
    // We need to filter the answers array by the previous question id and set it as the current answer
    let answer = answers.filter(answer => answer.id === questions[id].id)
    setCurrentAnswer(answer[0].answer)
  }

  const skipQuestion = (id) => {
    let answer = answers.filter(answer => answer.id === id)
    setCurrentAnswer(answer[0].answer)
    goToStep(getIndex(id))
  }

  const renderQuestion = (question) => {
    if (question?.type === 'steppedRange' && currentAnswer.length === 0) {
      setCurrentAnswer([question?.answers[0]])
    }

    switch (question?.type) {
      case 'singleSelect':
        return (
          <SingleSelectField
            question={question}
            currentAnswer={currentAnswer}
            setCurrentAnswer={setCurrentAnswer}
          />
        )
      case 'multiSelect':
        return (
          <MultiSelectField
            question={question}
            currentAnswer={currentAnswer}
            setCurrentAnswer={setCurrentAnswer}
          />
        )
      case 'steppedRange':
        return (
          <SteppedRangeField
            question={question}
            currentAnswer={currentAnswer}
            setCurrentAnswer={setCurrentAnswer}
          />
        )
      default:
        return (
          <p>Question type not supported</p>
        )
    }
  }

  if (!isQuestionsValid) {
    return null
  }

  return (
    <section className="max-w-2xl p-5 md:p-7 lg:p-10 mx-auto border-2 border-black mt-10">
      {currentQuestion.type === 'interstitial' ? (
        <Interstitial currentQuestion={currentQuestion} goToStep={goToStep} getIndex={getIndex}>
          {isLastStep ? (
            <Answers answers={answers} questions={questions} />
          ) : null}
        </Interstitial>
      ) : (
        <>
          <fieldset>
            <legend className="mb-5 flex flex-col gap-4">
              <h1 className="text-3xl font-bold">{currentQuestion?.title}</h1>
              {currentQuestion?.description &&
                  <div className="prose" dangerouslySetInnerHTML={{ __html: currentQuestion?.description }} />
              }
            </legend>

            {renderQuestion(currentQuestion)}

            {currentQuestion?.allowSkip && currentQuestion?.skipToQuestion && (
              <button className="capitalize text-sm font-bold text-blue-700 mt-8 hover:underline" onClick={() => skipQuestion(currentQuestion?.skipToQuestion)}>
                  skip this question
              </button>
            )}
          </fieldset>

          <div className="mt-10 flex flex-col gap-4 md:flex-row md:justify-between">
            <div className="flex items-center gap-3 w-full">
              <p className="text-blue-700 text-lg font-bold">{percentage + '%'}</p>
              <div className="w-full h-2 bg-gray-300 rounded-full max-w-[250px]">
                <div className="h-2 bg-blue-700 rounded-full" style={{ width: percentage + '%' }}/>
              </div>
            </div>

            <div className="flex justify-between gap-4 md:justify-start">
              {!isFirstStep && (
                <button
                  className="px-3 py-2 border-2 border-blue-700 text-sm uppercase font-medium text-blue-700 bg-transparent hover:bg-blue-900 hover:border-blue-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => previousQuestion()}
                  disabled={isFirstStep || stepHistory.length === 0}
                >
              Previous
                </button>
              )}

              <button
                className="px-3 py-2 border-2 border-blue-700 text-sm uppercase font-medium text-white bg-blue-700 hover:bg-blue-900 hover:border-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => nextQuestion()}
                disabled={currentAnswer.length === 0}
              >
              Next
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  )
}

export default Quiz

Quiz.propTypes = {
  questions: PropTypes.arrayOf(questionType).isRequired,
}

if (document.getElementById('quiz')) {
  const container = document.getElementById('quiz')

  const props = Object.assign({}, container.dataset)
  const root = createRoot(container)

  props.questions = JSON.parse(props.questions)

  root.render(<Quiz {...props} />)
}
