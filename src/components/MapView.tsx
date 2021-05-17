import React, {Component} from 'react';
import axios, { AxiosResponse } from 'axios'
import * as echarts from 'echarts'

import '../css/mapView.css'
import ODView from './ODView';
import { ECharts, EChartsResponsiveOption } from 'echarts';
import change from '../data/change.json'


interface stationType {
	"station": string,
    "x": number,
    "y": number,
    "route": number
}

interface linkType {
	"last" : string,
	"next": string,
	"route": number,
	"lastx": number,
	"lasty": number,
	"nextx": number,
	"nexty": number
}

interface MapViewProps {
    
}
interface MapViewState {
    stations: Array<stationType>,
	links: Array<linkType>,
    route: number,
    station: string,
    timeStr: string,
    ODData: {
        top: Array<number>,
        bottom: Array<number>
    },
    isIn: boolean
}
class MapView extends Component <MapViewProps, MapViewState>{
    private myChart: ECharts | null;
    public constructor(props : MapViewProps) {
        super(props)
        this.myChart = null;
        this.state = {
			// isLogin: true,
			stations: [],
			links: [],
            route: -1,
            station: 'Sta18',
            timeStr: '2020-01-01',
            ODData: {
                top: [], bottom: []
            },
            isIn: true
		}
    }
    
    public render() : JSX.Element {
        const colors = {
            "0": 'rgb(255,166,192)', "1": 'rgb(147,254,225)', "2": 'rgb(254,253,160)',
            "3": 'rgb(252,206,16)', "4": 'rgb(46,199,201)', "5": 'rgb(232,124,37)',
            "10": 'rgb(193,35,43)', "11": 'rgb(43,130,29)', "12": 'rgb(230,105,34)'
        }
        const routeText:Array<Array<string>> = [
            ['线路1', '80px', '250px'], ['线路11', '50px', '100px'], ['线路10', '320px', '100px'], ['线路12', '290px', '500px'], 
            ['线路5', '480px', '540px'], ['线路2', '400px', '680px'], ['线路3', '940px', '700px'], ['线路4', '1050px', '190px']
        ]
        return (
            <div id='map-view'>
                <svg width='1200px' height='770px' style={{
                    backgroundColor: 'rgba(16,54,87,0.5)',
                    // border: '1px solid #345f92',
                    boxShadow: '-8px 0px 10px #034c6a inset, 8px 0px 10px #034c6a inset',
                    boxSizing: 'border-box',
                    float: 'left'
                }}>
                    
                    {
                        this.state.links.map((value: linkType, index: number) => (
                            <line x1={value['lastx']*1.2 - 50} x2={value['nextx']*1.2 - 50} 
                                y1={value['lasty'] - 20} y2={value['nexty'] - 20}
                                style={{
                                    strokeWidth: value['route'] === this.state.route ? '4px' : '2px',
                                    // stroke: '#345f92',
                                    stroke: value['route'] === this.state.route ? '#345f92' : (colors as any)[value['route']]
                                }}
                                onClick={
                                    () => {
                                        console.log(value)
                                    }
                                }
                                onMouseOver={
                                    () => {
                                        this.setState({route: value['route']})
                                    }
                                }
                                onMouseOut={
                                    () => {
                                        this.setState({route: -1})
                                    }
                                }
                            />
                        ))
                    }
                    {
                        this.state.stations.map((value: stationType, index: number) => (
                            <circle cx={value['x']*1.2 - 50} cy={value['y']-20} r='4px' 
                                style={{
                                    fill: 'white',
                                    stroke: '#345f92',
                                    strokeWidth: '2px'
                                }}
                                onClick={
                                    () => {
                                        console.log(value['route'])
                                        this.setState({station: value['station']}, () => {
                                            this.updataODView()
                                            this.updataPieView()
                                        })
                                    }
                                }
                                onMouseOver={
                                    (e) => {
                                        this.setState({route: value['route']})
                                        // console.log((e.target as any).style);
                                        ;(e.target as any).style.r = '7px'
                                        // document.getElementById('box')!.style.top = e.screenY + 'px'
                                        // document.getElementById('box')!.style.left = e.screenX + 'px'
                                        // document.getElementById('box')!.style.display = 'block'
                                        // document.getElementById('box')!.innerHTML = value['station']
                                        

                                    }
                                }
                                onMouseOut={
                                    (e) => {
                                        this.setState({route: -1})
                                        ;(e.target as any).style.r = '4px'
                                        // document.getElementById('box')!.style.display = 'none'
                                    }
                                }
                            />
                        ))
                    }
                    {
                        this.state.stations.map((value: stationType, index: number) => (
                            <text x={value['x']*1.2 - 50} y={value['y']-25} style={{
                                fill: '#fff',
                                fontSize: '10px'
                            }}>
                                {(change as any)[value['station']]}
                            </text>
                        ))
                    }
                    {
                        routeText.map((value: Array<string>, index: number) => (
                            <text x={value[1]} y={value[2]} style={{
                                fill: '#fff',
                                fontSize: '15px'
                            }}>
                                {value[0]}
                            </text>
                        ))
                    }
                </svg>
                {/* <div id='box' style={{
                    width: '70px',
                    height: '30px',
                    backgroundColor: '#030829',
                    // backgroundColor: 'red',
                    color: '#fff',
                    position: 'absolute',
                    top: '300px',
                    left: '100px',
                    textAlign: 'center',
                    lineHeight: '30px',
                    zIndex: 99,
                    display: 'none'
                }}>
                    Sta18
                </div> */}
                <div style={{
                    fontSize: '18px',
                    height: '30px',
                    // backgroundColor: 'red',
                    lineHeight: '30px',
                    float: 'left',
                    marginLeft: '10px',
                    color: 'white'
                }}>时间：</div>
                <input type="date" name="" id="table-find" value={this.state.timeStr} 
                style={{
                    marginTop: '3px'
                }}
                onChange={
                    (e) => {
                        // e.target.value
                        // console.log(e.target.value);
                        this.setState({timeStr: e.target.value}, () => {
                            this.updataODView()
                            this.updataPieView()
                        })
                    }
                }/>
                <div id='changePie' onClick={
                    () => {
                        this.setState({isIn: !this.state.isIn}, () => {
                            this.updataPieView()
                        })
                    }
                }>
                    切换
                </div>
                <div id='OD-view'>
                    <div id="OD-view-title">
                        {(change as any)[this.state.station]}断面流量分析
                    </div>
                    <ODView data={this.state.ODData}/>
                </div>
                <div id='ages-view'>
                    <div id='ages-pie'>

                    </div>
                </div>
            </div>
        )
    }

