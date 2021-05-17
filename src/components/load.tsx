import React, {Component} from 'react';
import  './../css/load.css'
import {connect} from 'react-redux'
import { storeType, loadType } from '../types/propsType';

interface LoadProps extends loadType {
    
}
interface LoadState {
    
}
class Load extends Component <LoadProps, LoadState>{
    public constructor(props : LoadProps) {
        super(props)
    }
    
    public render() : JSX.Element {
        // console.log(this.props.isShow);
        return (
            <div id="load" style={{
                display : this.props.isShow ? 'inline-block' : 'none'
            }}>
                <div className="load_img">
                    <img className="jzxz1" src="images/load/jzxz1.png" alt='' />
                    <img className="jzxz2" src="images/load/jzxz2.png" alt='' />
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state:storeType, ownProps?: any) => {
	return {
        ...ownProps,
        // ...state.Load
	}
}
export default connect(mapStateToProps)(Load);