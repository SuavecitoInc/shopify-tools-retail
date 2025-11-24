import { shopifyAuthenticatedFetch } from './lib/utils';
import { products as QueryProducts } from './lib/handlers';
import type { ProductsQuery } from './lib/types/admin.generated';

const excludedVariants: string[] = [];

async function run(cursor: string | null = null) {
  const response = await shopifyAuthenticatedFetch<ProductsQuery>(QueryProducts, {
    first: 250,
    after: cursor,
  });
  const products = response.data.products.edges;
  const pageInfo = response.data.products.pageInfo;

  const { endCursor, hasNextPage } = pageInfo;

  products.forEach((product) => {
    product.node.variants.edges.forEach((variant) => {
      if (variant.node.excludeOnline?.value === 'true') {
        excludedVariants.push(variant.node.sku);
      }
    });
  });

  console.log('Excluded Variants:', excludedVariants.length);
  if (hasNextPage) {
    console.log('Fetching next page', endCursor);
    await run(endCursor);
  }
}

async function getExcludedVariants() {
  console.log('-----------------------------------------------');
  console.log('Fetching all products');
  console.log('Searching for excluded variants');

  await run();
  return excludedVariants;
}

function compareWithExcludedList() {
  const currentlyExcluded = ''.split(', ').filter((sku) => sku.length > 0);
  if (currentlyExcluded.length === 0) {
    console.log('No SKUs found in the current exclude list to compare against.');
    return;
  }
  // find the difference, i.e. the SKUs that are in currentlyExcluded but not in excludedVariants
  const difference = currentlyExcluded.filter((sku) => !excludedVariants.includes(sku));
  console.log('-----------------------------------------------');
  console.log('SKUs in the current exclude list but not found as excluded:', difference.length);
  console.log('-----------------------------------------------');
  console.log(difference.join(', '));
}

async function main() {
  const excludedVariants = await getExcludedVariants();
  console.log('-----------------------------------------------');
  console.log('Excluded Variants Found:', excludedVariants.length);
  console.log('-----------------------------------------------');
  console.log('Copy and paste the above list of SKUs to the exclude list in the Shopify Theme Settings');
  console.log('-----------------------------------------------');
  console.log(excludedVariants.join(', '));
  console.log('-----------------------------------------------');
  compareWithExcludedList();
}

main();
