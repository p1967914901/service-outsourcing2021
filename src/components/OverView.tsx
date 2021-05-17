import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as echarts from 'echarts'

import '../css/overView.css'
import Calendar from './Calendar';
import SmallMapView from './SmallMapView';
import Rect from './rect'
import {updataRect} from './../action'
import axios, { AxiosResponse } from 'axios';
import calendarData from './../data/calendar.json'
import { ECharts, EChartsResponsiveOption } from 'echarts';
import change from '../data/change.json'


interface OverViewProps {
    updataRect: typeof updataRect
}
interface OverViewState {
    isMonth: boolean,
}
class OverView extends Component <OverViewProps, OverViewState>{
    private month: string;
    private day: string;
    private station:string;
    private myChart: ECharts | null;
    public constructor(props : OverViewProps) {
        super(props)
        this.month = '1'
        this.day = '1'
        this.station = 'Sta18'
        this.myChart = null;
        this.state = {
            isMonth: true
        }
    }
    
    public render() : JSX.Element {
        // console.log('object', this.props);
        return (
            <div id='over-view'>
                {/* <div className="select_time">
                    <div className="static_top left">
                        <i></i><span>总体概况</span>
                    </div>
                </div>
                <div className="con_div_text left">
                </div> */}
                <div className="div_any">
                    <div id='any1'>
                        <div className="div_any_child">
                            <div className="div_any_title">日历表</div>
                            <Calendar 
                                updataRect = {
                                    (month:number, day:number) => {
                                        this.month = '' + month
                                        this.day = '' + day
                                        this.updataRect()
                                        this.updataSankey()
                                    }
                                }
                            />
                        </div>
                        <div className="div_any_child rect">
                            <div className="div_any_title">{(change as any)[this.station]}流量统计图</div>
                            <Rect rectHeight={270}/> 
                        </div>
                    </div>
                    <div id='any2'>
                        <div className="div_any_child map">
                            <div className="div_any_title">地铁线路图</div>
                            <SmallMapView changeStation = {
                                (station:string) => {
                                    this.station = station
                                    // console.log('object', station);
                                    this.updataRect()
                                    this.setState({})
                                }
                            }/>
                        </div>
                    </div>
                    <div id='any3'>
                        <div className="div_any_child Sankey">
                            <div className="div_any_title">换线分析图</div>
                            <div id='sankey'>

                            </div>
                        </div>  
                    </div>
                </div>
                <div id='changeRectTime' onClick={
                    () => {
                        this.setState({isMonth: !this.state.isMonth}, () => {
                            this.updataRect()
                            this.updataSankey()
                        })
                    }
                }>
                    {this.state.isMonth ? '按天统计' : '按月统计'}
                </div>
            </div>
        )
    }

    public componentDidMount() : void {
        this.updataRect()
        this.myChart = echarts.init(document.getElementById('sankey') as HTMLDivElement);
        axios.get('http://localhost:3000/data/sankey_month.json').then((res:AxiosResponse<any>) => {
            const options = {
                tooltip: {
                    trigger: 'item',
                    triggerOn: 'mousemove',
                    textStyle: {
                        color: '#fff'
                    },
                    backgroundColor: '#030829',
                },
                series: {
                    type: 'sankey',
                    layout: 'none',
                    bottom: 10,
                    right: 45,
                    top: 0,
                    left: 0,
                    
                    lineStyle: {
                        color: 'source',
                        // curveness: 0.5
                    },
                    label: {
                        color: 'white',
                        fontFamily: 'Arial',
                        fontSize: 10
                    },
                    emphasis: {
                        focus: 'adjacency'
                    },
                    data: res.data['0' + this.month]['data'],
                    links: res.data['0' + this.month]['links'],
                }
            }
            this.myChart?.setOption(options as EChartsResponsiveOption)
        })
    }

    private updataRect(): void {
        const {updataRect} = this.props
        if (this.station === '') return;
        if (this.state.isMonth) {
            axios.get('http://localhost:3000/data/month_in.json').then((res:AxiosResponse<any>) => {
                const in_data:Array<number> = []
                for (let i = parseInt(this.month); i < 8; i++) {
                    in_data.push(res.data['0' + i][this.station])
                }
                axios.get('http://localhost:3000/data/month_out.json').then((res:AxiosResponse<any>) => {
                    const out_data:Array<number> = []
                    const times:Array<string> = []
                    for (let i = parseInt(this.month); i < 8; i++) {
                        out_data.push(res.data['0' + i][this.station])
                        times.push(i + '月')
                    }
                    updataRect(in_data, out_data, times)
                })
            })
        } else {
            const station = this.station
            axios.get('http://localhost:3000/data/day_in.json').then((resIn:AxiosResponse<any>) => {
                axios.get('http://localhost:3000/data/day_out.json').then((resOut:AxiosResponse<any>) => {
                    const dayIndex = (calendarData as any)[this.month].indexOf(this.day)
                    const in_data:Array<number> = []
                    const out_data:Array<number> = []
                    const times:Array<string> = []
                    for (let i = dayIndex; i < (calendarData as any)[this.month].length; i++) {
                        const d = parseInt((calendarData as any)[this.month][i])
                        in_data.push(resIn.data['0'+this.month][`${d<10?'0'+d:d}`][station] || 0)
                        out_data.push(resOut.data['0'+this.month][`${d<10?'0'+d:d}`][station] || 0)
                        times.push(`${this.month}月${(calendarData as any)[this.month][i]}日`)
                        if (times.length === 7) break
                    }
                    let k = 1
                    while(times.length < 7) {
                        in_data.push(resIn.data['0'+(parseInt(this.month)+1)]['0'+k][station] || 0)
                        out_data.push(resOut.data['0'+(parseInt(this.month)+1)]['0'+k][station] || 0)
                        times.push(`${parseInt(this.month)+1}月${k++}日`)
                    }
                    this.props.updataRect(in_data, out_data, times)
                })
            })
        }
    }

    private updataSankey(): void {
        const options = {
            tooltip: {
                trigger: 'item',
                triggerOn: 'mousemove',
                textStyle: {
                    color: '#fff'
                },
                backgroundColor: '#030829',
            },
            series: {
                type: 'sankey',
                layout: 'none',
                bottom: 10,
                right: 45,
                top: 0,
                left: 0,
                
                lineStyle: {
                    color: 'source',
                    // curveness: 0.5
                },
                label: {
                    color: 'white',
                    fontFamily: 'Arial',
                    fontSize: 10
                },
                emphasis: {
                    focus: 'adjacency'
                },
                data: [],
                links: [],
            }
        }
        if (this.state.isMonth) {
            axios.get('http://localhost:3000/data/sankey_month.json').then((res:AxiosResponse<any>) => {
                options['series']['data'] = res.data['0' + this.month]['data']
                options['series']['links'] = res.data['0' + this.month]['links'] 
                this.myChart?.setOption(options as EChartsResponsiveOption)
            })
        } else {
            axios.get('http://localhost:3000/data/sankey_day.json').then((res:AxiosResponse<any>) => {
                options['series']['data'] = res.data['0' + this.month][`${parseInt(this.day)<10?'0'+this.day:this.day}`]['data']
                options['series']['links'] = res.data['0' + this.month][`${parseInt(this.day)<10?'0'+this.day:this.day}`]['links'] 
                this.myChart?.setOption(options as EChartsResponsiveOption)
            })
        }
    }
}

const mapDispatchToProps = {
    updataRect
}
export default connect(null, mapDispatchToProps)(OverView);