import shortid from 'shortid';

export const getAllAds = ({ ads }) => ads;
export const getAdById = ({ ads }, id) => ads.find(ad => ad._id === id);

const createActionName = actionName => `app/ads/${actionName}`;

const ADD_AD = createActionName('ADD_AD');
const EDIT_AD = createActionName('EDIT_AD');
const DELETE_AD = createActionName('DELETE_AD');
const CLEAR_ADS = createActionName('CLEAR_ADS');

export const addAd = payload => ({ type: ADD_AD, payload });
export const editAd = payload => ({ type: EDIT_AD, payload });
export const deleteAd = payload => ({ type: DELETE_AD, payload });
export const clearAds = () => ({ type: CLEAR_ADS });

const adsReducer = (statePart = [], action) => {
  switch (action.type) {
    case 'ADD_AD':
      return [...statePart, { ...action.payload, _id: shortid() }];
    case 'EDIT_AD':
      return statePart.map(ad => ad._id === action.payload._id ? { ...ad, ...action.payload } : ad );
    case 'DELETE_AD':
      return statePart.filter(ad => ad._id !== action.payload._id);
    case 'CLEAR_ADS':
      return [];
    default:
      return statePart;
  };
};

export default adsReducer;