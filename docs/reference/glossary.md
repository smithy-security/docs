---

title: 'Glossary'
description: 'Read what all the terms mean'
sidebar_position: 1
---

# Glossary

This is the language of the Smithy platform. If you have any questions, please
contact us
on <a href="mailto:info@smithy.security">info@smithy.security</a>.

## Component

A Smithy component is a containerised set of mini-tasks, which takes some input
and produces some output.\
The components can be produced by Smithy, or a 3rd party, or you can make your
own. We aim to keep them:

* minimal, so they are testable
* with sane defaults, so that users can get started quickly and with little
  noise

There are several types of components, depending on functionality:

### Target Component

These components fetch the artefact that you need to run an analysis. That might
be your code, file, Docker container or they may login to a cloud instance for
later analysis.

### Scanner Component

These components scan a target and produce some result from it. For example,
they can tell you how your code is
vulnerable, generate an SBOM, notify you of a code smell or check if it contains
any secrets.

### Enricher Component

These components get the results from the scanners and make them easier to use
for your specific need.
That might mean deduplicating repeated results, recommending training, showing
standardisation requirements, adding more
context using an LLM, or other goodies.

### Filter Component

A filter component adds a singular annotation to every findig that matches a
patter.
For example a filter could be adding the "Filtered" annotation to all findings
with priority Low or Medium.
Reporters skip findings with the "Filtered" annotation.

### Reporter Component

These components take the results from the enrichers or filters, and they send
them to your preferred
display platform. That might be Jira, Slack, Kibana, DefectDojo, or even just a
simple JSON output.

You can see the open-source Smithy components
on [Smithy's GitHub](https://github.com/smithy-security/smithy/tree/main/components).\
You can also write your own.

## Workflow

A Smithy workflow is a collection of components, which you order to do a job for
you.\
E.g. you can create a workflow if you want to scan your monorepo for security
issues and notify your team every time a
new problem is found. To create a workflow, please read the
instructions [here](/docs/oss/writing-workflows.md).

Smithy enables you to create various workflows really quickly, so you can match
them to your requirements.
You can find examples
on [Smithy's GitHub](https://github.com/smithy-security/smithy/tree/main/examples/pipelines).

## Workflow Stage

Each workflow consists of a queue of stages. They match the component types.
Each type of components run in parallel,
but the stages are strictly sequential:

1. Run all Target components in parallel
2. Run all Scanner components in parallel
3. Run all Enricher components in parallel
4. Run all Filter components in parallel
5. Run all Reporter components in parallel

## Instance (or Run)

A Smithy Instance is just one run of a workflow. For example, if you run your Go
scanning pipeline twice, you
would get two different instances.\
You can add custom component settings every time you run an instance, by editing
the `overrides.yaml` with
your preferred component parameters. The available parameters for every
component are in
the [docs](/docs/category/components).

## SaaS Trigger

Triggers allow you to scale and automate your workflows.
With them you can run workflows when:

- you push code in **any/all** of your organisation's repositories
- you push code to a branch in your Git repository
- you push code to a Git Pull Request (or Merge request)
- you push a new image or a tag to a container registry

The trigger creates an event, which automatically populates the parameters
of a target component, and then runs the workflow with that. Some triggers
get events from third-party systems (Github, Gitlab, Azure), so your
workflows can run automatically when they fire.

Triggers are only available in the Smithy SaaS.