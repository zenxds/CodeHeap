/**
 * https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/getUserMedia
 */
(function() {

  window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL
  navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia
  navigator.mediaDevices = navigator.mediaDevices || {}

  if (!navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia = function(constraints) {
      if(!navigator.getUserMedia) {
        return Promise.reject(new Error('getUserMedia is not implemented in this browser'))
      }
    
      return new Promise(function(resolve, reject) {
        navigator.getUserMedia(constraints, resolve, reject)
      })
    }
  }
  
  let video = document.querySelector('video')
  let canvas = document.querySelector('canvas')
  let img = document.querySelector('img')  
  let ctx = canvas.getContext('2d')
  let localMediaStream = null

  const videoOptions = {
    width: 640,
    height: 480
  }

  canvas.setAttribute('width', videoOptions.width)
  canvas.setAttribute('height', videoOptions.height)
  img.setAttribute('width', videoOptions.width)
  img.setAttribute('height', videoOptions.height)

  navigator.mediaDevices.getUserMedia({
    video: videoOptions,
    audio: true
  }).then(function(stream) {
    video.src = window.URL.createObjectURL(stream)

    video.onloadedmetadata = function(e) {
      console.log('ready')
    }

    localMediaStream = stream
    
  }).catch((err) => {
    console.log(err.name + ": " + err.message) 
  })

  function snapshot() {
    if (localMediaStream) {
      ctx.drawImage(video, 0, 0)
      img.src = canvas.toDataURL('image/webp')
    }
  }

  video.addEventListener('click', snapshot, false)
})()