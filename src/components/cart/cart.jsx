import './cart.css';
import Button from '../button/button';
import { totalPrice } from '../../units/total-price';

const Cart = ({cartItems, onCheckout}) => {
    const numberOfTickets = totalPrice(cartItems)/2;      
    
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