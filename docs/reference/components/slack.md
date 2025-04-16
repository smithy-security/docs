***

sidebar\_custom\_props:
icon: "/img/components/slack.svg"
title: 'Slack'
description: 'Reporter component that pushes a summary of a scan to a Slack channel.'
sidebar\_position: 15
---------------------

# Slack

Reporter component that pushes a summary of a scan to your Slack. Read more about
Slack [here](https://slack.com/intl/en-gb/).

## How to use

### Open-Source

There is an example workflow in the smithy repository.
After you have cloned the repo, you can run:

```bash
$ smithyctl \
  workflow run \
    --overrides-path=./examples/slack/overrides.yaml \
    --build-component-images \
      ./examples/slack/workflow.yaml
```

*Warning*: You need to configure a slack webhook before using this workflow

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Setup any workflow which should produce vulnerabilities.
3. Find the Slack component in the reporters dropdown.
4. Click on the Slack flow icon to bring the form to the top
5. Fill the form on the right with a webhook

## Options

You can configure this component with the following options. :

| Option Name                           | Description                                                                                                                            | Default                                                                                                                      | Type   |
|---------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------|--------|
| **\[Required]** slack\_webhook | The Slack webhook to send messages to. Follow this guide to generate: https://api.slack.com/messaging/webhooks                         | ""                                                                                                                           | String |
