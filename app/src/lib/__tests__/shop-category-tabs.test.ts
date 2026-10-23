import { describe, it, expect } from 'vitest';
import { categories, products } from '@/data/catalog';
import { filterProducts, resolveCategoryKeysFromSlug } from '../shop';

/** Regression: every Shop category tab must list products from the bundled catalog. */
describe('shop category tabs against the bundled catalog', () => {
  it.each(categories.map((c) => [c.slug, c] as const))('tab "%s" lists >0 products', (slug) => {
    const keys = resolveCategoryKeysFromSlug(categories, slug);
    const result = filterProducts(products, keys, '');
    const expected = products.filter((p) => p.categoryId === slug).length;
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBe(expected);
  });

  it('"all" lists the whole catalog', () => {
    expect(filterProducts(products, resolveCategoryKeysFromSlug(categories, 'all'), '')).toHaveLength(products.length);
  });

  it('tab counts sum to the catalog size', () => {
    const sum = categories.reduce(
      (n, c) => n + filterProducts(products, resolveCategoryKeysFromSlug(categories, c.slug), '').length,
      0,
    );
    expect(sum).toBe(products.length);
  });

  it('category + search combine', () => {
    const r = filterProducts(products, resolveCategoryKeysFromSlug(categories, 'rolling-papers'), 'raw');
    expect(r.length).toBeGreaterThan(0);
    expect(r.every((p) => p.categoryId === 'rolling-papers')).toBe(true);
  });
});
