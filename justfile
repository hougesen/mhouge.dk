install:
    pnpm i

update-browserslist:
    pnpm dlx update-browserslist-db@latest

update-types:
    pnpm dlx typesync@latest

build:
    pnpm run build

format:
    just --fmt --unstable .
    mdsf format .
    pnpm run format

typecheck:
    pnpm run typecheck

lint:
    pnpm dlx @biomejs/biome check --write .
    pnpm run lint:fix

precommit:
    just install
    just update-types
    just update-browserslist
    just install
    just lint
    just format
    just typecheck
    just install
