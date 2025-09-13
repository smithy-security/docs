---
title: "Customizing Components: Semgrep Example"
description: "How to customize Smithy components using Semgrep as an example"
sidebar_position: 4
---


# Customizing Smithy Components: Semgrep Example

Smithy components are defined using YAML files that specify how scanners, reporters, enrichers, filters, and other workflow elements behave. You can customize components to completely change how a tool behaves or accept user options, such as custom rules for scanners like Semgrep.

## Table of contents

- [Customizing Smithy Components: Semgrep Example](#customizing-smithy-components-semgrep-example)
  - [Table of contents](#table-of-contents)
  - [Example: Semgrep Component Customization](#example-semgrep-component-customization)
  - [Advanced Example: Using Custom Semgrep Rules in a Workflow](#advanced-example-using-custom-semgrep-rules-in-a-workflow)
    - [Option 1: Download Rules from a URL](#option-1-download-rules-from-a-url)
    - [Option 2: Look for Rules in the Source Code Repository](#option-2-look-for-rules-in-the-source-code-repository)
    - [Option 3: Upload Rulefile Contents as a Parameter](#option-3-upload-rulefile-contents-as-a-parameter)
    - [Option 4: Bake Rules into a Custom Docker Image](#option-4-bake-rules-into-a-custom-docker-image)


## Example: Semgrep Component Customization

Currently, the Semgrep component uses the default ruleset. It does allow users to specify custom rules from the free rulesets but not [pro rules](https://semgrep.dev/p/default).
Suppose you want to allow users to provide their own Semgrep Pro rules. You can add a parameter to the Semgrep component definition:

```yaml
# semgrep/component.yaml
name: semgrep
description: "Runs Semgrep then parses findings into the OCSF format"
type: scanner
parameters:
  - name: ruleset
    type: string
    value: "p/default" # Default ruleset, can be overridden
  - name: api_key
    type: string
    value: "" # API key for Semgrep Pro
steps:
	- name: run-semgrep
		image: docker.io/returntocorp/semgrep:1.80
		executable: /usr/local/bin/semgrep
		args:
		- scan
		- --metrics=off
		- --config={{.parameters.ruleset}}
		- --sarif
		- --sarif-output
		- "{{ scratchWorkspace }}/semgrep-out.sarif.json"
		- "{{ sourceCodeWorkspace }}"
    env_vars:
      SEMGREP_APP_TOKEN: "{{.parameters.api_key}}"
	- name: parser
		image: components/scanners/semgrep
		env_vars:
			SEMGREP_RAW_OUT_FILE_PATH: "{{ scratchWorkspace }}/semgrep-out.sarif.json"
		executable: /bin/app
```

In the above example, we added an `api_key` parameter to allow users to provide their Semgrep Pro API key. The `run-semgrep` step uses this key as an environment variable (`SEMGREP_APP_TOKEN`) when executing the Semgrep scan. This way, users can customize the component to use their own Semgrep Pro rulesets by providing the appropriate API key and ruleset path when configuring the workflow.

## Advanced Example: Using Custom Semgrep Rules in a Workflow

Let's now assume that we want to go a step further and allow users to provide their own custom Semgrep rules (YAML file or directory) instead of using the default or Pro rulesets. Semgrep needs to have access to these rules in the filesystem at runtime.
To achieve this we can do several things:

* Provide a URL to download the rules from (e.g., a public GitHub repo or S3 bucket)
* Look for the rules inside the source code repository being scanned (e.g., in a `.semgrep` directory)
* Allow users to upload the rulefile contents as a parameter
* Bake the rules into a custom Docker image and use that image in the component definition

In the following examples we will show how to implement all options.

### Option 1: Download Rules from a URL
You can add a `rules_url` parameter to the Semgrep component definition and modify the `run-semgrep` step to download the rules before executing Semgrep.


```yaml
# semgrep/component.yaml
name: semgrep
description: "Runs Semgrep then parses findings into the OCSF format"
type: scanner
parameters:
	- name: ruleset
		type: string
		value: "p/default" # Default ruleset, can be overridden
	- name: rules_url
		type: string
		value: "" # URL to download custom rules from
steps:
  - name: download-rules
    image: alpine:latest
    executable: /bin/sh
    args:
    - -c
    - |
      if [ -n "{{.parameters.rules_url}}" ]; then
        wget -O {{ scratchWorkspace }}/custom-rules.yaml "{{.parameters.rules_url}}"
      fi
	- name: run-semgrep
		image: docker.io/returntocorp/semgrep:1.80
		executable: /usr/local/bin/semgrep
		args:
		- scan
		- --metrics=off
		- --config={{.parameters.ruleset}}
		- --sarif
		- --sarif-output
		- "{{ scratchWorkspace }}/semgrep-out.sarif.json"
		- "{{ sourceCodeWorkspace }}"
	- name: parser
		image: components/scanners/semgrep
		env_vars:
			SEMGREP_RAW_OUT_FILE_PATH: "{{ scratchWorkspace }}/semgrep-out.sarif.json"
		executable: /bin/app
```

In this example, we added a `rules_url` parameter and a new step `download-rules` that uses `wget` to download the custom rules from the provided URL into the scratch workspace. The `run-semgrep` step can then use these rules by specifying the path to the downloaded file.

### Option 2: Look for Rules in the Source Code Repository
You can modify the `run-semgrep` step to check for a `.semgrep` directory in the source code workspace and use it if it exists. This way, users can include their custom rules directly in their code repository.

  ```yaml
  # semgrep/component.yaml
  name: semgrep
  description: "Runs Semgrep then parses findings into the OCSF format"
  type: scanner
  parameters:
    - name: ruleset
      type: string
      value: "p/default" # Default ruleset, can be overridden
  steps:
    - name: run-semgrep
      image: docker.io/returntocorp/semgrep:1.80
      executable: /bin/bash
      args:
      - -c
      - |
        if [ -d "{{ sourceCodeWorkspace }}/.semgrep" ]; then
          echo "Custom rules found in source code."
          cp -r "{{ sourceCodeWorkspace }}/.semgrep" "{{ scratchWorkspace }}/custom-rules"
          export CUSTOM_RULES="{{ sourceCodeWorkspace }}/.semgrep"
        else
          echo "No custom rules found, using default."
          export CUSTOM_RULES="{{.parameters.ruleset}}"
        fi
        /usr/local/bin/semgrep scan \
          --metrics=off \
          --config=$CUSTOM_RULES \
          --sarif \
          --sarif-output \
          "{{ scratchWorkspace }}/semgrep-out.sarif.json" \
          "{{ sourceCodeWorkspace }}"
    - name: parser
      image: components/scanners/semgrep
      env_vars:
        SEMGREP_RAW_OUT_FILE_PATH: "{{ scratchWorkspace }}/semgrep-out.sarif.json"
      executable: /bin/app
  ```

In this example, the `run-semgrep` step checks if a `.semgrep` directory exists in the source code workspace. If it does, it uses that directory as the ruleset; otherwise, it falls back to the default ruleset.

### Option 3: Upload Rulefile Contents as a Parameter
You can add a `custom_rules` parameter to the Semgrep component definition that allows users to upload the contents of their custom rules directly. The `run-semgrep` step can then write these contents to a file before executing Semgrep.  


  ```yaml
  # semgrep/component.yaml
  name: semgrep
  description: "Runs Semgrep then parses findings into the OCSF format"
  type: scanner
  parameters:
    - name: ruleset
      type: string
      value: "p/default" # Default ruleset, can be overridden
    - name: custom_rules
      type: string
      value: "" # Custom rules content
  steps:
    - name: run-semgrep
      image: docker.io/returntocorp/semgrep:1.80
      executable: /bin/bash
      args:
      - -c
      - |
        if [ -n "{{.parameters.custom_rules}}" ]; then
          echo "{{.parameters.custom_rules}}" > "{{ scratchWorkspace }}/custom-rules.yaml"
          export CUSTOM_RULES="{{ scratchWorkspace }}/custom-rules.yaml"
        else
          export CUSTOM_RULES="{{.parameters.ruleset}}"
        fi
        /usr/local/bin/semgrep scan \
          --metrics=off \
          --config=$CUSTOM_RULES \
          --sarif \
          --sarif-output \
          "{{ scratchWorkspace }}/semgrep-out.sarif.json" \
          "{{ sourceCodeWorkspace }}"
    - name: parser
      image: components/scanners/semgrep
      env_vars:
        SEMGREP_RAW_OUT_FILE_PATH: "{{ scratchWorkspace }}/semgrep-out.sarif.json"
      executable: /bin/app
  ```

In this example, we added a `custom_rules` parameter that allows users to provide the contents of their custom rules. The `run-semgrep` step writes these contents to a file in the scratch workspace and uses that file as the ruleset if provided.

### Option 4: Bake Rules into a Custom Docker Image
You can create a custom Docker image that includes your Semgrep rules and use that image in the component definition. This way, the rules are always available when the component runs.

  ```yaml
  # semgrep/component.yaml
  name: semgrep
  description: "Runs Semgrep then parses findings into the OCSF format"
  type: scanner
  steps:
    - name: run-semgrep
      image: my-custom-semgrep-image:latest # Custom image with baked-in rules
      executable: /usr/local/bin/semgrep
      args:
      - scan
      - --metrics=off
      - --config=/path/to/baked-in-rules # Path to rules in the custom image
      - --sarif
      - --sarif-output
      - "{{ scratchWorkspace }}/semgrep-out.sarif.json"
      - "{{ sourceCodeWorkspace }}"
    - name: parser
      image: components/scanners/semgrep
      env_vars:
        SEMGREP_RAW_OUT_FILE_PATH: "{{ scratchWorkspace }}/semgrep-out.sarif.json"
      executable: /bin/app
  ```

In this example, we specify a custom Docker image (`my-custom-semgrep-image:latest`) that has the Semgrep rules baked in. The `run-semgrep` step uses the path to these baked-in rules when executing Semgrep.
Now you can run your example workflow with `smithyctl workflow run --build-component-images=true --overrides=./overrides.yaml ./workflow.yaml`.

In summary, customizing Smithy components allows you to tailor the behavior of tools like Semgrep to fit your specific needs, whether by allowing user-provided rules, downloading rules from a URL, or baking them into a custom image.

