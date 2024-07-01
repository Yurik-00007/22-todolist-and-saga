const initialState: InitialStateType = {
  status: 'idle',
  error: null,
  isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return {...state, status: action.status}
    case 'APP/SET-ERROR':
      return {...state, error: action.error}
    case 'APP/SET-IS-INITIALIED':
      return {...state, isInitialized: action.value}
    default:
      return {...state}
  }
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
  // происходит ли сейчас взаимодействие с сервером
  status: RequestStatusType
  // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
  error: string | null
  // true когда приложение проинициализировалось (проверили юзера, настройки получили и т.д.)
  isInitialized: boolean
}

export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppInitializedAC = (value: boolean) => ({type: 'APP/SET-IS-INITIALIED', value} as const)

/*
//saga worker
export function* initializeAppWorkerSaga() {
  // alert('initializeAppWorkerSaga')
  // yield call (authAPI.me) это аналог authAPI.me()
  const res = yield call (authAPI.me)
  if (res.data.resultCode === 0) {
    yield put(setIsLoggedInAC(true));
  //   yield put(setIsLoggedInAC(true)); это аналог dispatch(setIsLoggedInAC(true));
  } else {
  }
  yield put(setAppInitializedAC(true));
}

export const initializeApp=()=>({type: 'APP/INITIALIZE-APP'})
*/
/*
export const initializeAppTC = () => async (dispatch: Dispatch) => {
  const  res=await authAPI.me()
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC(true));
    } else {
    }
    dispatch(setAppInitializedAC(true));
  }
*/
/*
export const initializeAppTC = () => (dispatch: Dispatch) => {
  authAPI.me().then(res => {
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC(true));
    } else {
    }
    dispatch(setAppInitializedAC(true));
  })
}
*/

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>


type ActionsType =
  | SetAppErrorActionType
  | SetAppStatusActionType
  | ReturnType<typeof setAppInitializedAC>
