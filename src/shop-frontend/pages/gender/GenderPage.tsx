import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomHeroSection } from "@/shop-frontend/components/CustomHeroSection"
import { ProductsGrid } from "@/shop-frontend/components/ProductsGrid"
import { useProducts } from "@/shop-frontend/hooks/useProducts"
import { useParams } from "react-router"

export const GenderPage = () => {

  const { data } = useProducts()

  const { gender } = useParams()

  const genderLabel = gender === 'men' ? 'Hombres' : gender === 'women' ? 'Mujeres' : 'Niños'

  return (
    <>
      <CustomHeroSection title={`Productos para ${genderLabel}`} />
      <ProductsGrid products={data?.products || []} />
      <CustomPagination totalPages={data?.pages || 1} />
    </>
  )
}
