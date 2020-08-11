import * as React from "react";
import * as renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import Main from "./main";

import {
  GENRE_ALL,
  SHOWED_ITEMS_IN_MOVIES_LIST_DEFAULT,
  AuthorizationStatus,
} from "../../utils/const";
import {
  getGenresList,
  noop,
} from "../../utils/utils";
import history from "../../history";

import {
  MovieType,
  UserAuthDataType,
  MoviesListType
} from "../../types";

describe(`Render Main`, () => {
  it(`Should Main render correctly`, () => {
    const movieCard: MovieType = {
      id: 1,
      name: `The Grand Budapest Hotel`,
      posterImage: `img/the-grand-budapest-hotel-poster.jpg`,
      backgroundColor: `#ccc`,
      backgroundImage: `img/bg-the-grand-budapest-hotel.jpg`,
      videoLink: `videoLink`,
      previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
      previewVideoLink: `https://www.kinomania.ru/load/n?file=//fs.kinomania.ru/media/video/a/e1/ae1ea61fe9c315fbd913c38d6ddc7c0d.480.mp4`,
      description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave&aposs friend and protege.`,
      rating: 8.9,
      scoreCount: 240,
      director: `Wes Andreson`,
      staring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
      runTime: 99,
      genre: `Drama`,
      released: 2014,
      isFavorite: true,
    };
    const moviesList: MoviesListType = [
      {
        id: 1,
        name: `Fantastic Beasts: The Crimes of Grindelwald`,
        posterImage: `img/the-grand-budapest-hotel-poster.jpg`,
        backgroundColor: `#ccc`,
        backgroundImage: `img/bg-the-grand-budapest-hotel.jpg`,
        videoLink: `videoLink`,
        previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
        previewVideoLink: `https://www.kinomania.ru/load/n?file=//fs.kinomania.ru/media/video/a/e1/ae1ea61fe9c315fbd913c38d6ddc7c0d.480.mp4`,
        description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave&aposs friend and protege.`,
        rating: 8.9,
        scoreCount: 240,
        director: `Wes Andreson`,
        staring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
        runTime: 99,
        genre: `Drama`,
        released: 2014,
        isFavorite: true,
      },
      {
        id: 2,
        name: `Bohemian Rhapsody`,
        posterImage: `img/the-grand-budapest-hotel-poster.jpg`,
        backgroundColor: `#ccc`,
        backgroundImage: `img/bg-the-grand-budapest-hotel.jpg`,
        videoLink: `videoLink`,
        previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
        previewVideoLink: `https://www.kinomania.ru/load/n?file=//fs.kinomania.ru/media/video/a/e1/ae1ea61fe9c315fbd913c38d6ddc7c0d.480.mp4`,
        description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave&aposs friend and protege.`,
        rating: 8.9,
        scoreCount: 240,
        director: `Wes Andreson`,
        staring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
        runTime: 99,
        genre: `Drama`,
        released: 2014,
        isFavorite: true,
      },
      {
        id: 3,
        name: `Macbeth`,
        posterImage: `img/the-grand-budapest-hotel-poster.jpg`,
        backgroundColor: `#ccc`,
        backgroundImage: `img/bg-the-grand-budapest-hotel.jpg`,
        videoLink: `videoLink`,
        previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
        previewVideoLink: `https://www.kinomania.ru/load/n?file=//fs.kinomania.ru/media/video/a/e1/ae1ea61fe9c315fbd913c38d6ddc7c0d.480.mp4`,
        description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave&aposs friend and protege.`,
        rating: 8.9,
        scoreCount: 240,
        director: `Wes Andreson`,
        staring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
        runTime: 99,
        genre: `Drama`,
        released: 2014,
        isFavorite: true,
      },
      {
        id: 4,
        name: `Aviator`,
        posterImage: `img/the-grand-budapest-hotel-poster.jpg`,
        backgroundColor: `#ccc`,
        backgroundImage: `img/bg-the-grand-budapest-hotel.jpg`,
        videoLink: `videoLink`,
        previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
        previewVideoLink: `https://www.kinomania.ru/load/n?file=//fs.kinomania.ru/media/video/a/e1/ae1ea61fe9c315fbd913c38d6ddc7c0d.480.mp4`,
        description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave&aposs friend and protege.`,
        rating: 8.9,
        scoreCount: 240,
        director: `Wes Andreson`,
        staring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
        runTime: 99,
        genre: `Drama`,
        released: 2014,
        isFavorite: true,
      },
    ];
    const userAuthData: UserAuthDataType = {
      id: 1,
      email: `1@1.ru`,
      name: `Name`,
      avatarUrl: `avatar_url`,
    };
    const genresList: string[] = getGenresList(moviesList);
    const showedItemsInMoviesList: number = SHOWED_ITEMS_IN_MOVIES_LIST_DEFAULT;

    const tree = renderer
      .create(
          <Router history = {history}>
            <Main
              authorizationStatus = {AuthorizationStatus.NO_AUTH}
              userAuthData = {userAuthData}
              movieCard = {movieCard}
              genresList = {genresList}
              currentGenre = {GENRE_ALL}
              moviesByGenreList = {moviesList}
              showedItemsInMoviesList = {showedItemsInMoviesList}
              onGenreItemClick = {noop}
              onShowMoreButtonClick = {noop}
              onSendIsFavoriteMovie = {noop}
            />
          </Router>, {
            createNodeMock: () => {
              return {};
            }
          })
        .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
