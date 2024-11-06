---
sidebar_custom_props:
  icon: "/img/components/trufflehog.svg"
title: 'Trufflehog'
description: 'Producer component that scans for secrets in repositories.'
sidebar_position: 2
---

# Trufflehog

This producer component scans for secrets in Git repositories, chats, wikis, logs, API testing platforms,
object stores, filesystems and more.
Read more about what it does on the [Trufflehog homepage](https://trufflesecurity.com/trufflehog)
and [GitHub repo](https://github.com/trufflesecurity/trufflehog).

## How to use with Smithy

### Open-Source

1. Add the Truffelhog Helm package to the pipeline settings:

```
---
# file: ./my-pipeline/kustomization.yaml
kind: Kustomization
components:
  - pkg:helm/smithy-security-oss-components/producer-trufflehog
```

2. Configure the run parameters of the component in the pipeline run file:

```
# file: ./my-pipeline/pipelinerun.yaml
---
...
spec:
  ...
  params:
  - name: producer-trufflehog-git-repository
    value: <Your Git URL>
```

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Find the Trufflehog in the Producers dropdown.

## Options

You can configure the Trufflehog component with the following options:

| Option Name                        | Description                                                  | Default | Type   |
|------------------------------------|--------------------------------------------------------------|---------|--------|
| producer-trufflehog-git-repository | Repository URL to scan, if you are not using another source. | ""      | String |
