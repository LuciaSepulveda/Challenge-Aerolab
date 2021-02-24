import {createStyles} from "@material-ui/core"
import Button from "@material-ui/core/Button"
import ClickAwayListener from "@material-ui/core/ClickAwayListener"
import Grow from "@material-ui/core/Grow"
import MenuList from "@material-ui/core/MenuList"
import Paper from "@material-ui/core/Paper"
import Popper from "@material-ui/core/Popper"
import {makeStyles, Theme} from "@material-ui/core/styles"
import * as React from "react"

import coin from "../../assets/icons/coin.svg"

interface Props {
  name: any
  styles: {backgroundColor: string; color: string}
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    paper: {
      marginRight: theme.spacing(2),
    },
  }),
)

const ButtonDropdown: React.FC<Props> = ({name, children, styles}) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState<boolean>(false)
  const anchorRef = React.useRef<HTMLButtonElement>(null)

  let urlImage = ""
  let altImage = ""

  if (typeof name == "number") {
    urlImage = coin
    altImage = "coin"
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return
    }
    setOpen(false)
  }

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault()
      setOpen(false)
    }
  }

  const prevOpen = React.useRef(open)

  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus()
    }
    prevOpen.current = open
  }, [open])

  return (
    <div className={name}>
      <div className={classes.root}>
        <Button
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          style={styles}
          onClick={handleToggle}
        >
          {name}
          <img alt={altImage} className={coin} src={urlImage} />
        </Button>
        <Popper disablePortal transition anchorEl={anchorRef.current} open={open} role={undefined}>
          {({TransitionProps, placement}) => (
            <Grow
              {...TransitionProps}
              style={{transformOrigin: placement === "bottom" ? "center top" : "center bottom"}}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    {children}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  )
}

export default ButtonDropdown
