---
sidebar_custom_props:
   icon: "/img/components/defectdojo.svg"
title: 'Defect Dojo'
description: 'Reporter that pushes findings to a DefectDojo instance.'
sidebar_position: 18
---

# Defect Dojo

This reporter pushes findings to a DefectDojo instance. Read more about
DefectDojo [here](https://www.defectdojo.org/).

## How to use

### Open-Source

```yaml
# file ./my-workflow/workflow.yml
description: Workflow scanning with gosec
name: defectdojo
components:
- component: ghcr.io/smithy-security/smithy/manifests/components/targets/git-clone:v1.3.2
- component: ghcr.io/smithy-security/smithy/manifests/components/scanners/gosec:v1.2.3
- component: ghcr.io/smithy-security/smithy/manifests/components/scanners/nancy:v1.2.2
- component: ghcr.io/smithy-security/smithy/manifests/components/enrichers/custom-annotation:v0.1.2
- component: ghcr.io/smithy-security/smithy/manifests/components/reporters/defectdojo:v0.4.2
```

2. Configure the run parameters of the component in the overrides file

```yaml
# file: ./my-workflow/overrides.yaml
git-clone:
- name: "repo_url"
  type: "string"
  value: "https://github.com/0c34/govwa.git"
- name: "reference"
  type: "string"
  value: "master"
defectdojo:
  - name: "dojo_user"
    type: "string"
    value: ""
  - name: "dojo_api_key"
    type: "string"
    value: ""
  - name: "dojo_api_url"
    type: "string"
    value: ""
  - name: "dojo_product_id"
    type: "string"
    value: ""
```

*Warning*: You need to configure secrets and other parameters for defectdojo in
order for the workflow to work.

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Configure any workflow that produces vulnerabilities (e.g. sast, sca,
   container scanner etc)
3. Find the defect dojo component in the reporters dropdown.
4. Click on the DefectDojo flow icon to bring the form to the top
5. Fill the form on the right

## Options

You can configure this component with the following options. The options that
have a default value are optional:

| Option Name                       | Description                                                                                           | Default | Type   |
|-----------------------------------|-------------------------------------------------------------------------------------------------------|---------|--------|
| **\[Required]** dojo\_user        | the user id for the defect dojo user who's api key you will supply below                              |         | String |
| **\[Required]** dojo\_api\_key    | the api key for the remote defect dojo instance                                                       |         | String |
| **\[Required]** dojo\_api\_url    | the url for the **api** for the remote defect dojo instance                                           |         | String |
| **\[Required]** dojo\_product\_id | the product id for the remote defect dojo under which an engagement will be created with the findings |         | String |
