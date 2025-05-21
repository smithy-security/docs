---
sidebar_custom_props:
  icon: "/img/components/snyk.png"
title: 'Snyk'
description: 'Scanner component that scans Repositories and Containers with Snyk.'
sidebar_position: 9
---

# Snyk

This is a scanner component.
This component runs snyk-cli in an image supporting all technologies that snyk-cli requires to run.
It requires a snyk token to run and you can optionally define proxies to connect to snyk through.

Read more about what it does on the [Snyk homepage](https://snyk.io/)
and [GitHub repo](https://github.com/snyk/snyk-cli).

## How to use with Smithy

### Open-Source

1. Add the component to the workflow:

```
# file ./my-workflow/workflow.yml
description: Snyk based workflow
name: snyk
components:
- component: ghcr.io/smithy-security/smithy/images/components/targets/git-clone:v1.3.2
- component: ghcr.io/smithy-security/smithy/manifests/components/scanners/snyk:v0.1.1
- component: ghcr.io/smithy-security/smithy/manifests/components/enrichers/custom-annotation:v0.1.1
- component: ghcr.io/smithy-security/smithy/manifests/components/reporters/json-logger:v1.0.1

```

2. Configure the parameter overrides of the components in the workflow overrides file.

```
# file: ./my-workflow/overrides.yaml
git-clone:
- name: "repo_url"
  type: "string"
  value: ""
- name: "reference"
  type: "string"
  value: "master"
snyk:
- name: "snyk_token"
  type: "string"
  value: ""

```

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Find Snyk in the scanners section.
3. Configure the parameters in the form

## Options

You can configure this component with the following options:

| Option Name                                 | Description                                                           | Default | Type   |
|---------------------------------------------|-----------------------------------------------------------------------|---------|--------|
| **[Required]** snyk_token | Snyk API key| | String |
