---
sidebar_custom_props:
  icon: "/img/components/pdf.svg"
title: 'PDF document'
description: 'Consumer component that prints findings into a PDF document.'
sidebar_position: 17
---

# PDF

Consumer component that prints findings a PDF document. It then pushes the PDF into an AWS S3 bucket.

## How to use

### Open-Source

1. Add the Helm package to the pipeline settings:

```
---
# file: ./my-pipeline/kustomization.yaml
kind: Kustomization
components:
  - pkg:helm/smithy-security-oss-components/consumer-pdf
```

2. Configure the run parameters of the component in the pipeline run file:

```
# file: ./my-pipeline/pipelinerun.yaml
---
...
spec:
  params:
  - name: consumer-pdf-s3-access-key-id
    value: <Your S3 access key ID>
  - name: consumer-pdf-s3-secret-access-key
    value: <Your S3 access key>
  - name: consumer-pdf-s3-bucket-name
    value: <Your S3 bucket name>
  - name: consumer-pdf-s3-bucket-region
    value: <Your S3 bucket region>
  - name: consumer-pdf-template-location
    value: <path to your pdf template in HTML>
```

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Find the PDF component in the Consumers dropdown.
3. Click on the PDF flow icon to bring the form to the top
4. Fill the form on the right

## Options

You can configure this component with the following options. The options that have a default value are optional:

| Option Name                                      | Description                       | Default                                      | Type   |
|--------------------------------------------------|-----------------------------------|----------------------------------------------|--------|
| **[Required]** consumer-pdf-s3-access-key-id     | Your S3 access key ID             |                                              | String |
| **[Required]** consumer-pdf-s3-secret-access-key | Your S3 access key                |                                              | String |
| **[Required]** consumer-pdf-s3-bucket-name       | Your S3 bucket name               |                                              | String |
| **[Required]** consumer-pdf-s3-bucket-region     | Your S3 bucket region             |                                              | String |
| consumer-pdf-template-location                   | Path to your PDF template in HTML | "/app/components/consumers/pdf/default.html" | String |
