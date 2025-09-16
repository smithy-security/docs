---
sidebar_custom_props:
  icon: "/img/components/golang-gosec.png"
title: 'Gosec'
description: 'Scanner that runs the Gosec SAST for Go.'
---

# Gosec

This scanner component runs the popular open source SAST Gosec.

## How to use with Smithy

### Open-Source

```yaml
# file ./my-workflow/workflow.yml
description: Workflow scanning with gosec
name: gosec
components:
  - component: ghcr.io/smithy-security/smithy/manifests/components/targets/git-clone:v1.3.2
  - component: ghcr.io/smithy-security/smithy/manifests/components/scanners/gosec:v1.2.3
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
2. Find Gosec in the Scanners section. Click to add it to the workflow.
3. Run the workflow as normal.

## Options

This component does not accept options.
