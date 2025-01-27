---
sidebar_custom_props:
  icon: "/img/components/pdf.svg"
title: 'PDF document'
description: 'Consumer component that prints findings into a PDF document.'
sidebar_position: 17
---

# PDF

Consumer component that prints findings a PDF document. It then pushes the PDF
into an AWS S3 bucket.

## How to use

### Your S3 bucket

On AWS, create a new s3 bucket.
Then create a system user via IAM, where you only give that user access to
the S3 buckets.
Get that user's access key ID and secret

### Open-Source

1. Configure the run parameters of the component in the component's .env file:

```
---
# file: ./new-components/reporters/pdf/.env
AWS_ACCESS_KEY_ID=''
AWS_SECRET_ACCESS_KEY=''
BUCKET_NAME='pdf-consumer-test'
BUCKET_REGION='eu-north-1'
SKIP_S3_UPLOAD=false
```

2. Add the component to the pipeline's docker-compose:

```
# file: ./new-components/docker-compose.yaml
---
...
  pdf-reporter:
    build:
      context: reporters/pdf
      dockerfile: Dockerfile
    platform: linux/amd64
    env_file:
      - reporters/pdf/.env
    depends_on:
      enricher:
        condition: service_completed_successfully
```

3. Run your pipeline with
   `docker-compose up --build --force-recreate --remove-orphans`

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Find the PDF component in the Consumers dropdown.
3. Click on the PDF flow icon to bring the form to the top
4. Fill the form on the right

## Options

You can configure this component with the following options in your .env
file, or in the docker-compose:

| Environment Variable     | Type   | Required | Default | Description                                                          |
|--------------------------|--------|----------|---------|----------------------------------------------------------------------|
| AWS\_ACCESS\_KEY\_ID     | string | yes      | -       | Your S3 access key ID for a user that has write access to the bucket |
| AWS\_SECRET\_ACCESS\_KEY | string | yes      | -       | Your S3 access key for a user that has write access to the bucket    |
| BUCKET\_NAME             | string | yes      | -       | Your S3 bucket name, e.g. "test-bucket"                              |
| BUCKET\_REGION           | string | yes      | -       | Your S3 bucket region, e.g. "us-west-1"                              |
| SKIP\_S3\_UPLOAD         | bool   | yes      | false   | Skip the upload to S3, for local debugging                           |
