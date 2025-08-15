---
sidebar_custom_props:
  icon: "/img/components/battlecard-printer.svg"
title: 'Battlecard Summary Printer'
description: 'Reporter component that prints findings into a summarised format.'
sidebar_position: 16
---

# Battlecard Summary Printer

The **battlecard-printer** is a Smithy reporter component
that logs a summary of vulnerability findings
in a concise "battlecard" format.
It is designed to help teams quickly understand the results of security scans,
highlighting key metrics such as total findings, enrichments, and findings by tool.

## How to use

### Open-Source

1. Add the component to the workflow:

```yaml
# file ./my-workflow/workflow.yml
description: Workflow reporting to a battlecard reporter
name: battlecard-test-workflow
components:
  - component: file://components/targets/git-clone/component.yaml
  - component: file://components/scanners/mobsfscan/component.yaml
  - component: file://components/enrichers/custom-annotation/component.yaml
  - component: file://components/reporters/battlecard-printer/component.yaml
```

2. Run the workflow with:

```bash
smithyctl workflow run ./my-workflow/workflow.yaml
```

#### Output Format

The battlecard-printer generates output similar to:

```
Battlecard Report
=================
Total Findings: 3
Enrichments:
  - bar: 1
  - foo: 1
Findings By Tool:
  - gosec: 2
  - trufflehog: 1
```

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Find the Battlecard printer component in the Reporters dropdown.
