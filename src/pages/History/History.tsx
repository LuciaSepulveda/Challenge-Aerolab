import * as React from "react"
import {Button, Box, Text, Table, Tr, Th, Td, Img} from "@chakra-ui/react"
import {history} from "../../context/hooks"

interface Props {
  back: () => void
}

const History: React.FC<Props> = ({back}) => {
  const [showLastTen, setShowLastTen] = React.useState<boolean>(true)
  const [text, setText] = React.useState<string>("Last ten items")
  let i = 0
  const lastTen = []
  const historyRedeem = history()

  for (let j = historyRedeem.length - 10; j !== historyRedeem.length; j++) {
    lastTen.push(historyRedeem[j])
  }

  const showTen = () => {
    setShowLastTen(true)
    setText("Last ten items")
  }

  const showAll = () => {
    setShowLastTen(false)
    setText("All items")
  }

  return (
    <Box m="auto" w="80%">
      <Text as="h1" fontSize="5xl" m="10px">
        {text}
      </Text>
      <Button
        _hover={{bg: "primary", color: "white"}}
        bg="#ededed"
        borderRadius="100px"
        m="10px"
        transition="0.5s"
        onClick={back}
      >
        Back
      </Button>
      {!showLastTen && (
        <>
          <Button
            _hover={{bg: "primary", color: "white"}}
            bg="#ededed"
            borderRadius="100px"
            m="10px"
            transition="0.5s"
            onClick={showTen}
          >
            Last ten items
          </Button>
          <Table m="auto" w={{lg: "70%"}}>
            <Tr>
              <Th />
              <Th>Category</Th>
              <Th>Name</Th>
              <Th>Cost</Th>
            </Tr>
            {historyRedeem.map((product) => {
              return (
                <Tr key={i++}>
                  <Td>
                    <Img src={product.img.url} />
                  </Td>
                  <Td>
                    <Text>{product.category}</Text>
                  </Td>
                  <Td>
                    <Text>{product.name}</Text>
                  </Td>
                  <Td>
                    <Text>{product.cost}</Text>
                  </Td>
                </Tr>
              )
            })}
          </Table>
        </>
      )}
      {showLastTen && (
        <>
          <Button
            _hover={{bg: "primary", color: "white"}}
            bg="#ededed"
            borderRadius="100px"
            m="10px"
            transition="0.5s"
            onClick={showAll}
          >
            All items
          </Button>
          <Table m="auto" w={{lg: "70%"}}>
            <Tr>
              <Th />
              <Th>Category</Th>
              <Th>Name</Th>
              <Th>Cost</Th>
            </Tr>
            {lastTen.map((product) => {
              return (
                <Tr key={i++}>
                  <Td>
                    <Img src={product?.img.url} />
                  </Td>
                  <Td>
                    <Text>{product?.category}</Text>
                  </Td>
                  <Td>
                    <Text>{product?.name}</Text>
                  </Td>
                  <Td>
                    <Text>{product?.cost}</Text>
                  </Td>
                </Tr>
              )
            })}
          </Table>
        </>
      )}
    </Box>
  )
}

export default History
