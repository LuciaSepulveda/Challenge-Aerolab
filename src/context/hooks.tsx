import React from "react"

import UserContext, {Context} from "./context"

export function usePoints(): [Context["state"]["user"]["points"], Context["actions"]["addPoints"]] {
  const {
    state: {user},
    actions: {addPoints},
  } = React.useContext(UserContext)

  return [user.points, addPoints]
}

export function useUser(): Context["state"]["user"] {
  const {
    state: {user},
  } = React.useContext(UserContext)

  return user
}

export function useRedeem(): Context["actions"]["redeem"] {
  const {
    actions: {redeem},
  } = React.useContext(UserContext)

  return redeem
}

export function viewStatus(): Context["viewStatus"]["statusNow"] {
  const {
    viewStatus: {statusNow},
  } = React.useContext(UserContext)

  return statusNow
}

export function viewStatusProducts(): Context["viewStatus"]["statusProducts"] {
  const {
    viewStatus: {statusProducts},
  } = React.useContext(UserContext)

  return statusProducts
}

export function products(): Context["state"]["products"] {
  const {
    state: {products},
  } = React.useContext(UserContext)

  return products
}

export function history(): Context["state"]["history"] {
  const {
    state: {history},
  } = React.useContext(UserContext)

  return history
}
