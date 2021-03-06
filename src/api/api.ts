const token = process.env.REACT_APP_API_KEY

export const URL = "https://coding-challenge-api.aerolab.co/"

export const headers = {
  Accept: "application/json",
  Authorization: "Bearer " + token,
  "Content-Type": "application/json",
}
