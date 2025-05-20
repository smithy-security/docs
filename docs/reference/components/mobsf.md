---
sidebar_custom_props:
  icon: "/img/components/mobsf.svg"
title: 'MobSFScan'
description: 'Scanner component that analyses source code for Mobile Applications to look for security issues.'
sidebar_position: 6
---

# MobSF Scan

This Scanner component analyses source code for mobile apps to look for security issues.

Read more about what it does on the [Mobsf homepage](https://github.com/MobSF/mobsfscan).

## How to use with Smithy

### Open-Source

There is an example workflow that runs MobSFscan against https://github.com/OWASP/iGoat-Swift.
You need the files `workflow.yaml` and `overrides.yaml` which you can see below

```yaml
# overrides.yaml
git-clone:
- name: "repo_url"
  type: "string"
  value: "https://github.com/OWASP/iGoat-Swift"
```

```yaml
# workflow.yaml
description: MobSFScan based workflow
name: mobsfscan
components:
- component: file://components/targets/git-clone/component.yaml
- component: file://components/scanners/mobsfscan/component.yaml
- component: file://components/enrichers/custom-annotation/component.yaml
- component: file://components/reporters/json-logger/component.yaml
```

After you install smithyctl you can run it with:

```bash
smithyctl workflow  run  --spec-path workflow.yaml --overrides-path overrides.yaml --build-component-images --debug-enabled --debug-level debug 
```

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Add a git-clone source
3. Add a MobSF scanner from the scanners dropdown.
4. Add any enrichers and consumers you need
5. Run


## Options

At this time, the component does not accept options.
If you need options please issue a PR or open a ticket.
