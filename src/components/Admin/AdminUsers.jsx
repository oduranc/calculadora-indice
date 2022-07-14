import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { deleteField, useStyles } from "../../constants";
import { TablePagination } from "@material-ui/core";

function AdminUsers(props) {
  //TODO: Change API endpoint and related
  //TODO: Implement Add, Edit and Delete functionalities
  //TODO: Filter and Search
  const classes = useStyles();

  const [users, setUsers] = useState([]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const userType = props.userType;
  var usersEndpoint = "";

  function createHeaders() {
    switch (userType) {
      case "Ivy":
        return (
          <>
            <TableCell align="center">ID</TableCell>
            <TableCell align="left">Nombre</TableCell>
            <TableCell align="left">Apellido</TableCell>
            <TableCell align="left">Carrera</TableCell>
            <TableCell align="center">GPA</TableCell>
            <TableCell align="left">Honor</TableCell>
            <TableCell align="center">Editar</TableCell>
            <TableCell align="center">Eliminar</TableCell>
          </>
        );
      default:
        return (
          <>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">Documento</TableCell>
            <TableCell align="left">Nombre</TableCell>
            <TableCell align="left">Apellido</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="center">Editar</TableCell>
            <TableCell align="center">Eliminar</TableCell>
          </>
        );
    }
  }

  function createRows(row) {
    switch (userType) {
      case "Ivy":
        return (
          <>
            <TableCell align="center" component="th" scope="row">
              {row.id}
            </TableCell>
            <TableCell align="left">{row.name}</TableCell>
            <TableCell align="left">{row.surname}</TableCell>
            <TableCell align="left">{row.degree}</TableCell>
            <TableCell align="center">{row.gpa}</TableCell>
            <TableCell align="left">{row.honor}</TableCell>
          </>
        );
      default:
        return (
          <>
            <TableCell align="center" component="th" scope="row">
              {row.id}
            </TableCell>
            <TableCell align="center">{row.document}</TableCell>
            <TableCell align="left">{row.name}</TableCell>
            <TableCell align="left">{row.surname}</TableCell>
            <TableCell align="left">{row.email}</TableCell>
          </>
        );
    }
  }

  switch (userType) {
    case "Ivy":
      usersEndpoint = "https://www.mecallapi.com/api/users";
      break;

    case "Walter":
      usersEndpoint = "https://www.mecallapi.com/api/users";
      break;

    case "Karn":
      usersEndpoint = "https://www.mecallapi.com/api/users";
      break;

    default:
      break;
  }

  const getUsers = async () => {
    const response = await fetch(usersEndpoint, { method: "GET" }).then(
      (response) => response.json()
    );
    setUsers(response);
  };

  useEffect(() => {
    getUsers();
    //eslint-disable-next-line
  }, []);

  function createData(id, document, name, surname, email, degree, gpa, honor) {
    switch (userType) {
      case "Ivy":
        return { id, name, surname, degree, gpa, honor };
      default:
        return { id, document, name, surname, email };
    }
  }

  var rows = users.map(function (user) {
    switch (userType) {
      case "Ivy":
        return createData(
          user.id,
          user.document,
          user.fname,
          user.lname,
          user.email,
          user.fname + user.lname,
          user.id,
          user.lname + user.fname
        );
      default:
        return createData(
          user.id,
          user.id + user.fname,
          user.fname,
          user.lname,
          user.username
        );
    }
  });

  return (
    <Grid container justifyContent="center">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" className="pb-7">
          {userType}
        </Typography>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer component={Paper}>
            <Table
              stickyHeader
              sx={{ minWidth: 650 }}
              aria-label="sticky table"
            >
              <TableHead>
                <TableRow>{createHeaders()}</TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      {createRows(row)}
                      <TableCell align="center">
                        <IconButton aria-label="delete" color="primary">
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          aria-label="delete"
                          color="secondary"
                          onClick={() => {
                            //TODO: Change API endpoint and related
                            deleteField(
                              row,
                              "https://www.mecallapi.com/api/users/delete"
                            );
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </Grid>
  );
}

export default AdminUsers;
