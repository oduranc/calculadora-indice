import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { deleteField, useStyles } from "../../constants";
import { Button, TablePagination } from "@material-ui/core";

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

  var usersEndpoint = "";
  var userType = props.userType

  function createHeaders() {
    switch (userType) {
      case "Student":
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
      case "Student":
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
  
  usersEndpoint = process.env.REACT_APP_API_URL + "users/role/" + userType;

  const getUsers = async () => {
    const response = await fetch(usersEndpoint, {
      method: "GET",
      headers: new Headers({
        "Authorization": "Bearer " + localStorage.getItem("accessToken"),
      }),
    }).then((response) => response.json());
    setUsers(response);
  };

  useEffect(() => {
    getUsers();
    //eslint-disable-next-line
  }, []);

  function createData(id, document, name, surname, email, degree, gpa, honor) {
    switch (userType) {
      case "Student":
        return { id, name, surname, degree, gpa, honor };
      default:
        return { id, document, name, surname, email };
    }
  }

  var rows = users.map(function (user) {
    switch (userType) {
      case "Student":
        return createData(
          user.id,
          user.document,
          user.names,
          user.surnames,
          user.email,
          user.programCode,
          user.gpa,
          user.honor
        );
      default:
        return createData(
          user.id,
          user.document,
          user.names,
          user.surnames,
          user.email
        );
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    window.location.href = "/admin/" + userType + "/create";
  };

  return (
    <div>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" className="">
          {userType}
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <Button type="submit" variant="contained" className={classes.submit}>
            Añadir
          </Button>
        </form>
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
                              process.env.REACT_APP_API_URL + "users/",
                              localStorage.getItem('accessToken')
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
    </div>
  );
}

export default AdminUsers;
