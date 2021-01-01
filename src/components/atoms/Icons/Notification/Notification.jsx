import React from 'react'

class Notification extends React.Component {
    static defaultProps = {
        width: '25px',
        height: '25px',
        className: '',
        onClick: null,
        qaAttribute: null,
        title: "Notifications"
    }
    render() {
        return (
            <div title={this.props.title}>
                <svg version="1.1" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"
                    {...(this.props.qaAttribute ? { "data-qa": this.props.qaAttribute } : {})}
                    width={this.props.width} height={this.props.height} className={this.props.className} onClick={this.props.onClick}>
                    <g id="Padding__x26__Artboard" />
                    <g id="Icons">
                        <g>
                            <path d="M35.29377,27.02002c-0.41406-1.47656-0.84229-3.00391-1.12207-4.53613    c-0.11963-0.65625-0.19727-1.33398-0.27197-1.98828c-0.12061-1.05469-0.24512-2.14453-0.5498-3.20801    c-0.50146-1.75-1.33984-3.22266-2.49268-4.375c-1.85205-1.85254-4.30859-2.87207-6.91748-2.87207    c-1.92041,0-3.85742,0.59473-5.4541,1.67578c-1.42578,0.96484-2.57861,2.29004-3.33496,3.83105    c-0.35547,0.72559-0.6167,1.50977-0.82178,2.46777c-0.12256,0.57324-0.1709,1.1582-0.21777,1.72363    c-0.03027,0.3623-0.06006,0.72461-0.10938,1.08301c-0.11816,0.85645-0.28174,1.76172-0.49951,2.76758    c-0.2876,1.32324-0.63574,2.65918-0.97266,3.95117c-0.1178,0.45312-0.23499,0.90594-0.35089,1.35938h0.72302h22.17981h0.72571    C35.64185,28.27161,35.46912,27.64575,35.29377,27.02002z M17.19415,21.2124c-0.02295,0.17676-0.17334,0.30469-0.34668,0.30469    c-0.01514,0-0.03027-0.00098-0.04541-0.00293c-0.19189-0.02441-0.32715-0.2002-0.30225-0.3916l0.13379-1.03125    c0.0249-0.19238,0.20117-0.32812,0.39209-0.30176c0.19189,0.02441,0.32715,0.2002,0.30225,0.3916L17.19415,21.2124z     M21.17755,13.57959c-1.68701,0.96191-2.90186,2.52734-3.61084,4.6543c-0.04883,0.14746-0.18555,0.23926-0.33203,0.23926    c-0.03662,0-0.07373-0.00488-0.11084-0.01758c-0.18311-0.06152-0.28223-0.25977-0.22119-0.44238    c0.75439-2.26367,2.11279-4.00684,3.92822-5.04102c0.16846-0.0957,0.38184-0.03711,0.47754,0.13086    C21.40412,13.27002,21.34552,13.48389,21.17755,13.57959z" />
                            <path d="M37.59601,35.01123l-1.58862-5.41211h-0.72974H12.71271h-0.72919l-1.57941,5.41211    c-0.07861,0.26758-0.0293,0.54883,0.13623,0.77051c0.16602,0.2207,0.4209,0.34766,0.69971,0.34766h10.80957h0.7002h2.81006h0.7002    h0.18243h10.31757c0.27832,0,0.5332-0.12598,0.69873-0.34766C37.62482,35.56006,37.67463,35.27979,37.59601,35.01123z" />
                            <path d="M25.40412,36.80688h-2.49854h-0.77374c0.20892,0.66547,0.82434,1.15259,1.55792,1.15259h0.93018    c0.73358,0,1.349-0.48712,1.55792-1.15259H25.40412z" />
                        </g>
                    </g>
                </svg>
            </div>
            // <i className="material-icons">notifications</i>
        )
    }
}

export { Notification }
export default { Notification }