import React from "react"
import axios from "axios"

import Loading from "../pages/Loading/Loading"
import {Product} from "../components/Product"
import {User} from "../types/user"
import {Status} from "../types/status"
import {URL, headers} from "../api/api"

export interface Context {
  state: {
    user: User
    products: Product[]
    history: Product[]
  }
  actions: {
    addPoints: (amount: number) => Promise<void>
    redeem: (id: string) => Promise<void>
  }
  viewStatus: {
    statusNow: Status
    statusProducts: boolean
  }
}

const UserContext = React.createContext({} as Context)

const UserProvider: React.FC = ({children}) => {
  const [status, setStatus] = React.useState<Status>(Status.Init)
  const [user, setUser] = React.useState<User>()
  const [productsReady, setProductsReady] = React.useState<boolean>(false)
  const [products, setProducts] = React.useState<Product[]>([])
  const [history, setHistory] = React.useState<Product[]>([])

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
    } catch (error) {
      console.log(error.message)
    }
  }

  React.useEffect(() => {
    getData("user")
    getData("products")
    getData("history")
  }, [])

  React.useEffect(() => {
    if (status === Status.Pending) getData("user")
  })

  async function handleRedeem(id: string) {
    if (!user) return

    const body = {
      productId: id,
    }

    try {
      const result = await axios.post(`${URL}redeem`, body, {
        headers,
      })

      setStatus(Status.Pending)
    } catch (error) {
      console.log(error.response.request._response)
    }
  }

  async function handleAddPoints(amount: number) {
    if (!user) return

    const body = {
      amount: amount,
    }

    try {
      const result = await axios.post(`${URL}user/points`, body, {
        headers,
      })

      setStatus(Status.Pending)
    } catch (error) {
      console.log(error.response.request._response)
    }
  }

  if (!user || status === "init" || productsReady === false) {
    return <Loading />
  }

  const state: Context["state"] = {
    user,
    products,
    history,
  }

  const actions = {
    addPoints: handleAddPoints,
    redeem: handleRedeem,
  }

  const viewStatus = {
    statusNow: status,
    statusProducts: productsReady,
  }

  return (
    <UserContext.Provider value={{state, actions, viewStatus}}>{children}</UserContext.Provider>
  )
}

export {UserContext as default, UserProvider as Provider}
