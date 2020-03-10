import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductCreation = ({ token }) => {
  // chargement des catégories et sous catégories dans le formulaire
  // const [subCategoryToSubmit, setSubCategoryToSubmit] = useState(); // Sert à quoi?? a rien, il y a dedans le tableau complet de la réponse avec des objets dont on veut la clé name
  const [listCategory, setListCategory] = useState();
  const [listSubCategory, setListSubCategory] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // chargement des catégories
  useEffect(() => {
    const fetchData = async url => {
      const response = await axios.get(
        "https://le-franc-manger.herokuapp.com/category"
        // "http://localhost:3100/category"
      );

      // setCategoryToSubmit(response.data);

      const categoryOptions = {};
      for (let i = 0; i < response.data.length; i++) {
        categoryOptions[response.data[i].name] = response.data[i]._id;
      }
      setCategory(response.data[0]._id); // Permet de charger par défaut la catégorie qui apparait dans le menu au cas ou le user ne clique jamais dessus (ne set pas lui-même la catégorie)
      setListCategory(categoryOptions);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async url => {
      const response = await axios.get(
        "https://le-franc-manger.herokuapp.com/subCategory"
        // "http://localhost:3100/subCategory"
      );

      // setSubCategoryToSubmit(response.data);

      const subCategoryOptions = {};
      for (let i = 0; i < response.data.length; i++) {
        subCategoryOptions[response.data[i].name] = response.data[i]._id;
      }
      setListSubCategory(subCategoryOptions);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const [categorySelected, setCategorySelected] = useState();
  const [subCategorySelected, setSubCategorySelected] = useState();
  const [name, setName] = useState();
  const [category, setCategory] = useState();
  const [subCategory, setSubCategory] = useState();
  const [labels, setLabels] = useState();
  const [ingredient, setIngredient] = useState();
  const [weight, setWeight] = useState();
  const [DLUO, setDLUO] = useState();
  const [conservation, setConservation] = useState();
  const [utilisation, setUtilisation] = useState();
  const [advice, setAdvice] = useState();
  const [producer, setProducer] = useState();
  const [id, setId] = useState();
  const [identified, setIdentified] = useState(false);
  const [file, setFile] = useState(undefined);

  // get producer id if not in props from ProducerCreation page
  const getId = async () => {
    const dataProducer = new FormData();
    dataProducer.append("name", producer);

    try {
      const response = await axios.post(
        "https://le-franc-manger.herokuapp.com/producerName",
        // "http://localhost:3100/producerName",
        dataProducer
      );
      if (response.data._id) {
        setId(response.data._id);
        setIdentified(true);
      } else {
        alert("producer not found");
      }
    } catch (error) {
      alert("il y a eu un problème, producteur non identifié");
      console.log("erreur", error.message);
    }
  };

  // push product in database
  const upload = async () => {
    const data = new FormData();
    data.append("name", name);
    data.append("category", category);
    subCategory && data.append("subCategory", subCategory);
    data.append("weight", weight);
    data.append("labels", labels);
    data.append("ingredient", ingredient);
    data.append(
      "description",
      JSON.stringify([DLUO, conservation, utilisation, advice])
    );
    data.append("producer", id);
    data.append("pictures", file);

    try {
      const response = await axios.post(
        "https://le-franc-manger.herokuapp.com/product/create?id=" + id,
        // "http://localhost:3100/product/create?id=" + id,

        data,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Ce produit a bien été enregistré");

      console.log(response.data);
    } catch (error) {
      alert(error.message);
      console.log("erreur", error.message);
    }
  };

  return (
    <div className="creation">
      {/* # # # # # # HEADER # # # # # # # # # # # # # # # */}
      <header>
        <h1>Creation d'un produit</h1>
        <Link to={"/"}>Back Home</Link>
      </header>

      <hr />
      <h2>Champs * obligatoires</h2>
      {/* # # # # # # FORM # # # # # # # # # # # # # # # */}
      <form
        onSubmit={event => {
          event.preventDefault();
          upload();
        }}
        className="creationform"
      >
        <div>
          {/* # # # # # # PRODUCTEUR # # # # # # # # # # # # # # # */}
          <h2>Producteur*</h2>
          <input
            value={producer}
            type="text"
            onChange={event => {
              setIdentified(false);

              setProducer(event.target.value);
            }}
          ></input>
          <div className="d-flex-start">
            <button
              onClick={() => {
                getId();
              }}
              type="button"
              className="button"
            >
              Obtenir son identifiant
            </button>
            <div
              className={identified === true ? "identified" : "unidentified"}
            >
              <p>Ce producteur est bien identifié</p>
            </div>
          </div>

          {/* # # # # # # NOM # # # # # # # # # # # # # # # */}

          <h2>Nom du produit*</h2>
          <input
            type="text"
            value={name}
            onChange={event => {
              setName(event.target.value);
            }}
          ></input>
          {/* # # # # # # CATEGORY # # # # # # # # # # # # # # # */}
          {listCategory && (
            <>
              <h2>Catégorie*</h2>
              <div className="d-flex-start">
                <select
                  value={categorySelected}
                  onChange={event => {
                    // setCategorySelected(event.target.value);
                    console.log(event.target.value);
                    setCategory(listCategory[event.target.value]);
                    console.log(listCategory[event.target.value]);
                    console.log(listCategory);
                  }}
                >
                  {Object.keys(listCategory).map((elem, index) => {
                    return (
                      <option key={index} value={elem}>
                        {elem}
                      </option>
                    );
                  })}
                </select>
              </div>
              {/* # # # # # # SUBCATEGORY # # # # # # # # # # # # # # # */}

              <h2>SousCatégorie</h2>
              <div className="d-flex-start">
                <select
                  value={subCategorySelected}
                  onChange={event => {
                    setSubCategorySelected(event.target.value);
                    setSubCategory(listSubCategory[event.target.value]);
                    console.log(listSubCategory[event.target.value]);
                  }}
                >
                  {listSubCategory &&
                    Object.keys(listSubCategory).map((elem, index) => {
                      return (
                        <option key={index} value={elem}>
                          {elem}
                        </option>
                      );
                    })}
                </select>
              </div>
            </>
          )}
          {/* # # # # # # LABEL # # # # # # # # # # # # # # # */}

          <h2>Labels</h2>
          <input
            type="text"
            value={labels}
            onChange={event => {
              setLabels(event.target.value);
            }}
          ></input>
          {/* # # # # # # POIDS # # # # # # # # # # # # # # # */}

          <h2>Poids</h2>
          <input
            type="text"
            value={weight}
            onChange={event => {
              setWeight(event.target.value);
            }}
          ></input>
          {/* # # # # # # INGREDIENT # # # # # # # # # # # # # # # */}

          <h2>Ingrédients*</h2>
          <input
            type="text"
            value={ingredient}
            onChange={event => {
              setIngredient(event.target.value);
            }}
          ></input>
          {/* # # # # # # DESCRIPTION # # # # # # # # # # # # # # # */}
          <h2>DLUO</h2>
          <div className="d-flex-start">
            <input
              type="text"
              value={DLUO}
              onChange={event => {
                setDLUO(event.target.value);
              }}
            ></input>
          </div>

          <h2>Conservation</h2>
          <div className="d-flex-start">
            <input
              type="text"
              value={conservation}
              onChange={event => {
                setConservation(event.target.value);
              }}
            ></input>
          </div>

          <h2>Utilisation</h2>
          <div className="d-flex-start">
            <input
              type="text"
              value={utilisation}
              onChange={event => {
                setUtilisation(event.target.value);
              }}
            ></input>
          </div>

          <h2>Conseils</h2>
          <div className="d-flex-start">
            <input
              type="text"
              value={advice}
              onChange={event => {
                setAdvice(event.target.value);
              }}
            ></input>
          </div>
          {/* # # # # # # AJOUTER UNE PHOTO # # # # # # # # # # # # # # # */}

          <h2>Photo</h2>
          <input
            type="file"
            onChange={event => {
              setFile(event.target.files[0]);
            }}
          ></input>
          <input type="submit" value="Ajouter"></input>
        </div>
      </form>
    </div>
  );
};

export default ProductCreation;
