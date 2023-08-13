import axios from "axios";
axios.defaults.baseURL = `${import.meta.env.VITE_API_URL}`;

function tokenProvider(auth) {
  return {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  };
}

function signUp(body) {
  const promise = axios.post('/users', body);
  return promise;
}

function signIn(body) {
  const promise = axios.post('/', body);
  return promise;
}

const api = {
  signIn,
  signUp
}

export default api;
