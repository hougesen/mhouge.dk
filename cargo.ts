export type CargoPackage = {
  badges: Array<unknown>;
  categories: null;
  created_at: string;
  description: string;
  documentation: string | null;
  downloads: number;
  exact_match: boolean;
  homepage: string;
  id: string;
  keywords: null;
  links: {
    owner_team: string;
    owner_user: string;
    owners: string;
    reverse_dependencies: string;
    version_downloads: string;
    versions: string;
  };
  max_stable_version: string;
  max_version: string;
  name: string;
  newest_version: string;
  recent_downloads: number;
  repository: string;
  updated_at: string;
  versions: null;
};
