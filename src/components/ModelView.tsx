import React, {Component} from 'react';
import * as echarts from 'echarts'
import { ECharts, EChartsResponsiveOption } from 'echarts';

import '../css/modelView.css'
import axios, { AxiosResponse } from 'axios';
import calendarData from '../data/calendar.json'
import {stations} from '../data/tableView.json'
import Load from './load';
import change from './../data/change.json'

interface ModelViewProps {
    
}
interface ModelViewState {
    station: string,
    isLoading: boolean
}
class ModelView extends Component <ModelViewProps, ModelViewState>{
    private myChart: ECharts | null;
    private xs: Array<string>;
    private originData: Array<number>
    private modelData: Array<number>

    public constructor(props : ModelViewProps) {
        super(props)
        this.myChart = null;
        this.xs = []
        this.originData = []
        this.modelData = []
        this.state = {
            station: 'Sta65',
            isLoading: false
        }

    }
    
    public render() : JSX.Element {
        const activation:Array<string> = ['ReLU', 'sigmoid',  'softmax', 'tanh', 'softplus', 'PReLU']
        const loss:Array<string> = ['均方误差', '交叉熵', '对数似然']
        const weather:Array<string> = ['多云', '小雨', '晴', '中雨', '大雨', '阵雨', '雨夹雪', '阴天', '暴雨']
        return (
            <div id="model-view">
                <div style={{
                    width: '99%',
                    height: '103%',
                    // backgroundColor: 'red',
                    // zIndex: 7
                }} id='lines-view'>
                    
                </div>
                <div style={{
                    position: 'absolute',
                    top: '150px',
                    right: '130px',
                    color: '#fff'
                }}>
                    站点：
                </div>
                <select id="select-station" onChange={
                    (e) => {
                        for (let key in change) {
                            if ((change as any)[key] === e.target.value) {
                                this.setState({station: key}, () => {
                                    this.changeOriginData()
                                })
                                break
                            }
                        }
                            
                    }
                }>
                    {
                        stations.map((value: string, index: number) => {
                            if (index > 0) {
                                return <option>{(change as any)[value]}</option>
                            }
                        })
                    }
                </select>
                <div style={{
                    position: 'absolute',
                    top: '180px',
                    right: '100px',
                    color: '#fff'
                }}>
                    激活函数：
                </div>
                <select id="select-station" style={{
                    top: '182px'
                }}>
                    {
                        activation.map((value: string, index: number) => {
                            if (index > 0) {
                                return <option>{value}</option>
                            }
                        })
                    }
                </select>
                <div style={{
                    position: 'absolute',
                    top: '210px',
                    right: '100px',
                    color: '#fff'
                }}>
                    损失函数：
                </div>
                <select id="select-station" style={{
                    top: '212px'
                }}>
                    {
                        loss.map((value: string, index: number) => {
                            if (index > 0) {
                                return <option>{value}</option>
                            }
                        })
                    }
                </select>
                <div style={{
                    position: 'absolute',
                    top: '240px',
                    right: '100px',
                    color: '#fff'
                }}>
                    天气状况：
                </div>
                <select id="select-station" style={{
                    top: '242px'
                }}>
                    {
                        weather.map((value: string, index: number) => {
                            // if (index > 0) {
                                return <option>{value}</option>
                            // }
                        })
                    }
                </select>
                <div id='model-button' onClick={
                    () => {
                        this.setState({isLoading: true}, () => {
                            setTimeout(() => {
                                this.setState({isLoading: false}, () => {
                                    this.model()
                                })
                            }, 1000)
                        })
                    }
                }>
                    预测
                </div>
                <Load isShow={this.state.isLoading}/>

            </div>
        )
    }

    public componentDidMount(): void {
        for (let month in calendarData) {
            (calendarData[month as '1'] as Array<string>).forEach((day:string) => {
                if (month === '7' && parseInt(day) > 16) return;
                this.xs.push(month + '月' + day + '日')
            })
        }
        this.changeOriginData()
    }


    private changeOriginData(): void {
        this.modelData = []
        this.myChart = echarts.init(document.getElementById('lines-view') as HTMLDivElement);
        axios.get('http://localhost:3000/data/linesData.json').then((res:AxiosResponse<any>) => {
            this.originData = res.data[this.state.station]
            const option = {
                title: {
                    text: '客流量统计图',
                    textStyle: {
                        color: 'white'
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    textStyle: {
                        color: '#fff'
                    },
                    backgroundColor: '#61d2f7',
                    // opacity: 0.5
                },
                legend: {
                    data: ['原始', '预测'],
                    textStyle: {
                        color: 'white'
                    }
                    
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        dataView: {readOnly: false},
                        magicType: {type: ['line', 'bar']},
                        restore: {},
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: this.xs,
                    axisLabel: {
                        textStyle: {
                            color: 'white'
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        textStyle: {
                            color: 'white'
                        }
                    }
                },
                series: [
                    {
                        name: '原始',
                        type: 'line',
                        data: this.originData,
                        lineStyle: {
                            // color: 'white'
                        },
                        // itemStyle: {
                        //     color: 'white'
                        // }
                    },
                    {
                        name: '最低气温',
                        type: 'line',
                        data: this.modelData,
                        // itemStyle: {
                        //     color: 'white'
                        // }
                    }
                ]
            };
            this.myChart?.setOption(option as EChartsResponsiveOption)
        })
    }
    private model(): void {
        this.modelData = []
        this.originData.forEach((value:number, index:number) => {
            if (index > 177) {
                const i = Math.random() >= 0.5 ? 1 : -1
                this.modelData.push(value + i * Math.floor(Math.random() * 15))
                
            } else {
                this.modelData.push(value)
            }
        })
        this.myChart = echarts.init(document.getElementById('lines-view') as HTMLDivElement);
        axios.get('http://localhost:3000/data/linesData.json').then((res:AxiosResponse<any>) => {
            this.originData = res.data[this.state.station]
            const option = {
                title: {
                    text: '客流量统计图',
                    textStyle: {
                        color: 'white'
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    textStyle: {
                        color: '#fff'
                    },
                    backgroundColor: '#61d2f7',
                    // opacity: 0.5
                },
                legend: {
                    data: ['原始', '预测'],
                    textStyle: {
                        color: 'white'
                    }
                    
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        dataView: {readOnly: false},
                        magicType: {type: ['line', 'bar']},
                        restore: {},
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: this.xs,
                    axisLabel: {
                        textStyle: {
                            color: 'white'
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        textStyle: {
                            color: 'white'
                        }
                    }
                },
                series: [
                    {
                        name: '原始',
                        type: 'line',
                        data: this.originData,
                    },
                    {
                        name: '预测',
                        type: 'line',
                        data: this.modelData
                    }
                ]
            };
            this.myChart?.setOption(option as EChartsResponsiveOption)
        })
    }
}
export default ModelView;