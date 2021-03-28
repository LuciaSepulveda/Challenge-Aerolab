import * as React from "react"
import {Button, Flex, Text, Spacer} from "@chakra-ui/react"

interface Props {
  filterSet: (f: string) => void
}

const Filter: React.FC<Props> = ({filterSet}) => {
  return (
    <Flex m="auto" mb="20px" mt="15px" w="80%">
      <Text mt="-10px" p={[0, 4]}>
        Sort by:
      </Text>
      <Flex justify="space-between" w={["100%", "70%", "55%", "30%"]}>
        <Button
          _hover={{bg: "primary", color: "white"}}
          bg="#ededed"
          borderRadius="100px"
          transition="0.5s"
          onClick={() => filterSet("default")}
          p={5}
        >
          Default
        </Button>
        <Button
          _hover={{bg: "primary", color: "white"}}
          bg="#ededed"
          borderRadius="100px"
          transition="0.5s"
          onClick={() => filterSet("lowestPrice")}
          p={5}
        >
          Lowest price
        </Button>
        <Button
          _hover={{bg: "primary", color: "white"}}
          bg="#ededed"
          borderRadius="100px"
          transition="0.5s"
          onClick={() => filterSet("highestPrice")}
          p={5}
        >
          Highest price
        </Button>
      </Flex>
    </Flex>
  )
}

export default Filter
