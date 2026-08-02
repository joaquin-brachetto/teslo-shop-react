import { useQuery } from "@tanstack/react-query"
import { useParams, useSearchParams } from "react-router"
import { getProductsAction } from "../actions/get-products.action"

export const useProducts = () => {

    const { gender } = useParams()

    const [searchParams] = useSearchParams()

    const limit = Number(searchParams.get('limit')) || 9;
    const page = Number(searchParams.get('page')) || 1;
    const offset = (page - 1) * limit;
    const sizes = searchParams.get('sizes') || undefined;
    const price = searchParams.get('price') || 'any';
    const query = searchParams.get('query') || undefined;


    let minPrice = undefined
    let maxPrice = undefined

    switch (price) {
        case 'any':
            break;
        case '0-50':
            minPrice = 0;
            maxPrice = 50;
            break
        case '50-100':
            minPrice = 50;
            maxPrice = 100;
            break
        case '100-200':
            minPrice = 100;
            maxPrice = 200;
            break
        case '+200':
            minPrice = 200;
            maxPrice = undefined
            break
    }


    return useQuery({
        queryKey: ['products', { offset, limit, gender, sizes, minPrice, maxPrice, query }],
        queryFn: () => getProductsAction({
            limit: isNaN(+limit) ? 9 : limit,
            offset: isNaN(offset) ? 1 : offset,
            gender,
            sizes,
            minPrice,
            maxPrice,
            query,
        }),
        staleTime: 1000 * 60 * 5
    })
}
