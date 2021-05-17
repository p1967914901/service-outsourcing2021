import React, {Component} from 'react';

interface ODViewProps {
    data: {
        top: Array<number>,
        bottom: Array<number>
    }
}
interface ODViewState {
    
}
class ODView extends Component <ODViewProps, ODViewState>{
    public constructor(props : ODViewProps) {
        super(props)
    }
    
    public render() : JSX.Element {
        const {data} = this.props
        let max = Math.max(...data['top'], ...data['bottom'])
        if (max % 10 > 5) {
            max += (5 - max % 5)
        } else if (max % 10 < 5 && max % 10 !== 0) {
            max += (5 - max % 5)
        }
        const d = 140 / max
        const lines:Array<number> = [160]
        const texts:Array<number> = [0]
        for (let i = 1; i <= 5; i++) {
            lines.push(160 - i * d * max / 5)
            lines.push(160 + i * d * max / 5)
            texts.push(i * max / 5)
            texts.push(i * max / 5)
        }
        const xs:Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
        return (
            <svg width='440px' height='340px' style={{
                // backgroundColor: 'white',
                margin: '20px 0px 20px 20px'
            }}>
                {
                    xs.map((value: number, index: number) => (
                        <text key={index} x={20 + index * 17.5} y={310}
                        transform={'rotate(90 ' + (20 + index * 17.5) + ',' + '310)'}
                        style={{ 
                            fill: 'white',
                            fontSize: '12px',
                            // transform: 
                        }}>
                            {value + '时'}
                        </text>
                    ))
                }
                {
                    lines.map((value: number, index: number) => (
                        <line x1 = {20} x2={20 + 19*24} y1={value} y2={value} key={index}
                            style={{
                                // fill: 'no',
                                stroke: 'white',
                                strokeWidth: 1
                            }}
                        
                        />
                    ))
                }
                {
                    texts.map((value: number, index: number) => (
                        <text key={index} x={0} y={lines[index]+ 2} style={{ 
                            fill: 'white',
                            fontSize: '13px'
                        }}>
                            {value}
                        </text>
                    ))
                }
                {
                    this.props.data['top'].map((value: number, index: number) => (
                        <rect x={20 + index * 17.5} y={160 - value * d} key={index}
                            fill='rgb(233,103,196)' height={value * d} width={5}
                        />
                    ))
                }
                {
                    this.props.data['bottom'].map((value: number, index: number) => (
                        <rect x={20 + index * 17.5} y={160} key={index}
                            fill='rgb(87,120,245)' height={value * d} width={5}
                        />
                    ))
                }
            </svg>
        )
    }
}
export default ODView;