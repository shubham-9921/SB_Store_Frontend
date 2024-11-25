import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { SkeletonLoader } from "../../../components/Loader";
import {
  useDeleteProductMutation,
  useProductdetailsQuery,
  useUpdateProductMutation,
} from "../../../redux/api/productApi";
import { server } from "../../../redux/store";
import { UserInitialReducer } from "../../../types/reducerTypes";
import { responseToast } from "../../../utils/feature";

const ProductManagement = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector(
    (state: { userReducer: UserInitialReducer }) => state.userReducer
  );

  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const { data, isLoading, isError } = useProductdetailsQuery(id!);
  const { name, price, stock, photo, category, _id } = data?.product || {
    name: "",
    price: 0,
    stock: 0,
    photo: "",
    catergory: "",
  };

  const [nameUpdate, setNameUpdate] = useState<string>(name);
  const [priceUpdate, setPriceUpdate] = useState<number>(price);
  const [stockUpdate, setStockUpdate] = useState<number>(stock);
  // const [photoUpdate, setPhotoUpdate] = useState<string>("");
  // const [photoFile, setPhotoFile] = useState<File>();
  const [photoUpdate, setPhotoUpdate] = useState<string>("");
  const [photoFile, setPhotoFile] = useState<File>();
  const [categoryUpdate, setCategoryUpdate] = useState<string>(category!);

  useEffect(() => {
    setNameUpdate(name);
    setPriceUpdate(price);
    setStockUpdate(stock);
    setPhotoFile(photoFile);
    setCategoryUpdate(category!);
  }, [data]);

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];
    const reader: FileReader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoUpdate(reader.result);
          setPhotoFile(file);
        }
      };
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    if (nameUpdate) formData.set("name", nameUpdate);
    if (priceUpdate) formData.set("price", priceUpdate.toString());
    if (stockUpdate) formData.set("stock", stockUpdate.toString());
    if (categoryUpdate) formData.set("category", categoryUpdate);
    // if (photoFile) formData.set("photo", photoFile);
    if (photoFile) formData.set("photo", photoFile);

    const res = await updateProduct({
      userId: user?._id as string,
      productId: _id!,
      formData,
    });

    responseToast(res, navigate, "/admin/products");
  };

  const handleDelete = async () => {
    confirm("Are You sure to delete");
    const res = await deleteProduct({
      userId: user?._id as string,
      productId: _id!,
    });

    responseToast(res, navigate, "/admin/products");
  };

  if (isError) return <Navigate to="/404" />;
  return (
    <>
      <div className="adminContainer">
        <AdminSidebar />
        <main className="productMangement">
          {isLoading ? (
            <SkeletonLoader length={20} />
          ) : (
            <>
              {" "}
              <section>
                <strong>ID - {_id}</strong>
                <img src={`${server}/${photo}`} alt="Prodcust" />
                <p>{name}</p>
                {stock > 0 ? (
                  <span className="green"> {stock} Available</span>
                ) : (
                  <span className="red">Not Available</span>
                )}

                <h4>${price}</h4>
              </section>
              <article>
                <MdDelete onClick={handleDelete} />
                <form onSubmit={handleSubmit}>
                  <h2>Manage Product</h2>
                  <div>
                    <label htmlFor="">Name</label>
                    <input
                      type="text"
                      placeholder="Name"
                      value={nameUpdate}
                      onChange={(e) => setNameUpdate(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="">Price</label>
                    <input
                      type="number"
                      placeholder="Price"
                      value={priceUpdate}
                      onChange={(e) => setPriceUpdate(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <label htmlFor="">Stock</label>
                    <input
                      type="number"
                      placeholder="Stock"
                      value={stockUpdate}
                      onChange={(e) => setStockUpdate(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <label htmlFor="">Category</label>
                    <input
                      type="text"
                      placeholder="Category"
                      value={categoryUpdate}
                      onChange={(e) => setCategoryUpdate(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="">Photo</label>
                    <input type="file" onChange={changeImageHandler} />
                  </div>
                  {photoUpdate && <img src={photoUpdate} alt="New Image" />}

                  <button type="submit">Update Product</button>
                </form>
              </article>
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default ProductManagement;
