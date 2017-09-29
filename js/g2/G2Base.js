import React from 'react'
import G2, { Chart } from 'g2'

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
    this._initChart(props)
  }

  componentWillReceiveProps(newProps) {
    const { data: newData, width: newWidth, height: newHeight, plotCfg: newPlotCfg } = newProps
    const { data: oldData, width: oldWidth, height: oldHeight, plotCfg: oldPlotCfg } = this.props
    
    if (newData !== oldData) {
      this.setProps(newProps)
      this._initChart(newProps)

      if (this.chart) {
        this.chart.changeData(this.processData(newData))
      }
    }

    // if (newWidth !== oldWidth || newHeight !== oldHeight) {
    //   this.chart && this.chart.changeSize(newWidth, newHeight)
    // }
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
  

  _initChart(props) {
    const { width, height, plotCfg, forceFit, data } = props

    /**
     * 防止一开始数据为空时图表渲染的比较奇怪
     */
    if (this.chart || !data || !data.length) {
      return
    }

    const chart = new Chart({
      container: this.container,
      data: this.processData(data),
      width,
      height,
      forceFit,
      plotCfg
    })

    this.initChart(chart)
    this.chart = chart
  }

  /**
   * 设置组件属性，由子类重写
   * @memberof G2Base
   */
  setProps(props) {}

  /**
   * 初始化chart，由子类重写
   * @memberof G2Base
   */
  initChart() {}

  /**
   * 对原始数据进行处理，由子类重写
   * @memberof G2Base
   */
  processData(data) {
    return data
  }

  render() {
    return (<div className="g2-chart"><div ref={div => { this.container = div }} style={{height: this.props.height}}></div></div>)
  }
}