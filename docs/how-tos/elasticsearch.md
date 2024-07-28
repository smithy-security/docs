# Accessing the Kibana Dashboard

Dracon ships with an instance of Elastic Search to store results in. We can use Kibana to explore it through a UI.

## Port-Forward the Kibana Pod

```bash
kubectl -n dracon port-forward svc/dracon-kb-http 5601:5601
```

## Get the Credentials

To log in to Kibana you need credentials. The username is `elastic`. You can retrieve the password by running:

```bash
kubectl -n dracon get secret dracon-es-elastic-user \
    -o=jsonpath='{.data.elastic}' | \
    base64 -d &&\
    echo
```

## Explore the Kibana Dashboard

And that's it! Now we can explore the Kibana Dashboard by navigating to http://localhost:5601/ in our browser and logging in with the credentials from above.

To see any data that was created by Dracon we can use the `Discover` feature in Kibana. Click on `Analytics > Discover` on the homepage or [follow this link](http://localhost:5601/app/discover#).

### Add a New Data View

Then, we need to create a new data view. We only need to do this once.

1. Click on the data dropdown, by default it will say something like `kibana_sample_data_...`
2. Click on `Create a data view`
   1. Name it `dracon`
   2. Under `timestamp field` select `scan_start_time`
   3. Click `Create data view`

You should now see your data.

:::tip

If you can't see any data, try changing the date filter in the top right corner to e.g. `Last 7 days`.

:::
