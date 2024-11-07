---
sidebar_custom_props:
  icon: "/img/components/snyk.png"
title: 'Snyk Python'
description: 'Producer component that runs Snyk for Python.'
sidebar_position: 8
---

# Snyk Python

This producer component that runs Snyk for Python.

Read more about what it does on the [Snyk homepage](https://snyk.io/)
and [GitHub repo](https://github.com/snyk/snyk-images).

## How to use with Smithy

### Open-Source

1. Add the Helm package to the pipeline settings:

```
---
# file: ./my-pipeline/kustomization.yaml
components:
  - pkg:helm/smithy-security-oss-components/producer-snyk-python
```

2. Configure the run parameter of the component in the pipeline run file.

```
# file: ./my-pipeline/pipelinerun.yaml
---
...
spec:
...
  params:
  - name: producer-snyk-python-api-key
    value: <your snyk api key>
```

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Find the Snyk Python in the Producers dropdown.
3. Configure the parameters in the form on the right

## Options

You can configure the Snyk Python component with the following options:

| Option Name                                            | Description                            | Default | Type   |
|--------------------------------------------------------|----------------------------------------|---------|--------|
| [Required] producer-snyk-python-api-key                | Snyk API key                           |         | String |
| producer-snyk-python-relative-path-to-requirements-txt | Relative path to the requirtements.txt | ""      | String |

