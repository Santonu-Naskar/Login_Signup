import React, { useContext, useEffect, useRef,useNavigate } from 'react'
import NoteContext from '../context/notes/NoteContext'
import NoteItem from './NoteItem';

const Notes = () => {
  const navigate=useNavigate()
  const context = useContext(NoteContext);
  const { notes, Getnote } = context;
  const ref= useRef(null)
  useEffect(() => {
    if(localStorage.getItem('token')){
      Getnote();
    }
    else{
      navigate('/login')
    }  
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              ...
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
      <h2>Your Notes</h2>
      <div className='row my-3'>
        <h2>Your Notes</h2>
        {notes.map((note) => {
          return <NoteItem key={note._id} update note={note} />
        })}
      </div>
    </>
  )
}

export default Notes;