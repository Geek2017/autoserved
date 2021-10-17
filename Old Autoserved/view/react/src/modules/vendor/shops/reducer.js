import * as t from './actionTypes';

let initialState = {
  shops: [],
  shop: null,
  file: null,
  application: null,
  pmsShops: []
};

const shopsReducer = (state = initialState, action) => {
  switch (action.type) {
    case t.CREATE_SHOP: {
      const { shop } = action.data;
      let { shops } = state;
      shops.push(shop);
      return { ...state, shops };
    }
    case t.GET_SHOP_DETAILS:
    case t.UPDATE_SHOP: {
      const { shop } = action.data;
      return { ...state, shop };
    }
    case t.GET_PMS_ENABLED_SHOPS: {
      const { pmsShops } = action.data;
      return { ...state, pmsShops };
    }
    case t.GET_SHOPS: {
      const { shops } = action.data;
      return { ...state, shops };
    }
    case t.UPDATE_APPLICATION: {
      const application = action.data;
      return { ...state, application };
    }
    case t.UPLOAD: {
      const { file } = action.data;
      return { ...state, file };
    }
    default:
      return state;
  }
};

export default shopsReducer;
