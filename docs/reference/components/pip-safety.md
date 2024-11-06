---
sidebar_custom_props:
  icon: "/img/components/python-pip-safety.svg"
title: 'Python PIP Safety'
description: 'Producer component that scans dependencies for Python projects.'
sidebar_position: 4
---

# Python PIP Safety

This producer component scans dependencies for Python projects.
Read more about what it does on the [Python PIP Safety page](https://pypi.org/project/safety/)
and [GitHub repo](https://github.com/pyupio/safety).

## How to use with Smithy

### Open-Source

1. Add the PIP Safety Helm package to the pipeline settings:

```
---
# file: ./my-pipeline/kustomization.yaml
kind: Kustomization
components:
  - pkg:helm/smithy-security-oss-components/producer-python-pip-safety
```

2. Configure the run parameters of the component in the pipeline run file:

```
# file: ./my-pipeline/pipelinerun.yaml
---
...
spec:
  ...
  params:
  - name: producer-python-pip-safety-input-dependency-file
    value: <Path to a requirements.txt>
```

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Find the PIP Safety in the Producers dropdown.

## Options

You can configure the PIP Safety component with the following options:

| Option Name                                      | Description                                                                           | Default | Type   |
|--------------------------------------------------|---------------------------------------------------------------------------------------|---------|--------|
| producer-python-pip-safety-input-dependency-file | Path to a requirements.txt. By default it will find the one in the root of your repo. | ""      | String |
