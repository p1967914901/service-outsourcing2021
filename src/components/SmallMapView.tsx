import React, {Component} from 'react';
import axios, { AxiosResponse } from 'axios'
import '../css/mapView.css'
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

interface SmallMapViewProps {
    changeStation: (station: string) => void
}
interface SmallMapViewState {
    stations: Array<stationType>,
	links: Array<linkType>,
    route: number,
    station: string
}
class SmallMapView extends Component <SmallMapViewProps, SmallMapViewState>{
    public constructor(props : SmallMapViewProps) {
        super(props)
        this.state = {
			// isLogin: true,
			stations: [],
			links: [],
            route: -1,
            station: 'Sta18'
		}
    }
    
    public render() : JSX.Element {
        const colors = {
            "0": 'rgb(255,166,192)', "1": 'rgb(147,254,225)', "2": 'rgb(254,253,160)',
            "3": 'rgb(252,206,16)', "4": 'rgb(46,199,201)', "5": 'rgb(232,124,37)',
            "10": 'rgb(193,35,43)', "11": 'rgb(43,130,29)', "12": 'rgb(230,105,34)'
        }
        const routeText:Array<Array<string>> = [
            ['线路1', '10px', '200px'], ['线路11', '10px', '40px'], ['线路10', '150px', '60px'], ['线路12', '120px', '450px'], 
            ['线路5', '250px', '490px'], ['线路2', '200px', '630px'], ['线路3', '550px', '620px'], ['线路4', '650px', '150px']
        ]
        return (
            <>
            <svg width='768px' height='638px' style={{
                // backgroundColor: 'rgba(16,54,87,0.5)',
                // border: '1px solid #345f92',
                // boxShadow: '-8px 0px 10px #034c6a inset, 8px 0px 10px #034c6a inset',
                // boxSizing: 'border-box'
                margin: '20px'
            }}>
                
                {
                    this.state.links.map((value: linkType, index: number) => (
                        <line key={index} x1={(value['lastx'] - 100)* 0.8} x2={(value['nextx'] - 100) * 0.8} 
                            y1={(value['lasty'] - 60)*0.99} y2={(value['nexty'] - 60)*0.99}
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
                        <circle key={index} cx={(value['x'] - 100) * 0.8} cy={(value['y']-60)*0.99} 
                            r={this.state.station === value['station'] ? '7px' : '4px'} 
                            style={{
                                fill: 'white',
                                stroke: '#345f92',
                                strokeWidth: '2px'
                            }}
                            onClick={
                                () => {
                                    console.log(value)
                                    this.props.changeStation(value['station'])
                                }
                            }
                            onMouseOver={
                                (e) => {
                                    this.setState({route: value['route'], station: value['station']})
                                    // document.getElementById('box')!.style.top = e.screenY + 'px'
                                    // document.getElementById('box')!.style.left = e.screenX + 'px'
                                    // document.getElementById('box')!.style.display = 'block'
                                    // document.getElementById('box')!.innerHTML = value['station']
                                    // console.log(document.getElementById('box'));
                                }
                            }
                            onMouseOut={
                                () => {
                                    this.setState({route: -1, station: ''})
                                    // document.getElementById('box')!.style.display = 'none'

                                }
                            }
                            
                        />
                    ))
                }
                {
                    this.state.stations.map((value: stationType, index: number) => (
                        <text x={(value['x'] - 100) * 0.8} y={(value['y']-65)*0.99} style={{
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
                    // backgroundColor: '#030829',
                    backgroundColor: 'red',
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
            </>
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
    }
}
export default SmallMapView;