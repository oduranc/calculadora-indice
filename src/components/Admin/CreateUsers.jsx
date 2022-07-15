import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import swal from "sweetalert";
import { useStyles } from "../../constants";

const token = localStorage.getItem("accessToken");

async function CreateUser(credentials) {
  return fetch(process.env.REACT_APP_API_URL + "auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

function CreateUsers(props) {
  const classes = useStyles();
  const [names, setNames] = useState();
  const [surnames, setSurnames] = useState();
  const [documento, setDocument] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [role, setRole] = useState();
  const [programCode, setProgramCode] = useState();
  const [programYear, setProgramYear] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await CreateUser({
      names,
      surnames,
      documento,
      password,
      email,
      role,
      programCode,
      programYear,
    });
    if (response["msg"] === "User created.") {
      swal({
        title: "Éxito",
        content: "Se ha creado el usuario con ID " + response["id"],
        icon: "success",
        buttons: true,
      });
    } else {
      swal({ title: "Error", content: response["msg"], icon: "error" });
    }
  };

  function CreateTextfields() {
    setRole(props.userType)
    if (props.userType === "Student") {
      return (
        <>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="programCode"
            name="programCode"
            label="Programa"
            autoComplete="false"
            onChange={(e) => setProgramCode(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="programYear"
            name="programYear"
            label="Año del Programa"
            autoComplete="false"
            onChange={(e) => setProgramYear(parseInt(e.target.value))}
          />
        </>
      );
    }
  }

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
            onChange={(e) => setNames(e.target.value)}
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
            onChange={(e) => setSurnames(e.target.value)}
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
            onChange={(e) => setDocument(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            name="email"
            label="Email"
            autoComplete="false"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            name="password"
            label="Contraseña"
            type="password"
            autoComplete="false"
            onChange={(e) => setPassword(e.target.value)}
          />
          {CreateTextfields()}
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

export default CreateUsers;
