---
title: 'Glossary'
description: 'Read what all the terms mean'
sidebar_position: 1
---

# Glossary

This is the language of the Smithy platform. If you have any questions, please contact us
on <a href="mailto:info@smithy.security">info@smithy.security</a>.

## Component

A Smithy component is a containerised set of mini-tasks, which takes some input and produces some output.  
The components can be produced by Smithy, or a 3rd party, or you can make your own. We aim to keep them minimal, so they
are testable.  
There are several types of components, depending on functionality:

### Source Component

These components fetch the artefact that you need to scan. That might be your code, file or Docker container.

### Producer Component

These components scan your code/containers and produce some result from it. They can tell you how your code is
vulnerable, generate an SBOM, notify you of a code smell or check if it contains any secrets.

### Enricher Component

These components get the results from the producers and make them easier to use for your specific need. That might
mean to deduplicating the repeated results, recommending training, showing standardisation requirements, adding more
context using an LLM, or other goodies.

### Consumer Component

These components take the results from the enrichers and sources, and they send them to your preferred
display platform. That might be Jira, Slack, Kibana, DefectDojo, or even just a simple JSON output.

You can see the open-source Smithy components
on [Smithy's GitHub](https://github.com/smithy-security/smithy/tree/main/components).  
You can also write your own.

## Pipeline

A Smithy pipeline is a collection of components, which you order to do a job for you.  
E.g. you can create a pipeline if you want to scan your monorepo for security issues and notify your team every time a
new problem is found. To create a pipeline, please read the instructions [here](/docs/oss/writing-pipelines).

Smithy enables you to create multiple various pipelines really quickly, so you can match them to your requirements.
You can find example pipelines
on [Smithy's GitHub](https://github.com/smithy-security/smithy/tree/main/examples/pipelines).

## Pipeline Stage

Each pipeline consists of a queue of stages. They match the component types. Each type of components run in parallel,
but
the stages are strictly sequential:

1. Run all Source components in parallel
2. Run all Producer components in parallel
3. Run all Enricher components in parallel
4. Run all Consumer components in parallel

## Instance

A Smithy Instance is just one run of a pipeline. For example, if you run your Go scanning pipeline twice, you
would get two different instances.  
You can add custom component settings every time you run an instance, by editing the `pipelinerun.yaml` with
your preferred component parameters. The available parameters for every component are in
the [docs](/docs/category/components).

