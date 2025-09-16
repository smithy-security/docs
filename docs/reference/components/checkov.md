---
sidebar_custom_props:
  icon: "/img/components/checkov.svg"
title: 'Checkov'
description: 'Parse SARIF reports into OCSF'
sidebar_position: 3
---

# Checkov

This component is a scanner
that parses [sarif](https://sarifweb.azurewebsites.net/) reports
by [semgrep](https://github.com/semgrep/semgrep) and converts them into [ocsf](https://github.com/ocsf) format.

## How to use with Smithy

### Open-Source

There is an example workflow in the smithy repository. After you have cloned the repo, you can run:

```bash
$ smithyctl \
  workflow run \
    --overrides-path=./examples/checkov/overrides.yaml \
    --build-component-images \
      ./examples/checkov/workflow.yaml
```

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Add an advanced git or github target and configure it to point to a repository with the source code for your application.
3. Find checkov in the Scanners dropdown. Click to add it to the workflow.
4. Run the workflow as normal.
5. The results will be available in the Smithy UI, where you can review the findings and take action as needed.

## Options

This component does not accept options.