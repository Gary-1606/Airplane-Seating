import React from 'react'
import "./styles.scss";

class Button extends React.Component {
    render() {
        const { onClick, className, children, value, ...attributes } = this.props;
        return (
            <button onClick={onClick} className={className} {...attributes}>
                {children ? children : value}
            </button>
        )
    }
}

export { Button }
export default { Button }