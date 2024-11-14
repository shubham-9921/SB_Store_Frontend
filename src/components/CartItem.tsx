import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

type cartItemsProps = {
  cartItem: any;
};

const CartItem = ({ cartItem }: cartItemsProps) => {
  const { productId, photo, name, quantity, price, stock } = cartItem;
  return (
    <div className="cartItem">
      <img src={photo} alt={name} />
      <article>
        <Link to={`/product/${productId}`}>{name}</Link>
        <span>₹{price}</span>
      </article>

      <div>
        <button>-</button>
        <p>{quantity}</p>
        <button>+</button>
      </div>
      <button>
        <FaTrash />
      </button>
    </div>
  );
};

export default CartItem;
