import React, { useState, useEffect } from 'react'


const InputTask = () => {
    const [inputTask, setInputTask] = useState('')
    const [toDoList, setToDoList] = useState([])

    /* CREAR USUARIO */
    async function handlerCreateList() {
        try {

            const response = await fetch(`https://playground.4geeks.com/apis/fake/todos/user/${inputTask}`, {
                method: 'POST',
                body: JSON.stringify([]),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (!response.ok) {
                throw new Error('Error presentando es: ', error)
            }

            let data = await response.json()
            return data


        } catch (error) {
            console.error('Error presentando es: ', error)
        }
    }

    /* OBTENER TAREA DEL USUARIO */
    async function handlerGetData() {
        try {
            const responseGetData = await fetch(`https://playground.4geeks.com/apis/fake/todos/user/test27`)

            if (!responseGetData.ok) {
                throw new Error('Error fue: ', error)
            }

            const dataGetData = await responseGetData.json()
            console.log(dataGetData)
            setToDoList(dataGetData)

        } catch (error) {
            console.error('Error fue: ', error)
        }
    }

    /* ACTUALIZA */
    async function handlerUpdateTask(){
        const newTask = {...toDoList,
            inputTask
        }
        console.log(newTask)
        try{
            const resUpdateTask = await fetch('https://playground.4geeks.com/apis/fake/todos/user/test27', {
                method: 'PUT',
                body: JSON.stringify([newTask]),
                headers: {
                    'Content-type':'application/json'
                }
            })

            if(!resUpdateTask.ok){
                throw new Error('Error fue: ', error)
            }

            const dateUpdateTask = await resUpdateTask.json()
            console.log(dateUpdateTask)
            setInputTask({label: '', done: false})
            setToDoList(dateUpdateTask)


        }catch(error){
            console.error('Error fue: ', error)
        }
    }

    return (
        <div>
            <input
                type="text"
                onChange={(eve) => {
                    setInputTask(eve.target.value)
                }}
            />
            <button onClick={handlerCreateList}>Create User</button>
            <button onClick={handlerGetData}>get data</button>

            <button onClick={handlerUpdateTask} >update</button>

            {toDoList.map( (task, index)=>{
                return(
                    <p key={task.id}>
                        {task.label}  
                    </p>

                )
            } )}
        </div>
    )
}

export default InputTask
