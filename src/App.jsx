import './App.css';
import { useState } from "react";
import shortid from "shortid";

function App() {
  const [tarea, setTarea] = useState("");
  const [tareas, setTareas] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEdit, setIdEdit] = useState("");
  const [error, setError] = useState(null);
  

  const agregarTarea = (e)=>{
    e.preventDefault()
    if(!tarea.trim()){
      console.log("Tarea vacia");
      setError("Escriba la tarea para continuar")
      return
    }
    console.log("Esta es la tarea", tarea);
    setTareas([
      ...tareas,
      {
        id:shortid.generate(),
        nombTarea: tarea
      }
    ])
    setTarea("")
    setError(null)    
  }

  const Eliminar = id =>{
    const newArray = tareas.filter(item => item.id !== id);
    setTareas(newArray);
  }
  const Edicion = item =>{    
    setModoEdicion(true);
    setTarea(item.nombTarea)
    setIdEdit(item.id)
  }
  
  const editarTarea = e => {
    e.preventDefault()
    if(!tarea.trim()){
      console.log("Tarea vacia");
      setError("Escriba contenido para editarlo")
      return
    }
    console.log("Estas editando");
    const arrayEditado = tareas.map( item => item.id === idEdit ? { id:idEdit, nombTarea: tarea }: item)
    setTareas(arrayEditado)
    setModoEdicion(false)
    setTarea("")
    setIdEdit("")
    setError(null)
  }

  return (
    <div className="container">
      <h1 class="text-center">CRUD SIMPLE REACT</h1>
      <hr/>
      <div className="row">
        <div className="col 8">
          <h4 className="text-center">Lista de tareas</h4>
          <ul className="list-group"> 
            
            {
              tareas.lenght === 0 ?
              (
                <li className="list-group-item">
                  No hay Tareas
                </li>
              ):
              (
                tareas.map(item =>(
                  <li className="list-group-item" key={item.id}>
                    <div className="row">
                      <div className="col-8">
                        <span className="lead">{item.nombTarea}</span>
                      </div>
                      <div className="col-4 float-right">
                        <button type="button"
                          className="btn btn-danger btn-sm mx-2"
                          onClick={()=> Eliminar(item.id)}
                        >
                            Eliminar
                        </button>
                        <button type="button"
                          className="btn btn-warning btn-sm"
                          onClick={ ()=> Edicion(item)}
                        >
                            Editar
                        </button> 
                      </div>
                    </div>
                  </li>              
                ))
              )
            }          
          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">{ modoEdicion ? "Editar Tarea": "Agregar Tarea"}</h4>
          <form onSubmit={ modoEdicion? editarTarea : agregarTarea }>
            {
              error 
              ?<div class="alert alert-danger" role="alert">
                {error}
              </div> 
              : null
            }
            <input type="text" 
              className="form-control mb-2" 
              placeholder="Ingrese Tarea"
              onChange={ e => setTarea(e.target.value)}
              value = {tarea}
            />
            <div className="d-grid gap-2">
              { modoEdicion ?
                (<button type="submit" className="btn btn-warning btn-block">Editar</button>):
                (<button type="submit" className="btn btn-dark btn-block">Agregar</button>)
              }
              
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
