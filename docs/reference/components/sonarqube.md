---
sidebar_custom_props:
    icon: "/img/components/sonarqube.svg"
title: 'SonarQube'
description: 'SonarQube scanner that uses SonarQube Cloud Edition to generate findings'
sidebar_position: 17
---

# SonarQube

SonarQube scanner that uses SonarQube Cloud Edition to generate findings.

## How to use

### Open-Source

1. Add the component to the workflow:

```yaml
# file ./my-workflow/workflow.yml
description: Sonarqube based workflow
name: sonarqube
components:
  - component: ghcr.io/smithy-security/smithy/manifests/components/targets/git-clone:v1.4.0
  - component: file://components/scanners/sonarqube/component.yaml
  - component: ghcr.io/smithy-security/private-components/manifests/components/enrichers/exploit-exists:v0.0.3
  - component: hcr.io/smithy-security/smithy/manifests/components/reporters/json-logger:v1.0.2
```

2. Configure the run parameters of the component in the overrides file:

```yaml
# file: ./my-workflow/overrides.yaml
git-clone:
  - name: "repo_url"
    type: "string"
    value: "https://github.com/sqreen/go-dvwa.git"
  - name: "reference"
    type: "string"
    value: "master"
sonarqube:
  - name: "auth_token"
    type: "string"
    value: "xxx"
  - name: "project_key"
    type: "string"
    value: "xxx"
  - name: "project_name"
    type: "string"
    value: "xxx"
  - name: "organization"
    type: "string"
    value: "xxx"
  - name: "target_repository_url"
    type: "string"
    value: "https://github.com/sqreen/go-dvwa.git"
  - name: "target_repository_reference"
    type: "string"
    value: "master"
```

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Find the SonarQube component in the Scanners dropdown.
3. Click on the SonarQube flow icon to bring the form to the top
4. Fill the form on the right

## Options

You can configure this component with the following options. The options that
have a default value are optional:

| Option Name                   | Description                                                                                                                  | Default               | Type     |
|-------------------------------|------------------------------------------------------------------------------------------------------------------------------|-----------------------|----------|
| **\[Required]** auth\_token   | The SonarQube auth token.                                                                                                    |                       | String   |
| **\[Required]** project\_key  | The project key of your SonarQube project you want to report findings to. It comes in the form `$organization_$project_name` |                       | String   |
| **\[Required]** project\_name | The project name of your SonarQube project you want to report findings to                                                    |                       | String   |
| **\[Required]** organization  | The name of your SonarQube organization.                                                                                     | https://sonarcloud.io | String   |
| host\_base\_url               | The base URL to your SonarQube cloud instance.                                                                               |                       | String   |
| target\_repository\_url       | The link of your repository generating findings.                                                                             |                       | String   |
| target\_repository\_reference | The reference of your repository generating findings.                                                                        |                       | String   |
| client\_query\_page\_size     | Page size for the batched HTTP calls to SonarQube Cloud API.                                                                 | 50                    | Integer  |
| status\_polling\_interval     | How often SonarQube Cloud API should be polled for a scheduled scan task to check if it's completed.                         | 5s                    | Duration |
| status\_polling\_max_retries  | How many attempts should be made to check if a scheduled task is completed.                                                  | 240                   | Integer  |
