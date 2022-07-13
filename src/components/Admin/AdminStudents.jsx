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

function AdminStudents() {
  //TODO: Change API endpoint and related
  //TODO: Implement Add, Edit and Delete functionalities
  //TODO: Filter and Search
  const classes = useStyles();

  const [students, setStudents] = useState([]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const studentsEndpoint = "https://www.mecallapi.com/api/users";

  const getStudents = async () => {
    const response = await fetch(studentsEndpoint, { method: "GET" }).then(
      (response) => response.json()
    );
    setStudents(response);
  };

  useEffect(() => {
    getStudents();
  }, []);

  function createData(id, name, surname, degree, gpa, honor) {
    return { id, name, surname, degree, gpa, honor };
  }

  var rows = students.map(function (student) {
    return createData(
      student.id,
      student.fname,
      student.lname,
      student.fname + student.lname,
      student.id,
      student.lname + student.fname
    );
  });

  return (
    <Grid container justifyContent="center">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" className="pb-7">
          Estudiantes
        </Typography>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer component={Paper}>
            <Table
              stickyHeader
              sx={{ minWidth: 650 }}
              aria-label="sticky table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="center">ID</TableCell>
                  <TableCell align="left">Nombre</TableCell>
                  <TableCell align="left">Apellido</TableCell>
                  <TableCell align="left">Carrera</TableCell>
                  <TableCell align="center">GPA</TableCell>
                  <TableCell align="left">Honor</TableCell>
                  <TableCell align="center">Editar</TableCell>
                  <TableCell align="center">Eliminar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center" component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">{row.surname}</TableCell>
                      <TableCell align="left">{row.degree}</TableCell>
                      <TableCell align="center">{row.gpa}</TableCell>
                      <TableCell align="left">{row.honor}</TableCell>
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
                            deleteField(row, 'https://www.mecallapi.com/api/users/delete');
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

export default AdminStudents;
