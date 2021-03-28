import * as React from "react"
import {Button, Box, Text, Table, Tr, Th, Td, Img, Thead} from "@chakra-ui/react"

import {history} from "../../context/hooks"

interface Props {
  back: () => void
}

const History: React.FC<Props> = ({back}) => {
  const [showLastTen, setShowLastTen] = React.useState<boolean>(true)
  const [text, setText] = React.useState<string>("Last ten items")
  let counterKey = 0
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
    <Box m="auto" w={["100%", "80%"]}>
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
          <Table m="auto" w={["320px", "90%"]}>
            <Thead>
              <Tr>
                <Th />
                <Th>
                  <Text>Name</Text>
                </Th>
                <Th visibility={["hidden", "visible"]} w="0px">
                  <Text h={["0px", "auto"]} w={["0px", "auto"]}>
                    Category
                  </Text>
                </Th>
                <Th>
                  <Text>Cost</Text>
                </Th>
              </Tr>
            </Thead>
            {historyRedeem.map((product) => {
              return (
                <Tr key={counterKey++}>
                  <Td w={["0px", "auto"]} visibility={["hidden", "visible"]}>
                    <Img src={product.img.url} />
                  </Td>
                  <Td>
                    <Text>{product.name}</Text>
                  </Td>
                  <Td h="0px" visibility={["hidden", "visible"]} w="0px">
                    <Text h={["0px", "auto"]} w={["0px", "auto"]}>
                      {product.category}
                    </Text>
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
          <Table m="auto" w={["100px", "90%"]}>
            <Thead>
              <Tr>
                <Th />
                <Th>
                  <Text>Name</Text>
                </Th>
                <Th visibility={["hidden", "visible"]} w="0px">
                  <Text h={["0px", "auto"]} w={["0px", "auto"]}>
                    Category
                  </Text>
                </Th>
                <Th>
                  <Text>Cost</Text>
                </Th>
              </Tr>
            </Thead>
            {lastTen.map((product) => {
              return (
                <Tr key={counterKey++}>
                  <Td w={["0px", "auto"]} visibility={["hidden", "visible"]}>
                    <Img src={product?.img.url} />
                  </Td>
                  <Td>
                    <Text>{product?.name}</Text>
                  </Td>
                  <Td h="0px" visibility={["hidden", "visible"]} w="0px">
                    <Text h={["0px", "auto"]} w={["0px", "auto"]}>
                      {product?.category}
                    </Text>
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
