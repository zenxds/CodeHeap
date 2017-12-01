function loadImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.setAttribute('crossOrigin', 'anonymous')

    image.onload = () => {
      resolve(image)
    }
    image.onabort = image.onerror = reject

    image.src = url
  })
}