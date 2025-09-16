---
sidebar_custom_props:
  icon: "/img/components/linear.svg"
title: 'Linear'
description: 'Linear reporter that opens issues on Linear based on the given findings.'
---

# Linear

Linear reporter that opens issues on Linear based on the given findings.

## How to use

### Open-Source

1. Add the component to the workflow:

```yaml
# file ./my-workflow/workflow.yml
description: Workflow reporting to linear
name: linear
components:
  - component: ghcr.io/smithy-security/smithy/manifests/components/targets/git-clone:v1.3.2
  - component: ghcr.io/smithy-security/smithy/manifests/components/scanners/gosec:v1.2.3
  - component: ghcr.io/smithy-security/smithy/manifests/components/scanners/nancy:v1.2.2
  - component: ghcr.io/smithy-security/smithy/manifests/components/enrichers/custom-annotation:v0.1.2
  - component: ghcr.io/smithy-security/smithy/manifests/components/reporters/linear:v0.0.3
```

2. Configure the run parameters of the component in the overrides file:

```yaml
# file: ./my-workflow/overrides.yaml
git-clone:
  - name: "repo_url"
    type: "string"
    value: "https://github.com/sqreen/go-dvwa"
  - name: "reference"
    type: "string"
    value: "master"
linear:
  - name: "api_key"
    type: "string"
    value: "$api_key"
  - name: "team_id"
    type: "string"
    value: "$team_id"
  - name: "issue_labels"
    type: "string"
    value: "$issue_labels"
  - name: "base_url"
    type: "string"
    value: "$base_url"
```

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Find the Linear component in the Reporters dropdown.
3. Fill the form on the right

## Options

You can configure this component with the following options. The options that
have a default value are optional:

| Option Name              | Description                                                                                                                                                               | Default                        | Type   |
|--------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------|--------|
| **\[Required]** api\_key | The Linear API key                                                                                                                                                        |                                | String |
| **\[Required]** team\_id | The team id (uuid). You can figure this out following the guidance [here](https://github.com/smithy-security/smithy/tree/main/components/reporters/linear/test/get-teams) |                                | String |
| issue\_labels            | The labels to be used on your tickets                                                                                                                                     |                                | String |
| base\_url                | Linear's base url for graphql API                                                                                                                                         | https://api.linear.app/graphql | String |
