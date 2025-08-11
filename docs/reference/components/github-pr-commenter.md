---
sidebar_custom_props:
  icon: "/img/components/github.svg"
title: 'GitHub PR Commenter'
description: 'Reporter that comments on GitHub PRs with findings in changed lines.'
sidebar_position: 15
---

# GitHub PR Commenter

This is a SaaS-only reporter component that automatically comments on GitHub Pull Requests with security findings detected by any scanner running in Smithy.
It only reports findings that are present in the PR diff (the lines changed in the PR), helping reviewers focus on actionable issues introduced or modified in the pull request.

## How to use

> **Note:**
> This component is only available in Smithy SaaS or self-hosted SaaS. It cannot be used in open-source workflows.

### SaaS

1. In the Smithy UI, open the page to create or edit a workflow.
2. Configure your workflow to include any scanner components (e.g., SAST, SCA, container scanner, etc.) that produce findings.
3. In the Reporters dropdown, find and select the GitHub PR Commenter component.
4. Fill out the required configuration form, including GitHub repository and authentication details as needed. The default configuration values accept the variables published by the github trigger events so it works out of the box for most use cases.
5. Save and run the workflow. When a PR is opened or updated, Smithy will comment on the PR with findings that are present in the lines changed by the PR.

## Options

This component is managed by Smithy SaaS and does not require user-configurable options. All configuration is handled through the Smithy UI.