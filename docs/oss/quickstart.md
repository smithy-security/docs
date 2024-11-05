---
title: "Quickstart"
description: "Run your first Smithy Workflow"
sidebar_position: 2
---
# Quickstart 

With this tutorial we will learn how to execute a Pipeline on Smithy.  
You will need to [install](http://localhost:3000/docs/oss/installation) Smithy locally first.  
Check where your smithyctl is, e.g. in `./bin/cmd/linux/amd64/smithyctl`.

## Summary

Following the steps below, we'll deploy an example Golang project
pipeline which will:

* Clone a public [GitHub repository](https://github.com/sqreen/go-dvwa.git) with some vulnerable Golang code. 
* Scan the repository with [gosec](https://github.com/securego/gosec)
  and [nancy](https://github.com/sonatype-nexus-community/nancy)
* Enrich the findings with [CODEOWNERS](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners) annotation
* Show the enriched results in JSON format

## Deploy the pipeline

1. Configure the pipeline settings in [/examples/pipelines/golang-project/pipelinerun.yaml](https://github.com/smithy-security/smithy/blob/main/examples/pipelines/golang-project/pipelinerun.yaml). E.g Set the target repository in the `git-clone-url`
   parameter.
2. Check where your `smithyctl` is, inside the Smithy repository root. If you are using linux, it is in `./bin/cmd/linux/amd64/smithyctl`
3. Deploy the pipeline using the address of your smithyctl:
```
./bin/cmd/linux/amd64/smithyctl pipelines deploy ./examples/pipelines/golang-project
```

## Execute the pipeline

Execute the pipeline with:
```
kubectl create -n smithy -f ./examples/pipelines/golang-project/pipelinerun.yaml
```
You should get a response that the pipeline started, e.g.: `"pipelinerun.tekton.dev/smithy-golang-project-7wf7f created"`

## Look at it go

You can follow the progress of the pipeline by checking
`Pods`, `PipelineRuns` and `TaskRuns` on `smithy`'s namespace.

Pipelines (`PipelineRuns`) are executed by multiple Tasks (`TaskRuns`)
which are deployed in containers running in pods.

You can monitor the status of a pipeline by executing:

```shell
kubectl get pipelineruns -w -n smithy
NAME                          SUCCEEDED   REASON    STARTTIME   COMPLETIONTIME
smithy-golang-project-7hqmc   True        Succeeded 24m         14m
```

And of its tasks by executing:

```shell
kubectl get taskruns -w -n smithy
NAME                                                 SUCCEEDED   REASON      STARTTIME   COMPLETIONTIME
smithy-golang-project-7hqmc-base                     True        Succeeded   27m         26m
smithy-golang-project-7hqmc-consumer-stdout-json-pod True        Succeeded   23m         23m
smithy-golang-project-7hqmc-enricher-aggregator      True        Succeeded   24m         23m
smithy-golang-project-7hqmc-enricher-codeowners      True        Succeeded   24m         24m
smithy-golang-project-7hqmc-git-clone                True        Succeeded   27m         25m
smithy-golang-project-7hqmc-producer-aggregator      True        Succeeded   24m         24m
smithy-golang-project-7hqmc-producer-golang-gosec    True        Succeeded   25m         24m
smithy-golang-project-7hqmc-producer-golang-nancy    True        Succeeded   25m         24m
```

Finally, monitor the pods executing such tasks by executing:

```shell
kubectl get pods -w -n smithy
NAME                                                     READY   STATUS      RESTARTS   AGE
smithy-es-default-0                                      1/1     Running     0          24m
smithy-golang-project-7hqmc-base-pod                     0/1     Completed   0          22m
smithy-golang-project-7hqmc-consumer-stdout-json-pod     0/1     Completed   0          19m
smithy-golang-project-7hqmc-enricher-aggregator-pod      0/2     Completed   0          19m
smithy-golang-project-7hqmc-enricher-codeowners-pod      0/2     Completed   0          19m
smithy-golang-project-7hqmc-git-clone-pod                0/2     Completed   0          22m
smithy-golang-project-7hqmc-producer-aggregator-pod      0/3     Completed   0          19m
smithy-golang-project-7hqmc-producer-golang-gosec-pod    0/3     Completed   0          21m
smithy-golang-project-7hqmc-producer-golang-nancy-pod    0/4     Completed   0          21m
smithy-kb-5df6fcb8c7-tsbg6                               1/1     Running     0          23m
smithy-postgresql-0                                      1/1     Running     0          25m
```

## Get Results
Note the name of the JSON pod. The results are in that pod's logs.
When its Status is completed, you can check the enriched results with:

```shell
kubectl -n smithy logs smithy-golang-project-[your-pod-code]-consumer-stdout-json-pod | jq
```

## Debug

If a task pod does not complete, you can check its logs.

Usually you can tail the logs of a failing task pod with:

```shell
kubectl logs $podName $taskName 
```

For any error that is not related with your testing, please reach out at [questions@smithy.security](mailto:questions@smithy.security).
