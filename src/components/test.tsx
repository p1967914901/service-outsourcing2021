import React, {Component} from 'react';

interface TestProps {
    
}
interface TestState {
    
}
class Test extends Component <TestProps, TestState>{
    public constructor(props : TestProps) {
        super(props)
    }
    
    public render() : JSX.Element {
        return (
            <div></div>
        )
    }
}
export default Test;    