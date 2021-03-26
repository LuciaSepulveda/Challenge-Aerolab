import * as React from "react"
import {Button, Flex, Text, Spacer} from "@chakra-ui/react"

interface Props {
  filterSet: (f: string) => void
}

const Filter: React.FC<Props> = ({filterSet}) => {
  return (
    <Flex m="auto" mb="20px" mt="15px" w="80%">
      <Text mt="-10px" p={4}>
        Sort by:
      </Text>
      <Flex justify="space-between" w={{sm: "80%", md: "55%", lg: "45%", xl: "35%"}}>
        <Button
          _hover={{bg: "primary", color: "white"}}
          bg="#ededed"
          borderRadius="100px"
          transition="0.5s"
          onClick={() => filterSet("default")}
        >
          Default
        </Button>
        <Button
          _hover={{bg: "primary", color: "white"}}
          bg="#ededed"
          borderRadius="100px"
          transition="0.5s"
          onClick={() => filterSet("lowestPrice")}
        >
          Lowest price
        </Button>
        <Button
          _hover={{bg: "primary", color: "white"}}
          bg="#ededed"
          borderRadius="100px"
          transition="0.5s"
          onClick={() => filterSet("highestPrice")}
        >
          Highest price
        </Button>
      </Flex>
    </Flex>
  )
}

export default Filter
