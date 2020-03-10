import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CategoryCreation = ({ token }) => {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [categoryId, setCategoryId] = useState();
  const [listCategory, setListCategory] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [categorySelected, setCategorySelected] = useState();
  const [subCategorySelected, setSubCategorySelected] = useState();
  const [category, setCategory] = useState();
  const [subCategory, setSubCategory] = useState();

  console.log(listCategory);
  console.log(category);

  const [nameSub, setNameSub] = useState();
  const [descriptionSub, setDescriptionSub] = useState();

  //send category in database
  const uploadCategory = async () => {
    const data = new FormData();
    data.append("name", name);
    data.append("description", description);

    try {
      const response = await axios.post(
        // "http://localhost:3100/category/create",
        "https://le-franc-manger.herokuapp.com/category/create",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      alert("Cette catégorie a bien été enregistrée");

      console.log(response.data._id);
      setCategoryId(response.data._id);
    } catch (error) {
      console.log("erreur", error.message);
      console.log(error);
      alert("An error occured");
    }
  };

  //load categories for subCategoryCreation
  const getCategories = async () => {
    const response = await axios.get(
      "https://le-franc-manger.herokuapp.com/category"
      // "http://localhost:3100/category"
    );

    const categoryOptions = {};
    for (let i = 0; i < response.data.length; i++) {
      categoryOptions[response.data[i].name] = response.data[i]._id;
    }
    setListCategory(categoryOptions);

    setCategory(response.data[0]._id);
  };

  //send subCategory in database
  const uploadSubCategory = async () => {
    const dataSubCat = new FormData();
    dataSubCat.append("name", nameSub);
    dataSubCat.append("description", descriptionSub);

    try {
      const response = await axios.post(
        "http://localhost:3100/subCategory/create?id=" + category,
        // "https://le-franc-manger.herokuapp.com/subCategory/create?id=" + category,

        dataSubCat,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      alert("Cette sous-catégorie a bien été enregistrée");
    } catch (error) {
      console.log("erreur" + error.message);
    }
  };

  console.log(category);
  return (
    <div className="creation">
      {/* # # # # # # HEADER # # # # # # # # # # # # # # # */}
      <header>
        <h1>Création d'une catégorie ou d'une sous-catégorie</h1>
        <Link to={"/"}>Back Home</Link>
      </header>
      <hr />
      <h2>Champs * obligatoires</h2>
      {/* # # # # # # FORM CATEGORY# # # # # # # # # # # # # # # */}
      <form
        onSubmit={event => {
          event.preventDefault();
          uploadCategory();
        }}
        className="creationform"
      >
        <div>
          {/* # # # # # # NOM DE LA CATEGORIE # # # # # # # # # # # # # # # */}
          <h2>Nom de la Catégorie *</h2>
          <input
            value={name}
            type="text"
            onChange={event => {
              setName(event.target.value);
            }}
          ></input>

          {/* # # # # # # DESCRIPTION # # # # # # # # # # # # # # # */}
          <h2>Description</h2>
          <input
            value={description}
            type="text"
            className="descriptionbox"
            onChange={event => {
              setDescription(event.target.value);
            }}
          ></input>
          <input type="submit" value="Ajouter"></input>
        </div>
      </form>
      <div className="d-flex">
        <button
          onClick={() => {
            setCategorySelected(listCategory[name]);
            setCategory(listCategory[name]);
            console.log(category);
          }} //
          type="button"
          className="button"
          onClick={getCategories}
        >
          Créer une sous-catégorie
        </button>
      </div>

      {/* # # # # # # FORM SUBCATEGORY# # # # # # # # # # # # # # # */}
      <form
        onSubmit={event => {
          event.preventDefault();
          uploadSubCategory();
        }}
        className="creationform"
      >
        <div>
          {/* # # # # # # CATEGORIE DE RATTACHEMENT# # # # # # # # # # # # # # # */}
          {listCategory && (
            <>
              <h2>Catégorie de rattachement</h2>
              <select
                value={categorySelected}
                onChange={event => {
                  setCategory(listCategory[event.target.value]);
                }}
              >
                {/* Pourquoi pas category au lieu de categorySelected */}
                {Object.keys(listCategory).map((elem, index) => {
                  return (
                    <option key={index} value={elem}>
                      {elem}
                    </option>
                  );
                })}
              </select>
            </>
          )}
          {/* # # # # # # NOM DE LA SOUS CATEGORIE # # # # # # # # # # # # # # # */}
          <h2>Nom de la Sous-catégorie*</h2>
          <input
            type="text"
            value={nameSub}
            onChange={event => {
              setNameSub(event.target.value);
            }}
          ></input>
          {/* # # # # # # DESCRIPTION # # # # # # # # # # # # # # # */}
          <h2>Description</h2>
          <input
            type="text"
            value={descriptionSub}
            onChange={event => {
              setDescriptionSub(event.target.value);
            }}
          ></input>
          <input type="submit" value="Ajouter"></input>
        </div>
      </form>
    </div>
  );
};

export default CategoryCreation;
