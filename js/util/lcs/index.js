/**
 * https://segmentfault.com/a/1190000012864957
 * @param {*} str1
 * @param {*} str2
 */
function LCS(str1, str2) {
  const m = str1.length 
  const n = str2.length
  const dp = [new Array(n + 1).fill(0)]

  // 一共有m+1行
  for (let i = 1; i <= m; i++) {
    dp[i] = [0] // 第一列全是0
    // 一共有n+1列
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        // 注意这里，str1的第一个字符是在第二列中，因此要减1，str2同理
        // 对角＋1
        dp[i][j] = dp[i - 1][j - 1] + 1 
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
      }
    }
  }

  const strs = printAllLCS(dp, str1, str2, m, n)
  strs.forEach(str => {
    console.log(str)
  })

  return dp[m][n]
}

function printAllLCS(dp, str1, str2, i, j) {
  if (i == 0 || j == 0) {
    return new Set([''])
  }

  if (str1[i - 1] == str2[j - 1]) {
    const set = new Set()
    printAllLCS(dp, str1, str2, i - 1, j - 1).forEach(item => {
      set.add(item + str1[i - 1])
    })
    return set
  }

  const set = new Set()
  if (dp[i][j - 1] >= dp[i - 1][j]) {
    printAllLCS(dp, str1, str2, i, j - 1).forEach(item => {
      set.add(item)
    })
  }

  // 必须用>=，不能简单一个else搞定
  if (dp[i - 1][j] >= dp[i][j - 1]) {
    printAllLCS(dp, str1, str2, i - 1, j).forEach(function(item) {
      set.add(item)
    })
  }

  return set
}