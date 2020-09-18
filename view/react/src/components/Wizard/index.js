import React, { useState, useMemo } from "react";
import ProgressBar from "../../components/ProgressBar";
import { Button } from "shards-react";
import WizardNavigation from "./WizardNavigation";
import WizardHeaderNavigation from "./WizardHeaderNavigation";
import WizardBody from "./WizardBody";

export default function Wizard(props) {
  const [fieldStorage, setFieldStorage] = useState({});
  const [wizardIndex, setWizardIndex] = useState(1);
  const [formsState, setFormsState] = useState([...props.forms]);

  const {
    isStrict,
    isReversable,
    handleWizardForm,
    cardChildComponent
  } = props;

  const doneIndex = useMemo(() => {
    const indexFound = formsState.findIndex(f => !f.isValid) - 1;
    return indexFound !== -2 ? indexFound : formsState.length - 1;
  }, [formsState]);

  const {
    component: FormComponent,
    isValid: isCurrentFormValid,
    cardTitle: currentCardTitle,
    cardSubTitle: currentCardSubTitle
  } = formsState[wizardIndex - 1];

  const handleChangeIndex = ({ newIndex }) => {
    setWizardIndex(newIndex);
  };

  const handleCurrentFormValidation = ({ index, isValid }) => {
    const tempFormsState = [...formsState];
    if (tempFormsState[index]) {
      tempFormsState[index].isValid = isValid;
      setFormsState(tempFormsState);
    }
  };

  const handleSubmitForm = () => {
    handleWizardForm(fieldStorage);
  };

  const maxIndex = formsState.length;

  const BCP = "wizard";

  const isCompleted = doneIndex === formsState.length - 1;

  return (
    <div className={BCP}>
      <div className={`${BCP}__header`}>
        <ProgressBar
          className={`${BCP}__header-progress`}
          currentIndex={wizardIndex}
          doneIndex={doneIndex + 1}
          max={maxIndex}
          progressLabel={`${wizardIndex} / ${formsState.length}`}
        />
        <WizardHeaderNavigation
          classPrefix={`${BCP}__header-navigation`}
          forms={formsState}
          isStrict={isStrict}
          onTabClick={handleChangeIndex}
          currentIndex={wizardIndex - 1}
          doneIndex={doneIndex}
          isReversable={isReversable}
        />
      </div>

      <div className={`${BCP}__body`}>
        <div className="wizard__container">
          <div className={`${BCP}__body-card`}>
            {cardChildComponent && cardChildComponent}

            <Button
              disabled={!isCompleted}
              onClick={handleSubmitForm}
              className={`${BCP}__submitWizard`}
            >
              <i className="material-icons">add </i>
              Submit Form
            </Button>
          </div>
          <WizardBody
            classPrefix={`${BCP}__body-content`}
            FormComponent={FormComponent}
            isCurrentFormValid={isCurrentFormValid}
            currentCardTitle={currentCardTitle}
            currentCardSubTitle={currentCardSubTitle}
            fieldStorage={fieldStorage}
            onSetFieldStorage={setFieldStorage}
            wizardIndex={wizardIndex}
            onHandleCurrentFormValidation={handleCurrentFormValidation}
            bodyCardHeaderActions={
              <WizardNavigation
                classPrefix={BCP}
                currentIndex={wizardIndex - 1}
                doneIndex={doneIndex}
                max={maxIndex}
                isStrict={isStrict}
                isReversable={isReversable}
                onHandleNext={() =>
                  handleChangeIndex({ newIndex: wizardIndex + 1 })
                }
                onHandlePrev={() =>
                  handleChangeIndex({ newIndex: wizardIndex - 1 })
                }
              />
            }
          />
        </div>
      </div>
    </div>
  );
}
