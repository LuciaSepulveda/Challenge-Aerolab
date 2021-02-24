import axios from "axios"
import * as React from "react"

import Filter from "../components/Filter/Filter"
import Header from "../components/Header/Header"
import Products from "../components/Products/Products"
import History from "../pages/History/History"
import Loading from "../pages/Loading/Loading"
import Button from "../ui/Button/Button"

import styles from "./App.module.scss"

const token = process.env.REACT_APP_API_KEY

const URL = "https://coding-challenge-api.aerolab.co/"

const headers = {
  Accept: "application/json",
  Authorization: "Bearer " + token,
  "Content-Type": "application/json",
}

enum Status {
  Init = "init",
  Pending = "pending",
  Ready = "ready",
}

interface User {
  id: string
  name: string
  points: number
  redeemHistory: string[]
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Product {
  _id: string
  category: string
  cost: number
  img: {
    url: string
  }
  name: string
}

const App: React.FC = () => {
  const [status, setStatus] = React.useState<Status>(Status.Init)
  const [user, setUser] = React.useState<User>({
    id: "",
    name: "",
    points: 0,
    redeemHistory: [],
  })
  const [requestError, setRequestError] = React.useState<string>("")
  const [products, setProducts] = React.useState<Product[]>([])
  const [productsReady, setProductsReady] = React.useState<boolean>(false)
  const [updatePoints, setUpdatePoints] = React.useState<boolean>(false)
  const [history, setHistory] = React.useState<Product[]>([])
  const [redeem, setRedeem] = React.useState<boolean>(false)
  const [filter, setFilter] = React.useState<string>("")
  const [updateProducts, setUpdateProducts] = React.useState<boolean>(false)

  React.useEffect(() => {
    if (status === Status.Init) {
      return
    }
  }, [status])

  React.useEffect(() => {
    if (status === Status.Pending && !productsReady) {
      getData("user")
      getData("products")

      return
    }
  }, [status, productsReady])

  const getData = async (name: string) => {
    let completeUrl = ""

    if (name === "user") completeUrl = "user/me"
    if (name === "products") completeUrl = "products"
    if (name === "history") completeUrl = "user/history"
    try {
      const result = await axios.get(URL + completeUrl, {
        headers,
      })

      if (name === "user") {
        setUser(result.data)
        setStatus(Status.Ready)
      }
      if (name === "products") {
        setProducts(result.data)
        setProductsReady(true)
      }
      if (name === "history") {
        setHistory(result.data)
      }
      // setStatus(Status.Ready)
    } catch (error) {
      setRequestError(error.message)
    }
  }

  const pointsPost = async (points: number) => {
    const body = {
      amount: points,
    }

    try {
      const result = await axios.post(`${URL}user/points`, body, {
        headers,
      })

      setUpdatePoints(true)
    } catch (error) {
      console.log(error.response.request._response)
    }
  }

  const redeemPost = async (id: string) => {
    const body = {
      productId: id,
    }

    try {
      const result = await axios.post(`${URL}redeem`, body, {
        headers,
      })

      setUpdatePoints(true)
    } catch (error) {
      console.log(error.response.request._response)
    }
  }

  const addPoints = (p: number) => {
    pointsPost(p)
  }

  const redeemProduct = (id: string) => {
    redeemPost(id)
  }

  const getHistory = () => {
    getData("history")

    return history
  }

  const redeemHistory = () => {
    setRedeem(true)
  }

  const backIndex = () => {
    setRedeem(false)
  }

  const filterSet = (f: string) => {
    setFilter(f)
    setUpdateProducts(true)
  }

  if (updatePoints === true) {
    getData("user")
    setUpdatePoints(false)
  }
  // eslint-disable-next-line no-empty
  if (status === Status.Pending) {
    //fetchData()
    return <Loading />
  }

  if (redeem === true) {
    getData("history")

    return <History back={backIndex} history={history} />
  }

  if ((status === Status.Ready && productsReady === true) || updateProducts === true) {
    if (updateProducts === true) setUpdateProducts(false)

    return (
      <div className={styles.container}>
        <Header
          addPoints={addPoints}
          history={getHistory()}
          points={user.points}
          redeem={redeemHistory}
          user={user.name}
        />
        <Filter filterSet={filterSet} />
        <Products buy={redeemProduct} orden={filter} p={products} points={user.points} />
      </div>
    )
  }

  return (
    <main className={styles.container}>
      <h1>Aerolab Challenge</h1>
      <Button
        onClick={() => {
          setStatus(Status.Pending)
        }}
      >
        Ingresar
      </Button>
      <p className={styles.error}>{requestError}</p>
    </main>
  )
}

export default App
