import { useParams } from 'react-router'
import { RootState } from '../redux/store'
import { useSelector } from 'react-redux'

export default function ProductsDetail() {
  ;<div>ProductsDetail</div>
  // const dispatch= useDispatch();
  const { id } = useParams()

  // const url = "/mock/e-commerce/products.json/"+ `${id}`
  const productDetail = useSelector((state: RootState) =>
    state.products.items.find((prod) => prod.id.toString() === id)
  )

  return (
    <div>
      <div key={productDetail?.id}>
        <h3>ProductDetail</h3>
        <p>
          <b>categories:</b> {productDetail?.categories}
        </p>
        <p>
          <b>sizes:</b>
          {productDetail?.sizes}
        </p>
        <p>
          <b>variants:</b> {productDetail?.variants}
        </p>
      </div>
    </div>
  )
}
