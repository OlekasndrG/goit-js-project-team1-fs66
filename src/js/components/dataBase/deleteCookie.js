import { onSetCookie } from "./setCookie"
export function onDeleteCookie(name) {
    onSetCookie(name, "", {
      'max-age': -1
    })
  }