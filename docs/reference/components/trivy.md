---
sidebar_custom_props:
  icon: "/img/components/trivy.svg"
title: 'Trivy'
description: "Scanner that runs Aquasec's Trivy against a container image."
sidebar_position: 6
---

# Trivy

This scanner component analyses containers with `trivy` to look for security
issues.

## How to use with Smithy

### Open-Source

1. Add the component to the workflow:

```yaml
# file ./my-workflow/workflow.yml
description: Trufflehog based workflow
name: trufflehog
components:
  - component: ghcr.io/smithy-security/smithy/manifests/components/targets/image-get:v1.1.15
  - component: ghcr.io/smithy-security/smithy/manifests/components/scanners/trivy:v1.2.3
  - component: ghcr.io/smithy-security/smithy/manifests/components/enrichers/custom-annotation:v0.1.1
  - component: ghcr.io/smithy-security/smithy/manifests/components/reporters/json-logger:v1.0.1

```

2. Configure the run parameters of the component in the overrides file:

```yaml
# file: ./my-workflow/overrides.yaml
image-get:
  - name: image
    type: string
    value: "ubuntu:latest"
  - name: username
    type: string
    value: ""
  - name: password
    type: string
    value: ""
```

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Add the image-get target
3. Configure image-get to pull your image and optional authentication
   credentials
4. Find trivy in the Producers dropdown.
5. Run the workflow as normal

## Options

You can configure this component with the following options. The values are
optional:

| Option Name     | Description                                                                 | Default | Type   |
|-----------------|-----------------------------------------------------------------------------|---------|--------|
| image           | The image to scan, e.g. `ubuntu:latest` or `ghcr.io/smithy-security/smithy` | ""      | string |
| trivy\_username | \[Optional] The username to use to login to the remote registry             | ""      | string |
| trivy\_passowrd | \[Optional] The token to use for logging in to the remote registry          | ""      | string |
