import { makeStyles } from '@material-ui/core/styles';
import swal from 'sweetalert';

export const useStyles = makeStyles((theme) => ({
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: '#35CE8D',
      '&:hover': {
        backgroundColor: '#23895E',
      },
      color: '#fff',
    },
}));

export function deleteField(row, url, token) {
  swal({
    title: "¿Seguro que desea eliminar?",
    text: row.id + '',
    icon: "warning",
    buttons: [true, true],
    dangerMode: true
  }).then(async(willDelete) => {
    if (willDelete) {
      const id = row.id;
      const response = await deleteFromApi({id}, url + row.id, token)
      console.log(response['status']);
      if (response['status'] === 'ok') {
        swal({title: "Se ha borrado el campo con éxito.", icon: "success"});
      } else {
        swal({title: "Error al borrar el campo.", icon: "error"})
      }
    } else {
      swal("No se ha borrado el campo.");
    }
  });
}

async function deleteFromApi(id, url, token) {
  return fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
  })
    .then(res => res.json())
}