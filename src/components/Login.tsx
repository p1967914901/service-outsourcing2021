import React, {Component} from 'react';
import '../css/login.css'


interface LoginProps {
    
}
interface LoginState {
    isShow: boolean,
    password: string
}
class Login extends Component <LoginProps, LoginState>{
    public constructor(props : LoginProps) {
        super(props)
        this.state = {
            isShow: true,
            password: '',
        }
    }
    
    public render() : JSX.Element {
        return (
            <div id='login-view' style={{
                display: this.state.isShow ? 'block' : 'none',
                width: '100%',
                height: '100%',
                position: 'fixed',
                top: 0,
                zIndex: 1,
                background: "#030829",
            }}>
                <div id='header'>
                    <div className="header_center left">
                        <h2><strong>地铁大脑—智慧客流可视分析系统</strong></h2>
                        <p className="color_font"><small>Subway Brain-Intelligent passenger flow visual analysis system</small></p>
                    </div>
                </div>
                <div style={{ 
                    width: '20%',
                    height: '20%',
                    margin: '250px auto',
                    // backgroundColor: 'white'
                }}>
                    <div style={{
                        width: '100%',
                        textAlign: 'center',
                        fontSize: '30px',
                        color: '#fff'
                    }}>
                        请输入登录密码
                    </div>
                    <div style={{
                        width: '60px',
                        position: 'absolute',
                        top: '430px',
                        left: '720px',
                        // backgroundColor: '#fff1',
                        textAlign: 'center',
                        fontSize: '15px',
                        color: '#fff'
                    }}>
                        用户名：
                    </div>
                    <input type="text" style={{
                        position: 'relative',
                        left: '100px',
                        top: '30px'
                    }}/>
                    <div style={{
                        width: '60px',
                        position: 'absolute',
                        top: '470px',
                        left: '720px',
                        // backgroundColor: '#fff1',
                        textAlign: 'center',
                        fontSize: '15px',
                        color: '#fff'
                    }}>
                        密码：
                    </div>
                    <input type="password" style={{
                        position: 'absolute',
                        left: '772px',
                        top: '470px',
                        width: '172px'
                    }} value={this.state.password} onChange={
                        (e) => {
                            this.setState({password: e.target.value})
                        }
                    } onKeyDown={
                        (e) => {
                            // console.log(e);
                            if (e.code === "Enter"){
                                this.login()
                            }
                        }
                    } />
                    <div id='button' onClick={
                        () => {
                            this.login()
                        }
                    }>
                        确定
                    </div>
                </div>
                
            </div>
        )
    }

    private login() {
        if (this.state.password !== '7758258') {
            this.setState({isShow: false})
        } else {
            alert('密码错误，请重新输入！！！')
            this.setState({password: ''})
        }
    }
}
export default Login;