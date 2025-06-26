---
sidebar_custom_props:
  icon: "/img/components/source-code-artifact.svg"
title: 'Source Code Artifact'
description: 'Target component that downloads and extracts archived source code from various sources.'
sidebar_position: 5
---

# Source Code Artifact

Target component that downloads and extracts archived source code from various sources including HTTP endpoints and S3-compatible storage.

The component supports `.zip`, `.tar`, and `.tar.gz` archive formats from multiple protocols and automatically extracts the contents for analysis by downstream components.

## Supported Sources

The component can download archives from:

**HTTP/HTTPS URLs:**

```
https://github.com/example/repo/archive/refs/heads/main.zip
```

**S3-compatible URLs:**

```
s3://my-bucket/my-archive.tar
gs://my-bucket/my-archive.tar.gz
```

## Supported Archive Formats

* **ZIP**: `.zip` files
* **TAR**: `.tar` files
* **TAR.GZ**: `.tar.gz` and `.tgz` files

## How to use

### Open-Source

1. Add the component to the workflow:

```yaml
# file ./examples/source-code-artifact/workflow.yml
description: Downloads and unpacks a repository and runs go scanners on it
name: source-code-artifact
components:
  - component: file://components/targets/source-code-artifact/component.yaml
  - component: ghcr.io/smithy-security/smithy/manifests/components/scanners/gosec:v1.4.0
  - component: ghcr.io/smithy-security/smithy/manifests/components/enrichers/custom-annotation:v0.2.0
  - component: ghcr.io/smithy-security/smithy/manifests/components/reporters/json-logger:v1.1.0
```

2. Configure the run parameters of the component in the overrides file:

```yaml
# file: ./examples/source-code-artifact/overrides.yaml
source-code-artifact:
  - name: "artifact_url"
    type: "string"
    value: "https://github.com/0c34/govwa/archive/refs/heads/master.zip"
  - name: "artifact_reference"
    type: "string"
    value: "master"
  - name: "artifact_registry_region"
    type: "string"
    value: "$artifact_registry_region"
  - name: "auth_id"
    type: "string"
    value: "$auth_id"
  - name: "auth_secret"
    type: "string"
    value: "$auth_secret"
```

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Find the Source Code Artifact component in the Targets dropdown.
3. Fill the form on the right

## Options

You can configure this component with the following options:

| Option Name                            | Description                                      | Default | Type   |
|----------------------------------------|--------------------------------------------------|---------|--------|
| **[Required]** artifact_url           | URL to the archive file                          |         | String |
| **[Required]** artifact_reference     | Branch, tag, or reference identifier            |         | String |
| artifact_extension                     | Extension of the artifact                        |         | String |
| artifact_registry_region               | AWS region for S3-compatible endpoints          |         | String |
| auth_id                               | Auth ID for authentication                       |         | String |
| auth_secret                           | Secret for authentication                        |         | String |

**Note:**

* For S3-compatible endpoints, `auth_id` and `auth_secret` are used as Access Key ID and Access Key secret.
* For HTTP endpoints, `auth_id` and `auth_secret` are used as username and password for basic authentication.

Check out
guidance [here](https://github.com/smithy-security/smithy/tree/main/components/targets/source-code-artifact)
to correctly set-up the options.