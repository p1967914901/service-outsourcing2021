import React, {Component} from 'react';
import '../css/calendar.css'
import calendarData from './../data/calendar.json'


interface CalendarProps {
    updataRect: (month:number, day:number) => void;
}
interface CalendarState {
    year: number,
    month: number,
    day: number
}
class Calendar extends Component <CalendarProps, CalendarState>{
    public constructor(props : CalendarProps) {
        super(props)
        this.state = {
            year: 2020,
            month: 1,
            day: 1
        }
    }
    
    public render() : JSX.Element {
        const titles:Array<string> = ['一', '二', '三', '四', '五', '六', '日']
        const position:Array<number> = [0, 3, 6, 7, 3, 5, 1, 3]
        const {year, month, day} = this.state
        const {updataRect} = this.props
        const timeList:Array<string> = (calendarData as any)['' + month]
        return (
            <div style={{ 
                margin: '40px 20px 20px 20px',
                height: '290px',
                width: '370px',
                // backgroundColor: 'white',
                color: 'white',
                userSelect: 'none'
            }}>
                <div style={{
                    width: '100%',
                    // backgroundColor: 'red',
                    height: '30px',
                    lineHeight: '30px'
                }}>
                    <span style={{
                        fontSize: '17px',
                        marginLeft: '15px'
                    }}>
                        {year}年{month}月
                    </span>
                    <span className='change-month' onClick={
                        () => {
                            if (month === 7) return;
                            if(month === 12) {
                                this.setState({
                                    year: year + 1,
                                    month: 1
                                })
                            } else {
                                this.setState({month: month + 1})
                            }
                        }
                    }>
                        ∧
                    </span>
                    <span className='change-month' onClick={
                        () => {
                            if (month === 1) return;
                            if(month === 1) {
                                this.setState({
                                    year: year - 1,
                                    month: 12
                                })
                            } else {
                                this.setState({month: month - 1})
                            }
                        }
                    }>
                        ∨
                    </span>
                </div>
                {
                    titles.map((value: string, index: number) => (
                        <div style={{
                            // backgroundColor: 'blue',
                            width: 100 / 7 + '%',
                            height: '40px',
                            float: 'left',
                            textAlign: 'center',
                            lineHeight: '40px',
                            fontSize: '16px',
                            // border: '0px solid black'
                        }} key={index}>
                            {value}
                        </div>
                    ))
                }
                {
                    timeList.map((value: string, index: number) => {
                        return (
                            <div className={'calendar-number ' + (value === '' + day ? 'calendar-number-select' : '') } style={{
                                marginLeft: index === 0 ? (position[month] - 1 ) * (370 / 7) + 'px' : '0px'
                            }} key={index} onClick={
                                () => {
                                    this.setState({day: parseInt(value)})
                                }
                            }>
                                {value}
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    public componentDidUpdate(): void {
        this.props.updataRect(this.state.month, this.state.day)
    }
}
export default Calendar;