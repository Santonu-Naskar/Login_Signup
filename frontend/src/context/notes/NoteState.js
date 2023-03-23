import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState= (props)=>{
    const inotes=[]
      const [notes,setnotes]=useState(inotes);
      const Getnote= async ()=>{
        //api call
        const response = await fetch(`http://localhost:5000/notes/fetchallnotes`, {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
        });
        const json=await response.json(); // parses JSON response into native JavaScript objects
        
        console.log(json);
        setnotes(json)
      }

      //Add Notes
      const Addnote= async (title,description,tag)=>{
        //api call
        const response = await fetch(`http://localhost:5000/notes/addnotes`, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
          body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
        });
        const json= response.json(); // parses JSON response into native JavaScript objects
        
        console.log('add')
        const note={
          "_id": "641497a339876c0213230813a54",
          "user": "6410a72d36445490a4615e97",
          "title": title,
          "description": description,
          "tag": "general",
          "date": "2023-03-17T16:38:59.736Z",
          "__v": 0
        };
        setnotes(notes.concat(note));
      }
      //delete Notes
      const Deletenote= async (id)=>{
        // api call
        const response = await fetch(`http://localhost:5000/notes/deletenote/${id}`, {
          method: "DELETE", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
        });
        const json= response.json(); // parses JSON response into native JavaScript objects
        
        const newNotes=notes.filter((note)=>{return note._id!==id})
        setnotes(newNotes);
      }
      // Edit notes
      const Editnote= async (id,title,description,tag)=>{
        // api call
        const response = await fetch(`http://localhost:5000/notes/updatenote/${id}`, {
          method: "PUT", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
          body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
        });
        const json= response.json(); // parses JSON response into native JavaScript objects
        
        for (let i = 0; i < notes.length; i++) {
          const element = notes[i];
          if(element._id===id){
            element.title=title;
            element.description=description;
            element.tag=tag;
          }
        }
      }

    return(
        <NoteContext.Provider value={{notes,Addnote,Deletenote,Editnote,Getnote}} >
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;