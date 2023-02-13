import PropTypes from 'prop-types'

import { questionType } from '../types'

const Interstitial = ({ currentQuestion, goToStep, getIndex, children  }) => {
  return (
    <div className="flex flex-col text-center items-center">
      <h1 className="text-3xl font-bold mb-4">{currentQuestion?.title}</h1>
      {currentQuestion?.description &&
                <div className="prose mb-8" dangerouslySetInnerHTML={{ __html: currentQuestion?.description }} />
      }
      <div className="space-x-6 md:space-x-4 shrink-0">
        {currentQuestion?.backTo && (
          <button
            className="px-3 py-2 border-2 border-blue-700 text-sm uppercase font-medium text-blue-700 bg-transparent hover:bg-blue-900 hover:border-blue-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-36"
            onClick={() => {
              goToStep(getIndex(currentQuestion.backTo))
            }}
          >
              Previous
          </button>
        )}

        {currentQuestion?.nextTo && (
          <button
            className="px-3 py-2 border-2 border-blue-700 text-sm uppercase font-medium text-white bg-blue-700 hover:bg-blue-900 hover:border-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-36"
            onClick={() => {
              goToStep(getIndex(currentQuestion.nextTo))
            }}
          >
              Next
          </button>
        )}
      </div>

      {children}
    </div>
  )
}

Interstitial.propTypes = {
  currentQuestion: questionType.isRequired,
  goToStep: PropTypes.func.isRequired,
  getIndex: PropTypes.func.isRequired,
  children: PropTypes.element,
}

export default Interstitial
