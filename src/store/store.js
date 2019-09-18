
export function setSession (name) {
  sessionStorage.setItem('username', name)
}
export function getName () {
  return sessionStorage.getItem('username')
}
export function removeSession () {
  sessionStorage.removeItem('username')
}
export default {setSession, getName, removeSession}
