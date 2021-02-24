import * as React from "react"

import logo from "../../assets/logo.svg"

import styles from "./Loading.module.scss"

const Loading: React.FC = () => {
  return (
    <div className={styles.container}>
      <img src={logo} />
    </div>
  )
}

export default Loading
