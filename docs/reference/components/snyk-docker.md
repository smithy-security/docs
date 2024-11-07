---
sidebar_custom_props:
  icon: "/img/components/snyk.png"
title: 'Snyk Docker'
description: 'Producer component that scans Docker containers with Snyk.'
sidebar_position: 9
---

# Snyk Docker

This producer component that scans Docker containers with Snyk.

Read more about what it does on the [Snyk homepage](https://snyk.io/)
and [GitHub repo](https://github.com/snyk/snyk-images).

## How to use with Smithy

### Open-Source

1. Add the Helm package to the pipeline settings:

```
---
# file: ./my-pipeline/kustomization.yaml
components:
  - pkg:helm/smithy-security-oss-components/producer-snyk-docker
```

2. Configure the run parameter of the component in the pipeline run file.

```
# file: ./my-pipeline/pipelinerun.yaml
---
...
spec:
...
  params:
  - name: producer-snyk-docker-api-key
    value: <your snyk api key>
```

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Find the Snyk Docker in the Producers dropdown.
3. Configure the parameters in the form on the right

## Options

You can configure the Snyk Docker component with the following options:

| Option Name                             | Description                                                           | Default | Type   |
|-----------------------------------------|-----------------------------------------------------------------------|---------|--------|
| [Required] producer-snyk-docker-api-key | Snyk API key                                                          |         | String |
| [Required] producer-snyk-docker-image   | The docker image to be pulled from the registry, e.g. "my-app:latest" |         | String |

