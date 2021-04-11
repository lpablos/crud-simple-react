import logo from './logo.svg';
import './App.css';
import {useState} from "react";
import shortid from "shortid";

function App() {
  const [tarea, setTarea] = useState("")
  const [tareas, setTareas] = useState([])

  const agregarTarea = (e)=>{
    e.preventDefault()
    if(!tarea.trim()){
      console.log("Tarea vacia");
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
  }
  const Eliminar = id =>{
    console.log("Este es el identy", id);
    const newArray = tareas.filter(item => item.id !== id);
    setTareas(newArray);
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
                        
                      >
                          Editar
                      </button> 
                    </div>
                  </div>
                </li>              
              ))
            }          
          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">Formulario</h4>
          <form onSubmit={ agregarTarea }>
            <input type="text" 
              className="form-control mb-2" 
              placeholder="Ingrese Tarea"
              onChange={ e => setTarea(e.target.value)}
              value = {tarea}
            />
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-dark btn-block">Agregar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
