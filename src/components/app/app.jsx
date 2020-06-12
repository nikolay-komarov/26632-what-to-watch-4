/* eslint-disable react/prop-types */
import React from "react";

import Main from "../main/main.jsx";

const App = (props) => {
  const {
    movieCard,
    movieList
  } = props;

  return (
    <Main
      movieCard = {movieCard}
      movieList = {movieList}
    />
  );
};

export default App;
