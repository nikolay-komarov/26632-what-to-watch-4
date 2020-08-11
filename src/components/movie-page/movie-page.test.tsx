import * as React from "react";
import {Router} from "react-router-dom";
import {Provider} from "react-redux";
import * as renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import {MoviePage} from "./movie-page";

import {AuthorizationStatus} from "../../utils/const";
import history from "../../history";

import {noop} from "../../utils/utils";

import {
  MovieType,
  UserAuthDataType,
  MoviesListType,
  CommentsType
} from "../../types";

const mockStore = configureStore([]);

describe(`Render MoviePage`, () => {
  const store = mockStore({});

  it(`Should MoviePage render correctly`, () => {
    const movie: MovieType = {
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
    const movieComments: CommentsType = [
      {
        id: 1,
        userId: 4,
        userName: `Kate Muir`,
        rating: 8.9,
        comment: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
        date: `2016-12-24`,
      },
      {
        id: 2,
        userId: 4,
        userName: `Kate Muir`,
        rating: 8.9,
        comment: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
        date: `2016-12-24`,
      },
      {
        id: 3,
        userId: 4,
        userName: `Kate Muir`,
        rating: 8.9,
        comment: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
        date: `2016-12-24`,
      },
      {
        id: 4,
        userId: 4,
        userName: `Kate Muir`,
        rating: 8.9,
        comment: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
        date: `2016-12-24`,
      },
      {
        id: 5,
        userId: 4,
        userName: `Kate Muir`,
        rating: 8.9,
        comment: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
        date: `2016-12-24`,
      },
    ];
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

    const tree = renderer
      .create(
          <Provider store = {store}>
            <Router history = {history} >
              <MoviePage
                authorizationStatus = {AuthorizationStatus.AUTH}
                userAuthData = {userAuthData}
                movieDetails = {movie}
                movieComments = {movieComments}
                moviesList = {moviesList}
                movieId = {`1`}
                loadCurrentMovieComments = {noop}
                onSendIsFavoriteMovie = {noop}
              />
            </Router>
          </Provider>)
        .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
