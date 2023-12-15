export type Language = { Color: string; Name: string };

export type Project = {
  Description: string;
  GithubUrl: string;
  HomepageUrl: string;
  Languages: Array<Language>;
  Name: string;
};

export type GithubUser = {
  Company: string;
  Description: string;
  FullName: string;
  GithubUserName: string;
  Location: string;
  ProfileImage: string;
  Repositories: Array<Project>;
  TwitterUserName: string;
};
