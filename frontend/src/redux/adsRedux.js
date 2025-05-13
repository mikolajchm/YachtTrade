const adsReducer = (statePart = [], action) => {
  switch (action.type) {
    case 'ADD_ADD':
      return [...statePart, { ...action.payload, id: shortid() }];
    default:
      return statePart;
  };
};

export default adsReducer;