import React, { ChangeEvent, useState } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useSelector } from "react-redux";
import { UserInitialReducer } from "../../../types/reducerTypes";
import { useCreateProductMutation } from "../../../redux/api/productApi";
import toast from "react-hot-toast";
import { responseToast } from "../../../utils/feature";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const { user } = useSelector(
    (state: { userReducer: UserInitialReducer }) => state.userReducer
  );

  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>();
  const [stock, setStock] = useState<number>();
  const [category, setCategory] = useState<string>();
  const [photoPrev, setPhotoPrev] = useState<string>("");
  const [photo, setPhoto] = useState<File>();

  const [newProduct] = useCreateProductMutation();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !price || !stock || !photo) {
      toast.error("Please fill all fields");
    }

    const formData = new FormData();

    formData.set("name", name);
    formData.set("price", price?.toString());
    formData.set("stock", stock?.toString());
    formData.set("category", category?.toString());
    formData.set("photo", photo);

    const res = await newProduct({ id: user?._id, formData });

    responseToast(res, navigate, "/admin/products");
  };

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") setPhotoPrev(reader.result);
        setPhoto(file);
      };
    }
  };

  // const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
  //   const file: File | undefined = e.target.files?.[0];

  //   const reader: FileReader = new FileReader();

  //   if (file) {
  //     reader.readAsDataURL(file);
  //     reader.onloadend = () => {
  //       if (typeof reader.result === "string") {
  //         setPhotoPrev(reader.result);
  //         setPhoto(reader.result);
  //       }
  //     };
  //   }
  // };

  return (
    <>
      <div className="adminContainer">
        <AdminSidebar />
        <main className="productMangement">
          <article>
            <form onSubmit={submitHandler}>
              <h2>New Product</h2>
              <div>
                <label htmlFor="">Name</label>
                <input
                  required
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="">Price</label>
                <input
                  required
                  type="number"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
              </div>
              <div>
                <label htmlFor="">Stock</label>
                <input
                  required
                  type="number"
                  placeholder="Stock"
                  value={stock}
                  onChange={(e) => setStock(Number(e.target.value))}
                />
              </div>
              <div>
                <label htmlFor="">Category</label>
                <input
                  required
                  type="text"
                  placeholder="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="">Photo</label>
                <input required type="file" onChange={changeImageHandler} />
              </div>
              {photoPrev && <img src={photoPrev} alt={name} />}

              <button type="submit">Create Product</button>
            </form>
          </article>
        </main>
      </div>
    </>
  );
};

export default NewProduct;
