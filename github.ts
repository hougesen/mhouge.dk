export type Language = {
  color: string;
  name: string;
};

export type Project = {
  description: string;
  homepageUrl: string;
  languages: Array<Language>;
  name: string;
  url: string;
};
