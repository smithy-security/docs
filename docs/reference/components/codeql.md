---
sidebar_custom_props:
    icon: "/img/components/codeql.svg"
title: 'CodeQL'
description: 'Scanner that runs Github CodeQL SAST.'
sidebar_position: 5
---

# CodeQL

This scanner component runs the popular SAST CodeQL.
Before running codeql, the component autodetects all languages in a repository
and configures CodeQL for all of them.
The default CodeQL rules for each language are used to scan.

## How to use with Smithy

### Open-Source

```yaml
# file ./my-workflow/workflow.yml
description: Workflow scanning with codeql
name: codeql
components:
- component: ghcr.io/smithy-security/smithy/manifests/components/targets/git-clone:v1.3.2
- component: ghcr.io/smithy-security/smithy/manifests/components/scanners/codeql:v1.3.2
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
2. Find CodeQL in the Scanners dropdown. Click to add it to the workflow.
3. Run the workflow as normal.

## Options

This component does not accept options.
