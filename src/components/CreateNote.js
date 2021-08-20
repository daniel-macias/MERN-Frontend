import React from "react";
import { useState } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function CreateNote() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = () => {
    console.log(title);
    console.log(body);
    

    const data = {title,body};
      

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      }
    };
    console.log(config);

    axios.post("/api/private/notes", data, config)
    .then(console.log).catch(console.log);

    window.location.reload();
  };

  return (
    <div>
      <h2 id="transition-modal-title">Crear nota nueva</h2>
      <form>
        <TextField
          id="title"
          label="Título"
          fullWidth 
          defaultValue=""
          variant="outlined"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <br />
        <br />
        <TextField
          id="body"
          label="Cuerpo"
          fullWidth 
          multiline
          rows={6}
          defaultValue=""
          variant="outlined"
          onChange={(event) => {
            setBody(event.target.value);
          }}
        />
        <br />
        <br />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Crear nota
        </Button>
      </form>
    </div>
  );
}
