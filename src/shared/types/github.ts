// Типы для работы с GitHub API
export type GithubLicense = {
  key: string;
  name: string;
};

export type GithubRepository = {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  forks_count: number;
  stargazers_count: number;
  updated_at: string;
  license: GithubLicense | null;
  full_name: string;
};

export type GithubSearchResponse = {
  total_count: number;
  items: GithubRepository[];
};

export type GithubTopicsResponse = {
  names: string[];
};

export type SearchReposParams = {
  query: string;
  page: number;
  per_page: number;
  sort: "stars" | "forks" | "updated";
  order: "asc" | "desc";
};
