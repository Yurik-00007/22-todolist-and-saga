//saga worker
import {call, put, takeEvery} from "redux-saga/effects";
import {authAPI, MeResponseType} from "../api/todolists-api";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {setAppInitializedAC, setAppStatusAC} from "./app-reducer";
import {handleServerAppErrorForSaga, handleServerNetworkErrorForSaga} from "../utils/error-utils";

export function* initializeAppWorkerSaga() {
  // alert('initializeAppWorkerSaga')
  try{
    const data:MeResponseType = yield call(authAPI.me)
    if (data.resultCode === 0) {
      yield put(setIsLoggedInAC(true));
    } else {
      yield* handleServerAppErrorForSaga(data);
    }
  } catch (error) {
    yield* handleServerNetworkErrorForSaga(error)
  }finally {
    yield put(setAppInitializedAC(true));
  }
}

export const initializeApp = () => ({type: 'APP/INITIALIZE-APP'})

export function* appWatcherSaga(){
  // alert('rootWatcher')
  yield takeEvery('APP/INITIALIZE-APP', initializeAppWorkerSaga)}