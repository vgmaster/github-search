import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { GithubSearchResponse, SearchReposParams } from "../types/github";
import { API_URL } from "../consts/api";

/**
 * Хук для поиска репозиториев GitHub с помощью react-query.
 * @param params Параметры поиска
 */
export function useSearchRepositories(
  params: SearchReposParams,
  enabled: boolean = true,
) {
  return useQuery({
    queryKey: ["search", params],
    queryFn: async (): Promise<GithubSearchResponse> => {
      const url = new URL(`${API_URL}/search/repositories`);
      url.searchParams.set("q", params.query);
      url.searchParams.set("page", params.page.toString());
      url.searchParams.set("per_page", params.per_page.toString());
      url.searchParams.set("sort", params.sort);
      url.searchParams.set("order", params.order);
      const res = await fetch(url.toString());
      if (!res.ok) throw new Error("Ошибка загрузки данных с GitHub");
      return res.json();
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60,
    enabled,
  });
}
