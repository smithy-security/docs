---
sidebar_custom_props:
  icon: "/img/components/github.svg"
title: 'Git Intelligence Enricher'
description: 'Enricher component adds Git Intelligence Enrichments to findings, so they can be better deduplicated.'
---

# Git Intelligence Enricher

This Enricher improves deduplication for the user. Its Enrichments are used by the deduplication engine. It is specifically used to enhance the deduplication
**across multiple runs**.

## How to use

This enricher is automatically enabled and will not require any configuration through the UI. Its use depends on whether deduplication is enabled.

## How it works

On each run, the Enricher:

1. Takes the generated git diff between the current branch and the main branch (or the last scanned commit).
2. Analyzes all findings that are present in the code on the current workflow branch. A finding is analyzed further only if its code has not changed in the diff.
3. Tracks how insertions/deletions above those findings shift line numbers and calculates the updated line numbers of the finding.
4. Adds a
   `GitHistory` Enrichment that links the current finding to its earlier location so the deduplication engine treats them as the
   *same* vulnerabilities across runs.

### Example

* **Run 1:** a finding at `views.py:85`.
* You add \~`5` lines at the top of the file.
* **Run 2:** the same code now lives at `views.py:90`.
* The Enricher maps old → new location, so you don’t get a duplicate.

### Notes of Caution

* The Enrichments will only be added when a git diff is available to the Enricher.
* If the lines of a finding themselves are changed in the diff, it will not be analyzed further.
* File renames/moves are supported when Git records them.

## Result

You can see
`GitHistory` Enrichments in the logs when the Enricher is running. Also, the quality of deduplication should improve as a result of the Enricher running and improving the data that powers the deduplication.
