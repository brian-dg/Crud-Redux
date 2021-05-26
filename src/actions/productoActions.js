import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR
} from '../types';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2'; 

//Crear nuevos productos 
export function crearNuevoProductoAction(producto) {
    return async (dispatch) => {
        dispatch( agregarProducto() );

        //Alerta
        Swal.fire(
            'Correcto',
            'El producto se agrego correctamente',
            'success'
        )

        try {
            //insertar en la API
            await clienteAxios.post('/productoss', producto);

            //si todo sale bien, actualizar el state
            dispatch( agregarProductoExito(producto) );

        } catch (error) {
            // si hay un error cambiar el state
            dispatch( agregarProductoError(true) ); 

            // alerta de error
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intente de nuevo'
            })
        }
    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true 
}); 

//si el producto se guarda en la base de datos 
const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto 
})

//si hubo un error 
const agregarProductoError = (estado) => ({
type: AGREGAR_PRODUCTO_ERROR,
payload: estado  
}); 