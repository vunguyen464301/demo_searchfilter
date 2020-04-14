import { call, put, delay } from 'redux-saga/effects'
import { authApi } from '../index'
import {
  signInRequest,
  signInFailure,
  signOut as actionSignOut
} from '../../services/actions/signin.action'

export function* signIn(action) {
  const { user, loginSuccess, loginError } = action

  try {
    yield put(signInRequest())

    const result = yield call(authApi.login, user)

    yield delay(1500)

    if (result && result.id) {
      loginSuccess(result)
    
    } else {
      loginFailure()
    }
  } catch (error) {
    loginError()
  }
}

export function* signOut() {
  try {
    yield put(actionSignOut())
  } catch (error) {
    console.error('error from signOut saga: ' + error)
  }
}