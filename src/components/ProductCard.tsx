import { FaPlus } from "react-icons/fa";

type ProductPorps = {
  productId: string;

  photo: string;
  name: string;
  price: number;
  stock: number;
  handler: () => void;
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
      <img src={`${photo}`} alt={name} />
      <p>{name}</p>
      <span> ₹{price}</span>

      <div>
        <button onClick={() => handler()}>
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
