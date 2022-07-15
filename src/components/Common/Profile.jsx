import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import { useStyles } from "../../constants";

function RenderAditionalStudentData(user) {
  // TODO: Change example data to actual data
  if (user["role"] === "Student") {
    const student = localStorage.getItem('student');
    return (
      <>
        <Grid item>
          <Typography component="h2" variant="h6">
            Carrera: {student["programCode"]}
          </Typography>
        </Grid>
        <Grid item>
          <Typography component="h2" variant="h6">
            GPA: {student["gpa"]}
          </Typography>
        </Grid>
        <Grid item>
          <Typography component="h2" variant="h6">
            Honor: {student["honor"]}
          </Typography>
        </Grid>
      </>
    );
  }
}


function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <CssBaseline />
      <Typography component="h1" variant="h5" className="pb-14">
        Perfil
      </Typography>
      <Grid
        container
        justifyContent="center"
        spacing={8}
        alignItems="center"
        direction="row"
      >
        <Grid item md={3} xs={5}>
          <img
            src="https://icon-library.com/images/profile-png-icon/profile-png-icon-2.jpg"
            alt=""
          />
        </Grid>
        {/* TODO: Change example data to actual data */}
        <Grid item xs={"auto"}>
          <Grid item>
            <Typography component="h2" variant="h6">
              ID: {user["id"]}
            </Typography>
          </Grid>
          <Grid item>
            <Typography component="h2" variant="h6">
              Documento: {user["document"]}
            </Typography>
          </Grid>
          <Grid item>
            <Typography component="h2" variant="h6">
              Nombre: {user["names"]} {user["surnames"]}
            </Typography>
          </Grid>
          <Grid item>
            <Typography component="h2" variant="h6">
              Rol: {user["role"]}
            </Typography>
          </Grid>
          <Grid item>
            <Typography component="h2" variant="h6">
              Email: {user["email"]}
            </Typography>
          </Grid>
          {RenderAditionalStudentData(user)}
          <Grid item>
            {/* TODO: Add functionality to Change Password */}
            <Button fullWidth variant="contained" className={classes.submit}>
              Cambiar Contraseña
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Profile;
