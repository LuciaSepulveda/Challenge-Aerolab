import * as React from "react"
import {HStack, Text} from "@chakra-ui/react"

const Header: React.FC = () => {
  return (
    <HStack as="footer" bottom="5" left="0" mt={10} position="relative" w="100%">
      <Text color="#828282" fontSize="14px" fontWeight="500" lineHeight="17px" m="auto">
        Created by{" "}
        <a
          href="http://github.com/LuciaSepulveda"
          style={{textDecoration: "underline", fontWeight: "bold"}}
        >
          Lucia Sepulveda
        </a>
      </Text>
    </HStack>
  )
}

export default Header
