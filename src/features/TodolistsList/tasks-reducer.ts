import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from './todolists-reducer'
import {TaskPriorities, TaskStatuses, TaskType} from '../../api/todolists-api'
import {Dispatch} from 'redux'
import {SetAppErrorActionType, SetAppStatusActionType} from '../../app/app-reducer'

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASK':
      return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id != action.taskId)}
    case 'ADD-TASK':
      return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
    case 'UPDATE-TASK':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId]
          .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
      }
    case 'ADD-TODOLIST':
      return {...state, [action.todolist.id]: []}
    case 'REMOVE-TODOLIST':
      const copyState = {...state}
      delete copyState[action.id]
      return copyState
    case 'SET-TODOLISTS': {
      const copyState = {...state}
      action.todolists.forEach(tl => {
        copyState[tl.id] = []
      })
      return copyState
    }
    case 'SET-TASKS':
      return {...state, [action.todolistId]: action.tasks}
    default:
      return state
  }
}

// actions
export const removeTaskAC = (taskId: string, todolistId: string) =>
  ({type: 'REMOVE-TASK', taskId, todolistId} as const)
export const addTaskAC = (task: TaskType) =>
  ({type: 'ADD-TASK', task} as const)
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
  ({type: 'UPDATE-TASK', model, todolistId, taskId} as const)
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
  ({type: 'SET-TASKS', tasks, todolistId} as const)

/*
// sagas
export function* fetchTasksWorkerSaga(action: ReturnType<typeof fetchTasks>) {
  // debugger
  yield put(setAppStatusAC('loading'))
  const res = yield call(todolistsAPI.getTasks, action.todolistId)
  const tasks = res.data.items
  yield put(setTasksAC(tasks, action.todolistId))
  yield put(setAppStatusAC('succeeded'))
}

export const fetchTasks = (todolistId: string) => ({type: 'TASKS/FETCH-TASKS', todolistId})

export function* removeTaskWorkerSaga(action: ReturnType<typeof removeTask>) {
  yield call(todolistsAPI.deleteTask, action.todolistId, action.taskId)
  yield put(removeTaskAC(action.taskId, action.todolistId))
}

export const removeTask = (taskId: string, todolistId: string) => ({type: 'TASKS/REMOVE-TASK', taskId, todolistId})

export function* addTaskWorkerSaga(action: ReturnType<typeof addTask>) {
  yield put(setAppStatusAC('loading'))
  const res = yield call(todolistsAPI.createTask, action.todolistId, action.title)
  if (res.data.resultCode === 0) {
    const task = res.data.data.item
    yield put(addTaskAC(task))
    yield put(setAppStatusAC('succeeded'))
  }
}

export const addTask = (title: string, todolistId: string) => ({type: 'TASKS/ADD-TASK', title, todolistId})

export function* updateTaskWorkerSaga (action:ReturnType<typeof updateTask>)  {
  const{todolistId,taskId,domainModel}=action
  const state: AppRootStateType = yield select();
    const task = state.tasks[todolistId].find(t => t.id === taskId)
    if (!task) {
      //throw new Error("task not found in the state");
      console.warn('task not found in the state')
      return
    }

    const apiModel: UpdateTaskModelType = {
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      title: task.title,
      status: task.status,
      ...domainModel
    }
      const res = yield call(todolistsAPI.updateTask,todolistId, taskId, apiModel)
      if (res.data.resultCode === 0) {
        yield put(updateTaskAC(taskId, domainModel, todolistId))
      }
    }

export const updateTask = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) => ({type: 'TASKS/UPDATE-TASK',taskId, domainModel, todolistId})
*/

// thunks
/*
export const fetchTasksTC = (todolistId: string) => async (dispatch: Dispatch<ActionsType | SetAppStatusActionType>) => {
    dispatch(setAppStatusAC('loading'))
    const res=await todolistsAPI.getTasks(todolistId)
            const tasks = res.data.items
            dispatch(setTasksAC(tasks, todolistId))
            dispatch(setAppStatusAC('succeeded'))
}
*/
/*
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionsType | SetAppStatusActionType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items
            dispatch(setTasksAC(tasks, todolistId))
            dispatch(setAppStatusAC('succeeded'))
        })
}
*/

/*
export const removeTaskTC = (taskId: string, todolistId: string) => async (dispatch: Dispatch<ActionsType>) => {
    const res=await todolistsAPI.deleteTask(todolistId, taskId)
            const action = removeTaskAC(taskId, todolistId)
            dispatch(action)
}
*/
/*
export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.deleteTask(todolistId, taskId)
        .then(res => {
            const action = removeTaskAC(taskId, todolistId)
            dispatch(action)
        })
}
*/

/*
export const addTaskTC = (title: string, todolistId: string) => async (dispatch: Dispatch<ActionsType | SetAppErrorActionType | SetAppStatusActionType>) => {
  dispatch(setAppStatusAC('loading'))
  try {
    const res = await todolistsAPI.createTask(todolistId, title)
        if (res.data.resultCode === 0) {
          const task = res.data.data.item
          const action = addTaskAC(task)
          dispatch(action)
          dispatch(setAppStatusAC('succeeded'))
        } else {
          handleServerAppError(res.data, dispatch);
        }
  } catch (error) {
    handleServerNetworkError(error, dispatch)
  }
}
*/
/*export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch<ActionsType | SetAppErrorActionType | SetAppStatusActionType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                const task = res.data.data.item
                const action = addTaskAC(task)
                dispatch(action)
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}*/

/*
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
  async (dispatch: ThunkDispatch, getState: () => AppRootStateType) => {
    const state = getState()
    const task = state.tasks[todolistId].find(t => t.id === taskId)
    if (!task) {
      //throw new Error("task not found in the state");
      console.warn('task not found in the state')
      return
    }

    const apiModel: UpdateTaskModelType = {
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      title: task.title,
      status: task.status,
      ...domainModel
    }
    try {
      const res = await todolistsAPI.updateTask(todolistId, taskId, apiModel)
      if (res.data.resultCode === 0) {
        const action = updateTaskAC(taskId, domainModel, todolistId)
        dispatch(action)
      } else {
        handleServerAppError(res.data, dispatch);
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch);
    }
  }
*/
/*
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
  (dispatch: ThunkDispatch, getState: () => AppRootStateType) => {
    const state = getState()
    const task = state.tasks[todolistId].find(t => t.id === taskId)
    if (!task) {
      //throw new Error("task not found in the state");
      console.warn('task not found in the state')
      return
    }

    const apiModel: UpdateTaskModelType = {
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      title: task.title,
      status: task.status,
      ...domainModel
    }

    todolistsAPI.updateTask(todolistId, taskId, apiModel)
      .then(res => {
        if (res.data.resultCode === 0) {
          const action = updateTaskAC(taskId, domainModel, todolistId)
          dispatch(action)
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      })
  }
*/

// types
export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}
export type TasksStateType = {
  [key: string]: Array<TaskType>
}
type ActionsType =
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof updateTaskAC>
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodolistsActionType
  | ReturnType<typeof setTasksAC>
type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>
