import * as t from "./actionTypes";

let initialState = { makes: [], models: [], trims: [], years: [] };

const estimateWizardReducer = (state = initialState, action) => {
  switch (action.type) {
    case t.GET_CAR_MAKES: {
      const { makes } = action.data;
      let carMakes = makes.map(({ id, name }) => ({
        value: id,
        label: name
      }));
      return { ...state, makes: carMakes };
    }
    case t.GET_CAR_MODELS: {
      const { models } = action.data;
      let carModels = models.map(({ id, name }) => ({
        value: id,
        label: name
      }));
      return { ...state, models: carModels };
    }
    case t.GET_CAR_TRIMS: {
      const { trims } = action.data;
      let carTrims = trims.map(({ id, name }) => ({
        value: id,
        label: name
      }));
      return { ...state, trims: carTrims };
    }
    case t.GET_CAR_YEARS: {
      const { years } = action.data;
      let carYears = years.map(value => ({
        value: value,
        label: value
      }));
      return { ...state, years: carYears };
    }
    default:
      return state;
  }
};

export default estimateWizardReducer;
