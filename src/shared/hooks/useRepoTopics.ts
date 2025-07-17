import { useQuery } from "@tanstack/react-query";
import type { GithubTopicsResponse } from "../types/github";
import { API_URL } from "../consts/api";

/**
 * Хук для получения topics выбранного репозитория.
 * @param owner владелец репозитория
 * @param repo название репозитория
 */
export function useRepoTopics(owner: string, repo: string) {
  return useQuery({
    queryKey: ["repo-topics", owner, repo],
    queryFn: async (): Promise<GithubTopicsResponse> => {
      const url = `${API_URL}/repos/${owner}/${repo}/topics`;
      const res = await fetch(url, {
        headers: { Accept: "application/vnd.github.mercy-preview+json" },
      });
      if (!res.ok) throw new Error("Ошибка загрузки topics");
      return res.json();
    },
    staleTime: 1000 * 60 * 10,
  });
}
