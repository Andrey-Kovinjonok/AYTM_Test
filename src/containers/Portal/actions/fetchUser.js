import axios from 'axios';

import { createPromisedActions } from '../../../store';


function getUserInfo(url) {
  return axios.get(url);
}

export default function loadUserAction({ userId }) {
  const url = 'https://api.github.com/users/' + userId;
  const fetchUser = getUserInfo(url);

  console.log("FETCH USER DATA: ", url);
  return createPromisedActions('LOAD_USER', fetchUser);
}
  // const loadUserInfo = createPromisedActions('LOAD_USER', fetchUser);
  // return () => loadUserInfo({ userId });
