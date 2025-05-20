***

sidebar\_custom\_props:
icon: "/img/components/elasticsearch.svg"
title: 'ElasticSearch'
description: 'Reporter component that pushes findings to an ElasticSearch.'
sidebar\_position: 14
---------------------

# ElasticSearch

Reporter component that pushes findings to an ElasticSearch instance. Read more about
ElasticSearch [here](https://kagi.com/search?q=elasticsearch).

## How to use

### Open-Source

There is an example workflow in the smithy repository.
After you have cloned the repo, you can run:

```bash
$ smithyctl \
  workflow run \
    --overrides-path=./examples/elasticsearch/overrides.yaml \
    --build-component-images \
      ./examples/elasticsearch/workflow.yaml
```

*Warning*: You need to configure secrets and other parameters for elasticsearch in order for the workflow to work.

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Configure any workflow that produces vulnerabilities (e.g. sast, sca, container scanner etc)
3. Find the elasticsearch component in the reporters dropdown.
4. Click on the elasticsearch icon to bring the form to the top
5. Fill the form on the right

## Options

You can configure this component with the following options:

| Option Name                                 | Description                                                        | Default | Type   |
|---------------------------------------------|--------------------------------------------------------------------|---------|--------|
| elasticsearch\_url                  | URL of your ElasticSearch instance **Warning**: if you provisioned an elasticsearch from any cloud provider or their page, you will see their frontend "Kibana", this component needs the Elasticsearch URL not the Kibana frontend. You can find the elasticsearch url under the API Integrations menu.                                 | ""      | String |
| elasticsearch\_index | what index to write the results to | ""      | String |
| elasticsearch\_api\_key | API key for your ElasticSearch instance. The API key requires reading cluster's information in order for the  component to validate connectivity and write to any indexes you plan on using this component with. | ""      | String |
