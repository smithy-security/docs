\*\*\*\*---
sidebar\_custom\_props:
icon: "/img/components/pdf.svg"
title: 'Jira'
description: 'Jira reporter that opens issues.'
sidebar\_position: 17
---------------------

# Jira

Reporter component that prints findings a PDF document. It then pushes the PDF into an AWS S3 bucket.

## How to use

### Open-Source

There is an example workflow in the smithy repository.
After you have cloned the repo, you can run:

```bash
$ smithyctl \
  workflow run \
    --overrides-path=./examples/gosec/overrides.yaml \
    --build-component-images \
      ./examples/jira/workflow.yaml
```

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Find the Jira component in the Reporters dropdown.
3. Click on the Jira flow icon to bring the form to the top
4. Fill the form on the right

## Options

You can configure this component with the following options. The options that have a default value are optional:

| Option Name             | Description                                                                                      | Default | Type    |
|-------------------------|--------------------------------------------------------------------------------------------------|---------|---------|
| **\[Required]** base\_url | Base URL of the Jira server                                                                      |         | String  |
| **\[Required]** project  | Project in Jira where to open issues to                                                          |         | String  |
| issue\_type              | The issue type to be open                                                                        | Task    | String  |
| auth\_enabled            | Whether auth should be enabled or not                                                            | false   | Boolean |
| username                | The auth username                                                                                |         | String  |
| password                | The auth password or auth token                                                                  |         | String  |
| client\_max\_retries      | Optional parameter to configure how many times the client should retry on retryable status codes | 10      | Number  |
