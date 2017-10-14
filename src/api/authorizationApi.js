import * as apiUtils from './apiUtils';

export function registerUser(user) {
  return apiUtils.callApiService('POST', 'company/register', user, false);
}

export function getAccessToken(user) {
  return new Promise((resolve, reject) => {

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", "Basic bW9uZWRlcm9iaW5nbzptb25lZGVyb2Jpbmdvc2VjcmV0");

    const params = {
      grant_type: 'password',
      client_id: 'monederobingo',
      username: user.email,
      password: user.password
    };

    const searchParams = Object.keys(params).map((key) => {
      return key + '=' + params[key];
    }).join('&');

    let myInit = {
      method: 'POST',
      headers: myHeaders,
      credentials: 'include',
      body: searchParams
    };
    return fetch(apiUtils.getAuthUrl() + 'oauth/token', myInit).then((response) => {
      if (response.ok) {
        resolve(response.json());
      } else {
        reject('Verify your credentials');
      }
    }).catch((error) => {
      reject(error);
    });
  });
}

export function refreshToken(refreshToken) {
  return new Promise((resolve, reject) => {

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", "Basic bW9uZWRlcm9iaW5nbzptb25lZGVyb2Jpbmdvc2VjcmV0");

    const params = {
      grant_type: 'refresh_token',
      client_id: 'monederobingo',
      refresh_token: refreshToken
    };

    const searchParams = Object.keys(params).map((key) => {
      return key + '=' + params[key];
    }).join('&');

    let myInit = {
      method: 'POST',
      headers: myHeaders,
      credentials: 'include',
      body: searchParams
    };
    return fetch(apiUtils.getAuthUrl() + 'oauth/token', myInit).then((response) => {
      if (response.ok) {
        resolve(response.json());
      } else {
        reject('Verify your credentials');
      }
    }).catch((error) => {
      reject(error);
    });
  });
}

export function getUserRole() {
  return new Promise((resolve, reject) => {
    const apiRequestInfo = apiUtils.getApiRequestInfo('GET', '', true, false);

    return fetch(apiUtils.getAuthUrl() + 'user', apiRequestInfo).then((response) => {
      if (response.ok) {
        resolve(response.json());
      } else {
        reject('There was an error. Try again in a few minutes.');
      }
    }).catch((error) => {
      reject(error);
    });

  });
}

export function changePassword(passwordChanging) {
  return apiUtils.callApiService('PUT', 'password/update', passwordChanging);
}

export function changePasswordByUser(passwordChanging, userId) {
  return apiUtils.callApiService('PUT', 'password/updateForUser', {
    verificationPassword: passwordChanging.verificationPassword,
    user_id: userId,
    newPasswordForUser: passwordChanging.newPasswordForUser
  });
}
