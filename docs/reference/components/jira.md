---
sidebar_custom_props:
  icon: "/img/components/jira.svg"
title: 'Jira'
description: 'Consumer component that pushes findings to a Jira instance.'
sidebar_position: 13
---

# Jira

Consumer component that pushes findings to a Jira instance

## How to use

### Open-Source

1. Add the Jira Helm package to the pipeline settings:

```
---
# file: ./my-pipeline/kustomization.yaml
kind: Kustomization
components:
  - pkg:helm/smithy-security-oss-components/consumer-jira
```

2. Configure the run parameters of the component in the pipeline run file:

```
# file: ./my-pipeline/pipelinerun.yaml
---
...
spec:
  params:
  - name: consumer-jira-url
    value: <Your Jira URL>
  - name: consumer-jira-api-token
    value: <Your Jira API token>
  - name: consumer-jira-user
    value: <Your Jira user>
  - name: consumer-jira-project-name
    value: <Your Jira project name, needs to match on Jira>
  - name: consumer-jira-issue-type
    value: <Your Jira issue type, needs to match on Jira>
```

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Find the Jira component in the Consumers dropdown.
3. Click on the Jira flow icon to bring the form to the top
4. Fill the form on the right

## Options

You can configure the Jira component with the following options:

| Option Name                        | Description                                                                                                                                   | Default | Type   |
|------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|---------|--------|
| [Required] consumer-jira-url       | URL of your Jira instance                                                                                                                     |         | String |
| [Required] consumer-jira-api-token | Jira API token. See how to get one [here](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/) |         | String |
| [Required] consumer-jira-user      | The user who will be named as the ticket creator on Jira.                                                                                     |         | String |
| consumer-jira-project-name         | The Project Name parameter needs to match the project name on Jira                                                                            | ""      | String |
| consumer-jira-issue-type           | The Issue Type parameter needs to match the exact issue type of the project on Jira                                                           | "Task"  | String |