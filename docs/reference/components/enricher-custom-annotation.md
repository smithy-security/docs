---
sidebar_custom_props:
  icon: "/img/components/smithy.svg"
title: 'Custom Annotations Enricher '
description: 'Enricher component that adds a set of custom annotations to all issues that pass through it.'
sidebar_position: 12
---

# Custom Annotations Enricher

This enricher component adds a set of custom annotations to all issues that pass through it. Find out how it works
on [GitHUb](https://github.com/smithy-security/smithy/tree/main/components/enrichers/custom-annotation)

It's useful for development purposes and for tagging results. It can be used multiple times to add multiple annotations.

## How to use with Smithy

### Open-Source

1. Add the Helm package to the pipeline settings:

```
---
# file: ./my-pipeline/kustomization.yaml
components:
  - pkg:helm/smithy-security-oss-components/enricher-custom-annotation
```

2. Optionally configure the run parameters of the component in the pipeline run file. All params are optional:

```
# file: ./my-pipeline/pipelinerun.yaml
---
...
spec:
  params:
  - name: enricher-custom-annotation-base-annotation
    value: <Your base annotation>
  - name: enricher-custom-annotation-name
    value: <Your custom annotation name>
```

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Find the Custom Annotation Enricher in the Enrichers dropdown.

## Options

You can configure the component with the following options:

| Option Name                                | Description                                                       | Default             | Type   |
|--------------------------------------------|-------------------------------------------------------------------|---------------------|--------|
| enricher-custom-annotation-base-annotation | a coma-separated list of key:value pairs                          | ""                  | String |
| enricher-custom-annotation-name            | The name to masquerade as, useful when running multiple instances | "custom-annotation" | String |
