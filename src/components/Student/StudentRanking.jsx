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
import { useStyles } from "../../constants";

function StudentRanking() {
	//TODO: Change API endpoint and related
	const classes = useStyles();

	const [students, setStudents] = useState([]);

	const getStudents = async () => {
		const response = await fetch(
			process.env.REACT_APP_API_URL + "ranking",
			{
				method: "GET",
				headers: new Headers({
					Authorization:
						"Bearer " + localStorage.getItem("accessToken"),
				}),
			}
		).then((response) => response.json());
		setStudents(response);
	};

	useEffect(() => {
		getStudents();
	}, []);

	function createData(id, name, surname, degree, gpa) {
		return { id, name, surname, degree, gpa };
	}

	var rows = students.map(function (student) {
		return createData(
			student.id,
			student.user.names,
			student.user.surnames,
			student.programCode + student.programYear,
			student.gpa
		);
	});

	return (
		<Grid container justifyContent='center'>
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component='h1' variant='h5' className='pb-7'>
					Top 10 Índices de la Aplicación
				</Typography>
				<Paper sx={{ width: "100%", overflow: "hidden" }}>
					<TableContainer component={Paper}>
						<Table
							stickyHeader
							sx={{ minWidth: 650 }}
							aria-label='sticky table'
						>
							<TableHead>
								<TableRow>
									<TableCell align='center'>ID</TableCell>
									<TableCell align='left'>Nombre</TableCell>
									<TableCell align='left'>Apellido</TableCell>
									<TableCell align='left'>Carrera</TableCell>
									<TableCell align='center'>GPA</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{rows.map((row) => (
									<TableRow
										key={row.id}
										sx={{
											"&:last-child td, &:last-child th":
												{ border: 0 },
										}}
									>
										<TableCell
											align='center'
											component='th'
											scope='row'
										>
											{row.id}
										</TableCell>
										<TableCell align='left'>
											{row.name}
										</TableCell>
										<TableCell align='left'>
											{row.surname}
										</TableCell>
										<TableCell align='left'>
											{row.degree}
										</TableCell>
										<TableCell align='center'>
											{row.gpa}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Paper>
			</div>
		</Grid>
	);
}

export default StudentRanking;
