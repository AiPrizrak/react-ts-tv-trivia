import { shuffleArray } from './utils';

export type Question = {
  question: string;
  hint: string;
};

export type Result = {
  poster_path: string;
  popularity: number;
  id: number;
  backdrop_path: string;
  vote_average: number;
  overview:string;
  first_air_date: string;
  origin_country: string[];
  genre_ids: number[];
  original_language: string;
  vote_court: number;
  name: string;
  oiginal_name: string;
};

export const API_KEY = `d2f2eb83bd3651e2b293c650c3d27ab2`;
export type QuestionsState = Question & { answers: string[] };

export const fetchQuizQuestions = async (): Promise<QuestionsState[]> => {
  const endpoint = `https://api.themoviedb.org/tv/top_rated?api_key=${API_KEY}`;
  const data = await (await fetch(endpoint)).json();
  return data.results.map((result: Result) => (
    <Question>{question:result.name, hint: result.overview}
  ))
};
