import React from "react";

class BaseLogin extends React.Component {
    render() {
        return(
            <>
                {this.props.children}
            </>
        )
    }
}


export default BaseLogin