    public componentDidMount():void {
        axios.get('/data/stations.json').then((res: AxiosResponse<Array<stationType>>) => {
			// console.log(res);
			this.setState({stations: res.data})
		})
		axios.get('/data/newlinks.json').then((res: AxiosResponse<Array<linkType>>) => {
			// console.log(res);
			this.setState({links: res.data})
		})
        this.updataODView()
        this.updataPieView()
    }

    private updataODView(): void {
        axios.get('/data/ODDAta.json').then((res: AxiosResponse<Array<any>>) => {
			// console.log(res);
			this.setState({ODData: (res.data as any)[this.state.timeStr][this.state.station]})
		})
    }

    private updataPieView(): void {
        this.myChart = echarts.init(document.getElementById('ages-pie') as HTMLDivElement);
        const month:string = this.state.timeStr.split('-')[1]
        axios.get('http://localhost:3000/data/ages_month.json').then((res:AxiosResponse<any>) => {
            const options = {
                title: {
                    text: month + '月' + (change as any)[this.state.station] + (this.state.isIn ? '进站' : '出站') + '年龄分布',
                    left: 'center',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: '5%',
                    orient: 'vertical',
                    left: 'left',
                    textStyle: {
                        color: '#fff'
                    }
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 10,
                            // borderColor: '#fff',
                            // borderWidth: 2
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '15',
                                fontWeight: 'bold',
                                color: '#fff'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: res.data[month][this.state.station][this.state.isIn ? 'in' : 'out']
                    }
                ]
            };
            this.myChart?.setOption(options as EChartsResponsiveOption)
        })
    }
}
export default MapView;