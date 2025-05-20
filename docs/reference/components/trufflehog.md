***

sidebar\_custom\_props:
icon: "/img/components/trufflehog.svg"
title: 'Trufflehog'
description: 'Scanner component that runs the open source secrets scanner `trufflehog`.
sidebar\_position: 2
--------------------

# Trufflehog

This scanner component scans for secrets in Git repositories, chats, wikis, logs, API testing platforms, object stores, filesystems and more.
Read more about what it does on the [Trufflehog homepage](https://trufflesecurity.com/trufflehog) and [GitHub repo](https://github.com/trufflesecurity/trufflehog).

## How to use with Smithy

### Open-Source

There is an example workflow in the smithy repository.
After you have cloned the repo, you can run:

```bash
$ smithyctl \
  workflow run \
    --overrides-path=./examples/trufflehog/overrides.yaml \
    --build-component-images \
      ./examples/trufflehog/workflow.yaml
```

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Find the Trufflehog in the scanners dropdown.

## Options

This component does not accept options
