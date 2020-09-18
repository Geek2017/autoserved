import React from "react";
import { Button, ButtonGroup } from "shards-react";

export default function WizardNavigation(props) {
  const {
    max,
    currentIndex,
    doneIndex,
    isStrict,
    isReversable,
    onHandleNext,
    onHandlePrev,
    classPrefix: BCP
  } = props;

  const isPreviewDisabled = currentIndex <= 0 || !isReversable;
  const isNextDisabled = currentIndex === max || currentIndex > doneIndex;
  return (
    <ButtonGroup className={`${BCP}__btnNavigation`}>
      <Button
        disabled={isPreviewDisabled}
        theme="primary"
        onClick={() => onHandlePrev({ isReversable })}
      >
        &laquo; Previous
      </Button>
      <Button
        disabled={isNextDisabled}
        theme="primary"
        onClick={() => onHandleNext({ isPassed: true, isStrict })}
      >
        Next &raquo;
      </Button>
    </ButtonGroup>
  );
}
