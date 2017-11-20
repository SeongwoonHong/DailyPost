import * as types from './keys.js';
import axios from 'axios';

export const loginRequest = (username, password) => {
  return (dispatch) => {
    dispatch(login());

    return axios.post('/api/account/signin', { username, password })
    .then((response) => {
      dispatch(loginSuccess(username));
    }, (error) => {
      dispatch(loginFailure());
    })
  }
}
export const login = () => {
  return {
    type: types.AUTH_LOGIN
  }
}

export const loginSuccess = (username) => {
  return {
    type: types.AUTH_LOGIN_SUCCESS
  }
}

export const loginFailure = () => {
  return {
    type: types.AUTH_LOGIN_FAILURE
  }
}

export const registerRequest = (username, password) => {
  return (dispatch) => {
    dispatch(register());
    return axios.post('/api/account/signup', { username, password })
      .then((response) => {
        dispatch(registerSuccess());
      }, (error) => {
        dispatch(registerFailure(error.response.data.code));
      })
  };
}

export const register = () => {
  return {
    type: types.AUTH_REGISTER_SUCCESS
  }
}

export const registerSuccess = () => {
  return {
    type: types.AUTH_REGISTER_SUCCESS
  }
}

export const registerFailure = (error) => {
  return {
    type: types.AUTH_REGISTER_FAILURE,
    error
  }
}

export const getStatusRequest = () => {
  return (dispatch) => {
    dispatch(getStatus());
    return axios.get('/api/account/getInfo').then((response) => {
      dispatch(getStatusSuccess(response.data.info.username));
    }, (err) => {
      dispatch(getStatusFailure());
    })
  };
}

export const getStatus = () => {
  return {
    type: types.AUTH_GET_STATUS
  }
}
export const getStatusSuccess = (username) => {
  return {
    type: types.AUTH_GET_STATUS_SUCCESS,
    username
  }
}

export const getStatusFailure = () => {
  return {
    type: types.AUTH_GET_STATUS_FAILURE
  }
}

export const logoutRequest = () => {
  return (dispatch) => {
    return axios.post('/api/account/logout').then((response) => {
      dispatch(logout());
    });
  };
}

export const logout = () => {
  return {
    type: types.AUTH_LOGOUT
  };
}
