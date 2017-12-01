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
    const props = this.props

    this.setProps(props)
    this.setup(props)
  }

  componentWillReceiveProps(newProps) {
    const { data: newData, chartConfig: newChartConfig } = newProps
    const { data: oldData, chartConfig: oldChartConfig } = this.props

    if (newData !== oldData) {
      this.setProps(newProps)

      if (this.chart) {
        this.changeData(newData)        
      } else {
        this.setup(newProps)        
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

  changeData(newData) {
    this.chart.changeData(this.transformData(newData))    
  }

  setup(props) {
    const { chartConfig, data } = props

    /*
     * 已经初始化
     */
    if (this.chart) {
      return
    }

    /**
     * 防止一开始数据为空时图表渲染的比较奇怪
     */
    if (!this.shouldRenderEmpty() && (!data || !data.length)) {
      return
    }

    const chart = new Chart(Object.assign({
      container: this.container,
      data: this.transformData(data),
      forceFit: true
    }, chartConfig || {}))

    this.initChart(chart, props)
    this.chart = chart
  }

  /**
   * 具体如何初始化chart，由子类重写
   * @memberof G2Base
   */
  initChart(chart, props) {}

  /**
   * 对原始数据进行处理，由子类重写
   * @memberof G2Base
   */
  transformData(data) {
    return data
  }

  /**
   * 设置组件属性，由子类重写
   * 由于组件changeData时新的props还没设置成功，所以渲染的props还是老的
   * 需要自己手动设置props到this上才能及时获取到最新的props
   * @memberof G2Base
   */
  setProps(props) {}

  /**
   * 数据为空时是否渲染图表
   * 地图的情况下可能为空也要渲染
   */
  shouldRenderEmpty() {
    return false
  }

  render() {
    return (
      <div className="g2-chart">
        <div ref={div => { this.container = div }} style={{height: this.props.chartConfig.height}}></div>
      </div>
    )
  }
}
