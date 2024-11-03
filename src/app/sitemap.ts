import type { MetadataRoute } from 'next';
import { createAsyncCaller } from '#server/routers';

export async function getBrandSitemap(): Promise<MetadataRoute.Sitemap> {
  const trpc = await createAsyncCaller();
  const brands = await trpc.brand.getAllBrands();

  return brands.map((brand) => ({
    url: `https://burger-wiki.vercel.app/brand/${brand.id}`,
    lastModified: brand.created_at,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));
}

export async function getBurgerSitemap(): Promise<MetadataRoute.Sitemap> {
  const trpc = await createAsyncCaller();
  const products = await trpc.product.getAllProducts();

  return products.map((product) => ({
    url: `https://burger-wiki.vercel.app/burger/${product.product_id}`,
    lastModified: product.created_at,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const brandSitemap = await getBrandSitemap();
  const burgerSitemap = await getBurgerSitemap();

  return [
    {
      url: 'https://burger-wiki.vercel.app/',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://burger-wiki.vercel.app/login',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    ...brandSitemap,
    ...burgerSitemap,
  ];
}
