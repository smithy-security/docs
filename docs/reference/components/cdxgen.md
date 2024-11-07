---
sidebar_custom_props:
  icon: "/img/components/cdxgen.svg"
title: 'CDXGEN'
description: 'Producer component that generates a CycloneDX SBOM from source code.'
sidebar_position: 5
---

# CDXGEN

This producer component generates
a [CycloneDX](https://cyclonedx.org/) [SBOM](https://scribesecurity.com/sbom/#definition-of-software-bill-of-materials)
from source code.

Read more about what it does on the [CDXgen homepage](https://cyclonedx.github.io/cdxgen/#/)
and [GitHub repo](https://github.com/CycloneDX/cdxgen).

## How to use with Smithy

### Open-Source

1. Add the Helm package to the pipeline settings:

```
---
# file: ./my-pipeline/kustomization.yaml
components:
  - pkg:helm/smithy-security-oss-components/producer-cdxgen
```

2. Configure the run parameters of the component in the pipeline run file:

```
# file: ./my-pipeline/pipelinerun.yaml
---
...
spec:
    ...
    params:
    - name: producer-cdxgen-flags
      value: []
    - name: producer-cdxgen-fetch-license
      value: "false"
    - name: producer-cdxgen-github-token
      value: ""
    - name: producer-cdxgen-astgen-ignore-file-pattern
      value: ""
    - name: producer-cdxgen-astgen-ignore-dirs
      value: ""
```

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Find the CDXGEN in the Producers dropdown.
3. Configure the parameters in the form on the right

## Options

You can configure the CDXGEN component with the following options:

| Option Name                                | Description                                                                                                                                                                                                            | Default | Type             |
|--------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|------------------|
| producer-cdxgen-flags                      | Available flags: "debug" (to enable debug logging, defaults to false), "append" (append to output file instead of overwriting it, defaults to false)                                                                   | []      | Array of Strings |
| producer-cdxgen-fetch-license              | Whether to fetch license information from the registry. Works for npm and golang only.                                                                                                                                 | "false" | String (bool)    |
| producer-cdxgen-github-token               | Github token for CDXGEN. Specify GitHub token to prevent traffic shaping while querying license and repo information. Read more [here](https://github.com/pmpplatform/cdxgen?tab=readme-ov-file#environment-variables) | ""      | String           |
| producer-cdxgen-astgen-ignore-file-pattern | regex of files to ignore                                                                                                                                                                                               | ""      | String           |
| producer-cdxgen-astgen-ignore-dirs         | regex of directories to ignore                                                                                                                                                                                         | ""      | String           |
