import {call, put, select} from "redux-saga/effects";
import {
  addTaskWorkerSaga,
  fetchTasksWorkerSaga,
  removeTaskWorkerSaga,
  updateTask,
  updateTaskWorkerSaga
} from "./tasks-saga";
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "../../app/app-reducer";
import {
  GetTasksResponse,
  TaskPriorities,
  TaskStatuses,
  todolistsAPI,
  UpdateTaskModelType
} from "../../api/todolists-api";
import {removeTaskAC, setTasksAC, UpdateDomainTaskModelType, updateTaskAC} from "./tasks-reducer";
import {AppRootStateType} from "../../app/store";


// let meResponse: MeResponseType;

beforeEach(()=>{
  /*meResponse={
    data: {
      resultCode: 0,
      messages: [],
      data: {
        item:{
          id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, todoListId:'', description: '',
          startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
        },
      },
    }
  }*/
  })

test('fetchTasksWorkerSaga success flow', () => {
  const gen = fetchTasksWorkerSaga({type: '',todolistId: 'todolistId'})
  expect(gen.next().value).toEqual(put(setAppStatusAC('loading')))
  expect(gen.next().value).toEqual(call(todolistsAPI.getTasks, 'todolistId'))

  const fakeApiResponse:GetTasksResponse={
    error:'',
    totalCount:1,
    items:[{ id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
      startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
    ]
  }
  expect(gen.next(fakeApiResponse).value).toEqual(put(setTasksAC(fakeApiResponse.items, 'todolistId')))
  const next = gen.next();
  expect(next.value).toEqual(put(setAppStatusAC('succeeded')))
  // expect(next.done).toEqual(false)
  expect(next.done).toBeFalsy()
/*
  const gen = fetchTasksWorkerSaga({type: '',todolistId: 'todolistId'})
  let result = gen.next()
  expect(result.value).toEqual(put(setAppStatusAC('loading')))

  result = gen.next()
  expect(result.value).toEqual(call(todolistsAPI.getTasks, 'todolistId'))

  const fakeApiResponse:GetTasksResponse={
    error:'',
    totalCount:1,
    items:[{ id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
      startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
    ]
  }
  result = gen.next(fakeApiResponse)
  expect(result.value).toEqual(put(setTasksAC(fakeApiResponse.items, 'todolistId')))

  result = gen.next()
  expect(result.value).toEqual(put(setAppStatusAC('succeeded')))
*/
})

test('fetchTasksWorkerSaga error flow', () => {
  const gen = fetchTasksWorkerSaga({type: '',todolistId: 'todolistId'})
  expect(gen.next().value).toEqual(put(setAppStatusAC('loading')))
  expect(gen.next().value).toEqual(call(todolistsAPI.getTasks, 'todolistId'))
  expect(gen.throw({message:'some error'}).value).toEqual(put(setAppErrorAC('some error')))
  expect(gen.next().value).toEqual( put(setAppStatusAC('failed')))
});

test('removeTaskWorkerSaga success flow', () => {
  const todolistId = 'todolistId';
  const taskId = 'taskId';
  const gen = removeTaskWorkerSaga({type: 'TASKS/REMOVE-TASK',todolistId,taskId})
  expect(gen.next().value).toEqual(put(setAppStatusAC('loading')))
  expect(gen.next().value).toEqual(call(todolistsAPI.deleteTask, todolistId, taskId))

  const fakeApiResponse = {
    data: {
      resultCode: 0,
      messages: [],
      data: {
        item:{
          id: taskId, title: "HTML&CSS", status: TaskStatuses.Completed, todoListId: todolistId, description: '',
          startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
        },
      },
      fieldErrors:[]
    }
  };
  expect(gen.next(fakeApiResponse).value).toEqual(put(removeTaskAC(taskId, todolistId)))
  expect(gen.next().value).toEqual(put(setAppStatusAC('succeeded')))
});

test('removeTaskWorkerSaga error flow', () => {
  const todolistId = 'todolistId';
  const taskId = 'taskId';
  const gen = removeTaskWorkerSaga({type: 'TASKS/REMOVE-TASK',todolistId,taskId})
  expect(gen.next().value).toEqual(put(setAppStatusAC('loading')))
  expect(gen.next().value).toEqual(call(todolistsAPI.deleteTask, todolistId, taskId))
  expect(gen.throw({message:'some error'}).value).toEqual(put(setAppErrorAC('some error')))
  expect(gen.next().value).toEqual( put(setAppStatusAC('failed')))
});

test('addTaskWorkerSaga success flow', () => {
  const title = 'task title';
  const todolistId = 'todolistId';
  const gen = addTaskWorkerSaga({type: 'TASKS/ADD-TASK',title,todolistId})
  expect(gen.next().value).toEqual(put(setAppStatusAC('loading')))
/*
  expect(gen.next().value).toEqual(call(todolistsAPI.createTask, todolistId,title))
  const fakeApiResponse = {
    data: {
      resultCode: 0,
      messages: [],
      data: {
        item:{
          id: v1(), title, status: TaskStatuses.Completed, todoListId:todolistId, description: '',
          startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
        },
      },
      fieldErrors:[]
    }
  };

  expect(gen.next(fakeApiResponse).value).toEqual(put(addTaskAC(fakeApiResponse.data.data.item)))
  expect(gen.next().value).toEqual( put(setAppStatusAC('succeeded')))
*/

})

test('addTaskWorkerSaga error flow', () => {
  const title = 'task title';
  const todolistId = 'todolistId';
  const gen = addTaskWorkerSaga({type: 'TASKS/ADD-TASK',title,todolistId})
  expect(gen.next().value).toEqual(put(setAppStatusAC('loading')))
  expect(gen.next().value).toEqual(call(todolistsAPI.createTask, todolistId,title))
  expect(gen.throw({message:'some error'}).value).toEqual(put(setAppErrorAC('some error')))
  expect(gen.next().value).toEqual( put(setAppStatusAC('failed')))
})


test('updateTaskWorkerSaga error flow', () => {


const todolistId = 'todolistId';
const taskId = 'taskId';
const domainModel: UpdateDomainTaskModelType = { title: 'New Title' };

const task = {
  id: taskId,
  title: 'Old Title',
  status: TaskStatuses.New,
  todoListId: todolistId,
  description: '',
  startDate: '',
  deadline: '',
  addedDate: '',
  order: 0,
  priority: TaskPriorities.Low,
};

const state = {
  tasks: {
    [todolistId]: [task],
  },
  todolists: [], // Добавьте другие необходимые свойства состояния
  app: { status: 'idle' as RequestStatusType, error: null, isInitialized: false },
  auth: { isLoggedIn: false },
};

const apiModel: UpdateTaskModelType = {
  deadline: task.deadline,
  description: task.description,
  priority: task.priority,
  startDate: task.startDate,
  title: domainModel.title ?? task.title,
  status: task.status,
};

const gen = updateTaskWorkerSaga(updateTask(taskId, domainModel, todolistId));

// Этапы выполнения саги
expect(gen.next().value).toEqual(select());
expect(gen.next(state).value).toEqual(put(setAppStatusAC('loading')));
expect(gen.next().value).toEqual(call(todolistsAPI. updateTask, todolistId, taskId, apiModel));
  expect(gen.throw({message:'some error'}).value).toEqual(put(setAppErrorAC('some error')))
  expect(gen.next().value).toEqual( put(setAppStatusAC('failed')))
});
