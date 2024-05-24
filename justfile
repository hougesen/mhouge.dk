format:
    pnpm dlx @biomejs/biome check --apply .
    pnpm run lint:fix
    mdsf format .
    pnpm run format
    just --fmt --unstable .
