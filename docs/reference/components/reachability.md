---
sidebar_custom_props:
   icon: "/img/components/smithy.svg"
title: 'Reachability'
description: 'Enricher component that adds a `reachable` annotation to every finding.'
sidebar_position: 16
---

# Reachability

Enricher component that uses AppThreat's `atom` and `cdxgen` to generate call
paths and tag every finding as `reachable` if there is a code path between the
vulnerable method and outside the binary.

This component automatically runs for every language atom supports. Currently
these are:

* Java
* Javascript
* Typescript
* PHP
* Python
* Ruby

## How to use

### Open-Source

1. Add the component to the workflow:

```yaml
# file: ./my-workflow/workflow.yaml
description: Reachability based workflow
name: reachability
components:
  - component: ghcr.io/smithy-security/smithy/images/components/targets/git-clone:v1.3.4
  - component: ghcr.io/smithy-security/smithy/manifests/components/scanners/semgrep:v1.2.2
  - component: ghcr.io/smithy-security/smithy/manifests/components/enrichers/reachability:v0.3.2
  - component: ghcr.io/smithy-security/smithy/manifests/components/reporters/json-logger:v1.0.2
```

2. Configure the run parameters of the component in the overrides file:

```yaml
# file: ./my-pipeline/pipelinerun.yaml
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
2. Add the git-clone target and configure it to point to any repository of oyur
   choice
3. Add any number of sast scanners
4. Find the Reachability component in the Enrichers dropdown.
5. Run the workflow as normal

## Result

You should see the annotation in the JSON debugging output or the datalake of
your choice.
