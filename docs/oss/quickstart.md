---
title: 'Quickstart'
description: "Get started with Smithy Open Source"
sidebar_position: 4
---

## Prerequisites

1. [Install Go](https://go.dev/doc/install)
2. [Install Docker](https://docs.docker.com/engine/install/)
3. Install smithyctl via the command line:

```bash
go install github.com/smithy-security/smithy/smithyctl@latest
```

Check where your smithyctl is, e.g. in `~/go/bin/smithyctl`.
You can find if smithyctl is in your path by running `smithyctl version`

## Run a Workflow

There are several examples in
the [/examples folder](https://github.com/smithy-security/smithy/tree/main/examples/).

To run one of them (e.g. with [Bandit](/docs/reference/components/bandit) for Python):

```bash
smithyctl workflow run \
  --overrides=./examples/bandit/overrides.yaml \
  --build-component-images=true ./examples/bandit/workflow.yaml
```

You should see the workflow results in your shell.
To run a custom workflow, check out the [next tutorial](/docs/oss/writing-workflows).
