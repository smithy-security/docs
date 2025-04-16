***

sidebar\_custom\_props:
icon: "/img/components/cdxgen.svg"
title: 'CDXGen'
description: 'Scanner component that generates a CycloneDX SBOM from source code.'
sidebar\_position: 5
--------------------

# CDXGEN

This scanner component generates
a [CycloneDX](https://cyclonedx.org/) [SBOM](https://scribesecurity.com/sbom/#definition-of-software-bill-of-materials)
from source code.

Read more about what it does on the [CDXgen homepage](https://cyclonedx.github.io/cdxgen/#/)
and [GitHub repo](https://github.com/CycloneDX/cdxgen).

After generating the SBOM cdxgen sends it to a remote Dependency Track.
This component does not do anything else currently.

## How to use with Smithy

### Open-Source

There is an example workflow in the smithy repository.
After you have cloned the repo, you can run:

```bash
$ smithyctl \
  workflow run \
    --overrides-path=./examples/cdxgen/overrides.yaml \
    --build-component-images \
      ./examples/cdxgen/workflow.yaml
```

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Find the CDXGEN in the Producers dropdown.
3. Configure the parameters in the form on the right

## Options

You can configure this component with the following options. The options that have a default value are optional:

| Option Name                                | Description                                                                                                                                                                                                            | Default | Type             |
|--------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|------------------|
| backend\_server\_url                   | Dependency Track API URL (at the time of writing the api and the frontend have different ports) | ""      | String |
| api\_key              |  Dependency Track API  Key | "" | String    |
| project\_name               | Project Name as it appears on Dependency Track | ""      | String           |
| project\_version| Project Version as it appears on Dependency Track or empty if you want a new one created | "" | String |
