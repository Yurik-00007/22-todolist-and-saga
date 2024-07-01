import {TodolistType} from '../../api/todolists-api'
import {Dispatch} from 'redux'
import {RequestStatusType, SetAppErrorActionType, SetAppStatusActionType} from '../../app/app-reducer'

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter(tl => tl.id != action.id)
    case 'ADD-TODOLIST':
      return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
    case 'CHANGE-TODOLIST-TITLE':
      return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
    case 'CHANGE-TODOLIST-FILTER':
      return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
    case 'CHANGE-TODOLIST-ENTITY-STATUS':
      return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)
    case 'SET-TODOLISTS':
      return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
    default:
      return state
  }
}

// actions
export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({
  type: 'CHANGE-TODOLIST-TITLE',
  id,
  title
} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
  type: 'CHANGE-TODOLIST-FILTER',
  id,
  filter
} as const)
export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType) => ({
  type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, status
} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todolists} as const)


/*
//sagas
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
*/


// thunks
/*
export const fetchTodolistsTC = () => {
    return async (dispatch: ThunkDispatch) => {
        dispatch(setAppStatusAC('loading'))
        try{
        const res=await todolistsAPI.getTodolists()
                dispatch(setTodolistsAC(res.data))
                dispatch(setAppStatusAC('succeeded'))
        }
            catch(error){
                handleServerNetworkError(error, dispatch);
            }
    }
}
*/
/*
export const fetchTodolistsTC = () => {
    return (dispatch: ThunkDispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistsAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch);
            })
    }
}
*/

/*
export const removeTodolistTC = (todolistId: string) => {
  return async (dispatch: ThunkDispatch) => {
    //изменим глобальный статус приложения, чтобы вверху полоса побежала
    dispatch(setAppStatusAC('loading'))
    //изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо
    dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
    try {
      const res = await todolistsAPI.deleteTodolist(todolistId)
          dispatch(removeTodolistAC(todolistId))
          //скажем глобально приложению, что асинхронная операция завершена
          dispatch(setAppStatusAC('succeeded'))
    }
    catch(error){

    }
  }
}
*/
/*
export const removeTodolistTC = (todolistId: string) => {
  return (dispatch: ThunkDispatch) => {
    //изменим глобальный статус приложения, чтобы вверху полоса побежала
    dispatch(setAppStatusAC('loading'))
    //изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо
    dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
    todolistsAPI.deleteTodolist(todolistId)
      .then((res) => {
        dispatch(removeTodolistAC(todolistId))
        //скажем глобально приложению, что асинхронная операция завершена
        dispatch(setAppStatusAC('succeeded'))
      })
  }
}
*/

/*
export const addTodolistTC = (title: string) => {
  return async (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
      try {
        const res=await todolistsAPI.createTodolist(title)
        dispatch(addTodolistAC(res.data.data.item))
          dispatch(setAppStatusAC('succeeded'))
      }
      catch (error){}
  }
}
*/
/*
export const addTodolistTC = (title: string) => {
  return (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.createTodolist(title)
      .then((res) => {
        dispatch(addTodolistAC(res.data.data.item))
        dispatch(setAppStatusAC('succeeded'))
      })
  }
}
*/

/*
export const changeTodolistTitleTC = (id: string, title: string) => {
  return async (dispatch: Dispatch<ActionsType>) => {
   try {
     const res=await todolistsAPI.updateTodolist(id, title)
     dispatch(changeTodolistTitleAC(id, title))
   }
   catch (err) {}
  }
}
*/
/*
export const changeTodolistTitleTC = (id: string, title: string) => {
  return (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.updateTodolist(id, title)
      .then((res) => {
        dispatch(changeTodolistTitleAC(id, title))
      })
  }
}
*/

// types
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;
type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof changeTodolistFilterAC>
  | SetTodolistsActionType
  | ReturnType<typeof changeTodolistEntityStatusAC>
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}
type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>
