import { shopifyAuthenticatedFetch } from './lib/utils';
import { products as QueryProducts } from './lib/handlers';
import type { ProductsQuery } from './lib/types/admin.generated';

const suffix: string = 'kit-package-metafields';
const productsWithTemplate: string[] = [];

async function run(cursor: string | null = null) {
  const response = await shopifyAuthenticatedFetch<ProductsQuery>(QueryProducts, {
    first: 250,
    after: cursor,
  });
  const products = response.data.products.edges;
  const pageInfo = response.data.products.pageInfo;

  const { endCursor, hasNextPage } = pageInfo;

  products.forEach((product) => {
    if (product.node.templateSuffix === suffix) {
      productsWithTemplate.push(product.node.title);
    }
  });

  console.log('Products with Template Suffix:', productsWithTemplate.length);
  if (hasNextPage) {
    console.log('Fetching next page', endCursor);
    await run(endCursor);
  }
}

async function getProductsWithTemplate() {
  console.log('-----------------------------------------------');
  console.log('Fetching all products');
  console.log('Searching for products with template suffix', suffix);

  await run();
  return productsWithTemplate;
}

async function main() {
  const productsWithTemplate = await getProductsWithTemplate();
  console.log('-----------------------------------------------');
  console.log('Products with Template Suffix Found:', productsWithTemplate.length);
  console.log('-----------------------------------------------');
  console.log(productsWithTemplate.join(', '));
  console.log('-----------------------------------------------');
}

main();
