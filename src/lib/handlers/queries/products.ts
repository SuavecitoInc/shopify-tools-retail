const query = `#graphql
  query products($first: Int = 250, $after: String) {
    products(first: $first, after: $after) {
      pageInfo {
        endCursor
        startCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          id
          title
          templateSuffix
          variants(first: 25) {
            edges {
              node {
                id
                sku
                excludeOnline: metafield(namespace: "debut", key: "exclude_variant_online") {
                  id
                  value
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default query;
