import type { Category } from '@/types';
import type { ProductCard } from '@/lib/api';

export const INITIAL_VISIBLE_PRODUCTS = 12;
export const LOAD_MORE_STEP = 12;

export function resolveCategoryIdFromSlug(categories: Category[], selectedCategorySlug: string): string | null {
  if (selectedCategorySlug === 'all') {
    return null;
  }

  return categories.find((category) => category.slug === selectedCategorySlug)?.id ?? null;
}

/**
 * Every value a product's `categoryId` may legitimately hold for the selected
 * category. The seed (and therefore the bundled catalog and the API) stores the
 * category SLUG in `product.categoryId` (e.g. "rolling-papers"), while
 * `category.id` is numeric ("1"), so matching on id alone yields 0 results.
 */
export function resolveCategoryKeysFromSlug(categories: Category[], selectedCategorySlug: string): string[] | null {
  if (selectedCategorySlug === 'all') {
    return null;
  }
  const category = categories.find((c) => c.slug === selectedCategorySlug);
  // Unknown slug (e.g. categories not loaded yet): still try the slug itself.
  return category ? [category.id, category.slug] : [selectedCategorySlug];
}

export function filterProducts(
  products: ProductCard[],
  selectedCategory: string | string[] | null,
  searchQuery: string,
): ProductCard[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const categoryKeys = selectedCategory === null ? null : Array.isArray(selectedCategory) ? selectedCategory : [selectedCategory];

  return products.filter((product) => {
    const matchesCategory = categoryKeys === null || categoryKeys.includes(product.categoryId);
    if (!normalizedQuery) {
      return matchesCategory;
    }

    const matchesSearch = product.name.toLowerCase().includes(normalizedQuery)
      || (product.description ?? '').toLowerCase().includes(normalizedQuery);

    return matchesCategory && matchesSearch;
  });
}

export function sortProducts(products: ProductCard[], sortBy: string): ProductCard[] {
  return [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return String(b.id || '').localeCompare(String(a.id || ''));
      default:
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    }
  });
}

export function getVisibleProducts(products: ProductCard[], visibleCount: number): ProductCard[] {
  return products.slice(0, Math.max(0, visibleCount));
}

export function getNextVisibleCount(visibleCount: number): number {
  return visibleCount + LOAD_MORE_STEP;
}
