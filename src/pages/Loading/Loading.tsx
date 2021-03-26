import * as React from "react"
import {Box, Img} from "@chakra-ui/react"
import {motion} from "framer-motion"

import logo from "../../assets/logo.svg"

const Loading: React.FC = () => {
  return (
    <motion.div
      animate={{translateY: ["0px", "-60px", "0px"], rotateX: [0, 30, 0]}}
      transition={{duration: 2, ease: "easeInOut", loop: Infinity}}
    >
      <Img src={logo} />
    </motion.div>
  )
}

export default Loading
