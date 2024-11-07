---
sidebar_custom_props:
  icon: "/img/components/elasticsearch.svg"
title: 'ElasticSearch'
description: 'Consumer component that pushes findings to an ElasticSearch database.'
sidebar_position: 14
---

# ElasticSearch

Consumer component that pushes findings to an ElasticSearch instance. Read more about
ElasticSearch [here](https://kagi.com/search?q=elasticsearch).

## How to use

### Open-Source

1. Add the Helm package to the pipeline settings:

```
---
# file: ./my-pipeline/kustomization.yaml
kind: Kustomization
components:
  - pkg:helm/smithy-security-oss-components/consumer-elasticsearch
```

2. Configure the run parameters of the component in the pipeline run file:

```
# file: ./my-pipeline/pipelinerun.yaml
---
...
spec:
  params:
  - name: consumer-elasticsearch-url
    value: <Your ES URL>
  - name: consumer-elasticsearch-description-template
    value: <Your description template>
  - name: consumer-elasticsearch-api-key
    value: <ES API key>
  - name: consumer-elasticsearch-index-name
    value: <ES index to push to>
  - name: consumer-elasticsearch-cloud-id
    value: <ES cloud ID>
```

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Find the ElasticSearch component in the Consumers dropdown.
3. Click on the ElasticSearch flow icon to bring the form to the top
4. Fill the form on the right

## Options

You can configure this component with the following options:

| Option Name                                 | Description                                                        | Default | Type   |
|---------------------------------------------|--------------------------------------------------------------------|---------|--------|
| consumer-elasticsearch-url                  | URL of your ElasticSearch instance                                 | ""      | String |
| consumer-elasticsearch-description-template | A Go Template string describing how to show Raw or Enriched issues | ""      | String |
| consumer-elasticsearch-api-key              | API key for your ElasticSearch instance                            | ""      | String |
| consumer-elasticsearch-index-name           | The index in ElasticSearch to push results to                      | ""      | String |
| consumer-elasticsearch-cloud-id             | The cloud id in ElasticSearch to contact results to                | ""      | String |
