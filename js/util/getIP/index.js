(function () {
  // https://github.com/diafygi/webrtc-ips
  // local ip reg: http://stackoverflow.com/questions/2814002/private-ip-address-identifier-in-regular-expression
  var RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection

  function getIPs() {
    if (!RTCPeerConnection) {
      return Promise.reject('No RTCPeerConnection')
    }

    // construct a new RTCPeerConnection
    var pc = new RTCPeerConnection({
      iceServers: [
        // {
        //   urls: "stun:stun.services.mozilla.com"
        // },
        {
          urls: "stun:stun.l.google.com:19302?transport=udp"
        }
      ]
    }, {
      optional: [{
        RtpDataChannels: true
      }]
    })

    var ips = {}
    var ipReg = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/

    function handleCandidate(candidate) {
      // match just the IP address
      var match = candidate.match(ipReg)
      if (!match) {
        return
      }

      ips[match[1]] = true
    }

    // listen for candidate events
    pc.onicecandidate = function (ice) {
      // skip non-candidate events
      if (ice.candidate) {
        handleCandidate(ice.candidate.candidate)
      }
    }

    // create a bogus data channel
    pc.createDataChannel("")

    // create an offer sdp
    // 第二个参数空函数不能少
    pc.createOffer(function(result) {
      //trigger the stun server request
      pc.setLocalDescription(result, function () {}, function () {})

      // console.log(result)
      var lines = result.sdp.split('\n')
      lines.forEach(function (line) {
        if (line.indexOf('a=candidate:') === 0) {
          handleCandidate(line)
        }
      })
    }, function () {})

    // wait for a while to let everything done
    setTimeout(function() {
      // read candidate info from local description
      var lines = pc.localDescription.sdp.split('\n');

      lines.forEach(function(line) {
        if (line.indexOf('a=candidate:') === 0) {
          handleCandidate(line)
        }
      })
    }, 1000)

    return new Promise(resolve => {
      setTimeout(function() {
        resolve(ips)
      }, 1500)
    })
  }

  // Test: Print the IP addresses into the console
  getIPs()
  .then(ips => {
    console.log(ips)
  })
})()