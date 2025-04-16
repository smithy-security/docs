***

sidebar\_custom\_props:
icon: "/img/components/pdf.svg"
title: 'PDF document'
description: 'Reporter component that prints findings into a PDF document.'
sidebar\_position: 17
---------------------

# PDF

Reporter component that prints findings a PDF document. It then pushes the PDF into an AWS S3 bucket.

## How to use

### Open-Source

There is an example workflow in the smithy repository.
After you have cloned the repo, you can run:

```bash
$ smithyctl \
  workflow run \
    --overrides-path=./examples/pdf/overrides.yaml \
    --build-component-images \
      ./examples/pdf/workflow.yaml
```

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Find the PDF component in the Reporters dropdown.
3. Click on the PDF flow icon to bring the form to the top
4. Fill the form on the right

## Options

You can configure this component with the following options. The options that have a default value are optional:

| Option Name                                      | Description                       | Default                                      | Type   |
|--------------------------------------------------|-----------------------------------|----------------------------------------------|--------|
| **\[Required]** aws\_access\_key\_id     | Your S3 access key ID             |                                              | String |
| **\[Required]** aws\_secret\_access\_key | Your S3 access key                |                                              | String |
| **\[Required]** bucket\_name       | Your S3 bucket name               |                                              | String |
| **\[Required]** bucket\_region     | Your S3 bucket region             |                                              | String |
