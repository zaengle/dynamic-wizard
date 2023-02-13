# Code Block One

```twig
{% set questions = craft.entries().section('quizSteps').with([
  'skipToQuestion',
  'answers.answer',
  'answers.answer:answerId',
  'answers.answer:answerProceedsTo',
  'backTo',
  'nextTo'
  ]).collect()
%}

{% set quizSteps = [] %}

{% for question in questions %}
  {% if question.type.handle == 'question' %}
    {% set quizSteps = quizSteps|merge([{
      id: question.uid,
      type: question.questionType.value,
      title: question.title,
      description: question.questionDescription,
      allowSkip: question.allowSkip,
      skipToQuestion: question.skipToQuestion.first().uid ?? null,
      answers: question.answers|map((answer) => {
        title: answer.answerTitle,
        proceedsTo: answer.answerProceedsTo.first().uid ?? null,
      }),
    }]) %}
  {% elseif question.type.handle == 'interstitial' %}
    {% set quizSteps = quizSteps|merge([{
      id: question.uid,
      type: question.type.handle,
      title: question.title,
      description: question.questionDescription,
      backTo: question.backTo.first().uid ?? null,
      nextTo: question.nextTo.first().uid ?? null,
    }]) %}
  {% endif %}
{% endfor %}

{% dd(quizSteps) %}
```

# Code Block Two

```js
import {createRoot} from 'react-dom/client'
import PropTypes from 'prop-types'

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
```

# Code Block Three

```js
const Quiz = ({questions}) => {
    const isQuestionsValid = Array.isArray(questions) || questions.length === 0

    if (!isQuestionsValid) {
        return null
    }

    return (
        questions.map((question) => <p>{question.title}</p>)
    )
}
```

# Code Block Four

```js
...
const renderQuestion = (question) => {
    switch (question?.type) {
        case 'singleSelect':
            return (
                <SingleSelectField
                    question={question}
                />
            )
        case 'multiSelect':
            return (
                <MultiSelectField
                    question={question}
                />
            )
        case 'steppedRange':
            return (
                <SteppedRangeField
                    question={question}
                />
            )
        default:
            return (
                <p>Question type not supported</p>
            )
    }
}

return (
    <section className="max-w-2xl p-5 md:p-7 lg:p-10 mx-auto border-2 border-black mt-10">
        {currentQuestion.type === 'interstitial' ? (
            <Interstitial currentQuestion={currentQuestion} />
        ) : (
            <>
                <fieldset>
                    <legend className="mb-5 flex flex-col gap-4">
                        <h1 className="text-3xl font-bold">{currentQuestion?.title}</h1>
                        {currentQuestion?.description &&
                            <div className="prose" dangerouslySetInnerHTML={{__html: currentQuestion?.description}}/>
                        }
                    </legend>

                    {renderQuestion(currentQuestion)}
                </fieldset>

                <div className="mt-10 flex flex-col gap-4 md:flex-row md:justify-between">
                    <div className="flex items-center gap-3 w-full">
                        <p className="text-blue-700 text-lg font-bold">10%</p>
                        <div className="w-full h-2 bg-gray-300 rounded-full max-w-[250px]">
                            <div className="h-2 bg-blue-700 rounded-full" style={{ width: '10%' }}/>
                        </div>
                    </div>

                    <div className="flex justify-between gap-4 md:justify-start">
                        <button
                            className="px-3 py-2 border-2 border-blue-700 text-sm uppercase font-medium text-blue-700 bg-transparent hover:bg-blue-900 hover:border-blue-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>

                        <button
                            className="px-3 py-2 border-2 border-blue-700 text-sm uppercase font-medium text-white bg-blue-700 hover:bg-blue-900 hover:border-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </>
        )}
    </section>
)
...
```

# Code Block Five

```js
    
...

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
    goToStep(getIndex(currentAnswer[0]?.proceedsTo))
    setCurrentAnswer([])
}

...

<button
   className="px-3 py-2 border-2 border-blue-700 text-sm uppercase font-medium text-white bg-blue-700 hover:bg-blue-900 hover:border-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
   onClick={() => nextQuestion()}
   disabled={currentAnswer.length === 0}
 >
 Next
</button>

...
```

# Code Block Six

```js
...

  const isFirstStep = currentQuestion && questions[0].id === currentQuestion.id

...

const previousQuestion = () => {
    let id = stepHistory.pop()
    goToStep(id)
}

...

{!isFirstStep && (
    <button
        className="px-3 py-2 border-2 border-blue-700 text-sm uppercase font-medium text-blue-700 bg-transparent hover:bg-blue-900 hover:border-blue-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => previousQuestion()}
        disabled={isFirstStep}
    >
        Previous
    </button>
)}

...
```
