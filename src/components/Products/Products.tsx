import * as React from "react"
import {Box, Spinner, Center, Divider, Grid} from "@chakra-ui/react"

import {Product} from "../../types/Product"
import ProductContainer from "../ProductContainer/ProductContainer"
import {usePoints, products, viewStatusProducts, useRedeem} from "../../context/hooks"

interface Props {
  orden: string
}

const Products: React.FC<Props> = ({orden}) => {
  let cost = ""
  let disabled = false

  const [points, addPoints] = usePoints()
  const p = products()
  const status = viewStatusProducts()
  const redeem = useRedeem()

  const filter = (products: Product[], orden: string) => {
    switch (orden) {
      case "highestPrice": {
        return products.sort((a, b) => b.cost - a.cost)
        break
      }
      case "lowestPrice": {
        return products.sort((a, b) => a.cost - b.cost)
        break
      }
      case "default": {
        return products.sort((a, b) => {
          if (a._id > b._id) return 1
          if (b._id > a._id) return -1

          return 0
        })
        break
      }
      default: {
        return products
      }
    }
  }

  return (
    <Box m="auto">
      <Divider m="auto" mb={4} w={{sm: "60vw", xl: "70vw"}} />
      {status && (
        <Grid
          gap={6}
          m="auto"
          p={2}
          templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
          w={["100vw", "70vw"]}
        >
          {filter(p, orden).map((product) => {
            if (product.cost <= points) {
              cost = product.cost.toString()
              disabled = false
            } else {
              cost = "You need " + (product.cost - points).toString()
              disabled = true
            }

            return (
              <Box
                key={product._id + product.name + product.cost}
                alignItems="center"
                boxShadow="sm"
                color="white"
                h="300px"
                m="auto"
                maxWidth="300px"
                w="100%"
              >
                <ProductContainer buy={redeem} cost={cost} disabled={disabled} product={product} />
              </Box>
            )
          })}
        </Grid>
      )}
      {!status && (
        <Center bg="white" h="100%" w="100%">
          <Spinner color="primary" />
        </Center>
      )}
    </Box>
  )
}

export default Products
