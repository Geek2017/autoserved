import React from "react";
import cn from "classnames";

export default function WizardBody(props) {
  const {
    FormComponent,
    currentCardTitle,
    currentCardSubTitle,
    fieldStorage,
    wizardIndex,
    bodyCardHeaderActions,
    onSetFieldStorage,
    onHandleCurrentFormValidation,
    isCurrentFormValid,
    classPrefix: BCP
  } = props;

  return (
    <div
      className={cn(BCP, {
        [`${BCP}--done`]: isCurrentFormValid
      })}
    >
      <div className={`${BCP}__header`}>
        <div className="col-title">
          <div className="count">
            <div className="number">{wizardIndex}</div>
          </div>
          <div className="info">
            <h5>{currentCardTitle}</h5>
            <p>{currentCardSubTitle}</p>
          </div>
        </div>
        {bodyCardHeaderActions && (
          <div className="col-actions">{bodyCardHeaderActions}</div>
        )}
      </div>
      <div className={`${BCP}__form`}>
        <FormComponent
          fieldStorage={fieldStorage}
          onSetFieldStorage={onSetFieldStorage}
          currentFormIndex={wizardIndex - 1}
          onHandleCurrentFormValidation={onHandleCurrentFormValidation}
        />
      </div>
    </div>
  );
}
