import * as React from "react"
import {
  Box,
  Center,
  SimpleGrid,
  Flex,
  Img,
  Text,
  Divider,
  Stack,
  HStack,
  Spinner,
} from "@chakra-ui/react"

import buyImage from "../../assets/icons/buy-white.svg"
import coin from "../../assets/icons/coin.svg"
import {Product} from "../Product"
import {viewStatus} from "../../context/hooks"

interface Props {
  product: Product
  cost: string
  buy: (id: string) => void
  disabled: boolean
}

const ProductContainer: React.FC<Props> = ({product, cost, disabled, buy}) => {
  const [isShown, setIsShown] = React.useState<boolean>(false)
  const [mTop, setMTop] = React.useState<string>("0px")
  const [shadow, setShadow] = React.useState<string>("md")
  let canBuy = ""

  const status = viewStatus()

  if (disabled !== true) {
    canBuy = "Redeem now"
  }

  const loading = () => {
    return <Spinner />
  }

  return (
    <>
      {status === "pending" && (
        <Center bg="white" boxShadow={shadow} h="100%" w="100%">
          <Spinner color="primary" />
        </Center>
      )}
      {status === "ready" && (
        <Box
          bg="white"
          boxShadow={shadow}
          color="black"
          h="100%"
          position="relative"
          transform={`translateY(${mTop})`}
          transition="0.5s"
          w="100%"
          onMouseEnter={() => {
            setIsShown(true), setMTop("-10px"), setShadow("2xl")
          }}
          onMouseLeave={() => {
            setIsShown(false), setMTop("0px"), setShadow("md")
          }}
        >
          <Flex
            color="white"
            direction="column"
            h="100%"
            position="absolute"
            textAlign="center"
            w="100%"
          >
            {disabled === true && (
              <>
                <Flex
                  alignItems="center"
                  direction="row"
                  mb="-50px"
                  ml="45%"
                  mt="5%"
                  p={1}
                  position="absolute"
                  style={{
                    backgroundColor: "#999999",
                    opacity: "0.8",
                    borderRadius: "50px",
                    marginRight: "5%",
                    verticalAlign: "bottom",
                    textAlign: "right",
                    width: "50%",
                    color: "white",
                  }}
                >
                  <Text align="left" color="white" fontSize="sm" marginLeft="2px" p={1}>
                    {cost}
                  </Text>
                  <Img alt="coin" src={coin} />
                </Flex>
                <Img
                  alignSelf="center"
                  alt={product.name}
                  mb="auto"
                  mt="15px"
                  src={product.img.url}
                  w="90%"
                  onLoad={loading}
                />
                <Divider m="auto" mb="90px" mt="0px" w="70%" />
                <Box>
                  <Text color="#a3a3a3" mt="-80px">
                    {product.category}
                  </Text>
                  <Text color="#616161" fontWeight="semibold">
                    {product.name}
                  </Text>
                </Box>
                <Box />
              </>
            )}
            {disabled === false && (
              <>
                <Img
                  alignSelf="center"
                  alt={product.name}
                  m="auto"
                  src={product.img.url}
                  w="90%"
                  onLoad={loading}
                />
                <Divider m="auto" w="70%" />
                <Box>
                  <Text color="#a3a3a3">{product.category}</Text>
                  <Text color="#616161" fontWeight="semibold">
                    {product.name}
                  </Text>
                </Box>
                <SimpleGrid color="white" columns={2} m="auto" ml="75%">
                  <Text color="#616161">{cost}</Text>
                  <Img alt="coin" mt="-3px" src={coin} onLoad={loading} />
                </SimpleGrid>
              </>
            )}
          </Flex>
          {isShown && (
            <Stack
              align="center"
              backgroundImage="linear-gradient(-180deg, #0ad4fa 0%, #25bbf1 100%)"
              boxShadow="2xl"
              h="100%"
              opacity="0.9"
              position="absolute"
              spacing={6}
              textAlign="center"
              w="100%"
            >
              {disabled !== true && (
                <Box mt="35%">
                  <Box as="button" borderRadius="100%" onClick={() => buy(product._id)}>
                    <Img src={buyImage} onLoad={loading} />
                  </Box>
                  <Text color="white" fontSize="xl">
                    {canBuy}
                  </Text>
                </Box>
              )}
              {disabled === true && (
                <HStack color="white" ml="20%" mt="40%" spacing={2} w="70%">
                  <Text fontSize="2xl">{cost}</Text>
                  <Img alt="coin" mt="-5px" src={coin} onLoad={loading} />
                </HStack>
              )}
            </Stack>
          )}
        </Box>
      )}
    </>
  )
}

export default ProductContainer
