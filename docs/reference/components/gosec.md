***

sidebar\_custom\_props:
icon: "/img/components/gosec.svg"
title: 'Gosec'
description: 'Scanner that runs the Gosec SAST for Go.'
sidebar\_position: 5
--------------------

# Gosec

This scanner component runs the popular open source SAST Gosec.

## How to use with Smithy

### Open-Source

There is an example workflow in the smithy repository.
After you have cloned the repo, you can run:

```bash
$ smithyctl \
  workflow run \
    --overrides-path=./examples/golang/overrides.yaml \
    --build-component-images \
      ./examples/golang/workflow.yaml
```

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Find CodeQL in the Scanners dropdown. Click to add it to the workflow.
3. Run the workflow as normal.

## Options

This component does not accept options.
