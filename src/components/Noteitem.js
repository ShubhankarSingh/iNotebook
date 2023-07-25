import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const {deleteNote} = context;
  const {note, updateNote} = props;

  const handleClick = () =>{
    deleteNote(note._id);
    props.showAlert("Deleted Successfully", "success");
  }
  return (
    <div className="col-md-3">
        <div className="card my-3">
            <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.description} </p>
                <p className="card-text">{note.tag} </p>
                <button type="button" className="btn btn-outline-secondary btn-sm" onClick={()=>{updateNote(note)}}>Edit</button>
                <button type="button" className="btn btn-outline-danger btn-sm mx-2" onClick={handleClick}>Delete</button>
            </div>
        </div>
    </div>
  )
}

export default Noteitem