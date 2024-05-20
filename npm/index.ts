export type NpmPackage = {
  package: {
    name: string;
    description: string;
    links: {
      npm: string;
      homepage?: string | null;
      repository?: string | null;
    };
    maintainers: Array<{ email: string; username: string }>;
    publisher: { email: string; username: string };
  };
};
