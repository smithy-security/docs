---
title: 'Write your own Pipeline'
description: "Build your first Smithy Pipeline"
sidebar_position: 3
---

There are several example pipelines in the [/examples folder](https://github.com/smithy-security/smithy/tree/main/examples/pipelines).  
In this tutorial we are going to create our own one.  
We assume that you have already completed all steps in the [Installation](http://localhost:3000/docs/oss/installation) tutorial.  
Check where your smithyctl is, e.g. in `./bin/cmd/linux/amd64/smithyctl`.

## Summary 

Here is how we are going to create the pipeline:

1. Create a `kustomization.yaml` file pointing to the components that we want to use.
2. Write a `pipelineRun.yaml` to provide values for the pipeline run.

## Create the Pipeline

Let's assume that we want to scan a repository, which contains code written in Go.
Since we are scanning Go it makes sense to also enrich the results by detecting
duplicates and as a bonus let's also apply a [Rego](https://www.openpolicyagent.org/docs/latest/policy-language/) policy.

#### Write the Kustomization.yaml
We can compose this pipeline by writing the following `kustomization.yaml` in the smithy repository's folder:

```yaml
---
# file: go-pipeline/kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
nameSuffix: -go-pipeline
components:
  - pkg:helm/smithy-security-oss-components/base
  - pkg:helm/smithy-security-oss-components/git-clone
  - pkg:helm/smithy-security-oss-components/producer-golang-gosec
  - pkg:helm/smithy-security-oss-components/producer-golang-nancy
  - pkg:helm/smithy-security-oss-components/producer-aggregator
  - pkg:helm/smithy-security-oss-components/enricher-policy
  - pkg:helm/smithy-security-oss-components/enricher-deduplication
  - pkg:helm/smithy-security-oss-components/enricher-aggregator
  - pkg:helm/smithy-security-oss-components/consumer-stdout-json
```
In this file:
* we tell `smithyctl` that we want the pipeline pods to have the suffix
  `*-go-pipeline`
* it should base everything on the base `task.yaml` and `pipeline.yaml`
* it should start by running a `git clone` to get the code for scanning.
* it should scan the code with the `nancy` and `gosec` components.
* it should aggregate the scanning results
* it should enrich the results by applying policy and deduplicating enrichment
* it should aggregate the enriched results
* finally it should return the results as JSON

#### Change the pipeline run parameters

To run a pipeline you need a `pipelinerun.yaml` which binds values to the
component variables and instructs k8s to run the relevant pipeline.  
For our pipeline we can use the following `pipelinerun.yaml`:

```yaml
# file: ./go-pipeline/pipelinerun.yaml
---
apiVersion: tekton.dev/v1beta1
kind: PipelineRun
metadata:
  generateName: go-pipeline-
spec:
  pipelineRef:
    name: go-pipeline
  params:
  - name: git-clone-url
    value: <Your Git URL>
  - name: git-clone-subdirectory
    value: source-code
  workspaces:
  - name: output
    volumeClaimTemplate:
      spec:
        accessModes:
          - ReadWriteOnce
        resources:
          requests:
            storage: 1Gi
```

In this pipelinerun we provide the minimal values required to run the components.  
Namely, a `git-clone-url` pointing to the repository we want to clone.
You can provide more values and customize the components more by providing the
relevant values as shown in each component documentation.

## Deploy the Pipeline
Deploy the pipeline using the address of your smithyctl:
```
./bin/cmd/linux/amd64/smithyctl pipelines deploy ./go-pipeline

```

## Run the Pipeline
This pipelinerun can be triggered with:
```
kubectl create -n smithy -f ./go-pipeline/pipelinerun.yaml
```

You can monitor this pipeline's execution either in the Tekton dashboard or
using:

```
kubectl get pods -w -n smithy
```

That will result in something like:  
```cgo
smithy-golang-project-lvdsp-enricher-aggregator-pod      0/2     PodInitializing   0            2s
smithy-golang-project-lvdsp-enricher-codeowners-pod      0/2     Completed         0            7s
smithy-golang-project-lvdsp-enricher-aggregator-pod      0/2     Completed         0            4s
smithy-golang-project-lvdsp-consumer-stdout-json-pod     0/1     PodInitializing   0            1s
smithy-golang-project-lvdsp-enricher-aggregator-pod      0/2     Completed         0            6s
smithy-golang-project-lvdsp-enricher-aggregator-pod      0/2     Completed         0            6s
smithy-golang-project-lvdsp-consumer-stdout-json-pod     1/1     Running           0            2s
smithy-golang-project-lvdsp-consumer-stdout-json-pod     0/1     Completed         0            4s
```

## Get Results
Note the name of the JSON pod when you run `kubectl get pods -w -n smithy`.  
The results are in that pod's logs.  
When the Status is "completed", you can get the enriched results with:

```shell
kubectl -n smithy logs smithy-golang-project-[your-pod-code]-consumer-stdout-json-pod | jq
```

