//sagas
import {call, put, takeEvery} from "redux-saga/effects";
import {setAppStatusAC} from "../../app/app-reducer";
import {todolistsAPI} from "../../api/todolists-api";
import {
  addTodolistAC,
  changeTodolistEntityStatusAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  setTodolistsAC
} from "./todolists-reducer";

export function* fetchTodolistsWorkerSaga() {
  yield put(setAppStatusAC('loading'))
  const res = yield call(todolistsAPI.getTodolists)
  yield put(setTodolistsAC(res.data))
  yield put(setAppStatusAC('succeeded'))
}

export const fetchTodolists = () => ({type: 'TODOLISTS/FETCH-TODOLISTS'})

export function* removeTodolistWorkerSaga(action: ReturnType<typeof removeTodolist>) {
  //изменим глобальный статус приложения, чтобы вверху полоса побежала
  const {todolistId} = action
  yield put(setAppStatusAC('loading'))
  //изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо
  yield put(changeTodolistEntityStatusAC(todolistId, 'loading'))
  yield call(todolistsAPI.deleteTodolist, todolistId)
  yield put(removeTodolistAC(todolistId))
  //скажем глобально приложению, что асинхронная операция завершена
  yield put(setAppStatusAC('succeeded'))
}

export const removeTodolist = (todolistId: string) => ({type: 'TODOLISTS/REMOVE-TODOLIST', todolistId})

export function* addTodolistWorkerSaga(action: ReturnType<typeof addTodolist>) {
  const {title} = action
  yield put(setAppStatusAC('loading'))
  const res = yield call(todolistsAPI.createTodolist, title)
  yield put(addTodolistAC(res.data.data.item))
  yield put(setAppStatusAC('succeeded'))
}

export const addTodolist = (title: string) => ({type: 'TODOLISTS/ADD-TODOLIST', title})

export function* changeTodolistWorkerSaga(action: ReturnType<typeof changeTodolist>) {
  const {title, id} = action
  yield call(todolistsAPI.updateTodolist, id, title)
  yield put(changeTodolistTitleAC(id, title))
}

export const changeTodolist = (id: string, title: string) => ({type: 'TODOLISTS/CHANGE-TODOLIST', id, title})

export function* todolistsWatcherSaga() {
  yield takeEvery('TODOLISTS/FETCH-TODOLISTS', fetchTodolistsWorkerSaga)
  yield takeEvery('TODOLISTS/REMOVE-TODOLIST', removeTodolistWorkerSaga)
  yield takeEvery('TODOLISTS/ADD-TODOLIST', addTodolistWorkerSaga)
  yield takeEvery('TODOLISTS/CHANGE-TODOLIST', changeTodolistWorkerSaga)
}