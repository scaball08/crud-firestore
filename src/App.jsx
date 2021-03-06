import React from "react";
import { firebase } from "./firebase";

function App() {
  const [tareas, setTareas] = React.useState([]);
  const [tarea, setTarea] = React.useState("");
  const [error, setError] = React.useState(null);
  const [modoEdicion, setModoEdi] = React.useState(false);
  const [id, setId] = React.useState("");

  React.useEffect(() => {
    getDatos();
  }, []);

  const editarTarea = async (evt) => {
    evt.preventDefault();
    
    if (!tarea.trim()) {
      console.log("elemento vacio");
      setError("campo vacio : Escriba  nombre de Tarea");
      setTimeout(() => setError(null), 2200);
      return;
    }

    try {
      const db = firebase.firestore()
      const upDoc = {name:tarea,fecha:Date.now()}
    const upItem = await db.collection('tareas').doc(id).set(upDoc)
    setTareas(tareas.map((item)=>item.id === id ? {id:item.id,...upDoc} : item));
    setModoEdi(false);
    setId('');
    setTarea('');
    } catch (error) {
      
    }
  };
  const editar = (item) => {
    setModoEdi(true);
    setId(item.id) ;
    setTarea(item.name);
  }

  const eliminarTarea = (clave) => {
    try {
      const db = firebase.firestore();
    db.collection('tareas').doc(clave).delete();
    setTareas(tareas.filter((item) => item.id !== clave));
    } catch (error) {
      
    }
    
  };

  const agregar = async (evt) => {
    evt.preventDefault();
    if (!tarea.trim()) {
      console.log("elemento vacio");
      setError("campo vacio : Escriba  nombre de Tarea");
      setTimeout(() => setError(null), 2200);
      return;
    }

    try {
      const db = firebase.firestore();
      const nuevaTarea = {
        name: tarea,
        fecha: Date.now(),
      };
      const newItem = await db.collection("tareas").add(nuevaTarea);
      setTareas([...tareas, { id: newItem.id, ...nuevaTarea }]);
      setTarea("");

      console.log(" id nueva tarea", newItem.id);
    } catch (error) {}

    console.log("la tarea", tarea);
  };

  const getDatos = async () => {
    try {
      const db = firebase.firestore();
      const resData = await db.collection("tareas").get();
      const vecTask = resData.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(vecTask);

      setTareas(vecTask);
    } catch (error) {
      console.log("Error en firebase", error);
    }
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-6">
          <ul className="list-group">
            {tareas.map((item) => (
              <li key={item.id} className="list-group-item">
                <span className="lead">{item.name}</span>
                <button
                  onClick={() => eliminarTarea(item.id)}
                  className="btn btn-sm btn-danger float-right mx-2"
                  type="button"
                >
                  Eliminar
                </button>
                <button
                  onClick={() => editar(item)}
                  className="btn btn-sm btn-success float-right"
                  type="button"
                >
                  Editar
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-6">
          <h4>{modoEdicion ? "Editar Tarea" : "Agregar Tarea"}</h4>
          <form onSubmit={modoEdicion ? editarTarea : agregar}>
            {error ? (
              <div className="alert alert-danger" role="alert">
                This is a danger alert—check it out!
              </div>
            ) : null}
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Nombre Tarea</label>
              <input
                type="text"
                className="form-control"
                value={tarea}
                onChange={(e) => setTarea(e.target.value)}
                id="formGroupExampleInput"
                placeholder="Ingrese tarea"
              />
            </div>
            {modoEdicion ? (
              <button className="btn btn-dark" type="submit">
                Editar
              </button>
            ) : (
              <button className="btn btn-dark" type="submit">
                Agregar
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
