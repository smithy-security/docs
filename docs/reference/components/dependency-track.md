---
sidebar_custom_props:
  icon: "/img/components/dependency-track.svg"
title: 'Dependency Track'
description: 'Reporter that pushes SBOMs to Dependency Track.'
---

# Dependency Track

Reporter component that uploads CycloneDX SBOMs to
[Dependency-Track](https://dependencytrack.org/)
and transforms the found vulnerabilities to OCSF.

## How to use

### Open-Source

This component is only available in the Smithy SaaS

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Configure any workflow that produces vulnerabilities (e.g. sast, sca,
   container scanner etc)
3. Find the Dependency Track component in the reporters dropdown.
4. Fill the form on the right

## Options

You can configure this component with the following options:

| Option Name               | Description                                                      | Default | Type   |
|---------------------------|------------------------------------------------------------------|---------|--------|
| dependencytrack_base_url  | URL of your DependencyTrack instance                             | ""      | String |
| dependencytrack_api_token | API token for your DependencyTrack instance                      | ""      | String |
| project_name              | Project name on Dependency Track                                 | ""      | String |
| project_version           | Project version on Dependency Track                              | ""      | String |
| sbom_file_path            | filepath of the SBOM that you want to upload to Dependency Track | ""      | String |
