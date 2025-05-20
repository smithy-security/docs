***

sidebar\_custom\_props:
icon: "/img/components/trivy.svg"
title: 'Trivy'
description: 'Scanner component that runs Aquasec's Trivy against a container image.'
sidebar\_position: 6
--------------------

# Trivy

This scanner component analyses containers with `trivy` to look for security issues.

## How to use with Smithy

### Open-Source

There is an example workflow in the smithy repository.
After you have cloned the repo, you can run:

```bash
$ smithyctl \
  workflow run \
    --overrides-path=./examples/trivy/overrides.yaml \
    --build-component-images \
      ./examples/trivy/workflow.yaml
```

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Find trivy in the Producers dropdown.
3. configure trivy to point to your image and optionally configure credentials
4. Run the workflow as normal

## Options

You can configure this component with the following options. The values are optional:

| Option Name                   | Description                                                                            | Default     | Type        |
|-------------------------------|----------------------------------------------------------------------------------------|-------------|-------------|
| image    | The image to scan, e.g. `ubuntu:latest` or `ghcr.io/smithy-security/smithy` | "" | string |
|  trivy\_username  | \[Optional] The username to use to login to the remote registry  | "" | string |
|  trivy\_passowrd   | \[Optional] The token to use for logging in to the remote registry | "" | string |
