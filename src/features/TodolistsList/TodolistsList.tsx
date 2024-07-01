import React, {useCallback, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../../app/store'
import {changeTodolistFilterAC, FilterValuesType, TodolistDomainType} from './todolists-reducer'
import {TasksStateType} from './tasks-reducer'
import {TaskStatuses} from '../../api/todolists-api'
import {Grid, Paper} from '@material-ui/core'
import {AddItemForm} from '../../components/AddItemForm/AddItemForm'
import {Todolist} from './Todolist/Todolist'
import {Redirect} from 'react-router-dom'
import {addTask, removeTask, updateTask} from "./tasks-saga";
import {addTodolist, changeTodolist, fetchTodolists, removeTodolist} from "./todolists-saga";

type PropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = ({demo = false}) => {
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    const dispatch = useDispatch()

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return;
        }
        const thunk = fetchTodolists()
        dispatch(thunk)
    }, [])

    const removeTaskCB = useCallback(function (id: string, todolistId: string) {
        dispatch(removeTask(id, todolistId))
    }, [])

    const addTaskCB = useCallback(function (title: string, todolistId: string) {
        const thunk = addTask(title, todolistId)
        dispatch(thunk)
    }, [])

    const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
        const thunk = updateTask(id, {status}, todolistId)
        dispatch(thunk)
    }, [])

    const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
        const thunk = updateTask(id, {title: newTitle}, todolistId)
        dispatch(thunk)
    }, [])

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value)
        dispatch(action)
    }, [])

    const removeTodolistCB = useCallback(function (id: string) {
        const thunk = removeTodolist(id)
        dispatch(thunk)
    }, [])

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        const thunk = changeTodolist(id, title)
        dispatch(thunk)
    }, [])

    const addTodolistCB = useCallback((title: string) => {
        const thunk = addTodolist(title)
        dispatch(thunk)
    }, [dispatch])

    if (!isLoggedIn) {
        return <Redirect to={"/login"} />
    }

    return <>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addTodolistCB}/>
        </Grid>
        <Grid container spacing={3}>
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id]

                    return <Grid item key={tl.id}>
                        <Paper style={{padding: '10px'}}>
                            <Todolist
                                todolist={tl}
                                tasks={allTodolistTasks}
                                removeTask={removeTaskCB}
                                changeFilter={changeFilter}
                                addTask={addTaskCB}
                                changeTaskStatus={changeStatus}
                                removeTodolist={removeTodolistCB}
                                changeTaskTitle={changeTaskTitle}
                                changeTodolistTitle={changeTodolistTitle}
                                demo={demo}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </>
}
