import React from 'react'

class Arrow extends React.Component {
    static defaultProps = {
        width: '25px',
        height: '25px',
        className: '',
        onClick: null,
        viewBox: "0 0 24 24"
    }
    render() {
        return (
            <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox={this.props.viewBox}
                    width={this.props.width} height={this.props.height} className={this.props.className} onClick={this.props.onClick}>
                    <path d="M12.1 8.5c-.4.4-.4 1 0 1.4l2.3 2.3H6.8c-.6 0-1 .4-1 1s.4 1 1 1h7.6l-2.3 2.3c-.4.4-.4 1 0 1.4s1 .4 1.4 0l4.7-4.7-4.7-4.7c-.4-.4-1-.4-1.4 0z" />
                </svg>
            </>
        )
    }
}

export { Arrow }
export default { Arrow }
