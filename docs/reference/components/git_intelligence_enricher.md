---  
sidebar_custom_props:  
  icon: "/img/components/smithy.svg"  
title: 'Git Intelligence Enricher'  
description: 'Enricher component adds Git Intelligence enrichments to findings, so they can be better deduplicated.'  
sidebar_position: 19
---  

# Git Intelligence Enricher

This Enricher is mostly used internally to deduplicate findings across multiple runs. It adds Git Intelligence enrichments to findings.

## How to use

This enricher is automatically enabled and will not require any configuration through the UI, depending on whether deduplication is enabled.

## How it works

Currently, the Enricher relies on V1 of the Git-Intelligence library. This V1 is focused on analyzing the `diff` that `git` produces across different states in a repository. This is likely subject to change, but as of now, only the `git diff` is analyzed.

<details>
  <summary>💡 The `git diff`</summary>

  The Git diff is a file that gets created when comparing two different states of a repository. It gives information about the changes between two different states of the Git repository.

  It can be created by running `git diff commit_hashA..commit_hashB`. The commit hashes can be stated explicitly or implicitly (e.g., by putting the names of branches you want to compare, for which Git then uses the `HEAD` of each).
</details>

## What the enricher can and can't do:
The analysis of the diff allows us to deduce whether a piece of code has been shifted by changes made in the lines above and, if so, how. However, this does **NOT** allow us to deduce what happened to lines that were actually changed.

Let me show you a quick example of how a Git diff looks and the cases we can cover with it. 

### Example - good case:

We have two files, `old_state.txt`, representing the old state, and `new_state.txt`, representing the changed or _new_ version of the same file.
```
old_state.txt:                           new_state.txt:
1                                        1 bar
2 foo                                    2 baz
                                         3 
                                         4 foo
```
The `git diff` between those two files (or states) therefore looks like this:
```diff
--- a/old_state.txt
+++ b/new_state.txt
@@ -1,2 +1,4 @@
+bar
+baz
 
 foo

```

Here it is really obvious that the line with the content `foo` has been moved down two lines by analyzing this `git diff`, as we have two additions happening before the line of interest.

<details>
  <summary>💡 What the `git diff` tells us in the good case:</summary>

  The Git diff tells us how an unchanged line has been moved up or down in the code between the two points of reference that the `git diff` is comparing.

</details>

### Example - bad case:

Now let's look at what the library currently struggles with. Let's say you have two files again. This time there are two additions, as in the example above, but also one line that has been changed. The line `2` in `old_state.txt` was not only shifted down but also changed.

```
old_state.txt:                           new_state.txt:
1                                        1
2 foo                                    2 baz
3                                        3 bar
4                                        4 food
5                                        5
6                                        6
                                         7
                                         8
```

To our human eyes, it is fairly obvious that two lines were inserted into the file **above** the line `foo` / `food`. However, if you look at the Git diff, it becomes less obvious.

```diff
--- a/old_state.txt
+++ b/new_state.txt
@@ -1,5 +1,7 @@
 
-foo
+baz
+bar
+food
```

By looking at the diff, there is no way of telling if the removed line `foo` was reintroduced as `baz`, `bar`, or `food`. Simply because the diff does not have any context of the actual changes happening, but only compares files. 

So for this change, we could not even tell if the line `foo` has moved zero, one, or two lines down.

This is something we will be able to answer in the future, but for now, it is something we cannot answer based solely on the `git diff`.

## Result

You can see `Git History` enrichments in the logs when the Enricher is running. Also, as mentioned above, the quality of deduplication should improve as a result of the Enricher running and improving the data that powers the deduplication. 
