import { Component, Fragment, ReactNode, createElement } from "react";

import { CheckBoxInputContainerProps } from "../typings/CheckBoxInputProps";

import "./ui/CheckBoxInput.css";
import { CheckBox } from "./components/CheckBox";
import { Alert } from "./components/Alert";

export default class CheckBoxInput extends Component<CheckBoxInputContainerProps> {
    private readonly onLeaveHandle = this.onLeave.bind(this);
    private readonly onUpdateHandle = this.onUpdate.bind(this);

    componentDidMount(): void {
        // this.props.enumAttribute.setValidator(this.validator.bind(this));
    }

    private onLeave(value: string, isChanged: boolean): void {
        if (!isChanged) {
            return;
        }
        // console.log('onLeave',value,);
        this.props.enumAttribute.setValue(value);
    }

    private onUpdate(value: string): void {
        console.log('onUpdate',value,);
        this.props.enumAttribute.setValue(value === "" ? undefined : value);
    }

    render(): ReactNode {
        console.log("test", this.props);
        const value = this.props.enumAttribute.value || "";
        const validationFeedback = this.props.enumAttribute.validation;

        console.log("enumAttribute", this.props.enumAttribute);

        return (
            <Fragment>
                <CheckBox
                    id={this.props.id}
                    value={value}
                    style={this.props.style}
                    className={this.props.class}
                    tabIndex={this.props.tabIndex}
                    disabled={this.props.enumAttribute.readOnly}
                    onLeave={this.onLeaveHandle}
                    required={false}
                    hasError={!!validationFeedback}
                    onUpdate={this.onUpdateHandle}
                    formorientation={this.props.formorientation}
                    enumAttribute={this.props.enumAttribute}
                />
                <Alert>{validationFeedback}</Alert>
            </Fragment>
        );
    }
}
