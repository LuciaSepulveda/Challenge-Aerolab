import * as React from "react"

import Button from "../../ui/Button/Button"

import styles from "./Filter.module.scss"

interface Props {
  filterSet: (f: string) => void
}

const Filter: React.FC<Props> = ({filterSet}) => {
  return (
    <div className={styles.container}>
      <p className={styles.sort}>Sort by:</p>
      <Button className={styles.lowestPrice} onClick={() => filterSet("lowestPrice")}>
        Lowest price
      </Button>
      <Button className={styles.highestPrice} onClick={() => filterSet("highestPrice")}>
        Highest price
      </Button>
    </div>
  )
}

export default Filter
