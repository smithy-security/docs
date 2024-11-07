---
sidebar_custom_props:
  icon: "/img/components/semgrep.svg"
title: 'Semgrep'
description: 'Producer component that analyses source code with Semgrep to look for security issues.'
sidebar_position: 6
---

# Semgrep

This producer component analyses source code with Semgrep to look for security issues.

Read more about what it does on the [Semgrep homepage](https://semgrep.dev/)
and [GitHub repo](https://github.com/semgrep/semgrep).

## How to use with Smithy

### Open-Source

1. Add the Helm package to the pipeline settings:

```
---
# file: ./my-pipeline/kustomization.yaml
components:
  - pkg:helm/smithy-security-oss-components/producer-semgrep
```

2. Configure the run parameters of the component in the pipeline run file. All parameters are optional:

```
# file: ./my-pipeline/pipelinerun.yaml
---
...
spec:
...
  params:
  - name: producer-semgrep-rules-yaml
    value: |
      rules: []
  - name: producer-semgrep-config-value
    value: auto
```

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Find the CDXGEN in the Producers dropdown.
3. Configure the parameters in the form on the right

## Options

You can configure this component with the following options:

| Option Name                   | Description                                                                            | Default     | Type        |
|-------------------------------|----------------------------------------------------------------------------------------|-------------|-------------|
| producer-semgrep-rules-yaml   | Additional rules passed to Semgrep https://semgrep.dev/docs/writing-rules/rule-syntax. | "rules: []" | YAML string |
| producer-semgrep-config-value | The config for the Semgrep producer. Passed directly to the CLI via `--config`         | "auto"      | String      |
