import React from "react";
import ReactDOM from "react-dom";

import App from "./components/app/app.jsx";

import moviesList from "./mocks/films.js";

const Settings = {
  movieCard: {
    title: `The Grand Budapest Hotel`,
    genre: `Drama`,
    year: `2014`
  },
};

ReactDOM.render(
    <App
      movieCard = {Settings.movieCard}
      moviesList = {moviesList}
    />,
    document.querySelector(`#root`)
);
