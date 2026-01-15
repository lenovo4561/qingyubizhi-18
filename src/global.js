const g = Object.getPrototypeOf(global) || global
function setGlobalData(k, v) {
  g[k] = v
}
function getGlobalData(k) {
  return g[k]
}
setGlobalData('setGlobalData', setGlobalData)
setGlobalData('getGlobalData', getGlobalData)
export { setGlobalData, getGlobalData }
