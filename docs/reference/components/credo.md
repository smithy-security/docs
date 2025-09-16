---
sidebar_custom_props:
  icon: "/img/components/credo.svg"
title: 'Credo'
description: 'Elixir static code analysis with Credo.'
---

# Credo

This scanner component runs [Credo](https://github.com/rrrene/credo), a static code analysis tool for Elixir projects and parses the results into OCSF format for further processing in Smithy.
Credo helps developers identify code quality issues, enforce coding standards, and improve the overall maintainability of Elixir codebases.
It provides a wide range of checks, including code complexity, style violations, and potential bugs,

## How to use with Smithy

### Open-Source

There is an example workflow in the smithy repository. After you have cloned the repo, you can run:

```bash
$ smithyctl \
  workflow run \
    --overrides-path=./examples/credo/overrides.yaml \
    --build-component-images \
      ./examples/credo/workflow.yaml
```

This will run Credo against your Elixir codebase as part of the workflow.

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Add an advanced git or github target and configure it to point to a repository with the source code for your Elixir application.
3. Find Credo in the Scanners dropdown. Click to add it to the workflow.
4. Run the workflow as normal.
5. The results will be available in the Smithy UI, where you can review the findings and take action as needed.

## Options

This component does not accept options.