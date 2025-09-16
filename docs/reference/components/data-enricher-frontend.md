---
sidebar_custom_props:
  icon: "/img/components/smithy.svg"
title: "Data Enricher"
description: "Enricher component that adds details and deduplicates issues."
---

# Data Enricher - deduplication

Use this enricher to deduplicate your findings across multiple runs.

## How to use

### SaaS

Set the configurations of the deduplication component in the Integration settings to:

```
Data enricher host: smithy-data-enricher
Data enricher port: 50051
PR ID:              {{ .context.trigger.metadata.pr_id }}
```

> **Note:**
> This enricher is required for Smithy Intelligence to work. It processes and analyzes your findings into actionable issues.
> Disabling it means you won't see any Issues from workflows without deduplication.

## Result

Running a workflow multiple times should not report the same issues multiple times.
