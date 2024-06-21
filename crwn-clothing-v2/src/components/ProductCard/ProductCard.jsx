import { useDispatch, useSelector } from 'react-redux';

import { selectCartItems } from '../../store/cart/cartSelector';
import { addItemToCart } from '../../store/cart/cartAction';

import Button, {BUTTON_TYPE_CLASSES} from '../Button/Button'

import './ProductCard.scss'

const ProductCard = ({product}) => {
    const dispatch = useDispatch()
    const {name, price, imageUrl } = product;
    const cartItems = useSelector(selectCartItems)
    //const {addItemToCart} = useContext(CartContext)

    const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

    return(
        <div className='product-card-container'>
            <img src={imageUrl} alt={`${name}`} />
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add to card</Button>
        </div>

    );    
}

export default ProductCard;