import {Dispatch} from 'redux'
import {SetAppErrorActionType, SetAppStatusActionType} from '../../app/app-reducer'

const initialState: InitialStateType = {
    isLoggedIn: false
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

// actions

export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)


// sagas

/*
export function* loginWorkerSaga (action:ReturnType<typeof loginAuth>) {
  const {data}=action
  yield put(setAppStatusAC('loading'))
  try{
    const res= yield call(authAPI.login,data)
    if (res.data.resultCode === 0) {
      yield put(setIsLoggedInAC(true))
      yield put(setAppStatusAC('succeeded'))
    } else {
      // handleServerAppError(res.data, dispatch)
      // yield call(handleServerAppError, res.data);
    }
  }
  catch(error) {
    // handleServerNetworkError(error, dispatch)
    // yield call(handleServerNetworkError, error);
  }
}

export const loginAuth = (data: LoginParamsType) => ({type: 'AUTH/LOGIN-AUTH',data})
*/

/*
export function* logoutWorkerSaga () {
  yield put(setAppStatusAC('loading'))
  try {
    const res = yield call( authAPI.logout)
    if (res.data.resultCode === 0) {
      yield put(setIsLoggedInAC(false))
      yield put(setAppStatusAC('succeeded'))
    } else {
      // handleServerAppError(res.data, dispatch)
      yield call(handleServerAppError,res.data)
    }
  }
  catch(error) {
    // handleServerNetworkError(error, dispatch)
    yield call(handleServerNetworkError,error)
  }
}

export const logoutAuth = () => ({type: 'AUTH/LOGOUT-AUTH'})
*/

// thunks
/*
export const loginTC = (data: LoginParamsType) => async (dispatch: Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>) => {
    dispatch(setAppStatusAC('loading'))
  try{
    const res= await authAPI.login(data)
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
  }
        catch(error) {
            handleServerNetworkError(error, dispatch)
        }
}
*/
/*
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
*/

/*export const logoutTC = () => async (dispatch: Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>) => {
    dispatch(setAppStatusAC('loading'))
  try {
    const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
          dispatch(setIsLoggedInAC(false))
          dispatch(setAppStatusAC('succeeded'))
        } else {
          handleServerAppError(res.data, dispatch)
        }
  }
        catch(error) {
            handleServerNetworkError(error, dispatch)
        }
}*/
/*
export const logoutTC = () => (dispatch: Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
*/

// types

type ActionsType = ReturnType<typeof setIsLoggedInAC>
type InitialStateType = {
    isLoggedIn: boolean
}

type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>
