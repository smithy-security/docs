---
sidebar_custom_props:
  icon: "/img/components/sobelow.png"
title: 'Sobelow'
description: 'Elixir security analysis with Sobelow.'
sidebar_position: 7
---

# Sobelow

This scanner component runs [Sobelow](https://github.com/nccgroup/sobelow), a security-focused static analysis tool for Elixir/Phoenix applications. Sobelow helps developers identify and remediate common security issues in their Elixir codebases, such as SQL injection, XSS, and insecure configuration.

## How to use with Smithy

### Open-Source

There is an example workflow in the smithy repository. After you have cloned the repo, you can run:

```bash
$ smithyctl \
  workflow run \
    --overrides-path=./examples/sobelow/overrides.yaml \
    --build-component-images \
      ./examples/sobelow/workflow.yaml
```

This will run Sobelow against your Elixir/Phoenix codebase as part of the workflow.

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Add a an advanced git or github target and configure it to point to a repository with the source code for your Elixir/Phoenix application.
3. Find Sobelow in the Scanners dropdown. Click to add it to the workflow.
4. Run the workflow as normal.
5. The results will be available in the Smithy UI, where you can review the security findings and take action as needed.

## Options

This component does not accept options.