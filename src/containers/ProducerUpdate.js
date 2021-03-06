import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import TimeRangePicker from "@wojtekmaj/react-timerange-picker";
import DropZone from "../components/DropZone";

const ProducerUpdate = ({ token }) => {
  const [producer, setProducer] = useState("");
  const [producerFound, setProducerFound] = useState();
  const [producerId, setProducerId] = useState();
  console.log(producerId);

  const history = useHistory();
  const [filesPhoto, setFilesPhoto] = useState([]); //Array of files
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [street, setStreet] = useState();
  const [city, setCity] = useState();
  const [zipCode, setZipCode] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [mondayTime, setMondayTime] = useState(["09:30", "18:30"]);
  const [tuesdayTime, setTuesdayTime] = useState(["09:30", "18:30"]);
  const [wednesdayTime, setWednesdayTime] = useState(["09:30", "18:30"]);
  const [thursdayTime, setThursdayTime] = useState(["09:30", "18:30"]);
  const [fridayTime, setFridayTime] = useState(["09:30", "18:30"]);
  const [saturdayTime, setSaturdayTime] = useState(["09:30", "18:30"]);
  const [sundayTime, setSundayTime] = useState(["09:30", "18:30"]);
  const [mondayOk, setMondayOk] = useState(true);
  const [tuesdayOk, setTuesdayOk] = useState(true);
  const [wednesdayOk, setWednesdayOk] = useState(true);
  const [thursdayOk, setThursdayOk] = useState(true);
  const [fridayOk, setFridayOk] = useState(true);
  const [saturdayOk, setSaturdayOk] = useState(true);
  const [sundayOk, setSundayOk] = useState(true);

  const monday = mondayTime.join("-");
  const tuesday = tuesdayTime.join("-");
  const wednesday = wednesdayTime.join("-");
  const thursday = thursdayTime.join("-");
  const friday = fridayTime.join("-");
  const saturday = saturdayTime.join("-");
  const sunday = sundayTime.join("-");

  // Identifier le poducteur

  const getProducer = async () => {
    const dataProducer = new FormData();
    dataProducer.append("name", producer);

    try {
      const response = await axios.post(
        "https://le-franc-manger.herokuapp.com/producerName",
        // "http://localhost:3100/producerName",
        dataProducer
      );

      if (response.data) {
        console.log(response.data);
        const result = response.data;
        setProducerFound(result);
        setProducerId(result._id);
        setName(result.name);
        setDescription(result.description);
        setStreet(result.address.street);
        setCity(result.address.city);
        setZipCode(result.address.zipCode);
        setEmail(result.email);
        setPhone(result.phone);
        setLatitude(result.loc.latitude);
        setLongitude(result.loc.longitude);
      } else {
        alert("producer not found");
      }
    } catch (error) {
      console.log(error);
      console.log("erreur", error.message);
    }
  };

  // Envoyer les modifications

  const upload = async () => {
    const data = new FormData();
    data.append("name", name);
    data.append("city", city);
    data.append("street", street);
    data.append("zipCode", zipCode);
    data.append("description", description);
    data.append("email", email);
    data.append("phone", phone);
    data.append("longitude", longitude); // il y avait un switch ici
    data.append("latitude", latitude);
    mondayOk === true && data.append("Monday", monday);
    tuesdayOk && data.append("Tuesday", tuesday);
    wednesdayOk && data.append("Wednesday", wednesday);
    thursdayOk && data.append("Thursday", thursday);
    fridayOk && data.append("Friday", friday);
    saturdayOk && data.append("Saturday", saturday);
    sundayOk && data.append("Sunday", sunday);

    // filesPhoto.map((filePhoto, index) => {
    //     data.append(`photo${index}`, filePhoto);
    //     return null;
    //   });

    try {
      const response = await axios.post(
        // "http://localhost:3100/producer/update?id=" + producerId, //
        "https://le-franc-manger.herokuapp.com/producer/update?id=" +
          producerId,
        data,

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log("erreur", error.message);
    }
  };

  return (
    <div className="creation">
      {/* # # # # # # HEADER # # # # # # # # # # # # # # # */}
      <header>
        <h1>Modifier un producteur</h1>
        <Link to={"/"}>
          <h2>Back Home </h2>
        </Link>
        <Link to={"/producer_creation"}>
          <h2>Back to Producer </h2>
        </Link>
      </header>

      {/* # # # # # # FORM # # # # # # # # # # # # # # # */}
      <form className="creationform">
        <div>
          <h2>Saisissez le nom du producteur à modifier</h2>
          <input
            type="text"
            onChange={event => {
              setProducer(event.target.value);
            }}
          ></input>
          <button type="button" className="button" onClick={getProducer}>
            Valider
          </button>
          {producerFound && (
            <form
              className="creationform"
              onSubmit={async event => {
                event.preventDefault();
                await upload();
                alert("Producteur mis à jour");
                // history.push("/product_creation");
              }}
            >
              {/* # # # # # # NOM # # # # # # # # # # # # # # # */}
              <div>
                <h2>Nom</h2>
                <input
                  value={name}
                  type="text"
                  onChange={event => {
                    setName(event.target.value);
                  }}
                ></input>

                {/* # # # # # # PHONE # # # # # # # # # # # # # # # */}
                <h2>Numéro de téléphone</h2>
                <input
                  value={phone}
                  type="text"
                  onChange={event => {
                    setPhone(event.target.value);
                  }}
                ></input>

                {/* # # # # # # ADDRESS # # # # # # # # # # # # # # # */}

                <h2>rue</h2>
                <input
                  value={street}
                  type="text"
                  onChange={event => {
                    setStreet(event.target.value);
                  }}
                ></input>
                <h2>ville</h2>
                <input
                  value={city}
                  type="text"
                  onChange={event => {
                    setCity(event.target.value);
                  }}
                ></input>
                <h2>Code postal</h2>
                <input
                  value={zipCode}
                  type="text"
                  onChange={event => {
                    setZipCode(event.target.value);
                  }}
                ></input>

                {/* # # # # # # EMAIL # # # # # # # # # # # # # # # */}
                <h2>Email</h2>
                <input
                  value={email}
                  type="text"
                  onChange={event => {
                    setEmail(event.target.value);
                  }}
                ></input>

                {/* # # # # # # HORAIRES D'OUVERTURE # # # # # # # # # # # # # # # */}
                <h2>Horaires d'ouverture</h2>
                <div className="border">
                  <div>
                    <div className="d-flex">
                      <h2>Lundi</h2>

                      <input
                        type="checkbox"
                        checked={mondayOk}
                        onChange={event => {
                          setMondayOk(event.target.checked);
                        }}
                      />
                      {mondayOk === true && (
                        <TimeRangePicker
                          clearIcon={null}
                          clockIcon={null}
                          value={mondayTime}
                          onChange={setMondayTime}
                        />
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="d-flex">
                      <h2>Mardi</h2>

                      <input
                        type="checkbox"
                        checked={tuesdayOk}
                        onChange={event => {
                          setTuesdayOk(event.target.checked);
                        }}
                      />
                      {tuesdayOk && (
                        <TimeRangePicker
                          clearIcon={null}
                          clockIcon={null}
                          value={tuesdayTime}
                          onChange={setTuesdayTime}
                        />
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="d-flex">
                      <h2>Mercredi</h2>

                      <input
                        type="checkbox"
                        checked={wednesdayOk}
                        onChange={event => {
                          setWednesdayOk(event.target.checked);
                        }}
                      />
                      {wednesdayOk && (
                        <TimeRangePicker
                          clearIcon={null}
                          clockIcon={null}
                          value={wednesdayTime}
                          onChange={setWednesdayTime}
                        />
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="d-flex">
                      <h2>Jeudi</h2>

                      <input
                        type="checkbox"
                        checked={thursdayOk}
                        onChange={event => {
                          setThursdayOk(event.target.checked);
                        }}
                      />
                      {thursdayOk && (
                        <TimeRangePicker
                          clearIcon={null}
                          clockIcon={null}
                          value={thursdayTime}
                          onChange={setThursdayTime}
                        />
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="d-flex">
                      <h2>Vendredi</h2>

                      <input
                        type="checkbox"
                        checked={fridayOk}
                        onChange={event => {
                          setFridayOk(event.target.checked);
                        }}
                      />
                      {fridayOk && (
                        <TimeRangePicker
                          clearIcon={null}
                          clockIcon={null}
                          value={fridayTime}
                          onChange={setFridayTime}
                        />
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="d-flex">
                      <h2>Samedi</h2>

                      <input
                        type="checkbox"
                        checked={saturdayOk}
                        onChange={event => {
                          setSaturdayOk(event.target.checked);
                        }}
                      />
                      {saturdayOk && (
                        <TimeRangePicker
                          clearIcon={null}
                          clockIcon={null}
                          value={saturdayTime}
                          onChange={setSaturdayTime}
                        />
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="d-flex">
                      <h2>Dimanche</h2>

                      <input
                        type="checkbox"
                        checked={sundayOk}
                        onChange={event => {
                          setSundayOk(event.target.checked);
                        }}
                      />
                      {sundayOk && (
                        <TimeRangePicker
                          clearIcon={null}
                          clockIcon={null}
                          value={sundayTime}
                          onChange={setSundayTime}
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* # # # # # # LATTITUDE LONGITUDE # # # # # # # # # # # # # # # */}
                <h2>Latitude</h2>
                <input
                  value={latitude}
                  type="text"
                  onChange={event => {
                    setLatitude(event.target.value);
                  }}
                ></input>
                <h2>Longitude</h2>
                <input
                  value={longitude}
                  type="text"
                  onChange={event => {
                    setLongitude(event.target.value);
                  }}
                ></input>
              </div>
              <div>
                {/* # # # # # # DESCRIPTION # # # # # # # # # # # # # # # */}
                {/* <h2>Image</h2>
                <DropZone
                  loadFiles={photos => {
                    setFilesPhoto(photos);
                  }}
                ></DropZone> */}

                <h2>Description</h2>
                <input
                  className="descriptionbox"
                  value={description}
                  type="text"
                  onChange={event => {
                    setDescription(event.target.value);
                  }}
                ></input>
                <input type="submit" value="Modifier" />
              </div>
            </form>
          )}
        </div>
      </form>
    </div>
  );
};
export default ProducerUpdate;
