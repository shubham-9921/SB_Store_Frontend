import React, { useState } from "react";
import ProductCard from "../components/ProductCard";

const Search = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [page, setPage] = useState(1);
  // const [isNextPage, setIsNextPage] = useState(false);

  const isNextPage = page < 4;
  const isPrevPage = page > 1;

  const addToCartHandler = () => {};

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
            <option selected> All</option>
            <option value="camera"> Camera </option>
            <option value="laptop">Laptop</option>
            <option value="mobile">Mobile</option>
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
          <ProductCard
            productId="123"
            name="Macbook"
            price={1000}
            stock={10}
            photo="https://images.pexels.com/photos/159886/pexels-photo-159886.jpeg?auto=compress&cs=tinysrgb&w=600"
            handler={addToCartHandler}
          />
          <ProductCard
            productId="123"
            name="Macbook"
            price={1000}
            stock={10}
            photo="https://images.pexels.com/photos/159886/pexels-photo-159886.jpeg?auto=compress&cs=tinysrgb&w=600"
            handler={addToCartHandler}
          />
          <ProductCard
            productId="123"
            name="Macbook"
            price={1000}
            stock={10}
            photo="https://images.pexels.com/photos/159886/pexels-photo-159886.jpeg?auto=compress&cs=tinysrgb&w=600"
            handler={addToCartHandler}
          />
          <ProductCard
            productId="123"
            name="Macbook"
            price={1000}
            stock={10}
            photo="https://images.pexels.com/photos/159886/pexels-photo-159886.jpeg?auto=compress&cs=tinysrgb&w=600"
            handler={addToCartHandler}
          />
          <ProductCard
            productId="123"
            name="Macbook"
            price={1000}
            stock={10}
            photo="https://images.pexels.com/photos/159886/pexels-photo-159886.jpeg?auto=compress&cs=tinysrgb&w=600"
            handler={addToCartHandler}
          />
          <ProductCard
            productId="123"
            name="Macbook"
            price={1000}
            stock={10}
            photo="https://images.pexels.com/photos/159886/pexels-photo-159886.jpeg?auto=compress&cs=tinysrgb&w=600"
            handler={addToCartHandler}
          />
          <ProductCard
            productId="123"
            name="Macbook"
            price={1000}
            stock={10}
            photo="https://images.pexels.com/photos/159886/pexels-photo-159886.jpeg?auto=compress&cs=tinysrgb&w=600"
            handler={addToCartHandler}
          />
          <ProductCard
            productId="123"
            name="Macbook"
            price={1000}
            stock={10}
            photo="https://images.pexels.com/photos/159886/pexels-photo-159886.jpeg?auto=compress&cs=tinysrgb&w=600"
            handler={addToCartHandler}
          />
          <ProductCard
            productId="123"
            name="Macbook"
            price={1000}
            stock={10}
            photo="https://images.pexels.com/photos/159886/pexels-photo-159886.jpeg?auto=compress&cs=tinysrgb&w=600"
            handler={addToCartHandler}
          />
          <ProductCard
            productId="123"
            name="Macbook"
            price={1000}
            stock={10}
            photo="https://images.pexels.com/photos/159886/pexels-photo-159886.jpeg?auto=compress&cs=tinysrgb&w=600"
            handler={addToCartHandler}
          />
          <ProductCard
            productId="123"
            name="Macbook"
            price={1000}
            stock={10}
            photo="https://images.pexels.com/photos/159886/pexels-photo-159886.jpeg?auto=compress&cs=tinysrgb&w=600"
            handler={addToCartHandler}
          />
          <ProductCard
            productId="123"
            name="Macbook"
            price={1000}
            stock={10}
            photo="https://images.pexels.com/photos/159886/pexels-photo-159886.jpeg?auto=compress&cs=tinysrgb&w=600"
            handler={addToCartHandler}
          />
        </div>

        <article>
          <button
            disabled={!isPrevPage}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Prev
          </button>
          <span>
            {page} of {4}
          </span>
          <button
            disabled={!isNextPage}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </button>
        </article>
      </main>
    </div>
  );
};

export default Search;
