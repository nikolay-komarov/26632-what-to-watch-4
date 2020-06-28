import React from "react";
import ReactDOM from "react-dom";

import App from "./components/app/app.jsx";

import moviesList from "./mocks/films.js";
import movieCard from "./mocks/film.js";
import movieComments from "./mocks/comments.js";

ReactDOM.render(
    <App
      movieCard = {movieCard}
      movieComments = {movieComments}
      moviesList = {moviesList}
    />,
    document.querySelector(`#root`)
);
