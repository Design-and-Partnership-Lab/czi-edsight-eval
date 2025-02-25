"use client"

import {
  RadioCardGroup,
  RadioCardIndicator,
  RadioCardItem,
} from "../tremor/RadioCardGroup"

export const QuestionTwo = () => (
  <form className="mx-auto max-w-lg">
    <fieldset className="space-y-3">
      <legend className="font-semibold text-gray-900 dark:text-gray-50">
        2. Read through the AI Guestimate. Was the AI Guestimate useful?
      </legend>
      <RadioCardGroup className="flex row text-sm">
        <RadioCardItem value="1">
          <div className="flex items-center gap-3">
            <span>Software Engineer</span>
          </div>
        </RadioCardItem>
        <RadioCardItem value="2">
          <div className="flex items-center gap-3">
            <span>Platform Engineer</span>
          </div>
        </RadioCardItem>
        <RadioCardItem value="3">
          <div className="flex items-center gap-3">
            <span>Hardware Engineer</span>
          </div>
        </RadioCardItem>
        <RadioCardItem value="4">
          <div className="flex items-center gap-3">
            <span>Security</span>
          </div>
        </RadioCardItem>
        <RadioCardItem value="5">
          <div className="flex items-center gap-3">
            <span>Marketing Ops</span>
          </div>
        </RadioCardItem>
        <RadioCardItem value="6">
          <div className="flex items-center gap-3">
            <span>Product Manager</span>
          </div>
        </RadioCardItem>
      </RadioCardGroup>
    </fieldset>
  </form>
)

export default QuestionTwo;