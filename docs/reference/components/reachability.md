***

sidebar\_custom\_props:
icon: "/img/components/reachability.svg"
title: 'Reachability Enricher'
description: 'Enricher component that adds a `reachable` annotation to every finding.'
sidebar\_position: 16
---------------------

# Reachability

Enricher component that uses AppThreat's `atom` and `cdxgen` to generate call paths and tag every finding as `reachable` if there is a code path between the vulnerable method and outside the binary.

This component automatically runs for every language atom supports. Currently these are:

* Java
* Javascript
* Typescript
* PHP
* Python
* Ruby

## How to use

### Open-Source

There is an example workflow in the smithy repository.
After you have cloned the repo, you can run:

```bash
$ smithyctl \
  workflow run \
    --overrides-path=./examples/reachability/overrides.yaml \
    --build-component-images \
      ./examples/reachability/workflow.yaml
```

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Add the git-clone target and configure it to point to any repository of oyur choice
3. Add any number of sast scanners
4. Find the Reachability component in the Enrichers dropdown.
5. Run the workflow as normal

## Result

You should see the annotation in the JSON debugging output or the datalake of your choice.
