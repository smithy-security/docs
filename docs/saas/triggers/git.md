---
sidebar_custom_props:
  icon: "/img/components/git-clone.svg"
title: 'Git'
description: 'Advanced Git trigger - target any repository'
sidebar_position: 1
---

# Git Advanced Trigger

This trigger is only available in the Smithy SaaS.

The Git Advanced trigger is the simplest way to set up a workflow if the target
repositories are **not** in your GitHub organisation. When you add this
trigger to your workflow,
the [git-target](https://docs.smithy.security/docs/reference/components/git-clone)
component is added automatically behind the scenes.
The [git-target](https://docs.smithy.security/docs/reference/components/git-clone)
parameters are then populated by the Git trigger with every run.

The trigger will target the default branch of each repo and scan all code
in it.

It can target private repositories if you supply your username and SSH token.

One Git trigger can target multiple repositories. If it does, each repository is
a separate target and will launch a separate run.

This trigger can only be launched manually.

## UI Settings

**Repo URL**: The HTTPS or SSH URL of a git repo. You can add multiple of
these.  
**Username**: Username on the host Git system, e.g. a github username.  
**Token**: SSH token. This is the same as the token for cloning a repo
locally. You can create one by following the
instructions [here](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent).

Here is what the trigger looks like when you set it up correctly:

![Git trigger settings screenshot](/img/instructions/git-trigger-settings.png)

## Running the workflow

To run a workflow with this trigger, press "Launch Workflow" on the workflow
page. You will get a choice of which target repositories you want to
scan. Then each selected target will launch into its own Run.

![Git trigger launch screenshot](/img/instructions/git-trigger-run.png)





