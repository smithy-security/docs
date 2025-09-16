---
sidebar_custom_props:
  icon: "/img/components/sentry.svg"
title: 'Sentry'
description: 'Sentry reporter that pushes findings to Sentry.'
---

# Sentry

Sentry reporter that pushes findings to Sentry

## How to use

### Open-Source

This is a private Smithy component.

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Find the Sentry component in the Reporters dropdown.
3. Fill the form on the right

## Options

You can configure this component with the following options.

| Option Name                     | Description           | Default     | Type    |
|---------------------------------|-----------------------|-------------|---------|
| **\[Required]** sentry\_dsn     | Sentry DSN            | changeme    | String  |
| **\[Required]** sentry\_release | Sentry Release        | test        | String  |
| sentry\_environment             | Environment on Sentry | development | String  |
| debug                           | Toggle debug          | false       | Boolean |
