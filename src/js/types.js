import PropTypes from 'prop-types'

export const answerType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  proceedsTo: PropTypes.string,
  actionItems: PropTypes.arrayOf(PropTypes.string),
})

export const questionType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  type: PropTypes.oneOf([
    'interstitial',
    'singleSelect',
    'steppedRange',
    'multiSelect',
  ]).isRequired,
  answers: PropTypes.arrayOf(answerType),
  allowSkip: PropTypes.bool,
  backTo: PropTypes.string,
  nextTo: PropTypes.string,
  skipToQuestion: PropTypes.string,
})

export const fieldType = {
  question: questionType.isRequired,
  currentAnswer: PropTypes.arrayOf(answerType),
  setCurrentAnswer: PropTypes.func.isRequired,
}
