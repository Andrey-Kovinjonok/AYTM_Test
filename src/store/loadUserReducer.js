
const initialState = { };

export default function storeReducer(state = initialState, action) {
  console.log('-============-');
  console.log('REDUCER LOGGER');
  console.log('-============-');
  console.log(state);
  console.log(action.type);
  console.log(action.payload);
  console.log('              ');

  switch (action.type) {
    case 'LOAD_USER_PENDING': {
      return {
        ...state,
        ...action.payload,
        loadStatus: 'PENDING',
        imageUrl: '',
      };
    }

    case 'LOAD_USER_RESOLVED': {
      return {
        ...state,
        loadStatus: 'RESOLVED',
        imageUrl: action.payload.data.avatar_url,
      };
    }

    case 'LOAD_USER_REJECTED': {
      return {
        ...state,
        loadStatus: 'REJECTED - ' + action.payload.error,
        imageUrl: '',
      };
    }

    default:
      return state || initialState;
  }
}
