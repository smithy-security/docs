---
sidebar_custom_props:
  icon: "/img/components/elasticsearch.svg"
title: 'ElasticSearch'
description: 'Reporter that pushes findings to an ElasticSearch instance.'
sidebar_position: 14
---

# ElasticSearch

Reporter component that pushes findings to an ElasticSearch instance. Read more
about ElasticSearch [here](https://www.elastic.co/elasticsearch).

## How to use

### Open-Source

1. Add the component to the workflow:

```yaml
# file ./my-workflow/workflow.yml
description: Workflow reporting to elasticsearch
name: elasticsearch
components:
  - component: ghcr.io/smithy-security/smithy/manifests/components/targets/git-clone:v1.3.2
  - component: ghcr.io/smithy-security/smithy/manifests/components/scanners/gosec:v1.2.3
  - component: ghcr.io/smithy-security/smithy/manifests/components/scanners/nancy:v1.2.2
  - component: ghcr.io/smithy-security/smithy/manifests/components/enrichers/custom-annotation:v0.1.2
  - component: ghcr.io/smithy-security/smithy/manifests/components/reporters/elasticsearch:v1.0.1

```

2. Configure the parameter overrides of the components in the workflow overrides
   file.

```yaml
# file: ./my-workflow/overrides.yaml
git-clone:
  - name: "repo_url"
    type: "string"
    value: "https://github.com/sqreen/go-dvwa"
  - name: "reference"
    type: "string"
    value: "master"
elasticsearch:
  - name: "elasticsearch_url"
    type: "string"
    value: "Your ES URL here"
  - name: "elasticsearch_index"
    type: "string"
    value: "Any Index"
  - name: "elasticsearch_api_key"
    type: "string"
    value: "An API Key with the rights to read cluster and write indexes"
```

*Warning*: You need to configure secrets and other parameters for elasticsearch
in order for the workflow to work.

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Configure any workflow that produces vulnerabilities (e.g. sast, sca,
   container scanner etc)
3. Find the elasticsearch component in the reporters dropdown.
   4Fill the form on the right

## Options

You can configure this component with the following options:

| Option Name             | Description                                                                                                                                                                                                                                                                                              | Default | Type   |
|-------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|--------|
| elasticsearch\_url      | URL of your ElasticSearch instance **Warning**: if you provisioned an elasticsearch from any cloud provider or their page, you will see their frontend "Kibana", this component needs the Elasticsearch URL not the Kibana frontend. You can find the elasticsearch url under the API Integrations menu. | ""      | String |
| elasticsearch\_index    | what index to write the results to                                                                                                                                                                                                                                                                       | ""      | String |
| elasticsearch\_api\_key | API key for your ElasticSearch instance. The API key requires reading cluster's information in order for the  component to validate connectivity and write to any indexes you plan on using this component with.                                                                                         | ""      | String |
