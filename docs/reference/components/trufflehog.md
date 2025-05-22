---
sidebar_custom_props:
  icon: "/img/components/trufflehog.svg"
title: 'Trufflehog'
description: 'Scanner that runs the open source secrets scanner `trufflehog`.'
sidebar_position: 2
---

# Trufflehog

This scanner looks for secrets in Git repositories, chats, wikis, logs, API
testing platforms, object stores, filesystems and more.
Read more about what it does on
the [Trufflehog homepage](https://trufflesecurity.com/trufflehog)
and [GitHub repo](https://github.com/trufflesecurity/trufflehog).

## How to use with Smithy

### Open-Source

1. Add the component to the workflow:

```yaml
# file ./my-workflow/workflow.yml
description: Trufflehog based workflow
name: trufflehog
components:
  - component: ghcr.io/smithy-security/smithy/images/components/targets/git-clone:v1.3.2
  - component: ghcr.io/smithy-security/smithy/manifests/components/scanners/trufflehog:v1.1.1
  - component: ghcr.io/smithy-security/smithy/manifests/components/enrichers/custom-annotation:v0.1.1
  - component: ghcr.io/smithy-security/smithy/manifests/components/reporters/json-logger:v1.0.1

```

2. Configure the run parameters of the component in the overrides file:

```yaml
# file: ./my-pipeline/pipelinerun.yaml
git-clone:
  - name: "repo_url"
    type: "string"
    value: "https://github.com/0c34/govwa.git"
  - name: "reference"
    type: "string"
    value: "master"

```

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Find the Trufflehog in the scanners dropdown.

## Options

This component does not accept options
