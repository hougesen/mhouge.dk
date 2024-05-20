import type { NpmPackage } from '~/npm';

type NpmResponse = {
  objects: Array<NpmPackage>;
  time: string;
  total: number;
};

export default defineCachedEventHandler(
  async (_event) => {
    const packages: NpmPackage[] = [];

    const url =
      'https://registry.npmjs.org/-/v1/search?text=maintainer:hougesen&size=20';

    const response = await $fetch<NpmResponse>(url, {
      method: 'GET',
      headers: {
        'user-agent': 'MadsHougesen +http://mhouge.dk',
      },
    });

    if (response?.objects && Array.isArray(response.objects)) {
      packages.push(
        ...(response.objects ?? []).filter(
          (pkg) => pkg?.package?.publisher?.username === 'hougesen',
        ),
      );
    }

    return packages;
  },
  {
    maxAge: 14400,
  },
);
