import { FaPlus } from "react-icons/fa";
import { server } from "../redux/store";
import { CartItemsType } from "../types/types";

type ProductPorps = {
  productId: string;

  photo: string;
  name: string;
  price: number;
  stock: number;
  handler: (cartItem: CartItemsType) => string | undefined;
};

const ProductCard = ({
  productId,
  photo,
  name,
  price,
  stock,
  handler,
}: ProductPorps) => {
  return (
    <div className="productCard">
      <img src={`${server}/${photo}`} alt={name} />
      <p>{name}</p>
      <span> ₹{price}</span>

      <div>
        <button
          onClick={() =>
            handler({ productId, photo, name, price, stock, quantity: 1 })
          }
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
