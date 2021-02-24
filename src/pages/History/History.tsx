import * as React from "react"

import {Product} from "../../components/Product"
import Button from "../../ui/Button/Button"

import styles from "./History.module.scss"

interface Props {
  history: Product[]
  back: () => void
}

const History: React.FC<Props> = ({history, back}) => {
  let i = 0

  return (
    <div className={styles.container}>
      <h1>Redeem history</h1>
      <Button onClick={back}>Back</Button>
      <table className={styles.info}>
        <tr>
          <th />
          <th className={styles.category}>Category</th>
          <th className={styles.name}>Name</th>
          <th className={styles.cost}>Cost</th>
        </tr>
        {history.map((product) => {
          return (
            <tr key={i++}>
              <td>
                <img src={product.img.url} />
              </td>
              <td>
                <div>{product.category}</div>
              </td>
              <td>
                <div>{product.name}</div>
              </td>
              <td>
                <div>{product.cost}</div>
              </td>
            </tr>
          )
        })}
      </table>
    </div>
  )
}

export default History
