---
sidebar_custom_props:
  icon: "/img/components/python-bandit.png"
title: 'Python Bandit'
description: 'Producer component - SAST scanner that analyses Python source code to look for security issues.'
sidebar_position: 3
---

# Python Bandit

This producer component acts as a SAST scanner that analyses Python source code to look for security issues.
Read more about it on the [Python Bandit page](https://bandit.readthedocs.io/en/latest/)
and [GitHub repo](https://github.com/PyCQA/bandit/tree/1.7.10).

## How to use with Smithy

### Open-Source

1. Add the Helm package to the pipeline settings:

```
---
# file: ./my-pipeline/kustomization.yaml
components:
  - pkg:helm/smithy-security-oss-components/producer-python-bandit
```

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Find the Python Bandit in the Producers dropdown.
