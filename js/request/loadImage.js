function loadImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.setAttribute('crossOrigin', 'anonymous')
    image.src = url

    if (image.decode) {
      image.decode().then(() => {
        resolve(image)
      }).catch(reject)
    } else {
      image.onload = () => {
        resolve(image)
      }
      image.onabort = image.onerror = reject
    }
  })
}