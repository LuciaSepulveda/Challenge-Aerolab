import * as React from "react"

import {Product} from "../Product"
import ProductContainer from "../ProductContainer/ProductContainer"

import styles from "./Products.module.scss"

interface Props {
  p: Product[]
  buy: (id: string) => void
  points: number
  orden: string
}

const Products: React.FC<Props> = ({p, buy, points, orden}) => {
  let cost = ""
  let disabled = false
  let styleButton = {}

  const filter = (products: Product[], orden: string) => {
    switch (orden) {
      case "highestPrice": {
        return products.sort((a, b) => b.cost - a.cost)
        break
      }
      case "lowestPrice": {
        return products.sort((a, b) => a.cost - b.cost)
        break
      }
      case "default": {
        return products.sort()
        break
      }
      default: {
        return products
      }
    }
  }

  return (
    <div>
      <div className={styles.container}>
        {filter(p, orden).map((product) => {
          if (product.cost <= points) {
            cost = product.cost.toString()
            disabled = false
            styleButton = {
              backgroundColor: "transparent",
              color: "none",
              width: "13%",
              cursor: "pointer",
              borderRadius: "100%",
            }
          } else {
            cost = "You need " + (product.cost - points).toString()
            disabled = true
          }

          return (
            <div key={product._id + product.name + product.cost} className={styles.product}>
              <ProductContainer
                buy={buy}
                cost={cost}
                disabled={disabled}
                product={product}
                styleButton={styleButton}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Products
