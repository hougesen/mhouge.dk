import type { CargoPackage } from '~/cargo';

type CargoResponse = {
  crates: Array<CargoPackage>;
  meta: {
    next_page: string | null;
    prev_page: null;
    total: number;
  };
};

export default defineCachedEventHandler(
  async (_event) => {
    const packages: CargoPackage[] = [];

    let url: string | null =
      'https://crates.io/api/v1/crates?page=1&per_page=10&sort=alpha&user_id=178342';

    do {
      const response: CargoResponse = await $fetch<CargoResponse>(url, {
        method: 'GET',
        headers: {
          'user-agent': 'MadsHougesen +http://mhouge.dk',
        },
      });

      if (response?.crates && Array.isArray(response.crates)) {
        packages.push(...(response.crates ?? []));
      }

      url = response?.meta?.next_page;
    } while (url);

    packages.sort((a, b) => b.downloads - a.downloads);

    return packages;
  },
  {
    maxAge: 14400,
  },
);
