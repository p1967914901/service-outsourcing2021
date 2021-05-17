import React, {Component} from 'react';
import {connect} from 'react-redux'

import {storeType, rectType} from './../types/propsType'


interface RectProps extends rectType {
    rectHeight: number
}
interface RectState {
    
}
class Rect extends Component <RectProps, RectState>{
    public constructor(props : RectProps) {
        super(props)
    }
    
    public render() : JSX.Element {
        const {rectHeight} = this.props
        const {in_data, out_data, times} = this.props
        const max = Math.max(...in_data, ...out_data)
        const lines:Array<number> = [1, 2, 3, 4, 5, 6]
        const k = 200 / (max * 1.2)
        const legends:Array<[string, string]> = [['rgb(0, 152, 131)', '进站'], ['rgb(230,105,34)', '出站']]
        // console.log(`times`, times)
        return (
            <svg width='370px' height={rectHeight + 'px'} style={{
                marginTop: '5px',
                // backgroundColor: 'red',
                // border: '1px solid #345f92',
                margin: '20px 20px 20px 20px'
            }}>
                {/* 图例 */}
                {
                    legends.map((value: [string, string], index: number) => (
                        <React.Fragment>
                            <circle key={index} cx={270+index*50} cy={10} r={5} style={{
                                fill: value[0]
                            }}/>
                        <text key={index} x={280+index*50} y={14}
                        style={{ 
                            fill: 'white',
                            fontSize: '10px'
                        }}>
                            {value[1]}
                        </text>
                        </React.Fragment>
                    ))
                }
                {/* 横线 */}
                {
                    lines.map((value: number, index: number) => (
                        <line x1='30px' x2='360px' key={index}
                            y1={rectHeight-30-index*40 + 'px'} y2={rectHeight-30-index*40 + 'px'}
                            // fill='#345f92'
                            style={{
                                stroke: 'white',
                                strokeWidth: '1px'
                            }}
                        />
                    ))
                }
                {/* 进站 */}
                {
                    in_data.map((value: number, index: number) => (
                        <rect x={35+index*45+'px'} y={rectHeight-30-k*value+'px'}
                            height={k*value+'px'} width='15px' key={index}
                            style={{
                                fill: legends[0][0],
                                stroke: 'white',
                                strokeWidth: '1px'
                            }}
                        />
                    ))
                }
                {/* 出站 */}
                {
                    out_data.map((value: number, index: number) => (
                        <rect x={55+index*45+'px'} y={rectHeight-30-k*value+'px'}
                            height={k*value+'px'} width='15px' key={index}
                            style={{
                                fill: legends[1][0],
                                stroke: 'white',
                                strokeWidth: '1px'
                            }}
                        />
                    ))
                }
                {/* 纵坐标 */}
                {
                    lines.map((value: number, index: number) => (
                        <text key={index} x='2px' y={rectHeight-25-index*40 + 'px'}
                            style={{ 
                                fill: 'white',
                                fontSize: '10px'
                        }}>
                            {index * max / 5}
                        </text>
                    ))
                }
                {/* 横坐标 */}
                {
                    times.map((value: string, index: number) => (
                        <text key={index} x={35+index*45+'px'} y={rectHeight-15}
                            style={{ 
                                fill: 'white',
                                fontSize: '10px'
                        }}>
                            {value}
                        </text>
                    ))
                }
            </svg>
        )
    }

}
const mapStateToProps = (state:storeType, ownProps?: any) => {
	console.log('dsd',state.Rect);
	return {
        ...ownProps,
        ...state.Rect
	}
}
// const mapDispatchToProps = {

// }
export default connect(mapStateToProps)(Rect);
