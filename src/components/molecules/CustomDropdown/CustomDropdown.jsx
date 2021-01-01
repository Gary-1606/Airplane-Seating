import React, { Component } from "react";
import classNames from "classnames";
import { Text } from "../../atoms";
import { Down } from "../../atoms/Icons";
import {
  isNonEmptyArray,
  hasOwnProperty,
  isNonEmptyValue,
} from "../../utils/deps";
import "./styles.scss";

class CustomDropdown extends Component {
    state = {
        showdropdown: false,
        mouseOver: false,
    }

    onFocus = () => this.setState({ showdropdown: true }, () => {
        const { onFocus = null } = this.props;
        if (onFocus !== null) {
            onFocus();
        }
    });
    onBlur = () => this.setState({ showdropdown: false });
    onMouseOver = () => this.setState({ mouseOver: true });
    onMouseOut = () => this.setState({ mouseOver: false });

    hideDropdown = () => {
        this.setState({ showdropdown: false, mouseOver: false })
    }

    onDropdownClick = (event, list) => {
        const { onChange = null, id = '' } = this.props;
        if (onChange !== null) {
            onChange(event, id, list);
        }
        this.setState({ showdropdown: false, mouseOver: false });
    }

    render() {
        const { showdropdown, mouseOver } = this.state;
        const { selectedValue = 0, textValue = '', options = [], className = '', placeholder = '' } = this.props;
        const selectedOption = (isNonEmptyArray(options) ? options.find(obj => { return obj.id === selectedValue })
            : { id: selectedValue, name: selectedValue });

        return (
            <div className={classNames("molecules-custom-dropdown-container", className)}>
                {(textValue !== null && textValue !== '')
                    ?
                    <div className="custom-Text-field" >
                        {textValue}
                    </div>
                    : null
                }

                <div className="custom-dropdown-container">
                    <div className={"custom-selection-box"}
                        onClick={this.onFocus}
                        onBlur={this.onBlur}
                    >
                        {selectedOption !== undefined ? selectedOption.name : selectedValue}
                        {
                            isNonEmptyValue(placeholder) && !isNonEmptyValue(selectedValue) ?
                                <Text className="placeholder" value={placeholder} />
                                : null
                        }
                        <Down className="custom-down-arrow" onClick={this.OnFocus} />
                    </div>
                    {
                        isNonEmptyArray(options) && (showdropdown || mouseOver)
                            ?
                            <React.Fragment>
                                <div
                                    className={"custom-dropdown-list"}
                                    onMouseEnter={this.onMouseOver}
                                    onMouseLeave={this.onMouseOut} >
                                    {
                                        options.map((list, index) => {
                                            return (
                                                <List
                                                    key={index}
                                                    list={list}
                                                    onClick={this.onDropdownClick}
                                                />
                                            )
                                        })
                                    }

                                </div>
                                {(showdropdown || mouseOver)
                                    ? <div className="custom-dropdown-mask" onClick={this.hideDropdown} />
                                    : null
                                }
                            </React.Fragment>
                            : null
                    }

                </div>
            </div>
        )
    }
}

const List = props => {
    const { list = { id: '', name: '' }, onClick = null } = props;

    const onchange = (event) => {
        if (onClick !== null) { onClick(event, list); }
    }

    return (
        <div className={"custom-option-item"} onClick={onchange} >
            <span className="custom-option-text">
                {hasOwnProperty(list, 'name') ? list.name : ''}
            </span>
        </div>
    )
};

export default { CustomDropdown };
export { CustomDropdown };
