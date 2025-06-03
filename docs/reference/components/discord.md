---
sidebar_custom_props:
    icon: "/img/components/discord.svg"
title: 'Discord'
description: 'Discord reporter that sends messages to Discord.'
sidebar_position: 17
---

# Discord

Discord reporter that sends messages to Discord..

## How to use

### Open-Source

1. Add the component to the workflow:

```yaml
# file ./my-workflow/workflow.yml
description: Workflow reporting to Discord
name: discord
components:
  - component: ghcr.io/smithy-security/smithy/manifests/components/targets/git-clone:v1.3.2
  - component: ghcr.io/smithy-security/smithy/manifests/components/scanners/gosec:v1.2.3
  - component: ghcr.io/smithy-security/smithy/manifests/components/scanners/nancy:v1.2.2
  - component: ghcr.io/smithy-security/smithy/manifests/components/enrichers/custom-annotation:v0.1.2
  - component: ghcr.io/smithy-security/smithy/manifests/components/reporters/discord:v0.0.3
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
discord:
  - name: "channel_id"
    type: "string"
    value: "$channel_id"
  - name: "auth_token"
    type: "string"
    value: "$auth_token"
```

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Find the Discord component in the Reporters dropdown.
3. Click on the Discord flow icon to bring the form to the top
4. Fill the form on the right

## Options

You can configure this component with the following options:

| Option Name             | Description             | Default | Type   |
|-------------------------|-------------------------|---------|--------|
| **\[Required]** channel\_id | The Discord channel id. |     | String |
| **\[Required]** auth\_token | The Discord auth token. |    | String |

Check out guidance [here](https://github.com/smithy-security/smithy/tree/main/components/reporters/discord)
to correctly set-up the options.
