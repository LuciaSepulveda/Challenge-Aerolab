import * as React from "react"

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({children, ...props}) => (
  <button {...props}>{children}</button>
)

export default Button
