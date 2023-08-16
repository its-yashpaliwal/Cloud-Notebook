import react, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState= (props)=>{
    const host = "http://localhost:8000"
    
    
        const notesInitital = []
        const [notes, setNotes] = useState(notesInitital);

        //get all note
        const getNotes = async() =>{
            //TODO: API CALL
            const response = await fetch(`${host}/api/notes/fetchallnotes`, {
                method: "GET", // *GET, POST, PUT, DELETE, etc.
               
                headers: {
                  "Content-Type": "application/json",
                  "auth-token": localStorage.getItem('token')
               
                }
               
                
              });
              const json = await response.json()
              console.log(json)
              setNotes(json);
               


            
        }

        //Add a note
        const addNote = async(title,description,tag) =>{
            //TODO: API CALL
            const response = await fetch(`${host}/api/notes/addnote`, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
               
                headers: {
                  "Content-Type": "application/json",
                  "auth-token": localStorage.getItem('token')
               
                },
               
                body: JSON.stringify({title,description,tag})
              });
               const json= await response.json();


            console.log("Adding a new Note");
            const note = json 
            setNotes(notes.concat(note));

        }
        // Delete a note
        const deleteNote = async (id) =>{
             //TODO: API CALL
             const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
                method: "DELETE", // *GET, POST, PUT, DELETE, etc.
               
                headers: {
                  "Content-Type": "application/json",
                  "auth-token": localStorage.getItem('token')
               
                }
               
               
              });
              const json = response.json(); 
              console.log(json);
            console.log("delete node "+id);
            const newNotes = notes.filter((note)=>{ return note._id!==id})
            setNotes(newNotes);
        }

        //Edit a note
        const editNote = async (id,title,description,tag) =>{
            //TODO: API CALL
           
            const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
               
                headers: {
                  "Content-Type": "application/json",
                  "auth-token": localStorage.getItem('token')
               
                },
               
                body: JSON.stringify({title,description,tag})
              });
              const json = response.json(); 
            
            for (let index = 0; index < notes.length; index++) {
                const element = notes[index];
                if(element._id===id)
                {
                    element.title=title;
                    element.description=description;
                    element.tag=tag;
                }
                
            }
        }

    
    
    return (
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState; 