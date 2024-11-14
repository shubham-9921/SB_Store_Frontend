import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const addToCartHandler = () => {};
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
          <ProductCard
            productId="123"
            name="Macbook"
            price={1000}
            stock={10}
            photo="https://images.pexels.com/photos/159886/pexels-photo-159886.jpeg?auto=compress&cs=tinysrgb&w=600"
            handler={addToCartHandler}
          />
        </main>
      </div>
    </>
  );
};

export default Home;
