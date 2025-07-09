---
sidebar_custom_props:
    icon: "/img/components/dependency-track.svg"
title: 'Dependency-Track'
description: 'Dependency-Track reporter that uploads CycloneDX SBOMs to Dependency-Track and transforms vulnerabilities to OCSF'
sidebar_position: 18
---

# Dependency-Track

Dependency-Track reporter that uploads CycloneDX SBOMs to Dependency-Track and transforms the found vulnerabilities to OCSF format.

## How to use

### Open-Source

1. Add the component to the workflow:

```yaml
# file ./my-workflow/workflow.yml
description: Dependency-Track based workflow
name: dependency-track
components:
  - component: ghcr.io/smithy-security/smithy/manifests/components/targets/git-clone:v1.4.0
  - component: ghcr.io/smithy-security/smithy/manifests/components/scanners/cdxgen:v1.0.0
  - component: file://components/reporters/dependency-track/component.yaml
  - component: ghcr.io/smithy-security/smithy/manifests/components/reporters/json-logger:v1.0.2
```

2. Configure the run parameters of the component in the overrides file:

```yaml
# file: ./my-workflow/overrides.yaml
git-clone:
  - name: "repo_url"
    type: "string"
    value: "https://github.com/example/my-project.git"
  - name: "reference"
    type: "string"
    value: "main"
dependency-track:
  - name: "dependencytrack_base_url"
    type: "string"
    value: "https://your-dependency-track-instance.com"
  - name: "dependencytrack_api_token"
    type: "string"
    value: "your-api-token-here"
  - name: "project_name"
    type: "string"
    value: "my-project"
  - name: "project_version"
    type: "string"
    value: "1.0.0"
  - name: "sbom_file_path"
    type: "string"
    value: "/path/to/sbom.json"
```

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Find the Dependency-Track component in the Reporters dropdown.
3. Fill the form on the right

## Options

You can configure this component with the following options. The options that
have a default value are optional:

| Option Name                          | Description                                                                                           | Default | Type   |
|--------------------------------------|-------------------------------------------------------------------------------------------------------|---------|--------|
| **\[Required]** dependencytrack\_base\_url | The base URL to your Dependency-Track instance.                                                      |         | String |
| **\[Required]** dependencytrack\_api\_token | The API token for authenticating with your Dependency-Track instance.                                |         | String |
| **\[Required]** project\_name        | The name of the project in Dependency-Track where the SBOM will be uploaded.                         |         | String |
| **\[Required]** project\_version     | The version of the project in Dependency-Track where the SBOM will be uploaded.                      |         | String |
| **\[Required]** sbom\_file\_path     | The file path to the CycloneDX SBOM file that will be uploaded to Dependency-Track.                  |         | String |