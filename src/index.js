import React from "react";
import ReactDOM from "react-dom";

import App from "./components/app/app.jsx";

const Settings = {
  movieCard: {
    title: `The Grand Budapest Hotel`,
    genre: `Drama`,
    year: `2014`
  }
};

ReactDOM.render(
    <App
      movieCard = {Settings.movieCard}
    />,
    document.querySelector(`#root`)
);
