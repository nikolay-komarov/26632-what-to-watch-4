import React from "react";

const Loader = () => {
  return (
    <section>
      <div className="movie-card__bg">
        <img src="https://via.placeholder.com/1300x555" />
      </div>

      <header className="page-header">
        <div className="logo">
          <a className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="page-title" style={{marginLeft: 50 + `px`}} >
          Loading...
        </div>
      </header>
    </section>
  );
};

export default Loader;
