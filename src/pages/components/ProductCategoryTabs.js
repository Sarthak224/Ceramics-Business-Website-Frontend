import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { assignFilters } from '../../redux/actions/productFilters'

const ProductCategoryTabs = ({ parentCategory, setCategory }) => {

  const filter = useSelector(state => state.productFilterReducer)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(assignFilters({ ...filter, mainCategory: parentCategory }))

  }, [parentCategory])


  return (
    <div className='product-category-sect'>
      <h5 style={{ padding: "20px 10px", textAlign: "left" }}>Category:</h5>
      <div style={{ overflowX: "auto", padding: "20px 2px", width: "76vw",position:"relative" }}>
        <div className='product-category-tabs-main'>

          <button className={parentCategory == "Tableware" ? 'button-17 active' : 'button-17'} onClick={() => setCategory("Tableware")}>Tableware</button>
          <button className={parentCategory == "Dinner Sets" ? 'button-17 active' : 'button-17'} onClick={() => setCategory("Dinner Sets")}>Dinner Sets</button>
          <button className={parentCategory == "Unique" ? 'button-17 active' : 'button-17'} onClick={() => setCategory("Unique")}>Unique</button>
          <button className={parentCategory == "All" ? 'button-17 active' : 'button-17'} onClick={() => setCategory("All")}>All</button>

        </div>
      </div>
    </div>
  )
}

export default ProductCategoryTabs