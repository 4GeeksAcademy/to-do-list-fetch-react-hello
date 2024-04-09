import React, { useState, useEffect } from 'react'

import { AiOutlineUserDelete } from "react-icons/ai";
import { AiOutlineUserAdd } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { TbPencil } from "react-icons/tb";
import { MdAddTask } from "react-icons/md";
import { MdGetApp } from "react-icons/md";
import { FiAlertCircle } from "react-icons/fi";

const InputTask = () => {
    /*USERS */
    const [inputUser, setInputUser] = useState('')
    const [users, setUsers] = useState([])
    /*TASK */
    const [inputTaskCreate, setInputTaskCreate] = useState('')
    const [inputTaskUpdate, setInputTaskUpdate] = useState('')
    const [toDoList, setToDoList] = useState([])
    /*ACTIVAR BOTONES */
    const [active2, setActive2] = useState(false)
    const [active3, setActive3] = useState(false)
    /* id */
    const [sendId, setSendId] = useState('')

    useEffect(() => {
        getUser()
    }, [])

    const handlerOnChangeInputUsers = (eve) => {
        setInputUser(eve.target.value)
    }
    const handlerOnChangeInputTaskCreate = (even) => {
        setInputTaskCreate(even.target.value)
    }
    const handlerOnChangeInputTaskUpdate = (even) => {
        setInputTaskUpdate(even.target.value)
    }

    /* id */
    function handlerSendId(comeId) {
        setSendId(comeId)
    }
    
    /* teclado */ 
    function handlerKeyDownTask(event) {
        if (event.key === 'Enter' && inputTaskCreate !== '') {
            handlerCreateTask()
        }
    }

    function handlerKeydownUser(event) {
        if (event.key === 'Enter' && inputUser !== '') {
            handlerCreateUsers()
        }
    }

    function handlerKeyDownUpdate(event){
        if(event.key === 'Enter' && inputTaskUpdate !== ''){
            handlerUpdateTask(sendId)
        }
    }

    /*automatizacion */
    function handlerGetUsers(name) {
        setActive3(true)
        setInputUser(name)
        setTimeout(() => {
            handlerGetData(name)
            setActive3(false)
        }, 500);
    }
    

    /*GET USERS */
    async function getUser() {
        try {
            setActive2(true)
            const resGetUsers = await fetch('https://playground.4geeks.com/todo/users')

            if (!resGetUsers.ok) {
                throw new Error('Se ha presentado un error:', resGetUsers.statusText)
            }
            const dataGetUsers = await resGetUsers.json()
            setUsers(dataGetUsers.users)
            return dataGetUsers

        } catch (err) {
            console.error('ha ocurrido un error:', err)
        } finally {
            setActive2(false)
        }
    }

    /* CREAR USUARIO */
    async function handlerCreateUsers() {
        try {

            if (inputUser !== "") {
                setActive2(true)
                const response = await fetch(`https://playground.4geeks.com/todo/users/${inputUser}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                if (!response.ok) {
                    throw new Error('El error ' + response.status + response.statusText)
                }

                let data = await response.json()
                setInputUser('')
                getUser()
                return data
            } else {
                alert('Debe de escribir un usuario')
            }


        } catch (error) {
            console.error('Error presentando es: ', error)
            alert('Tal vez el usuario ya existe u Ocurrió otro error')
            setInputUser('')
        } finally {
            setActive2(false)
        }
    }

    /* EIMINAR USUARIO */
    async function handlerDeleteUsers(nameUsers) {
        try {
            setActive2(true)
            const resDeleteUsers = await fetch(`https://playground.4geeks.com/todo/users/${nameUsers}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (!resDeleteUsers.ok) {
                throw new Error('La solicitud para eliminar el users no fue exitosa')
            }

            setInputUser('')
            getUser()

        } catch (error) {
            console.error('Error presentando es: ', error)
            setInputUser('')
        } finally {
            setActive2(false)
        }
    }

    /* OBTENER TAREA DEL USUARIO */
    async function handlerGetData(nameUser) {
        try {

            setActive3(true)
            const responseGetData = await fetch(`https://playground.4geeks.com/todo/users/${nameUser}`)

            if (!responseGetData.ok) {
                throw new Error('Error fue: ', error)
            }

            const dataGetData = await responseGetData.json()
            setToDoList(dataGetData.todos)



        } catch (error) {
            console.error('Error fue: ', error)
        } finally {
            setActive3(false)
        }
    }

    /* OBTENER TAREA DEL USUARIO para las task*/
    async function handlerGetDataManual() {
        try {

            setActive3(true)
            const responseGetData = await fetch(`https://playground.4geeks.com/todo/users/${inputUser}`)

            if (!responseGetData.ok) {
                throw new Error('Error fue: ', error)
            }

            const dataGetData = await responseGetData.json()
            setToDoList(dataGetData.todos)



        } catch (error) {
            console.error('Error fue: ', error)
        } finally {
            setActive3(false)
        }
    }

    /* CREAR TASK */
    async function handlerCreateTask() {


        try {
            if (inputTaskCreate !== '') {
                setActive3(true)
                const resCreateTask = await fetch(`https://playground.4geeks.com/todo/todos/${inputUser}`, {
                    method: 'POST',
                    body: JSON.stringify({ label: inputTaskCreate, is_done: false }),
                    headers: {
                        'Content-type': 'application/json'
                    }
                })

                if (!resCreateTask.ok) {
                    throw new Error('Error fue: ', error)
                }

                const dateCreateTask = await resCreateTask.json()
                setInputTaskCreate('')
                handlerGetDataManual()
                return dateCreateTask
            } else {
                alert('Debe de escribir en el campo')
            }

        } catch (error) {
            console.error('Error fue: ', error)
            setInputUser('')
        } finally {
            setActive3(false)
        }
    }

    /* ACTUALIZA */
    async function handlerUpdateTask(id) {

        try {

            if (inputTaskUpdate !== '') {
                setActive3(true)
                const resUpdateTask = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify({ label: inputTaskUpdate, is_done: false }),
                    headers: {
                        'Content-type': 'application/json'
                    }
                })

                if (!resUpdateTask.ok) {
                    throw new Error('Error fue: ', error)
                }

                const dateUpdateTask = await resUpdateTask.json()
                handlerGetDataManual()
                setInputTaskUpdate('')
                return dateUpdateTask
            }

        } catch (error) {
            console.error('Error fue: ', error)
        } finally {
            setActive3(false)
        }
    }

    /*ELIMINAR */
    async function handlerDeleteTask(id) {
        try {
            setActive3(true)
            const resDeleteTask = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                }
            })

            if (!resDeleteTask.ok) {
                throw new Error('La solicitud para eliminar la tarea no fue exitosa')
            }

            handlerGetDataManual()

        } catch (err) {
            console.error('Ha ocurrido un erro: ', err)
        } finally {
            setActive3(false)
        }
    }

    return (
        <div>

            <div className='d-flex justify-content-end mt-3 p-2 pe-4 rounded-4' style={{ border: '0.2px solid #808b94' }}>
                <h4 className='fw-light'>Su usuario es: <span className='fw-bold'>{inputUser}</span></h4>
            </div>

            <div className='d-flex flex-column flex-xl-row justify-content-xl-between'>
                {/* CAJA DE USERS*/}
                <div className='col-xl-5 me-xl-1 bg-secondary rounded-4 mt-3 p-3'
                    style={{ boxShadow: '0px 2px 10px 1px grey', height: '77vh', overflowY: 'auto' }}>
                    <div className='rounded-4 p-1 d-flex align-items-center justify-content-between' style={{ backgroundColor: '#808b94' }}>
                        <div className='col-5'>
                            <input
                                type="text"
                                onChange={handlerOnChangeInputUsers}
                                onKeyDown={handlerKeydownUser}
                                value={inputUser}
                                className='rounded-4 w-100'
                                style={{ border: 'none', height: '36px', paddingLeft: '10px', paddingRight: '10px' }}
                            />
                        </div>
                        <div className='col-5 d-flex justify-content-end'>
                            <div>
                                <button className='btn btn-primary rounded-4 d-flex justify-content-center align-items-center fs-4' onClick={handlerCreateUsers}><AiOutlineUserAdd /></button>
                            </div>

                        </div>
                    </div>



                    {(active2)
                        ? <div className='text-center mt-5'>
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <div >Cargando, <strong>Users</strong>...</div>
                        </div>
                        : (users.length == 0)
                            ? <div>
                                <p>
                                    <strong>No hay tareas creadas.</strong>
                                </p>
                            </div>
                            : <div className='mt-3'>

                                <div className='d-flex justify-content-end me-3'>
                                    <h4 className='fw-light'>Usuarios Existentes <span className='fw-bold'>
                                        {users.length}
                                    </span></h4>
                                </div>

                                {users.map((user, index) => (
                                    <div key={index} className='d-flex rounded-2 mt-3 p-2' style={{ backgroundColor: (user.id) % 2 ? '#808b94' : '#99a6b0' }}>
                                        <div className='col-3 d-flex align-items-center justify-content-center'>
                                            <div>#{user.id}</div>
                                        </div>
                                        <div className='col-7 pe-3 d-flex align-items-center justify-content-center'>
                                            <div>
                                                <a className='anchor fw-bold'
                                                    onClick={() => { handlerGetUsers(user.name) }}>
                                                    {user.name}
                                                </a>
                                            </div>
                                        </div>
                                        <div className='col-2 d-flex justify-content-end'>
                                            <button className='btn btn-danger rounded-2  d-flex justify-content-center align-items-center fs-4' onClick={() => { handlerDeleteUsers(user.name) }}><AiOutlineUserDelete /></button>
                                        </div>
                                    </div>
                                ))}

                            </div>}
                </div>

                {/* CAJA DE TASK*/}
                <div className='col-xl-7 ms-xl-1 me-xl-1 bg-secondary rounded-4 mt-3 p-3'
                    style={{ boxShadow: '0px 2px 10px 1px grey', height: '77vh', overflowY: 'auto' }}>
                    <div className='rounded-4 p-1 d-flex align-items-center justify-content-between' style={{ backgroundColor: '#808b94' }}>
                        <div className='col-5 '>
                            <input
                                type="text"
                                onChange={handlerOnChangeInputTaskCreate}
                                onKeyDown={handlerKeyDownTask}
                                value={inputTaskCreate}
                                className='rounded-4 w-100'
                                style={{ border: 'none', height: '36px', paddingLeft: '10px', paddingRight: '10px' }}
                            />
                        </div>
                        <div className='col-5 d-flex justify-content-end'>
                            <div>
                                <button className='btn btn-primary rounded-4 p-1 me-1 d-flex justify-content-center align-items-center' onClick={handlerGetData}><span className=' fs-5'><MdGetApp /></span>Get Data</button>
                            </div>
                            <div>
                                <button className='btn btn-success rounded-4 fs-4 d-flex justify-content-center align-items-center' onClick={handlerCreateTask}><MdAddTask /></button>
                            </div>
                        </div>
                    </div>


                    {
                        (active3)
                            ? <div className='text-center mt-5'>
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <div >Cargando, <strong>{inputUser}</strong>...</div>
                            </div>
                            :
                            (toDoList.length == 0)
                                ? <div className={ `d-flex align-items-center justify-content-center text-center pt-1 pb-1 mt-5 border border-${(inputUser !== '') ? 'primary' : 'dark'} rounded-pill` }>
                                    <span>
                                        <strong>{(inputUser !== '') ? 'No hay tareas creadas.' : 'Seleccione un Usuario para inciar a crear las TASK'}</strong>
                                    </span>
                                </div>
                                : <div className='mt-3'>

                                    <div className='d-flex justify-content-end me-3'>
                                        <h4 className='fw-light'>Task Existentes <span className='fw-bold'>
                                            {toDoList.length}
                                        </span></h4>

                                    </div>


                                    {toDoList.map((task, index) => (
                                        <div key={index} className='d-flex rounded-2 mt-3 p-2' style={{ backgroundColor: (index + 1) % 2 ? '#808b94' : '#99a6b0' }}>

                                            <div className='col-9 d-flex align-items-center justify-content-center'>
                                                <div className='col-1'>
                                                    <span className='border border-secondary rounded-2 p-1 fw-bold'>#{index + 1}</span>
                                                </div>
                                                <div className='col'>{task.label} </div>
                                            </div>

                                            <div className='col-3  d-flex align-items-center justify-content-end'>

                                                <div>
                                                    {/* MODAL */}


                                                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                        <div className="modal-dialog">
                                                            <div className="modal-content">
                                                                <div className="modal-header">
                                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Actualizar la Task</h1>
                                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                </div>
                                                                <div className="modal-body bg-secondary">
                                                                    <p>Usted esta por actualizar la Task <strong>Nro #:</strong>{index}</p>
                                                                    <input
                                                                        onChange={handlerOnChangeInputTaskUpdate}
                                                                        value={inputTaskUpdate}
                                                                        onKeyDown={handlerKeyDownUpdate}
                                                                        className='rounded-4 w-100'
                                                                        style={{ border: 'none', height: '36px', paddingLeft: '10px', paddingRight: '10px' }} />

                                                                </div>
                                                                <div className="modal-footer">
                                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                    <button type="button" className="btn btn-success" data-bs-dismiss="modal"
                                                                        onClick={() => { handlerUpdateTask(sendId) }} ><TbPencil /></button>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* */}
                                                    <button data-bs-toggle="modal" data-bs-target="#exampleModal" className='btn btn-success fs-4 d-flex justify-content-center align-items-center'
                                                        onClick={() => { handlerSendId(task.id) }} ><TbPencil /></button>
                                                </div>
                                                <div className='ms-3'>
                                                    <button className='btn btn-danger fs-4 d-flex justify-content-center align-items-center' onClick={() => { handlerDeleteTask(task.id) }} ><TiDeleteOutline /></button>
                                                </div>

                                            </div>

                                        </div>
                                    ))}

                                </div>
                    }
                </div>
            </div>

        </div>
    )
}

export default InputTask
