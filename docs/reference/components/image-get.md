---
sidebar_custom_props:
  icon: "/img/components/image-get.svg"
title: 'Image Get'
description: 'Source component that downloads a remote (OCI) container image for scanning'
sidebar_position: 1
---

# Image Get

This source component lets Smithy download a remote image from any registry.

## How to use

### Open-Source

1. Add the component to the workflow:

```yaml
# file ./my-workflow/workflow.yml
description: Trufflehog based workflow
name: trufflehog
components:
- component: ghcr.io/smithy-security/smithy/manifests/components/targets/image-get:v1.1.15
- component:  ghcr.io/smithy-security/smithy/manifests/components/scanners/trivy:v1.2.3
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
2. Find the Image-Get in the Sources dropdown.
3. Set the URL of your image on the right. If your registry requires
   authentication, set the username and password on the right.

## Options

You can configure this component with the following options. The options that
have a default value are optional:

| Option Name              | Description                                                                        | Default | Type   |
|--------------------------|------------------------------------------------------------------------------------|---------|--------|
| **\[Required]** image    | Image to download, e.g. `ubuntu:latest` or `ghcr.io/smithy-security/smithy:v1.0.0` | N/A     | String |
| **\[Optional]** username | Username to user for logging in to the registry if required                        | ""      | String |
| **\[Optional]** password | Password/Token to user for logging in to the registry if required                  | ""      | String |
