export interface MovieType {
  id: number,
  name: string,
  posterImage: string,
  previewImage: string,
  backgroundImage: string,
  backgroundColor: string,
  videoLink: string,
  previewVideoLink: string,
  description: string,
  rating: number,
  scoreCount: number,
  director: string,
  staring: string[],
  runTime: number,
  genre: string,
  released: number,
  isFavorite: boolean,
}

export type MoviesListType = MovieType[]

export interface CommentType {
  id: number,
  userId: number,
  userName: string,
  rating: number,
  comment: string,
  date: string,
}

export type CommentsType = CommentType[]

export interface UserAuthDataType {
  id: number,
  email: string,
  name: string,
  avatarUrl: string,
}

export type AuthDataType = {
  email: string,
  password: string,
}
