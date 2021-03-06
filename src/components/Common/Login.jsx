import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import swal from "sweetalert";
import { useStyles } from "../../constants";

async function loginUser(credentials) {
  return fetch(process.env.REACT_APP_API_URL + "auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

async function getUser(id) {
  return fetch(process.env.REACT_APP_API_URL + "users/" + id, {
    method: "GET",
    headers: new Headers({
      "Authorization": "Bearer " + localStorage.getItem("accessToken"),
    })
  }).then((response) => response.json());
}

async function getStudent(id) {
  return fetch(process.env.REACT_APP_API_URL + "students/" + id, {
    method: "GET",
    headers: new Headers({
      "Authorization": "Bearer " + localStorage.getItem("accessToken"),
    })
  }).then((response) => response.json());
}

function Login() {
  const classes = useStyles();
  const [id, setId] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser({
      id,
      password,
    });
    if ("access_token" in response) {
      swal({
        title: "Bienvenido",
        icon: "success",
        buttons: false,
        timer: 2000,
      }).then(async (value) => {
        localStorage.setItem("accessToken", response["access_token"]);
        const user = await getUser(id);
        const student = await getStudent(id);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("student", JSON.stringify(student));
        console.log(localStorage.getItem("user"));
        window.location.href = "/profile";
      });
    } else {
      swal({title: "Error", content: "Credenciales incorrectas", icon: "error"});
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
            id="userId"
            name="userId"
            label="ID"
            autoComplete="false"
            onChange={(e) => setId(parseInt(e.target.value))}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            name="password"
            label="Contrase??a"
            type="password"
            autoComplete="false"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            Iniciar Sesi??n
          </Button>
        </form>
      </div>
    </Grid>
  );
}

export default Login;