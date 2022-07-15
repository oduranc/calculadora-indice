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
import { useStyles, deleteField } from "../../constants";
import { Button, TablePagination } from "@material-ui/core";

function StudentSubjects() {
	//TODO: Implement Add, Edit and Delete functionalities
	//TODO: Filter and Search
	const classes = useStyles();

	const [subjects, setSubjects] = useState([]);

	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const getSubjects = async ({ userId }) => {
		const response = await fetch(
			process.env.REACT_APP_API_URL + "students/section",
			{
				method: "GET",
				headers: new Headers({
					Authorization:
						"Bearer " + localStorage.getItem("accessToken"),
				}),
				body: JSON.stringify({ userId }),
			}
		).then((response) => response.json());
		setSubjects(response);
	};

	useEffect(() => {
		getSubjects({ userId: localStorage.getItem("user")["id"] });
	}, []);

	function createData(code, name, credits, trimester) {
		return { code, name, credits, trimester };
	}

	var rows = subjects.map(function (subject) {
		return createData(
			subject.code,
			subject.name,
			subject.credits,
			subject.trimester
		);
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		window.location.href = "/admin/subjects/create";
	};

	return (
		<Grid container justifyContent='center'>
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component='h1' variant='h5' className='pb-7'>
					Asignaturas
				</Typography>
				<form noValidate onSubmit={handleSubmit}>
					<Button
						type='submit'
						variant='contained'
						className={classes.submit}
					>
						Añadir
					</Button>
				</form>
				<Paper sx={{ width: "100%", overflow: "hidden" }}>
					<TableContainer component={Paper}>
						<Table
							stickyHeader
							sx={{ minWidth: 650 }}
							aria-label='sticky table'
						>
							<TableHead>
								<TableRow>
									<TableCell align='center'>
										Trimestre
									</TableCell>
									<TableCell align='center'>Código</TableCell>
									<TableCell align='left'>
										Asignatura
									</TableCell>
									<TableCell align='center'>
										Créditos
									</TableCell>
									<TableCell align='center'>Editar</TableCell>
									<TableCell align='center'>
										Eliminar
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{rows
									.slice(
										page * rowsPerPage,
										page * rowsPerPage + rowsPerPage
									)
									.map((row) => (
										<TableRow
											key={row.code}
											sx={{
												"&:last-child td, &:last-child th":
													{ border: 0 },
											}}
										>
											<TableCell align='center'>
												{row.trimester}
											</TableCell>
											<TableCell
												align='center'
												component='th'
												scope='row'
											>
												{row.code}
											</TableCell>
											<TableCell align='left'>
												{row.name}
											</TableCell>
											<TableCell align='center'>
												{row.credits}
											</TableCell>
											<TableCell align='center'>
												<IconButton
													aria-label='delete'
													color='primary'
												>
													<EditIcon />
												</IconButton>
											</TableCell>
											<TableCell align='center'>
												<IconButton
													aria-label='delete'
													color='secondary'
													onClick={() => {
														//TODO: Change API endpoint and related
														deleteField(row, "");
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
						component='div'
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

export default StudentSubjects;
