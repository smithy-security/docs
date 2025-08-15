---
sidebar_custom_props:
  icon: "/img/components/battlecard-printer.svg"
title: 'Battlecard Printer'
description: 'A reporter that prints a summary of items found during the scan'
sidebar_position: 3
---

# Battlecard Printer

The **battlecard-printer
** is a Smithy reporter component that logs a summary of vulnerability findings in a concise "battlecard" format. It is designed to help teams quickly understand the results of security scans, highlighting key metrics such as total findings, enrichments, and findings by tool.

## How to use with Smithy

### Open-Source

1. Add the component to the workflow:

```yaml
# file: ./my-workflow/workflow.yaml
description: A workflow that uses the battlecard component
name: battlecard
components:
  - component: ghcr.io/smithy-security/smithy/images/components/targets/git-clone:v1.3.4
  - component: ghcr.io/smithy-security/smithy/manifests/components/scanners/bandit:v1.1.2
  - component: ghcr.io/smithy-security/smithy/manifests/components/enrichers/custom-annotation:v0.1.2
  - component: ghcr.io/smithy-security/smithy/manifests/components/reporters/battlecard-printer:v0.0.1
```

2. Configure the run parameters of the component in the overrides file. All
   parameters are optional:

```yaml
# file: ./my-pipeline/pipelinerun.yaml
git-clone:
  - name: "repo_url"
    type: "string"
    value: "https://github.com/adeyosemanputra/pygoat"
  - name: "reference"
    type: "string"
    value: "master"
```

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Find the Battlecard Reporter in the Reporters section. Click to add it to the workflow.
3. Run the workflow as normal.

## Options

This component does not accept options.