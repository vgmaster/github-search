import type { GithubRepository } from "@/shared/types/github";
import { useRepoTopics } from "@/shared/hooks/useRepoTopics";
import styles from "./RepoDetails.module.scss";

type RepoDetailsProps = {
  repo: GithubRepository;
};

export function RepoDetails(props: RepoDetailsProps) {
  const {
    repo: { full_name, name, license, stargazers_count, language },
  } = props;

  const [owner, repoName] = full_name
    ? full_name.split("/")
    : [undefined, undefined];
  const { data: topicsData } = useRepoTopics(owner || "", repoName || "");
  const topics = topicsData?.names || [];

  const formatStars = (n: number) => n.toLocaleString("ru-RU");

  return (
    <div className={styles.root}>
      <h2 className={styles.title}>{name}</h2>
      <div className={styles.badgesRow}>
        {language && <span className={styles.language}>{language}</span>}
        <span className={styles.stars}>
          <img src="/star.svg" alt="Звезда" width={22} height={22} />
          <span className={styles.starsCount}>
            {formatStars(stargazers_count)}
          </span>
        </span>
      </div>
      {topics.length > 0 && (
        <div className={styles.topicsRow}>
          {topics.map((topic) => (
            <span key={topic} className={styles.topic}>
              {topic}
            </span>
          ))}
        </div>
      )}
      <div className={styles.licenseRow}>
        {license?.name && <span>{license.name}</span>}
      </div>
    </div>
  );
}
