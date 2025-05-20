***

sidebar\_custom\_props:
icon: "/img/components/defectdojo.svg"
title: 'Defect Dojo'
description: 'Reporter component that pushes findings to a DefectDojo vulnerability management instance.'
sidebar\_position: 18
---------------------

# Defect Dojo

This reporter pushes findings to a DefectDojo vulnerability management instance. Read more about DefectDojo [here](https://www.defectdojo.org/).

## How to use

### Open-Source

There is an example workflow in the smithy repository.
After you have cloned the repo, you can run:

```bash
$ smithyctl \
  workflow run \
    --overrides-path=./examples/defectdojo/overrides.yaml \
    --build-component-images \
      ./examples/defectdojo/workflow.yaml
```

*Warning*: You need to configure secrets and other parameters for defectdojo in order for the workflow to work.

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Configure any workflow that produces vulnerabilities (e.g. sast, sca, container scanner etc)
3. Find the defect dojo component in the reporters dropdown.
4. Click on the DefectDojo flow icon to bring the form to the top
5. Fill the form on the right

## Options

You can configure this component with the following options. The options that have a default value are optional:

| Option Name                                   | Description                                                                        | Default | Type   |
|-----------------------------------------------|------------------------------------------------------------------------------------|---------|--------|
| **\[Required]** dojo\_user    | the user id for the defect dojo user who's api key you will supply below         |         | String |
| **\[Required]** dojo\_api\_key | the api key for the remote defect dojo instance             |         | String |
| **\[Required]** dojo\_api\_url      | the url for the **api** for the remote defect dojo instance                       |         | String |
| **\[Required]** dojo\_product\_id | the product id for the remote defect dojo under which an engagement will be created with the findings |         | String |
