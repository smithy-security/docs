***

sidebar\_custom\_props:
icon: "/img/components/bandit.svg"
title: 'Bandit'
description: 'Scanner that implements a SAST for Python.'
sidebar\_position: 5
--------------------

# Bandit

This scanner component runs the popular Python SAST Bandit, translates results to OCSF and sends them downstream for processing.

## How to use with Smithy

### Open-Source

There is an example workflow in the smithy repository.
After you have cloned the repo, you can run:

```bash
$ smithyctl \
  workflow run \
    --overrides-path=./examples/bandit/overrides.yaml \
    --build-component-images \
      ./examples/bandit/workflow.yaml
```

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Find Bandit in the Scanners dropdown. Click to add it to the workflow.
3. Run the workflow as normal.

## Options

This component does not accept options.
