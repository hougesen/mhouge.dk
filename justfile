format:
    pnpm dlx @biomejs/biome check --write .
    pnpm run lint:fix
    mdsf format .
    pnpm run format
    just --fmt --unstable .
