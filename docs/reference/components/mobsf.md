---
sidebar_custom_props:
  icon: "/img/components/mobsf.svg"
title: 'MobSF'
description: 'SAST Scanner for mobile applications.'
sidebar_position: 5
---

# MobSF

This scanner component runs the popular open source SAST for mobile applications
MobSF. It can scan APK and Swift IPA files from an artefact target.

## How to use with Smithy

### Open-Source

1. Add the component to the workflow

```yaml
# file: ./my-workflow/workflow.yaml
description: Nancy based workflow
name: mobsfscan
components:
  - component: ghcr.io/smithy-security/smithy/images/components/targets/git-clone:v1.3.4
  - component: ghcr.io/smithy-security/smithy/manifests/components/scanners/mobsf:v0.0.4
  - component: ghcr.io/smithy-security/smithy/manifests/components/enrichers/custom-annotation:v0.1.2
  - component: ghcr.io/smithy-security/smithy/manifests/components/reporters/json-logger:v1.0.2
```

2. Configure the run parameters of the artefact target component in the overrides file:

```yaml
# file: ./my-workflow/overrides.yaml
source-code-artifact:
  - name: "artifact_url"
    type: "string"
    value: "https://github.com/prateek147/DVIA-v2/releases/download/v2.0/DVIA-v2-swift.ipa"
  - name: "artifact_repository_url"
    type: "string"
    value: "https://github.com/prateek147/DVIA-v2"
  - name: "artifact_id"
    type: "string"
    value: "DVIA-v2-swift.ipa"
  - name: "artifact_reference"
    type: "string"
    value: "main"
```

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Add a an Artefact target and configure it to point to a file with the
   compiled file for a mobile application (see the example above).
3. Find MobSF in the Scanners dropdown. Click to add it to the workflow.
4. Run the workflow as normal.

## Options

You can configure this component with the following options:

| Option Name                                 | Description                                              | Default | Type   |
|---------------------------------------------|----------------------------------------------------------|---------|--------|
| **\[Required]** client_request_timeout      | General timeout for operations (s)	                      | 10      | Number |
| **\[Required]** client_max_retries          | Maximum retry attempts                                   | 5       | Number |
| **\[Required]** client_retry_delay          | Delay between retries (s)	                               | 10      | Number |
| **\[Required]** startup_timeout             | Maximum time to wait for startup (s)                     | 30      | Number |
| **\[Required]** scan_completion_max_backoff | Maximum backoff duration for scan completion retries (s) | 200     | Number |

Check out
guidance [here](https://github.com/smithy-security/smithy/blob/main/components/scanners/mobsf/scanner/README.md)
to correctly set-up the options.
