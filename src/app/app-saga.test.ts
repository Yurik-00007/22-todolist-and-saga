import {initializeAppWorkerSaga} from "./app-saga";
import {authAPI, MeResponseType} from "../api/todolists-api";
import {call, put} from "redux-saga/effects";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {setAppErrorAC, setAppInitializedAC, setAppStatusAC} from "./app-reducer";
import {handleServerNetworkErrorForSaga} from "../utils/error-utils";

let meResponse: MeResponseType;

beforeEach(()=>{
  meResponse={
    // resultCode: 1,
    resultCode: 0,
    data: {
      id: 2,
      email: '',
      login: ''
    },
    messages: []
  }
})

test('initializeAppWorkerSaga login success', () => {
  const gen = initializeAppWorkerSaga()
  expect(gen.next().value).toEqual(call(authAPI.me))
  expect(gen.next(meResponse).value).toEqual(put(setIsLoggedInAC(true)))
  expect(gen.next().value).toEqual(put(setAppInitializedAC(true)))
/*
  const gen = initializeAppWorkerSaga()
  let result = gen.next()
  expect(result.value).toEqual(call(authAPI.me))

  result = gen.next(meResponse)
  expect(result.value).toEqual(put(setIsLoggedInAC(true)))

  result = gen.next()
  expect(result.value).toEqual(put(setAppInitializedAC(true)))
*/

})
test('initializeAppWorkerSaga login unsuccessful - handleServerNetworkErrorForSaga> ', () => {
  const gen = initializeAppWorkerSaga()
  expect(gen.next().value).toEqual(call(authAPI.me))
  // meResponse.resultCode=1
  // expect(gen.next(meResponse).value).toEqual(put(setAppInitializedAC(true)))
  expect(gen.throw({message:'some error'}).value).toEqual(put(setAppErrorAC('some error')))
  expect(gen.next().value).toEqual( put(setAppStatusAC('failed')))
})

test('initializeAppWorkerSaga login unsuccessful - handleServerAppErrorForSaga>else', () => {
  const gen = initializeAppWorkerSaga()
  expect(gen.next().value).toEqual(call(authAPI.me))
  meResponse.resultCode=1
  // expect(gen.next(meResponse).value).toEqual(put(setAppInitializedAC(true)))
  expect(gen.throw({message:''}).value).toEqual(put(setAppErrorAC('Some error occurred')))
  expect(gen.next().value).toEqual( put(setAppStatusAC('failed')))

})