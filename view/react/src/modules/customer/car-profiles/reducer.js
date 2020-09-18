import * as t from "./actionTypes";

let initialState = {
  car: null,
  cars: [],
  engineTypes: [],
  request: null,
  schedule: [],
  schedules: [],
  transmissionTypes: [],
  vehicleTypes: [],
  history: []
};

const carProfilesReducer = (state = initialState, action) => {
  switch (action.type) {
    case t.CREATE_CAR:
    case t.DELETE_CAR_PROFILE:
    case t.GET_CAR_DETAILS: {
      const { car } = action.data;
      return { ...state, car };
    }
    case t.GET_CAR_SCHEDULE: {
      const { schedule } = action.data;
      return { ...state, schedule };
    }
    case t.GET_CAR_SCHEDULES: {
      const { schedules } = action.data;
      return { ...state, schedules };
    }
    case t.GET_CARS: {
      const { cars } = action.data;
      return { ...state, cars };
    }
    case t.GET_ENGINE_TYPES: {
      const { engineTypes } = action.data;
      return { ...state, engineTypes };
    }
    case t.GET_TRANSMISSION_TYPES: {
      const { transmissionTypes } = action.data;
      return { ...state, transmissionTypes };
    }
    case t.GET_VEHICLE_TYPES: {
      const { vehicleTypes } = action.data;
      return { ...state, vehicleTypes };
    }
    case t.GET_REPAIR_HISTORY: {
      const { history } = action.data;
      return { ...state, history };
    }
    case t.REQUEST_PMS:
    case t.REQUEST_PMS_OTHER: {
      const { request } = action.data;
      return { ...state, request };
    }
    case t.CREATE_CAR_SCHEDULES:
    default:
      return state;
  }
};

export default carProfilesReducer;
