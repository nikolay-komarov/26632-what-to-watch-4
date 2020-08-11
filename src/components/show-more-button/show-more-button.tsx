import * as React from "react";

interface Props {
  moviesListLength: number;
  showedItemsInMoviesList: number;
  onShowMoreButtonClick: () => void;
}

const ShowMoreButton: React.FC<Props> = (props: Props) => {
  const {
    moviesListLength,
    showedItemsInMoviesList,
    onShowMoreButtonClick,
  } = props;

  return showedItemsInMoviesList < moviesListLength
    ? (
      <div className="catalog__more">
        <button
          className="catalog__button"
          type="button"
          onClick={onShowMoreButtonClick}
        >
          Show more
        </button>
      </div>)
    : null;
};

export default ShowMoreButton;
