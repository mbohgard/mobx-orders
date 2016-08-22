// dirty check of stringified object
function foundInObject(obj, val) {
  const stringified = JSON.stringify(obj)
  const stripped = stringified.replace(/"([\w"])+:/g, '')
    .replace(/[{}\[\]",\.]+/g, ' ')

  return new RegExp(val, 'i').test(stripped)
}

export default foundInObject
