---
sidebar_custom_props:
  icon: "/img/components/cdxgen.svg"
title: 'CDXGen'
description: 'Scanner component that generates a CycloneDX SBOM from source code.'
sidebar_position: 5
--------------------

# CDXGEN

This scanner component generates
a [CycloneDX](https://cyclonedx.org/) [SBOM](https://scribesecurity.com/sbom/#definition-of-software-bill-of-materials)
from source code.

Read more about what it does on the [CDXgen homepage](https://cyclonedx.github.io/cdxgen/#/)
and [GitHub repo](https://github.com/CycloneDX/cdxgen).

After generating the SBOM cdxgen sends it to a remote Dependency Track.
This component does not do anything else currently.

## How to use with Smithy

### Open-Source

```
# file ./my-workflow/workflow.yml
description: Workflow scanning with cdxgen
name: cdxgen
components:
- component: ghcr.io/smithy-security/smithy/manifests/components/targets/git-clone:v1.3.2
- component: ghcr.io/smithy-security/smithy/manifests/components/scanners/cdxgen:v1.2.2
```

2. Configure the run parameters of the component in the overrides file

```
# file: ./my-workflow/overrides.yaml
git-clone:
- name: "repo_url"
  type: "string"
  value: "https://github.com/sqreen/go-dvwa"
cdxgen:
- name: "backend_server_url"
  type: "string"
  value: ""
- name: "api_key"
  type: "string"
  value: ""
- name: "project_name"
  type: "string"
  value: ""
- name: "project_version"
  type: "string"
  value: ""

```

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Find the CDXGEN in the Producers dropdown.
3. Configure the parameters in the form on the right

## Options

You can configure this component with the following options. The options that have a default value are optional:

| Option Name                                | Description                                                                                                                                                                                                            | Default | Type             |
|--------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|------------------|
| backend\_server\_url                   | Dependency Track API URL (at the time of writing the api and the frontend have different ports) | ""      | String |
| api\_key              |  Dependency Track API  Key | "" | String    |
| project\_name               | Project Name as it appears on Dependency Track | ""      | String           |
| project\_version| Project Version as it appears on Dependency Track or empty if you want a new one created | "" | String |
