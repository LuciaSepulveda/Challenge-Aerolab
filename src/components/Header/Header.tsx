import * as React from "react"
import {
  Button,
  Flex,
  Spacer,
  Img,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Spinner,
} from "@chakra-ui/react"

import coin from "../../assets/icons/coin.svg"
import logo from "../../assets/logo.svg"
import header from "../../assets/header.png"
import {usePoints, useUser, viewStatus} from "../../context/hooks"

interface Props {
  redeem: () => void
}

const Header: React.FC<Props> = ({redeem}) => {
  const [points, addPoints] = usePoints()
  const user = useUser()
  const status = viewStatus()

  return (
    <>
      <Flex direction="row" m="auto" minHeight="80px" w="85vw" bg="white">
        <Img marginLeft="20px" src={logo} />
        <Spacer />
        <Menu>
          <MenuButton
            as={Button}
            bg="transparent"
            borderRadius="0"
            m="auto"
            marginRight="20px"
            textAlign="left"
          >
            {user.name}
          </MenuButton>
          <MenuList>
            <MenuItem
              onClick={() => {
                redeem()
              }}
            >
              Redeem history
            </MenuItem>
          </MenuList>
        </Menu>
        <Menu>
          <MenuButton
            as={Button}
            bg="#ededed"
            borderRadius="100px"
            m="auto"
            marginRight="20px"
            p={2}
          >
            <Flex direction="row">
              <Img align="left" src={coin} />
              {status === "ready" && (
                <Text m="auto" mt="6px">
                  {user.points}
                </Text>
              )}
              {status === "pending" && <Spinner m="auto" p={1} />}
            </Flex>
          </MenuButton>
          <MenuList>
            <MenuItem
              onClick={() => {
                addPoints(1000)
              }}
            >
              <Img src={coin} />
              <span>Add 1000</span>
            </MenuItem>
            <MenuItem
              onClick={() => {
                addPoints(5000)
              }}
            >
              <Img src={coin} />
              <span>Add 5000</span>
            </MenuItem>
            <MenuItem
              onClick={() => {
                addPoints(7500)
              }}
            >
              <Img src={coin} />
              <span>Add 7500</span>
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Flex
        alignItems="flex-end"
        backgroundImage={`url(${header})`}
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        justifyContent="flex-start"
        m="auto"
        marginTop="0"
        minHeight={64}
        w="100%"
      >
        <Text color="white" fontSize="64px" fontWeight="bold" mb={4} ml={6}>
          Electronics
        </Text>
      </Flex>
    </>
  )
}

export default Header
