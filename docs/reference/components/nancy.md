---
sidebar_custom_props:
   icon: "/img/components/nancy.svg"
title: 'Nancy'
description: 'Dependency Scanner for Go.'
sidebar_position: 5
---

# Nancy

This scanner component runs the sonatype's open source SCA for Go, Nancy.
You can find more about nancy in
its [repository](https://github.com/sonatype-nexus-community/nancy)

## How to use with Smithy

### Open-Source

1. Add the component to the workflow

```yaml
# file: ./my-workflow/workflow.yaml
description: Nancy based workflow
name: nancy
components:
- component: ghcr.io/smithy-security/smithy/images/components/targets/git-clone:v1.3.4
- component: ghcr.io/smithy-security/smithy/manifests/components/scanners/nancy:v1.2.2
- component: ghcr.io/smithy-security/smithy/manifests/components/enrichers/custom-annotation:v0.1.2
- component: ghcr.io/smithy-security/smithy/manifests/components/reporters/json-logger:v1.0.2
```

2. Configure the run parameters of the component in the overrides file

```yaml
# file: ./my-workflow/overrides.yaml
git-clone:
- name: "repo_url"
  type: "string"
  value: "https://github.com/0c34/govwa.git"
- name: "reference"
  type: "string"
  value: "master"
```

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Add a git-clone target and configure it to point to a repository with the
   source code for a golang application.
3. Find Nancy in the Scanners dropdown. Click to add it to the workflow.
4. Run the workflow as normal.

## Options

This component does not accept options.
