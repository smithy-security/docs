***

sidebar\_custom\_props:
icon: "/img/components/codeql.svg"
title: 'CodeQL'
description: 'Scanner that runs Github CodeQL SAST.'
sidebar\_position: 5
--------------------

# CodeQL

This scanner component runs the popular SAST CodeQL.
Before running codeql, the component autodetects all languages in a repository and configures CodeQL for all of them.
The default CodeQL rules for each language are used to scan.

## How to use with Smithy

### Open-Source

There is an example workflow in the smithy repository.
After you have cloned the repo, you can run:

```bash
$ smithyctl \
  workflow run \
    --overrides-path=./examples/codeql/overrides.yaml \
    --build-component-images \
      ./examples/codeql/workflow.yaml
```

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Find CodeQL in the Scanners dropdown. Click to add it to the workflow.
3. Run the workflow as normal.

## Options

This component does not accept options.
