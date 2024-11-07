---
sidebar_custom_props:
  icon: "/img/components/smithy.svg"
title: 'Deduplication Enricher'
description: 'Enricher component that compares multiple inputs and removes duplicates.'
sidebar_position: 11
---

# Deduplication Enricher 

This enricher component compares multiple inputs and removes duplicates. Find out how it works on [GitHUb](https://github.com/smithy-security/smithy/tree/main/components/enrichers/deduplication)

## How to use with Smithy

### Open-Source

1. Add the Helm package to the pipeline settings:

```
---
# file: ./my-pipeline/kustomization.yaml
components:
  - pkg:helm/smithy-security-oss-components/enricher-deduplication
```

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Find the Deduplication Enricher in the Enrichers dropdown.
