---
sidebar_custom_props:
  icon: "/img/components/osv-scanner.svg"
title: 'OSV Scanner'
description: 'Scanner that runs the OSV Scanner on your dependencies.'
---

# OSV Scanner

This component implements a scanner
that runs [osv-scan](https://google.github.io/osv-scanner/) and then parses the json reports output by into [ocsf](https://github.com/ocsf) format.
Use it to scan for vulnerable dependencies.

## How to use with Smithy

### Open-Source

```yaml
# file ./my-workflow/workflow.yml
description: Workflow scanning with OSV
name: osv
components:
  - component: ghcr.io/smithy-security/smithy/manifests/components/targets/git-clone:v1.3.2
  - component: ghcr.io/smithy-security/smithy/manifests/components/scanners/osv-scanner:v1.2.3
  - component: ghcr.io/smithy-security/smithy/manifests/components/enrichers/custom-annotation:v0.1.2
  - component: ghcr.io/smithy-security/smithy/manifests/components/reporters/json-logger:v1.0.2
```

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Find OSV Scanner in the Scanners section. Click to add it to the workflow.
3. Run the workflow as normal.

## Options

This component does not accept options.
