This is a minimal reproduction repo for https://github.com/apollographql/apollo-client/issues/7338

How to reproduce:

* `cd server`, `yarn install`, `yarn start`
* (from the base directory) `yarn install`, `yarn start`

Expected result:

When the "name" state is set via the input, the query should be refetched with a new value for the `name` header.

Actual result:

When the "name" state is set via the input, the query is not refetched.