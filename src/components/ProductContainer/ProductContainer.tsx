import * as React from "react"

import buyImage from "../../assets/icons/buy-white.svg"
import coin from "../../assets/icons/coin.svg"
import {Product} from "../Product"

import styles from "./ProductContainer.module.scss"

interface Props {
  product: Product
  cost: string
  styleButton: any
  buy: (id: string) => void
  disabled: boolean
}

const ProductContainer: React.FC<Props> = ({product, cost, disabled, styleButton, buy}) => {
  const [isShown, setIsShown] = React.useState<boolean>(false)
  let canBuy = ""

  if (disabled !== true) {
    canBuy = "Redeem now"
  }

  return (
    <div
      className={styles.container}
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      {!isShown && (
        <div className={styles.containerInfo}>
          <img alt={product.name} className={styles.imageProduct} src={product.img.url} />
          <div className={styles.nameAndCategory}>
            <p className={styles.productCategory}>{product.category}</p>
            <p className={styles.productName}>{product.name}</p>
          </div>
          {disabled === true && (
            <div
              style={{
                backgroundColor: "#999999",
                opacity: "0.8",
                borderRadius: "50px",
                marginRight: "5%",
                verticalAlign: "bottom",
                textAlign: "right",
                width: "50%",
                color: "white",
              }}
            >
              {cost} <img alt="coin" className={styles.coin} src={coin} />
            </div>
          )}
          {disabled === false && (
            <div className={styles.coin}>
              {cost} <img alt="coin" className={styles.coin} src={coin} />
            </div>
          )}
        </div>
      )}
      {isShown && (
        <div className={styles.padre}>
          <div className={styles.hijo1}>
            <img alt={product.name} className={styles.imageProduct} src={product.img.url} />
            <div className={styles.nameAndCategory}>
              <p className={styles.productCategory}>{product.category}</p>
              <p className={styles.productName}>{product.name}</p>
            </div>
          </div>
          <div className={styles.hijo2}>
            <div className={styles.containerInfo2}>
              <div className={styles.coin2}>
                {cost} <img alt="coin" className={styles.coin} src={coin} />
              </div>
              {disabled !== true && (
                <div>
                  <button style={styleButton} onClick={() => buy(product._id)}>
                    <img src={buyImage} />
                  </button>
                  <div className={styles.buy}>{canBuy}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductContainer
