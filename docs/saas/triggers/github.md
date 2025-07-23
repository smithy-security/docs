---
sidebar_custom_props:
  icon: "/img/components/github.svg"
title: 'GitHub'
description: 'Github trigger - run workflows when something happens in GitHub'
sidebar_position: 2
---

# GitHub trigger

This trigger is only available in the Smithy SaaS.

The GitHub trigger can run workflows automatically when events happen in
your GitHub organisation. When you add this trigger to your workflow,
the [git-target](https://docs.smithy.security/docs/reference/components/git-clone)
component is added automatically behind the scenes.
The [git-target](https://docs.smithy.security/docs/reference/components/git-clone)
parameters are then populated by the GitHub trigger with every run.

You can scan all code in selected branches, the diff in Pull Requests or both. A
scan can happen automatically when a branch or PR is updated, or manually when
you run a workflow through the Smithy UI.

One Github trigger can target multiple repositories, branches and Pull Requests.
If it does, each branch or PR is a separate target and will launch a separate
run.

## Requirements

1. You need the Smithy GitHub app. It has to be installed in your GitHub
   organisation and needs to have read access to your repositories. The Smithy
   team can set that up for you during onboarding.
2. You need to be authenticated with an email or GitHub single-sign-on in
   the Smithy portal.

## UI Settings

## Global component settings

Go to the /integrations page and find the git-clone component.
You need to set it up with the following settings:

```
Reference:      {{ .context.trigger.event.reference }}
Username:       {{ .context.trigger.auth.username }}
Token:          {{ .context.trigger.auth.token }}
Base reference:	{{ .context.trigger.event.target_branch }}
Repo URL:	    https://{{ .context.trigger.event.host }}/{{ .context.trigger.event.organisation }}/{{ .context.trigger.event.repository }}
```

#### Event Type

Setup the events that cause the trigger to run a workflow.

- **Branch update**: The whole target branch will be scanned when it
  receives a new
  commit.
- **PR update**: If a PR towards the target branch receives a new
  commit, run the workflow on the _diff_ of the PR.
- **Branch update and PR update**: Run a workflow on both events.

If you run a workflow with a GitHub trigger manually, the whole code of the
target branch will be scanned.

#### Repositories

Select as many repositories as you like. If the repository you seek is not
in the list, but is part of your GitHub organisation, this might mean that
the Smithy GitHub app does not have permissions to it.
Please [contact](https://smithy.security/contact/) the
Smithy team for support.

#### Branches

You can add custom target branches here.

- If you don't add any branches, Smithy will target the default branch of each
  repo.
- If you add multiple branches, Smithy will try to target each added branch for
  each added repository. E.g. Use this if you want to scan _my-repo_ branches
  `main` and
  `develop` and _my-other-repo_ with branches `main` and `develop`.
- If you want to scan multiple different branches for different
  repositories, you can create separate GitHub triggers for them. E.g.
  Create one GitHib trigger for _my-repo_ branches
  `one` and `two` and another trigger for _my-other-repo_ with branches
  `three` and
  `four`.

Here is what the settings look like in the UI:

![Github trigger settings add - screenshot](/img/instructions/github-trigger-1.png)
![Github trigger settings set repo - screenshot](/img/instructions/github-trigger-2.png)
![Github trigger settings set branches - screenshot](/img/instructions/github-trigger-3.png)

## Running the workflow

To run a workflow manually with this trigger, press "Launch Workflow" on the
workflow page. You will get a choice of which target repositories and branches
you want to scan. Then each selected target will launch into its own Run.
Otherwise, the github app will launch the runs automatically when the events
happen on GitHub.

![Github trigger run - screenshot](/img/instructions/github-trigger-4.png)
