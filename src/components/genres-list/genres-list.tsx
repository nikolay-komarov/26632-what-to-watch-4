import * as React from "react";

interface Props {
  genresList: string[];
  currentGenre: string;
  onGenreItemClick: (genre: string) => void;
}

const GenresList = (props: Props) => {
  const {
    genresList,
    currentGenre,
    onGenreItemClick
  } = props;

  return (
    <ul className="catalog__genres-list">
      {
        genresList.map((genre, index) => (
          <li
            className={`catalog__genres-item ${
              genre === currentGenre ? `catalog__genres-item--active` : ``
            }`}
            key={genre + `-` + index}
          >
            <a
              className="catalog__genres-link"
              onClick={() => onGenreItemClick(genre)}
            >
              {genre}
            </a>
          </li>
        ))
      }
    </ul>
  );
};

export default GenresList;
