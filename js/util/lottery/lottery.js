// https://www.h5jun.com/post/luckey-draw-in-5-minutes.html

class Lottery {
  constructor(amount) {
    this.pool = new Array(amount).fill().map((_, i) => i + 1)
  }

  draw(n=1) {
    const pool = this.pool
    const amount = pool.length

    for (let i = amount - 1, stop = amount - n - 1; i > stop; i--) {
      let rand = Math.floor((i + 1) * Math.random());
      [pool[rand], pool[i]] = [pool[i], pool[rand]]
    }

    const ret = pool.slice(-n)
    pool.length = amount - n

    return ret
  }
}

const lottery = new Lottery(200)
console.log(lottery.draw(5), lottery.draw(5))