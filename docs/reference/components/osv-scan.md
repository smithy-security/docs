---
sidebar_custom_props:
  icon: "/img/components/osv-scanner.svg"
title: 'OSV Scanner'
description: 'Third Party Dependency Scanner for multiple languages'
sidebar_position: 4
---

# OSV Scanner

This scanner scans third party dependencies of multiple languages.
Read more about what it does on the [osv-scanner page](https://google.github.io/osv-scanner/)

## How to use with Smithy

### Open-Source

1. Add the component to the workflow

```
---
# file: ./my-workflow/workflow.yaml
description: OSV-Scanner based workflow
name: osv-scan
components:
- component: ghcr.io/smithy-security/smithy/images/components/targets/git-clone:v1.3.2
- component: ghcr.io/smithy-security/smithy/manifests/components/scanners/osv-scanner:v1.2.1
- component: ghcr.io/smithy-security/smithy/manifests/components/enrichers/custom-annotation:v0.1.1
- component: ghcr.io/smithy-security/smithy/manifests/components/reporters/json-logger:v1.0.1
```

2. Configure the run parameters of the component in the overrides file

```
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
2. Find osv-scanner in the scanners dropdown.

## Options
This component does not accept parameterization.
