import React, {useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {
  const context = useContext(noteContext);
  const {addNote} = context;

  const [note, setNote] = useState({title: "", description: "", tag: ""});

  const handleClick = (event) =>{
    event.preventDefault();
    addNote(note.title, note.description, note.tag);
    props.showAlert("Note added Successfully", "success");
    setNote({title: "", description: "", tag: ""})
  }

  const onChange = (event) => {
    const {name, value} = event.target;
    setNote({...note, [name]: value})
  }
  return (
    <div>
        <h2>Add a Note</h2>
        <form onSubmit={handleClick}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange}/>
          </div>
          <button  type="submit" className="btn btn-primary">Add Note</button>
        </form>
    </div>
  )
}

export default AddNote