import React, { Component } from 'react';
import { connect } from 'react-redux'
import { 
    BrowserRouter as Router, 
    Route, 
    Link 
} from 'react-router-dom'
import axios, { AxiosResponse } from 'axios'
import './App.css';
import { changeLoadingShow } from './action'

import MapView from './components/MapView'
import OverView from './components/OverView';
import TableView from './components/TableView';
import ModelView from './components/ModelView';
import Login from './components/Login';



interface AppProps {
	changeLoadingShow: typeof changeLoadingShow
}
interface AppState {
	isLogin: boolean,
	path: string
}
class App extends Component<AppProps, AppState>{
	public constructor(props: AppProps) {
		super(props)
		this.state = {
			isLogin: true,
			path: '/'
		}
	}

	public render(): JSX.Element {
		const navs:Array<[string, string]> = [
			['/', '数据概览'], 
			['forecast-model', '预测模型'], 
			[`/map-view`, '地图界面'], 
			['table-view', '表格界面']
		]
		const {path} = this.state
		return (
			<div id='app'>
				<Router>
					<div id='header'>
						<div className='nav'>
							<ul>
								{
									navs.map((value: [string, string], index: number) => (
										<li key={index} className={value[0] === path ? 'nav_active' : ''} style={{
											float: index < 2 ? 'left' : 'right',
											margin: index < 2 ? '15px 0px 0px 100px' : '15px 100px 0px 0px'
										}} onClick={
											() => {
												this.setState({path: value[0]})
											}
										}>
											<i style={{
												backgroundImage: `url(/images/nav_${index + 1}.png)`
											}}></i>
											<Link to={value[0]}>{value[1]}</Link> 
										</li>
									))
								}
							</ul>
						</div>
						<div className="header_center left">
							<h2><strong>地铁大脑—智慧客流可视分析系统</strong></h2>
							<p className="color_font"><small>Subway Brain—Intelligent passenger flow visual analysis system</small></p>
						</div>
					</div>
					<Route exact path="/" component={OverView}/>
					<Route path="/table-view" component={TableView}/>
					<Route path="/forecast-model" component={ModelView}/>
					<Route path="/map-view" component={MapView}/>
				</Router>
				<Login />
			</div>
		)
	}

	public componentDidMount(): void {
		// this.props.history.replace()
		// console.log(this.props)
	}
}
const mapDispatchToProps = {
	changeLoadingShow
}

export default connect(null, mapDispatchToProps)(App);
