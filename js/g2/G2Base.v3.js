import React from 'react'
import G2, { Chart } from '@antv/g2'

// 关闭 G2 的体验改进计划打点请求
G2.track(false)

export default class G2Base extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.chart = null
  }

  componentDidMount() {
    this.setupChart(this.props)
  }

  componentWillReceiveProps(newProps) {
    const { data: newData, chartConfig: newChartConfig } = newProps
    const { data: oldData, chartConfig: oldChartConfig } = this.props

    if (newData !== oldData) {
      this.setupChart(newProps)

      if (this.chart) {
        this.chart.changeData(this.transformData(newData))
      }
    }

    if (newChartConfig.width !== oldChartConfig.width) {
      this.chart && this.chart.changeWidth(newChartConfig.width)
    }
    if (newChartConfig.height !== oldChartConfig.height) {
      this.chart && this.chart.changeHeight(newChartConfig.height)
    }
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.destroy()
      this.chart = null
    }
  }

  shouldComponentUpdate() {
    return false
  }

  setupChart(props) {
    const { chartConfig, data } = props

    /**
     * 防止一开始数据为空时图表渲染的比较奇怪
     */
    if (this.chart || !data || !data.length) {
      return
    }

    const chart = new Chart(Object.assign({
      container: this.container,
      data: this.transformData(data),
      forceFit: true
    }, chartConfig || {}))

    this.initChart(chart)
    this.chart = chart
  }

  /**
   * 具体如何初始化chart，由子类重写
   * @memberof G2Base
   */
  initChart(chart) {}

  /**
   * 对原始数据进行处理，由子类重写
   * @memberof G2Base
   */
  transformData(data) {
    return data
  }

  render() {
    return (
      <div className="g2-chart">
        <div ref={div => { this.container = div }}></div>
      </div>
    )
  }
}
