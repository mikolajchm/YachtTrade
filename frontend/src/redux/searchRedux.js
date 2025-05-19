export const getAllSearch = state => state.search;  

const createActionName = (actionName) => `app/search/${actionName}`;

const LOAD_SEARCH = createActionName('LOAD_SEARCH');

export const loadSearch = payload => ({
  type: LOAD_SEARCH,
  payload
});

const searchReducer = (statePart = null, action) => {
  switch(action.type){
    case LOAD_SEARCH:
      return [...action.payload];;
    default: 
      return statePart;
  }
};

export default searchReducer;