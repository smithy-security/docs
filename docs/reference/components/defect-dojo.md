---
sidebar_custom_props:
  icon: "/img/components/defectdojo.svg"
title: 'Defect Dojo'
description: 'Consumer component that pushes findings to a DefectDojo vulnerability management instance.'
sidebar_position: 18
---

# Defect Dojo

This consumer pushes findings to a DefectDojo vulnerability management instance. Read more about
DefectDojo [here](https://www.defectdojo.org/).

## How to use

### Open-Source

1. Add the Helm package to the pipeline settings:

```
---
# file: ./my-pipeline/kustomization.yaml
kind: Kustomization
components:
  - pkg:helm/smithy-security-oss-components/consumer-defectdojo
```

2. Configure the run parameters of the component in the pipeline run file:

```
# file: ./my-pipeline/pipelinerun.yaml
---
...
spec:
  params:
  - name: consumer-defectdojo-api-url
    value: <Your DefectDojo URL>
  - name: consumer-defectdojo-token
    value: <Your DefectDojo API token>
  - name: consumer-defectdojo-user
    value: <Your DefectDojo user>
  - name: consumer-defectdojo-product-id
    value: <Your DefectDojo product id>
  - name: consumer-defectdojo-description-template
    value: <Issue descruiption template>
```

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Find the DefectDojo component in the Consumers dropdown.
3. Click on the DefectDojo flow icon to bring the form to the top
4. Fill the form on the right

## Options

You can configure this component with the following options. The options that have a default value are optional:

| Option Name                                   | Description                                                                        | Default | Type   |
|-----------------------------------------------|------------------------------------------------------------------------------------|---------|--------|
| **[Required]** consumer-defectdojo-api-url    | Domain where your DefectDojo workspace is hosted                                   |         | String |
| **[Required]** consumer-defectdojo-user       | The system user who can post issues on DefectDojo                                  |         | String |
| **[Required]** consumer-defectdojo-token      | API token for access to DefectDojo                                                 |         | String |
| **[Required]** consumer-defectdojo-product-id | DefectDojo product ID if you want to create an engagement. Set as "" if not needed |         | String |
| consumer-defectdojo-description-template      | a Go Template string describing how to show Raw or Enriched issues                 | ""      | String |
