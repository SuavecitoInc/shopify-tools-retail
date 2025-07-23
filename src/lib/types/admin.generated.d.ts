/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import type * as AdminTypes from './admin.types';

export type ProductsQueryVariables = AdminTypes.Exact<{
  first?: AdminTypes.InputMaybe<AdminTypes.Scalars['Int']['input']>;
  after?: AdminTypes.InputMaybe<AdminTypes.Scalars['String']['input']>;
}>;


export type ProductsQuery = { products: { pageInfo: Pick<AdminTypes.PageInfo, 'endCursor' | 'startCursor' | 'hasNextPage' | 'hasPreviousPage'>, edges: Array<{ node: (
        Pick<AdminTypes.Product, 'id' | 'title' | 'templateSuffix'>
        & { variants: { edges: Array<{ node: (
              Pick<AdminTypes.ProductVariant, 'id' | 'sku'>
              & { excludeOnline?: AdminTypes.Maybe<Pick<AdminTypes.Metafield, 'id' | 'value'>> }
            ) }> } }
      ) }> } };

interface GeneratedQueryTypes {
  "#graphql\n  query products($first: Int = 250, $after: String) {\n    products(first: $first, after: $after) {\n      pageInfo {\n        endCursor\n        startCursor\n        hasNextPage\n        hasPreviousPage\n      }\n      edges {\n        node {\n          id\n          title\n          templateSuffix\n          variants(first: 25) {\n            edges {\n              node {\n                id\n                sku\n                excludeOnline: metafield(namespace: \"debut\", key: \"exclude_variant_online\") {\n                  id\n                  value\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": {return: ProductsQuery, variables: ProductsQueryVariables},
}

interface GeneratedMutationTypes {
}
declare module '@shopify/admin-api-client' {
  type InputMaybe<T> = AdminTypes.InputMaybe<T>;
  interface AdminQueries extends GeneratedQueryTypes {}
  interface AdminMutations extends GeneratedMutationTypes {}
}
