---
sidebar_custom_props:
  icon: "/img/components/python-bandit.png"
title: 'Python Bandit'
description: 'SAST scanner that analyses Python source code to look for security issues.'
sidebar_position: 3
---

# Bandit

This scanner runs the popular Python SAST Bandit, translates results to OCSF and
sends them downstream for processing.

## How to use with Smithy

### Open-Source

1. Add the component to the workflow:

```yaml
# file: ./my-workflow/workflow.yaml
description: Semgrep based workflow
name: semgrep
components:
  - component: ghcr.io/smithy-security/smithy/images/components/targets/git-clone:v1.3.2
  - component: ghcr.io/smithy-security/smithy/manifests/components/scanners/bandit:v1.1.1
  - component: ghcr.io/smithy-security/smithy/manifests/components/enrichers/custom-annotation:v0.1.1
  - component: ghcr.io/smithy-security/smithy/manifests/components/reporters/json-logger:v1.0.1
```

2. Configure the run parameters of the component in the overrides file. All
   parameters are optional:

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
2. Find Bandit in the Scanners section. Click to add it to the workflow.
3. Run the workflow as normal.

## Options

This component does not accept options.
