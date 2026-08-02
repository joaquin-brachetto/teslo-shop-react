import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomHeroSection } from "@/shop-frontend/components/CustomHeroSection";
import { ProductsGrid } from "@/shop-frontend/components/ProductsGrid";
import { useProducts } from "@/shop-frontend/hooks/useProducts";



export const HomePage = () => {

  const { data } = useProducts()

  return (
    <>
      <CustomHeroSection title='Todos los productos' />
      <ProductsGrid products={data?.products || []} />
      <CustomPagination totalPages={data?.pages || 0} />
    </>
  );
};