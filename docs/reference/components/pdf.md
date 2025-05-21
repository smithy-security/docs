---
sidebar_custom_props:
  icon: "/img/components/pdf.svg"
title: 'PDF document'
description: 'Reporter that prints findings into a templated PDF document.'
sidebar_position: 17
---

# PDF

Reporter component that prints findings in a templated PDF document.
It then pushes the PDF into an AWS S3 bucket.

## How to use

### Open-Source

1. Add the component to the workflow:

```
# file ./my-workflow/workflow.yml
description: Workflow reporting to a pdf
name: pdf
components:
- component: ghcr.io/smithy-security/smithy/manifests/components/targets/git-clone:v1.3.2
- component: ghcr.io/smithy-security/smithy/manifests/components/scanners/gosec:v1.2.2
- component: ghcr.io/smithy-security/smithy/manifests/components/scanners/nancy:v1.2.1
- component: ghcr.io/smithy-security/smithy/manifests/components/enrichers/custom-annotation:v0.1.1
- component: ghcr.io/smithy-security/smithy/manifests/components/reporters/pdf:v1.0.1
```

2. Configure the run parameters of the component in the overrides file:

```
# file: ./my-workflow/overrides.yaml
git-clone:
- name: "repo_url"
  type: "string"
  value: "https://github.com/sqreen/go-dvwa"
- name: "reference"
  type: "string"
  value: "master"
pdf:
- name: "aws_access_key_id"
  type: "string"
  value: "Your key id here"
- name: "aws_secret_access_key"
  type: "string"
  value: "Your key here"
- name: "bucket_name"
  type: "string"
  value: ""
- name: "bucket_region"
  type: "string"
  value: ""
```

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Find the PDF component in the Reporters section.
3. Fill the form.

## Options

You can configure this component with the following options. The options that have a default value are optional:

| Option Name  | Description | Default | Type |
|--------------------------------------------------|-----------------------------------|----------------------------------------------|--------|
| **[Required]** aws_access_key_id| Your S3 access key ID | | String |
| **[Required]** aws_secret_access_key | Your S3 access key | | String |
| **[Required]** bucket_name | Your S3 bucket name | | String |
| **[Required]** bucket_region     | Your S3 bucket region | | String |
