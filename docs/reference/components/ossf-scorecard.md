---
sidebar_custom_props:
  icon: "/img/components/ossf-scorecard.svg"
title: 'OSSF Scorecard'
description: 'Producer component that generates scorecards for projects to show how they adhere with best practices.'
sidebar_position: 10
---

# OSSF Scorecard

This producer component generates scorecards for projects to show how they adhere with best practices.

Read more about what it does on the [OSSF homepage](https://securityscorecards.dev/)
and [GitHub repo](https://github.com/ossf/scorecard).

## How to use with Smithy

### Open-Source

1. Add the Helm package to the pipeline settings:

```
---
# file: ./my-pipeline/kustomization.yaml
components:
  - pkg:helm/smithy-security-oss-components/producer-ossf-scorecard
```

2. Configure the run parameters of the component in the pipeline run file:

```
# file: ./my-pipeline/pipelinerun.yaml
---
...
spec:
    ...
    params:
    - name: producer-ossf-scorecard-input-repo
      value: <your repo>
    - name: producer-ossf-scorecard-github-auth-token
      value: <your github auth token>
```

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Find the OSSF in the Producers dropdown.
3. Configure the parameters in the form on the right

## Options

You can configure this component with the following options:

| Option Name                                          | Description                                | Default | Type   |
|------------------------------------------------------|--------------------------------------------|---------|--------|
| [Required] producer-ossf-scorecard-input-repo        | The URL of the repository you want to scan |         | String |
| [Required] producer-ossf-scorecard-github-auth-token | Your GitHub auth token                     |         | String |
