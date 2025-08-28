---
sidebar_custom_props:
  icon: "/img/components/smithy.svg"
title: 'Issues, Locations and Vulnerabilities'
description: 'How smithy stores cybersecurity scan data'
sidebar_position: 5
---

# Data Hierarchy for Smithy Scan Results

The Smithy SaaS uses a special data structure
to reduce noise and manage cybersecurity findings.
You can see the Smithy findings in the UI after you run a workflow.

When you run a workflow, all results are initially stored in a Findings table.
This is the same as the open source.
Then the SaaS deduplication service processes them.

If you disable the Deduplication Enricher in the UI,
you will not see the issues in the Smithy frontend.
The raw findings will be sent to the workflow reporters instead.

## Findings

When a scanner runs, it produces findings.  
These are unfiltered results.  
Every time a scan runs, it will raise a finding on every detected vulnerability in the code.   
These are stored in the `findings` table and are not displayed in the frontend.

Then the [Smithy Intelligence data enricher](/docs/reference/components/data-enricher-frontend)
service ensures the findings are sorted as follows:

## Vulnerabilities

After the Deduplication runs, it parses and de-duplicates
findings into **Vulnerabilities**.  
These are classified by being related to the same issue, the same asset,
the same target, and the same location.   
Meta-data also get stored, e.g. how many times it has been seen and
what workflow runs detected it.   
These are then stored in the vulnerability table, and served in the frontend
on the Vulnerabilities page.

![Vulnerabilities - screenshot](/img/instructions/vulnerabilities.png)

## Locations

**Locations** are vulnerabilities grouped by their
target, asset, and issue.  
These are not represented in the database directly,
but are shown on the Issue’s Details page.  
For example, the same issue can be seen in several different repos and files.

![Locations - screenshot](/img/instructions/locations.png)

## Issues

Also created by the Deduplication step,
these are a high level grouping
by the tool provided rule ID: e.g. G0112
(in the raw data, this is known as 'findingInfo'->>'uid' )  
This is stored in the issues table, and shown on the Issues page.

![Issues - screenshot](/img/instructions/issues.png)

# Issue status

When a new vulnerability is found, its status is "ToDo" by default.
It will show up in any reporters.

If you set it to Dismissed or Resolved in the Smithy UI,
it will become hidden from the Smithy UI by default.
It will also not be raised again if you run the same tool on the same target.

![Change Issue status - screenshot](/img/instructions/change-issue-status.png)

# Deleting locations

You can delete issue locations from your instance.
If you delete all locations associated with an Issue,
the parent issue is deleted automatically.  
The findings table remains unchanged,
so all issues are available if you need an audit log later.
They will just be hidden from the UI and reporters.

This is useful during the initial setup, because it means that
if you are testing with the same fake vulnerability repeatedly,
you can delete it and re-raise it.

The ability to do this can be disabled with a system flag,
so we can switch it off when Smithy goes live for you (if you wish).

![Delete location - step 1 - screenshot](/img/instructions/delete-location-step-1.png)
![Delete location - step 2 - screenshot](/img/instructions/delete-location-step-2.png)
![Delete location - step 3 - screenshot](/img/instructions/delete-location-step-3.png)

# Difference from Smithy Open Source

The open source only populates the findings table.
Deduplication is not applied when you run an open source workflow.