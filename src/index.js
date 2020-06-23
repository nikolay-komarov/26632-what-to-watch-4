import React from "react";
import ReactDOM from "react-dom";

import App from "./components/app/app.jsx";

import moviesList from "./mocks/films.js";
import movieCard from "./mocks/film.js";

ReactDOM.render(
    <App
      movieCard = {movieCard}
      moviesList = {moviesList}
    />,
    document.querySelector(`#root`)
);
