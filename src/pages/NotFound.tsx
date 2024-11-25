import { Link } from "react-router-dom";
import image from "../assets/images/404.jpg";

const NotFound = () => {
  return (
    <div className="notFound">
      <div>
        <img src={image} alt="" />
        <Link to="/" className="">
          Back To Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
