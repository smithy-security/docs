---
sidebar_custom_props:
    icon: "/img/components/jira.svg"
title: 'Jira'
description: 'Jira reporter that opens formatted issues for every non-filtered finding.'
sidebar_position: 17
---

# Jira

Reporter that opens formatted issues for every non-filtered finding.

## How to use

### Open-Source

1. Add the component to the workflow:

```yaml
# file ./my-workflow/workflow.yml
description: Workflow reporting to Jira
name: jira
components:
  - component: ghcr.io/smithy-security/smithy/manifests/components/targets/git-clone:v1.3.2
  - component: ghcr.io/smithy-security/smithy/manifests/components/scanners/gosec:v1.2.3
  - component: ghcr.io/smithy-security/smithy/manifests/components/scanners/nancy:v1.2.2
  - component: ghcr.io/smithy-security/smithy/manifests/components/enrichers/custom-annotation:v0.1.2
  - component: ghcr.io/smithy-security/smithy/manifests/components/reporters/jira:v0.1.1
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
jira:
  - name: "base_url"
    type: "string"
    value: "$baseURL"
  - name: "project"
    type: "string"
    value: "$project"
  - name: "auth_enabled"
    type: "string"
    value: "false"
  - name: "username"
    type: "string"
    value: "$username"
  - name: "password"
    type: "string"
    value: "$password"
```

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Find the Jira component in the Reporters dropdown.
3. Fill the form on the right

## Options

You can configure this component with the following options. The options that
have a default value are optional:

| Option Name               | Description                                                                                      | Default | Type    |
|---------------------------|--------------------------------------------------------------------------------------------------|---------|---------|
| **\[Required]** base\_url | Base URL of the Jira server                                                                      |         | String  |
| **\[Required]** project   | Project in Jira where to open issues to                                                          |         | String  |
| issue\_type               | The issue type to open (task, bug, something else)                                               | Task    | String  |
| auth\_enabled             | Whether auth should be enabled or not                                                            | false   | Boolean |
| username                  | The auth username                                                                                |         | String  |
| password                  | The auth password or auth token                                                                  |         | String  |
| client\_max\_retries      | Optional parameter to configure how many times the client should retry on retryable status codes | 10      | Number  |
