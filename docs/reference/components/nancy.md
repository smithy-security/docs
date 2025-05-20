***

sidebar\_custom\_props:
icon: "/img/components/nancy.svg"
title: 'Nancy'
description: 'Dependency Scanner for Go.'
sidebar\_position: 5
--------------------

# Nancy

This scanner component runs the sonatype's open source SCA for Go, Nancy.

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
2. Add a git-clone target and configure it to point to a repository with the source code for a golang application.
3. Find Nancy in the Scanners dropdown. Click to add it to the workflow.
4. Run the workflow as normal.

## Options

This component does not accept options.
