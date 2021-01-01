import React from 'react';
import classNames from "classnames";
import './styles.scss';
//import { Image } from '../../atoms';
// import loadingIcon from "../../../assets/loading-icon.gif";

class LoadingGauge extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            timeoutLoadingGauge: false
        }
    }
    componentDidMount() {
        const { isOverlay = false, resetLoaderCbk = null, loaderTimeout = 60000 } = this.props
        if (isOverlay && resetLoaderCbk && loaderTimeout !== null) {
            setTimeout(() => {
                resetLoaderCbk();
            }, loaderTimeout)
        }
    }
    render() {
        const { isOverlay = false } = this.props
        const { timeoutLoadingGauge = false } = this.state
        return (
            <>
                {
                    (isOverlay && timeoutLoadingGauge) ? "" : <div className={classNames({ 'loading-gauge-container': true, 'overlay': isOverlay })}>
                        <div className="loading-gauge" />
                        {
                            /* <svg className={'loading-gauge-svg'} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                <circle className={'loading-circle'} cx="50" cy="50" r="45" />
                            </svg> */
                        }
                        {/* <Image src={loadingIcon} /> */}
                    </div>
                }
            </>
        )
    }
}

export { LoadingGauge }
export default { LoadingGauge }