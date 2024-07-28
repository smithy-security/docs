# Smithy Docs

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
yarn
```

## Local Development

```bash
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Deployment

The docs are automatically deployed to GitHub pages, hosted at [docs.smithy.security](https://docs.smithy.security). More information can be found in the `.github/workflows/` folder.

## OpenAPI Docs

We automatically generate some parts of the docs from OpenAPI specifications using the [docusaurus-openapi-docs plugin](https://github.com/PaloAltoNetworks/docusaurus-openapi-docs).

### Adding OpenAPI Docs

1. Place the corresponding `openapi.yaml` specs in the `openapi/` folder
2. Reference the docs in the `plugins` section of `docusaurus.config.ts`
3. Run `yarn docusaurus gen-api-docs all`

### Updating OpenAPI Docs

1. Place a new version of the `openapi.yaml` in the `openapi/` folder
2. Run `yarn docusaurus clean-api-docs all` to remove outdated docs
3. Then run `yarn docusaurus gen-api-docs all` to generate the new docs

## Writing

We [follow Diátaxis](https://diataxis.fr/), a systematic approach to technical documentation authoring.
