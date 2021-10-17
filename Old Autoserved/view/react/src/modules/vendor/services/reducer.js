import * as t from "./actionTypes";

let initialState = {
  laborPrice: null,
  mileages: [],
  oilPrice: null,
  oilTypes: [],
  oilTypeOptions: [],
  partTypes: [],
  partTypeOptions: [],
  pms: null,
  pmsPrices: null,
  pmsValue: null,
  service: null,
  otherServices: [],
  otherService: null,
  otherPrices: null,
  services: [],
  shop: null,
  vehicleTypes: [],
  pricedPms: null,
  pricedPmsOthers: null,
  pmsOthersLaborPrices: null
};

const servicesReducer = (state = initialState, action) => {
  switch (action.type) {
    case t.CLEAR_PMS_DATA: {
      const { pmsPrices } = action.data;
      return { ...state, pmsPrices };
    }
    case t.GET_SERVICES: {
      const { services } = action.data;
      return { ...state, services };
    }
    case t.GET_OTHER_SERVICES: {
      const { otherServices } = action.data;
      return { ...state, otherServices };
    }
    case t.CREATE_SERVICE: {
      const { service } = action.data;
      return { ...state, service };
    }
    case t.GET_MILEAGES: {
      const { mileages } = action.data;
      return { ...state, mileages };
    }
    case t.GET_OIL_TYPES: {
      const { oilTypes } = action.data;
      return { ...state, oilTypes };
    }
    case t.GET_OIL_TYPE_OPTIONS: {
      const { oilTypeOptions } = action.data;
      return { ...state, oilTypeOptions };
    }
    case t.GET_PART_TYPES: {
      const { partTypes } = action.data;
      partTypes.pop();
      return { ...state, partTypes };
    }
    case t.GET_PART_TYPE_OPTIONS: {
      const { partTypeOptions } = action.data;
      return { ...state, partTypeOptions };
    }
    case t.GET_PMS_ITEM: {
      const { pms } = action.data;
      return { ...state, pms };
    }
    case t.GET_PMS_OTHERS_ITEM: {
      const { otherService } = action.data;
      return { ...state, otherService };
    }
    case t.GET_SHOP_PMS_DATA: {
      const { pmsPrices } = action.data;
      return { ...state, pmsPrices };
    }
    case t.GET_SHOP_PMS_OTHER_PRICES: {
      const { otherPrices } = action.data;
      return { ...state, otherPrices };
    }
    case t.GET_SHOP_PMS_LABOR_PRICE: {
      const { laborPrice } = action.data;
      return { ...state, laborPrice };
    }
    case t.GET_SHOP_PMS_OIL_PRICE: {
      const { oilPrice } = action.data;
      return { ...state, oilPrice };
    }
    case t.GET_VEHICLE_TYPES: {
      const { vehicleTypes } = action.data;
      return { ...state, vehicleTypes };
    }
    case t.SAVE_PMS_DATA: {
      const { pmsValue } = action.data;
      return { ...state, pmsValue };
    }
    case t.GET_PRICED_SHOP_PMS_DATA: {
      const { pricedPms } = action.data;
      return { ...state, pricedPms };
    }
    case t.GET_PRICED_SHOP_PMS_OTHERS_DATA: {
      const { pricedPmsOthers } = action.data;
      return { ...state, pricedPmsOthers };
    }
    case t.TOGGLE_SHOP_PMS: {
      const { shop } = action.data;
      return { ...state, shop };
    }
    default:
      return state;
  }
};

export default servicesReducer;
