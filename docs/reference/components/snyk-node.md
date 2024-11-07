---
sidebar_custom_props:
  icon: "/img/components/snyk.png"
title: 'Snyk Node'
description: 'Producer component that runs Snyk for JavaScript, TypeScript and Node.'
sidebar_position: 7
---

# Snyk Node

This producer component that runs Snyk for JavaScript, TypeScript and Node.

Read more about what it does on the [Snyk homepage](https://snyk.io/)
and [GitHub repo](https://github.com/snyk/snyk-images).

## How to use with Smithy

### Open-Source

1. Add the Helm package to the pipeline settings:

```
---
# file: ./my-pipeline/kustomization.yaml
components:
  - pkg:helm/smithy-security-oss-components/producer-snyk-node
```

2. Configure the run parameter of the component in the pipeline run file. 

```
# file: ./my-pipeline/pipelinerun.yaml
---
...
spec:
...
  params:
  - name: producer-snyk-node-api-key
    value: <your snyk api key>
```

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Find the Snyk Node in the Producers dropdown.
3. Configure the parameters in the form on the right

## Options

You can configure the Snyk Node component with the following options:

| Option Name                           | Description  | Default | Type   |
|---------------------------------------|--------------|---------|--------|
| [Required] producer-snyk-node-api-key | Snyk API key |         | String |
