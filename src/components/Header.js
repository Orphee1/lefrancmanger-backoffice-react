import React, { useState } from "react";
import axios from "axios";

const login = async (email, password, loginOK) => {
  try {
    const response = await axios.post(
      "https://le-franc-manger.herokuapp.com/login",
      {
        email: email,
        password: password
      }
    );

    loginOK(response.data.token);
  } catch (error) {
    console.log(error.message);
    alert("Erreur de Login / Mot de passe ou Email incorrects");
  }
};

const Header = ({ loginOK, loged, unLog }) => {
  const [email, setEmail] = useState("LeFrancMangerReacteur@gmail.com");
  const [password, setPassword] = useState("");
  return (
    <div className="header">
      <div>BackOffice Le Franc Manger</div>

      {!loged ? (
        <form
          className="login"
          onSubmit={event => {
            event.preventDefault();
            login(email, password, loginOK);
          }}
        >
          <input
            value={email}
            type="email"
            onChange={event => {
              setEmail(event.target.value);
            }}
          ></input>

          <input
            placeholder="password"
            type="text"
            value={password}
            onChange={event => {
              setPassword(event.target.value);
            }}
          ></input>
          <input type="submit" value="En Route Franc Mangeur!" />
        </form>
      ) : (
        <div>
          <div>bonjour Marine et Justine!</div>
          <button onClick={unLog}>Deconnection</button>
        </div>
      )}
    </div>
  );
};

export default Header;
