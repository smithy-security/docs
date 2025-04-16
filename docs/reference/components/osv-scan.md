***

sidebar\_custom\_props:
icon: "/img/components/osv-scan.svg"
title: 'Osv-Scan'
description: 'Dependency Scanner and deps.dev client for multiple languages, by Google.'
sidebar\_position: 5
--------------------

# Nancy

This scanner component runs the Google's open source SCA and deps.dev client.

## How to use with Smithy

### Open-Source

There is an example workflow in the smithy repository.
After you have cloned the repo, you can run:

```bash
$ smithyctl \
  workflow run \
    --overrides-path=./examples/osv-scanner/overrides.yaml \
    --build-component-images \
      ./examples/osv-scanner/workflow.yaml
```

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Add a git-clone target and configure it to point to a repository with the source code for any application.
3. Find osv-scanner in the Scanners dropdown. Click to add it to the workflow.
4. Run the workflow as normal.

## Options

This component does not accept options.
