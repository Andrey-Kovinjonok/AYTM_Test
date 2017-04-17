
const createPromisedActions = (type, fetchUserData) => payload => (dispatch) => {
  dispatch({ type: `${type}_PENDING`, payload });

  return fetchUserData
    .then(data => dispatch({ type: `${type}_RESOLVED`, payload: data }))
    .catch(error => dispatch({ type: `${type}_REJECTED`, payload: error }));
};

export default createPromisedActions;
