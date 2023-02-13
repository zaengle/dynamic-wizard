import { Range } from 'react-range'
import { useState } from 'react'

import { fieldType } from '../types'

const SteppedRangeField = ({ question, currentAnswer, setCurrentAnswer }) => {
  const { answers } = question
  const [values, setValues] = useState(
    currentAnswer.length !== 0
      ? [answers.findIndex(answer => answer.id === currentAnswer[0].id)]
      : [0],
  )
  const [tooltipText, setTooltipText] = useState(
    currentAnswer.length !== 0
      ? answers[answers.findIndex(answer => answer.id === currentAnswer[0].id)].title
      : answers[0].title,
  )
    
  return (
    <div className="mt-24 relative">
      <div aria-live="assertive" className="sr-only">{tooltipText}</div>

      <Range
        min={0}
        max={answers.length - 1}
        values={values}
        onChange={(values) => {
          setValues(values)
          setTooltipText(answers[values[0]].title)
          setCurrentAnswer([answers[values[0]]])
        }}
        renderTrack={({ props, children }) => (
          <div {...props} className="rounded-full h-1.5 bg-gray-400 w-[75%] md:w-[90%] mx-auto">
            {children}
          </div>
        )}
        renderMark={({ props, index }) => (
          <div {...props} className="bg-blue-500 w-1.5 h-4"/>
        )}
        renderThumb={({ props }) => (
          <div {...props} className="relative">
            <div className="absolute -top-16 border-2 border-blue-500 px-2 text-blue-500 arrow-down bg-white whitespace-nowrap w-fit left-1/2 -translate-x-1/2 translate-y-0 ">
              {tooltipText}
            </div>

            <div className="flex justify-between items-center px-1 h-9 w-16 bg-blue-500 border-2 border-blue-500 rounded-full">
              <svg className="w-6 h-5 text-white" fill="currentColor" clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m13.789 7.155c.141-.108.3-.157.456-.157.389 0 .755.306.755.749v8.501c0 .445-.367.75-.755.75-.157 0-.316-.05-.457-.159-1.554-1.203-4.199-3.252-5.498-4.258-.184-.142-.29-.36-.29-.592 0-.23.107-.449.291-.591 1.299-1.002 3.945-3.044 5.498-4.243z"/></svg>

              <svg className="w-6 h-5 text-white" fill="currentColor" clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m10.211 7.155c-.141-.108-.3-.157-.456-.157-.389 0-.755.306-.755.749v8.501c0 .445.367.75.755.75.157 0 .316-.05.457-.159 1.554-1.203 4.199-3.252 5.498-4.258.184-.142.29-.36.29-.592 0-.23-.107-.449-.291-.591-1.299-1.002-3.945-3.044-5.498-4.243z"/></svg>
            </div>
          </div>
        )}
      />

      <div className="flex justify-between text-gray-700 mt-8 text-sm font-bold">
        <span className="w-20">Very Bad</span>
        <span className="w-32 text-right">Very Masterpiece</span>
      </div>
    </div>
  )
}

SteppedRangeField.propTypes = fieldType

export default SteppedRangeField
