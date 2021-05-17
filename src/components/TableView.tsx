import React, {Component} from 'react';
import '../css/tableView.css'
import axios, { AxiosResponse } from 'axios'
import tableSelections from '../data/tableView.json'
import change from '../data/change.json'

// import 'bootstrap'

interface TableViewProps {
    
}
interface TableViewState {
    tableData: Array<Array<string>>,
    tableDataBySelect: Array<Array<string>>,
    sum: number,
    pagination: number,
}
class TableView extends Component <TableViewProps, TableViewState>{
    private inStation:string
    private outStation:string
    private inRoute:string
    private outRoute:string
    private birthyear:string
    private sex:string
    private inTime:string
    private outTime:string
    public constructor(props : TableViewProps) {
        super(props)
        this.inStation = '不限'
        this.outStation = '不限'
        this.inRoute = '不限'
        this.outRoute = '不限'
        this.birthyear = '不限'
        this.sex = '不限'
        this.inTime = ''
        this.outTime = ''
        this.state = {
            tableData: [],
            tableDataBySelect: [],
            sum: 0,
            pagination: 1,
        }
    }
    
    public render() : JSX.Element {
        const theads:Array<string> = ['入站时间', '入站点',  '出站时间', '出站点', '线路', '出生年份', '性别']
        const {sum, pagination} = this.state
        const paginationList:Array<string> = []
        if (sum <= 56) {
            let s = sum, index = 1
            while(s > 0) {
                paginationList.push('' + index)
                s -= 14
                index ++
            }
        } else {
            let index = 1
            while(index < 5) {
                paginationList.push('' + index)
                index ++
            }
            paginationList.push('···')
            paginationList.push((sum / 14 + 0.5).toFixed(0))
        }
        return (
            <div id='table-view'>
                <div id='table-find'>
                    <p style={{
                        marginTop: '4px',
                        textAlign: 'center',
                        fontSize: '23px',
                        color: 'white'
                    }}>
                        站点信息
                    </p>
                    <p>
                        <label>入站点：</label>
                        <select onChange={
                            (e) => {
                                this.inStation = e.target.value
                            }
                        }>
                            {
                                tableSelections['stations'].map((value: string, index: number) => (
                                    <option value={value} key={index}>{(change as any)[value]}</option>
                                ))
                            }
                        </select>
                        <label>入站线路：</label>
                        <select onChange={
                            (e) => {
                                this.inRoute = e.target.value
                            }
                        }>
                            {
                                tableSelections['routes'].map((value: string, index: number) => (
                                    <option value={value} key={index}>{value}</option>
                                ))
                            }
                        </select>
                        <label>出站点：</label>
                        <select onChange={
                            (e) => {
                                this.outStation = e.target.value
                            }
                        }>
                            {
                                tableSelections['stations'].map((value: string, index: number) => (
                                    <option value={value} key={index}>{(change as any)[value]}</option>
                                ))
                            }
                        </select>
                        <label>出站线路：</label>
                        <select onChange={
                            (e) => {
                                this.outRoute = e.target.value
                            }
                        }>
                            {
                                tableSelections['routes'].map((value: string, index: number) => (
                                    <option value={value} key={index}>{value}</option>
                                ))
                            }
                        </select>
                    </p>
                    <p style={{
                        marginTop: '10px',
                        textAlign: 'center',
                        fontSize: '23px',
                        color: 'white'
                    }}>
                        乘客信息
                    </p>
                    <p>
                        <label>出生年份：</label>
                        <select onChange={
                            (e) => {
                                this.birthyear = e.target.value
                            }
                        }>
                            {
                                tableSelections['birthyear'].map((value: string, index: number) => (
                                    <option value={value} key={index}>{value}</option>
                                ))
                            }
                        </select>
                        <label>性别：</label>
                        <select onChange={
                            (e) => {
                                this.sex = e.target.value
                                // this.search()
                            }
                        }>
                            {
                                ['不限', '男', '女'].map((value: string, index: number) => (
                                    <option value={value} key={index}>{value}</option>
                                ))
                            }
                        </select>
                        <label>入站时间：</label>
                        <input type="date"  onChange={
                            (e) => {
                                this.inTime = e.target.value
                            }
                        } />
                        <label>出站时间：</label>
                        <input type="date" onChange={
                            (e) => {
                                this.outTime = e.target.value
                            }
                        } />
                        {/* <button className="btn btn-primary btn-sm"><span className="glyphicon glyphicon-search"></span>查询</button> */}
                    </p>
                </div>
                <div id='search' onClick={
                    () => {
                        this.search()
                    }
                }>
                    查询
                </div>
                <table style={{
                    marginTop: '10px',
                    width: '100%',
                    // height: '300px',
                    padding: '8px',
                    color: '#FFFFff',
                    boxShadow: '-8px 0px 10px #034c6a inset, 8px 0px 10px #034c6a inset',
                    fontSize: '15px',
                    borderSpacing: 0,

                }}>
                    <thead>
                        <tr>
                            {
                                theads.map((value: string, index: number) => (
                                    <td key={index}>{value}</td>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.tableDataBySelect.map((value: string[], index:number) => {
                                if ((pagination-1) * 14 < index + 1 && index + 1 <= 14 * pagination) {
                                    return (
                                        <tr key={index}>
                                            {
                                                value.map((value: string, index: number) => (
                                                    <td key={index}>{value[0] == 'S' ? (value in change ? (change as any)[value]: '潘水') : value}</td>
                                                ))
                                            }
                                        </tr>
                                    )
                                }
                            })
                        }
                    </tbody>
                </table>
                <div style={{
                    display: 'block'
                }}>
                    <div className="pull-left pagination-detail">
                        <span className="pagination-info">显示第 {1 + (pagination - 1) * 14} 到第 {Math.min(pagination * 14, sum)} 条记录，总共 {sum} 条记录</span>
                    </div>
                    <div className="pull-right pagination">
                        <ul className="pagination">
                            <li className="page-pre">
                                <a href="javascript:void(0)" onClick={
                                    (e) => {
                                        if (pagination === 1) return;
                                        e.preventDefault();
                                        this.setState({pagination: pagination-1})
                                    }
                                }>{'<'}</a>
                            </li>
                            {
                                paginationList.map((value: string, index: number) => (
                                    <li className={"page-number " + (pagination === parseInt(value) ? 'active' : '')}>
                                        <a href="javascript:void(0)" onClick={
                                            (e) => {
                                                e.preventDefault()
                                                this.setState({pagination: parseInt(value)})
                                            }
                                        }>{value}</a>
                                    </li>
                                ))
                            }
                            {/* <li className="page-number active">
                                <a href="javascript:void(0)">1</a>
                            </li>
                            <li className="page-number">
                                <a href="javascript:void(0)">2</a>
                            </li> */}
                            <li className="page-next">
                                <a href="javascript:void(0)" onClick={
                                    (e) => {
                                        if (pagination * 14 >= sum) return;
                                        e.preventDefault();
                                        this.setState({pagination: pagination+1})
                                    }
                                }>{'>'}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

    public componentDidMount() {
        console.log(tableSelections)
        axios.get('/data/day.json').then((res: AxiosResponse<Array<any>>) => {
			// console.log(res.data);
			const {data} = res;
            const tableData:Array<Array<string>> = []
            for (let month in data) {
                for (let day in data[month]) {
                    data[month][day].map((value: any) => {
                        tableData.push([
                            value['in_station_time'],//0
                            value['in_station_name'],//1
                            value['out_station_time'],//2
                            value['out_station_name'],//3
                            value['route'][0] + '->' + value['route'][1],//4
                            value['year_of_birth'],//5
                            value['sex'] === 0 ? '男' : '女'//6
                        ])
                    })
                }
            }
            
            this.setState({tableData, tableDataBySelect: tableData, sum: tableData.length})
		})
    }

    private search(): void {
        const selections:any = {}
        const tableDataBySelect:Array<Array<string>> = []
        const {tableData} = this.state
        if (this.inStation !== '不限') selections[1] = this.inStation
        if (this.outStation !== '不限') selections[3] = this.outStation
        if (this.inRoute !== '不限') selections['inRoute'] = this.inRoute
        if (this.outRoute !== '不限') selections['outRoute'] = this.outRoute
        if (this.birthyear !== '不限') selections[5] = this.birthyear
        if (this.sex !== '不限') selections[6] = this.sex
        for (let i = 0; i < tableData.length; i ++) {
            let isSame:boolean = true;
            for (let key in selections) {
                if (['inRoute', 'outRoute'].includes(key)) {
                    let arr:Array<string> = (tableData[i] as any)[4].split('->')
                    // console.log(this.inRoute, arr);
                    let index = ['inRoute', 'outRoute'].indexOf(key)
                    if (arr[index] !== selections[key]) {
                        isSame = false
                        break;
                    }
                } else {
                    if ((tableData[i] as any)[key] !== selections[key]) {
                        isSame = false
                        break;
                    }
                }
            }
            if (isSame) {
                tableDataBySelect.push(tableData[i])
            }
        }
        this.setState({tableDataBySelect, sum:tableDataBySelect.length, pagination: 1})


    }

}
export default TableView;