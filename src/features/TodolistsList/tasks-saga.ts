// sagas
import {call, put, select, takeEvery} from "redux-saga/effects";
import {setAppStatusAC} from "../../app/app-reducer";
import {todolistsAPI, UpdateTaskModelType} from "../../api/todolists-api";
import {AppRootStateType} from "../../app/store";
import {addTaskAC, removeTaskAC, setTasksAC, UpdateDomainTaskModelType, updateTaskAC} from "./tasks-reducer";

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

export function* updateTaskWorkerSaga(action: ReturnType<typeof updateTask>) {
  const {todolistId, taskId, domainModel} = action
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
  const res = yield call(todolistsAPI.updateTask, todolistId, taskId, apiModel)
  if (res.data.resultCode === 0) {
    yield put(updateTaskAC(taskId, domainModel, todolistId))
  }
}

export const updateTask = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) => ({
  type: 'TASKS/UPDATE-TASK',
  taskId,
  domainModel,
  todolistId
})

export function* tasksWatcherSaga(){
    yield takeEvery('TASKS/FETCH-TASKS', fetchTasksWorkerSaga)
    yield takeEvery('TASKS/REMOVE-TASK', removeTaskWorkerSaga)
    yield takeEvery('TASKS/ADD-TASK', addTaskWorkerSaga)
    yield takeEvery('TASKS/UPDATE-TASK', updateTaskWorkerSaga)

}