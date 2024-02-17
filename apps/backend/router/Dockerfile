FROM ghcr.io/apollographql/router:v1.39.0

COPY prod-schema.graphql /dist/schema/supergraph.graphql
COPY router.yaml /dist/config/router.yaml

EXPOSE 3000

CMD [ "--dev", "-c", "config/router.yaml", "-s", "schema/supergraph.graphql", "--log", "info" ]
