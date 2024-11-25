import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { server } from "../redux/store";
import { CartItemsType } from "../types/types";

type cartItemsProps = {
  cartItem: CartItemsType;
  incrementHandler: (cartItem: CartItemsType) => void;
  decrementHandler: (cartItem: CartItemsType) => void;
  removeHandler: (productId: string) => void;
};

const CartItem = ({
  cartItem,
  incrementHandler,
  decrementHandler,
  removeHandler,
}: cartItemsProps) => {
  const { productId, photo, name, quantity, price } = cartItem;
  return (
    <div className="cartItem">
      <img src={`${server}/${photo}`} alt={name} />
      <article>
        <Link to={`/product/${productId}`}>{name}</Link>
        <span>₹{price}</span>
      </article>

      <div>
        <button onClick={() => decrementHandler(cartItem)}>-</button>
        <p>{quantity}</p>
        <button onClick={() => incrementHandler(cartItem)}>+</button>
      </div>
      <button onClick={() => removeHandler(productId)}>
        <FaTrash />
      </button>
    </div>
  );
};

export default CartItem;
