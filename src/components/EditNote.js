import React from "react";
import { useState } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function EditNote(props) {
  const [title, setTitle] = useState(props.Title);
  const [body, setBody] = useState(props.Body);

  const handleSubmit = () => {
    const data = { title, body };

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };

    axios
      .patch(`/api/private/notes/${props.NID}`, data, config)
      .then(console.log)
      .catch(console.log);

    window.location.reload();
  };

  return (
    <div>
      <h2 id="transition-modal-title">Editar Nota</h2>
      <form>
        <TextField
          id="title"
          label="Título"
          fullWidth 
          defaultValue={props.Title}
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
          defaultValue={props.Body}
          variant="outlined"
          onChange={(event) => {
            setBody(event.target.value);
          }}
        />
        <br />
        <br />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Guardar Cambios
        </Button>
      </form>
    </div>
  );
}
