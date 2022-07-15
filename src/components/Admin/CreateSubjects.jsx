import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import swal from "sweetalert";
import { useStyles } from "../../constants";

const token = localStorage.getItem("accessToken");

async function CreateSubject(body) {
  return fetch(process.env.REACT_APP_API_URL + "subjects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(body),
  }).then((data) => data.json());
}

function CreateSubjects() {
  const classes = useStyles();
  const [code, setCode] = useState();
  const [name, setName] = useState();
  const [credits, setCredits] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await CreateSubject({
      code,
      name,
      credits,
    });
    if (response["msg"] === "User created.") {
      swal({
        title: "Éxito",
        content: "Se ha creado la asignatura con código " + response["id"],
        icon: "success",
        buttons: true,
      });
    } else {
      swal({ title: "Error", content: response["msg"], icon: "error" });
    }
  };

  return (
    <Grid container justifyContent="center">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="names"
            name="names"
            label="Nombres"
            autoComplete="false"
            onChange={(e) => setCode(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="surnames"
            name="surnames"
            label="Apellidos"
            autoComplete="false"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="document"
            name="document"
            label="Documento"
            autoComplete="false"
            onChange={(e) => setCredits(parseInt(e.target.value))}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            Agregar
          </Button>
        </form>
      </div>
    </Grid>
  );
}

export default CreateSubjects;