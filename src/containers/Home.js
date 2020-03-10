import React from "react";
import { Link } from "react-router-dom";
import producer_pic from "../images/producer_pic.jpeg";
import product_pic from "../images/product_pic.jpeg";
import category_pic from "../images/category_pic.jpeg";

const Home = () => {
  return (
    <div className="home">
      <div>
        <Link to={"/producer_creation"}>
          <span>Ajouter un Producteur</span>
          <img src={producer_pic} alt="picure" />
        </Link>
      </div>
      <div>
        <Link to={"/product_creation"}>
          <span>Créer un produit</span>
          <img src={product_pic} alt="picure" />
        </Link>
      </div>
      <div>
        <Link to={"/category_creation"}>
          <span>Créer une Catégorie</span>
          <img src={category_pic} alt="picure" />
        </Link>
      </div>
    </div>
  );
};

export default Home;
