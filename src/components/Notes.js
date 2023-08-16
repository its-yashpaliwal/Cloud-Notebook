import React, { useContext, useEffect,useRef } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem'
import AddNote from './AddNote'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const Notes = () => {
    let history = useHistory();
    const context = useContext(noteContext)
    const { notes, addNote, getNotes } = context
    useEffect(() => {
        console.log(localStorage.getItem('token'))
        if(localStorage.getItem('token'))
        {
            getNotes();
        }
        else{
            history.push("/login");
        }
        
        
    }, [])
    const ref = useRef(null)
    const updateNote = (note) => {
        console.log("clicked")
        ref.current.click();
    }
   
    return (
        <>
            <AddNote></AddNote>
            <button  ref={ref} type="button"  class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
                </button>
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            ...
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2>Your notes</h2>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} note={note}></Noteitem>
                })}
            </div>
        </>
    )
}

export default Notes