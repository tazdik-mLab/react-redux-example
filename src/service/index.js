import { 
  appUrl,
  tableNames } from '../constants/appCred';

// import {  } from '';

export function loginService(data) {
  const body = {
    'login': data.email,
    'password': data.password
  }
  return fetch(
    `${ appUrl }/users/login`, {
      body: JSON.stringify(body),
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res => res.json())
}

export function getUserDataService(authToken) {
  return fetch(`${appUrl}/data/${tableNames.userInfo}`, {
    headers: {
      'content-type': 'application/json',
      'user-token': authToken
    }
  })
  .then(res => res.json())
}