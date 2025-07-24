---
sidebar_custom_props:
  icon: "/img/components/smithy.svg"
title: 'Data Enricher'
description: 'Enricher component that adds details and deduplicates issues.'
sidebar_position: 16
---

# Date Enricher - deduplication

Use this enricher to deduplicate your finsings across multiple runs.

## How to use

### SaaS

Set the configurations of the deduplication component in the Integration settings to:

```
Data enricher host:	smithy-data-enricher
Data enricher port:	50051
PR ID:	            {{ .context.trigger.metadata.pr_id }}
```

## Result

Running a workflow multiple times should not report the same issues multiple times.
