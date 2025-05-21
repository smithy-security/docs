---
sidebar_custom_props:
  icon: "/img/components/semgrep.svg"
title: 'Semgrep'
description: 'Scanner that analyses source code with Semgrep to look for security issues.'
sidebar_position: 6
---

# Semgrep

This scanner analyses source code with Semgrep to look for security issues.

Read more about what it does on the [Semgrep homepage](https://semgrep.dev/)
and [GitHub repo](https://github.com/semgrep/semgrep).

## How to use with Smithy

### Open-Source

1. Add the component to the workflow:

```
---
# file: ./my-workflow/workflow.yaml
description: Semgrep based workflow
name: semgrep
components:
- component: ghcr.io/smithy-security/smithy/images/components/targets/git-clone:v1.3.2
- component: ghcr.io/smithy-security/smithy/manifests/components/scanners/semgrep:v1.2.1
- component: ghcr.io/smithy-security/smithy/manifests/components/enrichers/custom-annotation:v0.1.1
- component: ghcr.io/smithy-security/smithy/manifests/components/reporters/json-logger:v1.0.1
```

2. Configure the run parameters of the component in the overrides file:

```
# file: ./my-workflow/overrides.yaml
git-clone:
- name: "repo_url"
  type: "string"
  value: "https://github.com/0c34/govwa.git"
- name: "reference"
  type: "string"
  value: "master"
semgrep:
- name: "ruleset"
  type: "string"
  value: "p/default"
```

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Find Semgrep in the Producers dropdown.
3. Configure the optional rules in the form

## Options

You can configure this component with the following options. The values are optional:

| Option Name                   | Description                                                                            | Default     | Type        |
|-------------------------------|----------------------------------------------------------------------------------------|-------------|-------------|
| ruleset  | Additional rules passed to Semgrep https://semgrep.dev/docs/writing-rules/rule-syntax. | "p/default" | string |
