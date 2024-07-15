import { useContext } from 'react';
import { FireStoreDataContext } from '../../context/FireStoreDataContext';
  import './auctionCard.css'








export const AuctionCard = ({ items, UpdateById }) => {

  const formateador = new Intl.DateTimeFormat("es-MX", { dateStyle: 'long', timeStyle: 'short' });
   
  const milisegundosComoFecha = (milisegundos) => {
      return formateador.format(new Date(milisegundos));
  }; 



  const { deleteById, setToggle, toggle } = useContext(FireStoreDataContext);



  const handleToggle =(id, el)=>{

        const obj = el

        obj.takenByCustomer = false

        UpdateById(id, obj)

        setToggle(!toggle)
  }

     return (
        <div className='card p-2'>
            <h3 className='text-white'>ORDENES DE HERMOSILLO</h3>
            {items.filter((el) => el.city === "hermosillo")
                .map((el, i) => (

                    <div key={i} className="item">

                        <hr />

                        <div className="texto">
                            <h3>Comprador: {el.buyer.name}</h3>

                            {el.items.map((el, i) => (
                                <b>Producto ID: {el.id} <br /><br /></b>
                            ))}

                            <p>Correo: {el.buyer.email}</p>
                            <p>Celular: {el.buyer.phone}</p>
                            <p>Ciudad: {el.city}</p>
                            <p>Clave de Compra: {el.id}</p>

                            <p>
                                Fecha:{" "}
                                {new Date(el.date).toLocaleDateString("es-ES", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </p>

                            <p>Total: {el.total}</p>
                            <b>{el.takenByCustomer ? 'Entregado' : 'Pendiente'}</b>

                        </div>

                        <button className='btn btn-primary mt-2'  onClick={()=>handleToggle(el.id, el)}> 
                            {el.takenByCustomer ? 'Entregado' : 'Marcar como entregada'}
                        </button>

                        <hr />

                    </div>

                ))}
        </div>
    );
};
