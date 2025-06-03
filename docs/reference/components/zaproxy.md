---
sidebar_custom_props:
   icon: "/img/components/zap.svg"
title: 'ZAP'
description: 'Scanner that runs the Open Source DAST ZAP.'
sidebar_position: 2
---

# ZAP

This scanner scans websites for vulnerabilities.
It supports both authenticated and unauthenticated scans.

## How to use with Smithy

### Open-Source

```yaml
# file: ./my-workflow/workflow.yaml
description: ZAP based workflow
name: zap
components:
  - component: ghcr.io/smithy-security/smithy/manifests/components/scanners/zaproxy:v1.11.3
  - component: ghcr.io/smithy-security/smithy/manifests/components/enrichers/custom-annotation:v0.1.2
  - component: ghcr.io/smithy-security/smithy/manifests/components/reporters/json-logger:v1.0.2
```

2. Configure the run parameters of the component in the overrides file

```yaml
zaproxy:
  - name: target
    type: string
    value: "https://opencre.org/"
  - name: scan_duration_mins
    type: string
    value: "11"
  - name: login_url
    type: string
    value: ""
  - name: logout_url
    type: string
    value: ""
  - name: username
    type: string
    value: ""
  - name: password
    type: string
    value: ""
```

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Find ZAP in the scanners dropdown.
3. \[Optional] If you want to do an authenticated scan: Set the url where the
   login form is and any credentials.
4. Set the target domain or base url

## Options

You can configure this component with the following options. :

| Option Name            | Description                                              | Default | Type   |
|------------------------|----------------------------------------------------------|---------|--------|
| **\[Required]** target | Target to scan                                           | ""      | String |
| username               | if it's an authenticated scan: the username              | ""      | String |
| password               | if it's an authenticated scan: the password              | ""      | String |
| login\_url             | if it's an authenticated scan: the url of the login form | ""      | String |
