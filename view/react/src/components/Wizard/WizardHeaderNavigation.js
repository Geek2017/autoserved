import React from 'react';
import { Button } from 'shards-react';
import cn from 'classnames';

export default function WizardHeaderNavigation(props) {
  const {
    forms,
    isStrict,
    doneIndex,
    currentIndex,
    onTabClick,
    classPrefix: BCP,
  } = props

  const tabwidth = `${(1 / forms.length) * 100}%`
  return (
    <div className={`${BCP}`}>
      <div className={`${BCP}__tabs`}>
        {forms.map(({ stepTitle }, i) => {
          const isActive = currentIndex === i
          const isTabDisabled = isStrict && i > doneIndex && !isActive
          return (
            <Button
              disabled={isTabDisabled}
              className={cn(`${BCP}__tab`, {
                [`${BCP}__tab--active`]: isActive
              })}
              style={{ width: tabwidth }}
              onClick={() => onTabClick({ newIndex: i + 1 })}
            >
              {stepTitle}
            </Button>
          )
        })}
      </div>
    </div>
  )
}