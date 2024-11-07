---
sidebar_custom_props:
  icon: "/img/components/stdout-json.svg"
title: 'Stdout JSON'
description: 'Consumer component that prints findings to stdout in JSON format.'
sidebar_position: 16
---

# Stdout JSON

Consumer component that prints the pipeline results into a log in JSON format.

## How to use

### Open-Source

1. Add the Helm package to the pipeline settings:

```
---
# file: ./my-pipeline/kustomization.yaml
kind: Kustomization
components:
  - pkg:helm/smithy-security-oss-components/consumer-stdout-json
```

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Find the Stdout JSON component in the Consumers dropdown.

## Result

The JSON results are printed into this component's pod logs.
To read it, you need to run the following while the pipeline is running:

```shell
kubectl get pods -w -n smithy
```

This will tell you the name of the stdout-json pod.
When the stdout-json pod is marked as Complete, you can read the logs with:

```shell
kubectl -n smithy logs smithy-golang-project-[your-pod-code]-consumer-stdout-json-pod | jq
```
