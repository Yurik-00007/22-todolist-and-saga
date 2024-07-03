import {tasksReducer} from '../features/TodolistsList/tasks-reducer';
import {todolistsReducer} from '../features/TodolistsList/todolists-reducer';
import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {appReducer} from './app-reducer'
import {authReducer} from '../features/Login/auth-reducer'
import createSagaMiddleware from 'redux-saga'
import {tasksWatcherSaga} from "../features/TodolistsList/tasks-saga";
import {appWatcherSaga} from "./app-saga";
import {all} from 'redux-saga/effects';
import {todolistsWatcherSaga} from "../features/TodolistsList/todolists-saga";
import {authWatcherSaga} from "../features/Login/auth-saga";


// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
  auth: authReducer
})
//1. Создадим Middleware в которой будет watcher saga и добавим его applyMiddleware при создание(createStore) store
const sagaMiddleware = createSagaMiddleware()
// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, sagaMiddleware));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
/*
// saga это генератор функция. В sage сидит та логика которая сидела в thunk(асинхронные запросы, диспачи и т.д.)
// Есть watcher saga и worker saga аналог thunk. watcher saga регистрируется в Middleware а в ней конектим action с вот
// такой worker saga-ой

//2. К Middleware привязываем saga watcher
sagaMiddleware.run(rootWatcher)

// В saga watcher привязываем через yield takeEvery action и saga worker
//3.saga watcher
function* rootWatcher(){
    // alert('rootWatcher')
    yield takeEvery('ACTIVATOR-ACTION-TYPE', rootWorker)
}
//В saga worker происходит все тоже самое чтои в thunk
//4.saga worker
function* rootWorker(){
    // alert('rootWorker')
}

//5. Когда диспатчиться action нужного типа в store
setTimeout(()=>{
// @ts-ignore
    store.dispatch({type:'ACTIVATOR-ACTION-TYPE'})
},2000)*/

sagaMiddleware.run(rootWatcher)

function* rootWatcher() {
  /*
      // alert('rootWatcher')
      yield takeEvery('APP/INITIALIZE-APP', initializeAppWorkerSaga)
  */
  yield all([appWatcherSaga(),

    /*
        yield takeEvery('TASKS/FETCH-TASKS', fetchTasksWorkerSaga)
        yield takeEvery('TASKS/REMOVE-TASK', removeTaskWorkerSaga)
        yield takeEvery('TASKS/ADD-TASK', addTaskWorkerSaga)
        yield takeEvery('TASKS/UPDATE-TASK', updateTaskWorkerSaga)
    */
    tasksWatcherSaga(),
    todolistsWatcherSaga(),
    authWatcherSaga()
  ])

}




/*function* todolistsWatcherSaga() {
  yield takeEvery('TODOLISTS/FETCH-TODOLISTS', fetchTodolistsWorkerSaga)
  yield takeEvery('TODOLISTS/REMOVE-TODOLIST', removeTodolistWorkerSaga)
  yield takeEvery('TODOLISTS/ADD-TODOLIST', addTodolistWorkerSaga)
  yield takeEvery('TODOLISTS/CHANGE-TODOLIST', changeTodolistWorkerSaga)
}*/

/*
function* authWatcherSaga() {
yield takeEvery('AUTH/LOGIN-AUTH',loginWorkerSaga)
yield takeEvery('AUTH/LOGOUT-AUTH',logoutWorkerSaga)
}
*/
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
