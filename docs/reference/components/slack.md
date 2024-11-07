---
sidebar_custom_props:
  icon: "/img/components/slack.svg"
title: 'Slack'
description: 'Consumer component that pushes findings to a Slack channel.'
sidebar_position: 15
---

# Slack

Consumer component that pushes findings to your Slack. Read more about
Slack [here](https://slack.com/intl/en-gb/).

## How to use

### Open-Source

1. Add the Helm package to the pipeline settings:

```
---
# file: ./my-pipeline/kustomization.yaml
kind: Kustomization
components:
  - pkg:helm/smithy-security-oss-components/consumer-slack
```

2. Configure the run parameters of the component in the pipeline run file:

```
# file: ./my-pipeline/pipelinerun.yaml
---
...
spec:
  params:
  - name: consumer-slack-webhook
    value: <Your Slack webhook URL>
  - name: consumer-slack-message-template
    value: <Your Slack message template>
```

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Find the Slack component in the Consumers dropdown.
3. Click on the Slack flow icon to bring the form to the top
4. Fill the form on the right

## Options

You can configure the Jira component with the following options:

| Option Name                     | Description                                                                                                                            | Default                                                                                                                      | Type   |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------|--------|
| consumer-slack-webhook          | The Slack webhook to send messages to. Follow this guide to generate: https://api.slack.com/messaging/webhooks                         | ""                                                                                                                           | String |
| consumer-slack-message-template | The message template to use when sending messages to Slack. You can use: `<scanID>`, `<scanStartTime>`, `<numResults>`, `<newResults>` | ```Smithy scan <scanID>, started at <scanStartTime>, completed with <numResults> findings, out of which, <newResults> new``` | String |
