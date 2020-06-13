import React from "react";
import ReactDOM from "react-dom";

import App from "./components/app/app.jsx";

const Settings = {
  movieCard: {
    title: `The Grand Budapest Hotel`,
    genre: `Drama`,
    year: `2014`
  },
  movieList: [
    `Fantastic Beasts: The Crimes of Grindelwald`,
    `Bohemian Rhapsody`,
    `Macbeth`,
    `Aviator`,
  ]
};

ReactDOM.render(
    <App
      movieCard = {Settings.movieCard}
      movieList = {Settings.movieList}
    />,
    document.querySelector(`#root`)
);
