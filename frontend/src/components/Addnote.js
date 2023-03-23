import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext'

export const Addnote = () => {
  const context = useContext(NoteContext);
  const { Addnote } = context;
  const [note, setnote] = useState({ title: "", description: "", tag: "" })
  
  const handlerSubmit = (e) => {
    e.preventDefault();
    Addnote(note.title, note.description, note.tag);
  }
  const onChange = (e) => {
    console.log(e.target.value)
    setnote({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <form onSubmit={handlerSubmit}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">title</label>
        <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" value={note.title} onChange={onChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">description</label>
        <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange} />
      </div>
      <button type="submit" className="btn btn-primary" >Add Note</button>
    </form>
  )
}
