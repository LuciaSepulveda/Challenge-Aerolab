import * as React from "react"
import {Box, Button, Text} from "@chakra-ui/react"

import Filter from "../components/Filter/Filter"
import Header from "../components/Header/Header"
import Products from "../components/Products/Products"
import History from "../pages/History/History"
import {Status} from "../types/status"
import header from "../assets/header-x1.png"
import {viewStatus, viewStatusProducts} from "../context/hooks"

const App: React.FC = () => {
  const [status, setStatus] = React.useState<Status>(Status.Init)
  const [redeem, setRedeem] = React.useState<boolean>(false)
  const [filter, setFilter] = React.useState<string>("")

  const newStatus = viewStatus()
  const statusProducts = viewStatusProducts()

  React.useEffect(() => {
    if (status === Status.Init) {
      return
    }
  }, [status])

  const redeemHistory = () => {
    setRedeem(true)
  }

  const backIndex = () => {
    setRedeem(false)
  }

  const filterSet = (f: string) => {
    setFilter(f)
  }

  if (redeem === true) {
    return <History back={backIndex} />
  }

  if (status === Status.Ready && (statusProducts === true || newStatus === "ready")) {
    return (
      <Box w={["100vw", "100%"]} bg="var(--fondo)">
        <Header redeem={redeemHistory} />
        <Filter filterSet={filterSet} />
        <Products orden={filter} />
      </Box>
    )
  }

  return (
    <Box>
      <Text
        background={`url(${header})`}
        backgroundClip="text"
        backgroundPosition="right"
        backgroundSize="100% auto"
        backgroundStyle="cover"
        color="transparent"
        fontSize={["50px", "100px"]}
        fontWeight="900"
        m="auto"
      >
        Aerolab Challenge
      </Text>
      <Button
        colorScheme="twitter"
        onClick={() => {
          setStatus(Status.Ready)
        }}
      >
        Ingresar
      </Button>
    </Box>
  )
}

export default App
