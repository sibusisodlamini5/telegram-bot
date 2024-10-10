import './cart.css';
import Button from '../button/button';
import { totalPrice } from '../../units/total-price';
export const numberOfTickets=1;

const Cart = ({cartItems, onCheckout}) => {
    numberOfTickets = totalPrice(cartItems)/2.5;      
    
    return <div className='cart__container'>
        <p>
            Total price:{' '}
            {totalPrice(cartItems).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
            })}
        </p>        
        <Button 
            title={`Finalize ${numberOfTickets.toFixed(0)} tickets`}             
            type={'checkout'}
            onClick={onCheckout}
        />     
    </div>;
};

export default Cart;