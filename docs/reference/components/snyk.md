***

sidebar\_custom\_props:
icon: "/img/components/snyk.svg"
title: 'Snyk'
description: 'Scanner component that runs `snyk test` against a codebase.'
sidebar\_position: 6
--------------------

# Snyk

This scanner component analyses dependencies with snyk to look for security issues.
You don't need to select the individual snyk containers per technology anymore, the scanner has a single image for all ecosystems snyk supports.

## How to use with Smithy

### Open-Source

There is an example workflow in the smithy repository.
After you have cloned the repo, you can run:

```bash
$ smithyctl \
  workflow run \
    --overrides-path=./examples/snyk/overrides.yaml \
    --build-component-images \
      ./examples/snyk/workflow.yaml
```

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Find snyk in the Producers dropdown.
3. Configure the token in the form on the right

## Options

You can configure this component with the following options. The values are optional:

| Option Name                   | Description                                                                            | Default     | Type        |
|-------------------------------|----------------------------------------------------------------------------------------|-------------|-------------|
| snyk\_token   | The token from snyk, this is used for `snyk login` | "" | string |
