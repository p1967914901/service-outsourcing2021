import axios, { AxiosResponse } from 'axios';
import React, {Component} from 'react';
import {connect} from 'react-redux'

import '../css/console.css'
import {updataRect} from './../action'

interface ConsoleProps {
    updataRect: typeof updataRect
}
interface ConsoleState {
    month: string,
    day: string,
    hour: string,
    station: string
}
class Console extends Component <ConsoleProps, ConsoleState>{
    private stations:Array<string>
    private months:Array<string>
    private days:any
    private hours:Array<string>
    public constructor(props : ConsoleProps) {
        super(props)
        this.stations = ['Sta18', 'Sta9', 'Sta74', 'Sta133', 'Sta69', 'Sta96', 'Sta110', 'Sta123', 'Sta36', 'Sta28', 'Sta87', 'Sta67', 'Sta162', 'Sta20', 'Sta126', 'Sta27', 'Sta132', 'Sta55', 'Sta89', 'Sta136', 'Sta64', 'Sta108', 'Sta61', 'Sta143', 'Sta163', 'Sta129', 'Sta82', 'Sta63', 'Sta115', 'Sta31', 'Sta22', 'Sta138', 'Sta90', 'Sta160', 'Sta94', 'Sta95', 'Sta65', 'Sta154', 'Sta48', 'Sta41', 'Sta134', 'Sta54', 'Sta107', 'Sta125', 'Sta122', 'Sta124', 'Sta72', 'Sta1', 'Sta141', 'Sta83', 'Sta77', 'Sta44', 'Sta158', 'Sta127', 'Sta75', 'Sta70', 'Sta81', 'Sta80', 'Sta150', 'Sta47', 'Sta146', 'Sta4', 'Sta114', 'Sta56', 'Sta53', 'Sta157', 'Sta135', 'Sta142', 'Sta91', 'Sta30', 'Sta118', 'Sta49', 'Sta93', 'Sta92', 'Sta17', 'Sta117', 'Sta147', 'Sta120', 'Sta29', 'Sta139', 'Sta102', 'Sta7', 'Sta52', 'Sta84', 'Sta156', 'Sta88', 'Sta79', 'Sta3', 'Sta23', 'Sta100', 'Sta131', 'Sta149', 'Sta113', 'Sta76', 'Sta68', 'Sta12', 'Sta57', 'Sta40', 'Sta42', 'Sta99', 'Sta25', 'Sta46', 'Sta130', 'Sta26', 'Sta13', 'Sta33', 'Sta85', 'Sta161', 'Sta60', 'Sta137', 'Sta21', 'Sta128', 'Sta167', 'Sta109', 'Sta148', 'Sta86', 'Sta151', 'Sta39', 'Sta159', 'Sta59', 'Sta15', 'Sta16', 'Sta168', 'Sta106', 'Sta121', 'Sta32', 'Sta71', 'Sta101', 'Sta97', 'Sta37', 'Sta34', 'Sta43', 'Sta144', 'Sta51', 'Sta103', 'Sta2', 'Sta62', 'Sta153', 'Sta50', 'Sta35', 'Sta165', 'Sta140', 'Sta152', 'Sta6', 'Sta78', 'Sta119', 'Sta10', 'Sta145', 'Sta58', 'Sta111', 'Sta73', 'Sta38', 'Sta66', 'Sta166', 'Sta8', 'Sta112', 'Sta19', 'Sta11', 'Sta45', 'Sta105', 'Sta164', 'Sta116', 'Sta24']
        this.months = ['1', '2', '3', '4', '5', '6', '7']
        this.days = {
            1: ['无', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
            2: ['无', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29'],
            3: ['无', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
            4: ['无', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
            5: ['无', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
            6: ['无', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
            7: ['无', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
        }
        this.hours = ['无', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
        this.state = {
            month: "1",
            day: "无",
            hour: "无",
            station: 'Sta18'
        }
    }
    
    public render() : JSX.Element {
        
        return (
            <React.Fragment>
                {/* <span>
                    站点选择：
                </span> */}
                <select id='selection' onChange = {
                    (e) => {
                        this.setState({station: e.target.value})
                    }
                } style={{
                    position: 'absolute',
                    top: '40px',
                    left: '140px'
                }}>
                    {
                        this.stations.map((selectedName : string, index : number) => (
                            <option value={selectedName} key={index}>{selectedName}</option>
                        ))
                    }
                </select>
                <span style={{
                    position: 'absolute',
                    top: '40px',
                    color: 'white',
                    fontSize: '18px'
                }}>
                    时间选择：
                </span>
                <span style={{
                    position: 'absolute',
                    top: '70px',
                    color: 'white',
                    // left: '80px',
                    fontSize: '16px'
                }}>
                    月：
                </span>
                <select id='selection' onChange = {
                    (e) => {
                        this.setState({month: e.target.value})
                    }
                } style={{
                    position: 'absolute',
                    top: '73px',
                    left: '40px'
                }}>
                    {
                        this.months.map((selectedName : string, index : number) => (
                            <option value={selectedName} key={index} >{selectedName}</option>
                        ))
                    }
                </select>
                <span style={{
                    position: 'absolute',
                    top: '70px',
                    color: 'white',
                    left: '100px',
                    fontSize: '14px'
                }}>
                    日：
                </span>
                <select id='selection' onChange = {
                    (e) => {
                        this.setState({day: e.target.value})
                    }
                } style={{
                    position: 'absolute',
                    top: '73px',
                    left: '140px'
                }}>
                    {
                        this.days[this.state.month as '1'].map((selectedName : string, index : number) => (
                            <option value={selectedName} key={index}>{selectedName}</option>
                        ))
                    }
                </select>
                <span style={{
                    position: 'absolute',
                    top: '70px',
                    color: 'white',
                    left: '200px',
                    fontSize: '14px'
                }}>
                    时：
                </span>
                <select id='selection' onChange = {
                    (e) => {
                        this.setState({hour: e.target.value})
                    }
                } style={{
                    position: 'absolute',
                    top: '73px',
                    left: '240px'
                }}>
                    {
                        this.hours.map((selectedName : string, index : number) => (
                            <option value={selectedName} key={index}>{selectedName}</option>
                        ))
                    }
                </select>
                <div className='btu' style={{
                    position: 'absolute',
                    top: '72px',
                    left: '300px'
                }} onClick={
                    () => {
                        this.update()
                    }
                }>
                    确定
                </div>
            </React.Fragment>
        )
    }

    public componentDidMount(): void {
        const {updataRect} = this.props
        axios.get('http://localhost:3000/data/month_in.json').then((res:AxiosResponse<any>) => {
            // console.log(res.data)
            const in_data:Array<number> = []
            for (let i = 1; i < 8; i++) {
                in_data.push(res.data['0' + i]['Sta18'])
            }
            axios.get('http://localhost:3000/data/month_out.json').then((res:AxiosResponse<any>) => {
                const out_data:Array<number> = []
                const times:Array<string> = []
                for (let i = 1; i < 8; i++) {
                    out_data.push(res.data['0' + i]['Sta18'])
                    times.push(i + '月')
                }
                updataRect(in_data, out_data, times)
            })
        })
    }

    private readRectData(name:string, ): void {

    }

    private update():void {
        this.updateRect()
    }

    private updateRect(): void {
        const {month, day, hour, station} = this.state;
        if (day === '无') {
            axios.get('http://localhost:3000/data/month_in.json').then((resIn:AxiosResponse<any>) => {
                axios.get('http://localhost:3000/data/month_out.json').then((resOut:AxiosResponse<any>) => {
                    const monthInt = parseInt(month)
                    const in_data:Array<number> = []
                    const out_data:Array<number> = []
                    const times:Array<string> = []
                    for (let i = monthInt; i < 8; i++) {
                        in_data.push(resIn.data['0' + i][station])
                        out_data.push(resOut.data['0' + i][station])
                        times.push(i + '月')
                        
                    }
                    this.props.updataRect(in_data, out_data, times)
                })
            })
        } else if (hour === '无') {
            axios.get('http://localhost:3000/data/day_in.json').then((resIn:AxiosResponse<any>) => {
                axios.get('http://localhost:3000/data/day_out.json').then((resOut:AxiosResponse<any>) => {
                    const dayIndex = this.days[month].indexOf(day)
                    const in_data:Array<number> = []
                    const out_data:Array<number> = []
                    const times:Array<string> = []
                    for (let i = dayIndex; i < this.days[month].length; i++) {
                        const d = parseInt(this.days[month][i])
                        in_data.push(resIn.data['0'+month][`${d<10?'0'+d:d}`][station] || 0)
                        out_data.push(resOut.data['0'+month][`${d<10?'0'+d:d}`][station] || 0)
                        times.push(`${month}月${this.days[month][i]}日`)
                        if (times.length === 7) break
                    }
                    let k = 1
                    while(times.length < 7) {
                        in_data.push(resIn.data['0'+(parseInt(month)+1)]['0'+k][station] || 0)
                        out_data.push(resOut.data['0'+(parseInt(month)+1)]['0'+k][station] || 0)
                        times.push(`${parseInt(month)+1}月${k++}日`)
                    }
                    this.props.updataRect(in_data, out_data, times)
                })
            })
        } else {
            axios.get('http://localhost:3000/data/hour_in.json').then((resIn:AxiosResponse<any>) => {
                axios.get('http://localhost:3000/data/hour_out.json').then((resOut:AxiosResponse<any>) => {
                    const hourIndex = this.hours.indexOf(hour)
                    const in_data:Array<number> = []
                    const out_data:Array<number> = []
                    const times:Array<string> = []
                    for (let i = hourIndex; i < this.hours.length; i++) {
                        const d1 = parseInt(day), d2 = parseInt(this.hours[i])
                        console.log('0'+month, `${d1<10?'0'+d1:d1}`, `${d2<10?'0'+d2:d2}`);
                        console.log(resIn.data['0'+month][`${d1<10?'0'+d1:d1}`][`${d2<10?'0'+d2:d2}`])
                        in_data.push(resIn.data['0'+month][`${d1<10?'0'+d1:d1}`][`${d2<10?'0'+d2:d2}`][station] || 0)
                        out_data.push(resOut.data['0'+month][`${d1<10?'0'+d1:d1}`][`${d2<10?'0'+d2:d2}`][station] || 0)
                        times.push(`${month}月${this.days[month][i]}日${this.hours[i]}时`)
                        if (times.length === 7) break
                    }
                    let k = 1, tday = parseInt(day)+1 < 10 ? '0'+(parseInt(day)+1): ''+(parseInt(day)+1)
                    while(times.length < 7) {
                        in_data.push(resIn.data['0'+month][tday]['0'+k][station] || 0)
                        out_data.push(resOut.data['0'+month][tday]['0'+k][station] || 0)
                        times.push(`${parseInt(month)+1}月${parseInt(day)+1}日${k++}时`)
                    }
                    this.props.updataRect(in_data, out_data, times)
                })
            })
        }
    }
}
const mapDispatchToProps = {
    updataRect
}
export default connect(null, mapDispatchToProps)(Console);