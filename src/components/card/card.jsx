import { useState } from 'react';
import Button from '../button/button';
import './card.css';

const Card = (props) => {

    const [count, setCount] = useState(0);    
    const { ticket, onAddItem, onRemoveItem} = props;
    
    const handleIncrement = () => {
        setCount(prev => prev + 1);
        onAddItem(ticket);
    };

    const handleDecrement = () => {
        setCount(prev => prev - 1);
        onRemoveItem(ticket);
    };

    return <div className='card'>
        <span className={`${count != 0 ? 'card__badge': 'card__badge-hidden'}`}>
            {count}
        </span>

        <div className='image__container'>
            
            <img 
                src={ticket.Image} 
                alt={ticket.title} 
                width='100%' 
                height='230px'
            />
        </div>

        <div className='card__body'>
            <h2 className='card__title'>{ticket.title}</h2>
            <div className='card__price'>
                {ticket.price.toLocaleString('en-US', {
                    style : 'currency',
                    currency: 'USD'
                    })}
            </div>
        </div>

        <div className='line'></div>

        <div className='btn__container'>
            {count != 0 &&(
                <Button 
                title={'-'} 
                onClick={handleDecrement}
                type={'remove'}
            />
            )}
            <Button 
                title={'+'}
                onClick={handleIncrement} 
                type={'add'}
            />
        </div>
    </div>;
};

export default Card;