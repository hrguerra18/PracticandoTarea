import React, { Component, useState, useEffect, useRef } from 'react'
import Input from './Inputs'
import Navbar from './navbar';


export default function App() {
    

    const mensajeRegistroExitoso = () => {
        return <div id="mensajeExito" className="alert alert-success mt-2" role="alert">
            Usted ha registrado exitosamente la tarea!
        </div>
    }

    const [inputTitulo, setinputTitulo] = useState('');
    const [inputDescripcion, setinputDescripcion] = useState('');
    const [mensaje, setMensaje] = useState(false);
    const [tareas, setTareas] = useState([]);
    const [inputId, setinputId] = useState('');

    const getValueTitulo = (evento) => {
        setinputTitulo(evento.target.value)
    }

    const getValueDescripcion = (evento) => {
        setinputDescripcion(evento.target.value)
    }

    const consultarTareas = ()=>{
        fetch('http://localhost:3000/api/tareas')
            .then(resp => resp.json())
            .then(json => setTareas(json))
    }


    const agregarTarea = () => {
        const data = {
            titulo: inputTitulo,
            descripcion: inputDescripcion
        }
       if (inputId == "") {
        fetch('/api/tareas', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accep': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            setMensaje(true)
            consultarTareas();
            setTimeout(()=>{
                setMensaje(false);
            },3000)
        })
         .catch(err => console.log(err))
       }else{
           fetch(`/api/tareas/${inputId}`,{
               method: 'PUT',
               body: JSON.stringify(data),
               headers: {
                'Accep': 'application/json',
                'Content-Type': 'application/json'
            }
           }).then((res)=>{
               consultarTareas();
           }).catch(error => console.log(error))
           setinputId('')
       }
        document.getElementById("titulo").value = ""
        document.getElementById("descripcion").value = ""
    }

    useEffect(() => {
        consultarTareas()
    }, [])

    const editarTarea = (tarea) => {
       document.getElementById("titulo").value = tarea.titulo
       document.getElementById("descripcion").value = tarea.descripcion
       setinputTitulo(tarea.titulo)
       setinputDescripcion(tarea.descripcion)
       setinputId(tarea._id)
    }
    

 const eliminarTarea =(tarea)=>{
    if(confirm("¿Esta seguro que desea eliminar esta tarea?")){
        fetch(`/api/tareas/${tarea._id}`,{
            method: 'DELETE',
            headers : {
                'Accep' : 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((resp)=>{
            consultarTareas();
        })
            .catch(error => console.log(error))
    }
    
}
    

    const LlenarTabla = tareas.map((tarea)=>{
        return  <tr>
        <td>{tarea._id}</td>
        <td>{tarea.titulo}</td>
        <td>{tarea.descripcion}</td>
        <button onClick={() => editarTarea({...tarea})} className="btn btn-outline-info m-1">Editar</button>
        <button onClick={()=> eliminarTarea({...tarea})} className="btn btn-outline-danger">Eliminar</button>
    </tr>
    })

    return (
        <div>
           
            <Navbar />
            <div className="row p-4">
                <div className="col-4 mt-3 p-3">
                    <Input getValue={getValueTitulo}  id="titulo" label="Titulo"/>
                     <input type="hidden"  className="form-control" id="id" />
                    
                   <Input getValue={getValueDescripcion}  id="descripcion" label="Descripcion" />

                    <button onClick={agregarTarea} type="button" class="btn btn-danger col-12">Guardar</button>


                    {mensaje && mensajeRegistroExitoso()}

                </div>
                <div className="col-8 mt-3 p-3">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Titulo</th>
                                <th scope="col">Descripcion</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {LlenarTabla}

                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )

}