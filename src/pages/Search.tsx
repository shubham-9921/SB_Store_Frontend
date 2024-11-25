import { useState } from "react";
import toast from "react-hot-toast";
import { SkeletonLoader } from "../components/Loader";
import ProductCard from "../components/ProductCard";
import {
  useCategoriesQuery,
  useSearchProducstsQuery,
} from "../redux/api/productApi";
import { CustomError } from "../types/apiTypes";
import { CartItemsType } from "../types/types";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/cartReducer";

const Search = () => {
  const {
    data: categories,
    isLoading: categoryLoading,
    error,
    isError,
  } = useCategoriesQuery("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [page, setPage] = useState(1);
  // const [isNextPage, setIsNextPage] = useState(false);

  const {
    data: searchedData,
    isLoading: productLoading,
    isError: isProductError,
    error: productError,
  } = useSearchProducstsQuery({
    search,
    sort,
    price: maxPrice,
    page,
    category,
  });
  const totalPages = searchedData?.totalPages;

  const isNextPage = page < totalPages!;
  const isPrevPage = page > 1;
  const dispatch = useDispatch();

  const addToCartHandler = (cartItem: CartItemsType) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock !");
    dispatch(addToCart(cartItem));
    toast.success("Product Added to Cart");
  };

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }
  if (isProductError) {
    const err = productError as CustomError;
    toast.error(err.data.message);
  }

  return (
    <div className="productSearchPage">
      <aside>
        <h2>Filters</h2>

        <div>
          <h4>Sort</h4>
          <select
            name=""
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            id=""
          >
            <option selected> None</option>
            <option value="asc"> Price (Low to High)</option>
            <option value="dsc"> Price (High to Low)</option>
          </select>
        </div>
        <div>
          <h4>Max Price : {maxPrice || ""}</h4>
          <input
            type="range"
            name=""
            min={100}
            max={100000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(+e.target.value)}
            id=""
          />
        </div>

        <div>
          <h4>Category</h4>
          <select
            name=""
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            id=""
          >
            <option selected value="">
              {" "}
              All
            </option>

            {!categoryLoading &&
              categories?.category.map((c) => (
                <option key={c} value={c}>
                  {" "}
                  {c.toUpperCase()}{" "}
                </option>
              ))}
          </select>
        </div>
      </aside>

      <main>
        <h1>Products</h1>
        <input
          type="text"
          placeholder="Search by Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="searchProductLis">
          {productLoading ? (
            <SkeletonLoader length={10} />
          ) : (
            searchedData &&
            searchedData?.products.map((p) => (
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
        </div>

        {searchedData && searchedData?.totalPages > 1 && (
          <article>
            <button
              disabled={!isPrevPage}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Prev
            </button>
            <span>
              {page} of {searchedData.totalPages}
            </span>
            <button
              disabled={!isNextPage}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </button>
          </article>
        )}
      </main>
    </div>
  );
};

export default Search;
