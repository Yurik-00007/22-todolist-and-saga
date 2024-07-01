import {call, put} from "redux-saga/effects";
import {setAppStatusAC} from "../../app/app-reducer";
import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {setIsLoggedInAC} from "./auth-reducer";

export function* loginWorkerSaga(action: ReturnType<typeof loginAuth>) {
  const {data} = action
  yield put(setAppStatusAC('loading'))
  try {
    const res = yield call(authAPI.login, data)
    if (res.data.resultCode === 0) {
      yield put(setIsLoggedInAC(true))
      yield put(setAppStatusAC('succeeded'))
    } else {
      // handleServerAppError(res.data, dispatch)
      // yield call(handleServerAppError, res.data);
    }
  } catch (error) {
    // handleServerNetworkError(error, dispatch)
    // yield call(handleServerNetworkError, error);
  }
}

export const loginAuth = (data: LoginParamsType) => ({type: 'AUTH/LOGIN-AUTH', data})

export function* logoutWorkerSaga() {
  yield put(setAppStatusAC('loading'))
  try {
    const res = yield call(authAPI.logout)
    if (res.data.resultCode === 0) {
      yield put(setIsLoggedInAC(false))
      yield put(setAppStatusAC('succeeded'))
    } else {
      // handleServerAppError(res.data, dispatch)
      yield call(handleServerAppError, res.data)
    }
  } catch (error) {
    // handleServerNetworkError(error, dispatch)
    yield call(handleServerNetworkError, error)
  }
}

export const logoutAuth = () => ({type: 'AUTH/LOGOUT-AUTH'})