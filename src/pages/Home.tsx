import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { SkeletonLoader } from "../components/Loader";
import ProductCard from "../components/ProductCard";
import { useLatestProductsQuery } from "../redux/api/productApi";
import { addToCart } from "../redux/reducer/cartReducer";
import { CartItemsType } from "../types/types";

const Home = () => {
  const dispatch = useDispatch();

  const addToCartHandler = (cartItem: CartItemsType) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock !");
    dispatch(addToCart(cartItem));
    toast.success("Product Added to Cart");
  };

  const { data, isLoading } = useLatestProductsQuery("");

  // if (isError) toast.error("Canno get Product");
  return (
    <>
      <div className="home">
        <section></section>

        <h1>
          Latest Product{" "}
          <Link className="findMore" to={"/search"}>
            More
          </Link>
        </h1>

        <main>
          {isLoading ? (
            <SkeletonLoader length={20} width="80vw" />
          ) : (
            data?.products.map((p) => (
              <ProductCard
                key={p._id}
                productId={p._id}
                name={p.name}
                price={p.price}
                stock={p.stock}
                photo={p.photo}
                handler={addToCartHandler}
              />
            ))
          )}
        </main>
      </div>
    </>
  );
};

export default Home;
