---
sidebar_custom_props:
  icon: "/img/components/artefact-trigger.svg"
title: 'Artefact'
description: 'Artefact trigger - target any artefact file'
sidebar_position: 5
---

# Artefact Trigger

This trigger is only available in the Smithy SaaS.

The Artefact trigger is the simplest way to set up a workflow if you are trying to scan artefacts. An artefact can be a zip with a repo, an SBOM file, sarif.json or any other artefact.
When you add this trigger to your workflow,
a [source-code-artifact](https://docs.smithy.security/docs/reference/components/source-code-artifact) component is added automatically behind the scenes.

We can load your artefacts from an AWS S3 bucket.
If you are scanning a public file, you don't need to supply a region, username and token.

One trigger can target multiple Artefacts. If it does, each one is
a separate target and will launch a separate run.

This trigger can only be launched manually.

## Global component settings

Go to the /integrations page and find the source-code-artifact.
You need to set it up with the following settings:

```
URL: {{ {{ .context.trigger.event.url }}  
Region: {{ .context.trigger.event.region }}  
Username: {{ .context.trigger.auth.username }}  
Password: {{ .context.trigger.auth.token }}  
```

## Trigger Settings

When you add the artefact trigger to a workflow, you will get a modal with a form:

**Artefact URL**: The HTTP or HTTPS URL of the artefact. You can have multiple.
**Region**: AWS region.    
**Auth ID**: Auth ID for AWS.  
**Token**: Token for access to AWS. You can use a templated secret,
with the template format `{{ secret "MY_TOKEN"}}`.
Secrets are managed in Settings > Secrets.

Here is what the trigger looks like when you set it up correctly:

![Artefact trigger settings screenshot](/img/instructions/artefact-trigger-settings.png)

## Running the workflow

To run a workflow with this trigger, press "Launch Workflow" on the workflow
page. You will get a choice of which targets you want to
scan. Then each selected target will launch into its own Run.
