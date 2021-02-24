import {createStyles} from "@material-ui/core"
import MenuItem from "@material-ui/core/MenuItem"
import {makeStyles, Theme} from "@material-ui/core/styles"
import * as React from "react"

import coin from "../../assets/icons/coin.svg"
import logo from "../../assets/logo.svg"
import ButtonDropdown from "../../ui/ButtonDropdown/ButtonDropdown"
import {Product} from "../../App/App"

import styles from "./Header.module.scss"

interface Props {
  points: number
  user: string
  addPoints: (p: number) => void
  history: Product[]
  redeem: () => void
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

const Header: React.FC<Props> = ({points, user, addPoints, history, redeem}) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState<boolean>(false)
  const anchorRef = React.useRef<HTMLButtonElement>(null)
  const [openSecondButton, setOpenSecondButton] = React.useState<boolean>(false)
  const anchorRefSecondButton = React.useRef<HTMLButtonElement>(null)

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return
    }
    setOpen(false)
  }

  const prevOpen = React.useRef(open)

  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus()
    }
    prevOpen.current = open
  }, [open])

  const handleCloseSecondButton = (event: React.MouseEvent<EventTarget>) => {
    if (
      anchorRefSecondButton.current &&
      anchorRefSecondButton.current.contains(event.target as HTMLElement)
    ) {
      return
    }
    setOpenSecondButton(false)
  }

  const prevOpenSecondButton = React.useRef(openSecondButton)

  React.useEffect(() => {
    if (prevOpenSecondButton.current === true && openSecondButton === false) {
      anchorRefSecondButton.current!.focus()
    }
    prevOpenSecondButton.current = openSecondButton
  }, [openSecondButton])

  return (
    <div className={styles.container}>
      <div className={styles.userData}>
        <img className={styles.logo} src={logo} />
        <div className={styles.name}>
          <ButtonDropdown name={user} styles={{backgroundColor: "var(--primary)", color: ""}}>
            <MenuItem
              onClick={() => {
                redeem(), handleClose
              }}
            >
              Redeem history
            </MenuItem>
          </ButtonDropdown>
        </div>
        <div className={styles.points}>
          <ButtonDropdown
            name={points}
            styles={{
              backgroundColor: "#ededed",
              color: "black",
            }}
          >
            <MenuItem
              onClick={() => {
                addPoints(1000), handleCloseSecondButton
              }}
            >
              Add 1000 <img alt="coin" className={styles.coin} src={coin} />
            </MenuItem>
            <MenuItem
              onClick={() => {
                addPoints(5000), handleCloseSecondButton
              }}
            >
              Add 5000
              <img alt="coin" className={styles.coin} src={coin} />
            </MenuItem>
            <MenuItem
              onClick={() => {
                addPoints(7500), handleCloseSecondButton
              }}
            >
              Add 7500
              <img alt="coin" className={styles.coin} src={coin} />
            </MenuItem>
          </ButtonDropdown>
        </div>
      </div>
      <div className={styles.cover}>
        <h2>Electronics</h2>
      </div>
    </div>
  )
}

export default Header
