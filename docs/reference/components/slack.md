---
sidebar_custom_props:
   icon: "/img/components/slack.svg"
title: 'Slack'
description: 'Reporter that pushes findings to a Slack channel.'
sidebar_position: 15
---

# Slack

Reporter that pushes findings to your Slack. Read more about
Slack [here](https://slack.com/intl/en-gb/).

## How to use

### Open-Source

1. Add the component to the workflow:

```yaml
# file ./my-workflow/workflow.yml
description: Workflow reporting to slack
name: slack
components:
  - component: ghcr.io/smithy-security/smithy/manifests/components/targets/git-clone:v1.3.2
  - component: ghcr.io/smithy-security/smithy/manifests/components/scanners/gosec:v1.2.3
  - component: ghcr.io/smithy-security/smithy/manifests/components/scanners/nancy:v1.2.2
  - component: ghcr.io/smithy-security/smithy/manifests/components/enrichers/custom-annotation:v0.1.2
  - component: ghcr.io/smithy-security/smithy/manifests/components/reporters/slack:v0.4.2

```

2. Configure the parameter overrides of the components in the workflow overrides
   file.

```yaml
# file: ./my-workflow/overrides.yaml
git-clone:
  - name: "repo_url"
    type: "string"
    value: "https://github.com/sqreen/go-dvwa"
  - name: "reference"
    type: "string"
    value: "master"
slack:
  - name: "slack_webhook"
    type: "string"
    value: "Your webhook here"

```

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Find Slack in the reporters section.
3. Configure the parameters in the form

## Options

You can configure this component with the following options:

| Option Name                  | Description   | Default | Type   |
|------------------------------|---------------|---------|--------|
| **\[Required]** slack\_webhook | Slack webhook |         | String |
