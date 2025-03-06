import classNames from "classnames";
import { CSSProperties, ChangeEvent, Component, ReactNode, createElement } from "react";
import { FormorientationEnum } from "../../typings/CheckBoxInputProps";
import { EditableValue } from "mendix";

export interface InputProps {
    id?: string;
    value: string;
    className?: string;
    style?: CSSProperties;
    tabIndex?: number;
    disabled?: boolean;
    onLeave?: (value: string, isChanged: boolean) => void;
    hasError?: boolean;
    required?: boolean;
    onUpdate?: (value: string) => void;
    formorientation?: FormorientationEnum;
    enumAttribute: EditableValue<string>;
}

export interface enumValue {
    key: string;
    caption: string;
}

interface InputState {
    editedValue?: string;
}

export class CheckBox extends Component<InputProps, InputState> {
    private readonly onChangeHandle = this.onChange.bind(this);
    private readonly onBlurHandle = this.onBlur.bind(this);

    readonly state: InputState = { editedValue: this.props.value };

    componentDidUpdate(prevProps: InputProps): void {

        // Reset edited value if the value prop changes
        if (this.props.value !== prevProps.value) {
            this.setState({ editedValue: this.props.value });
        }
    }

    /**
     * Retrieves the current value of the checkbox.
     *
     * @returns {string} The current value, which is either the edited value if it has been set,
     *                   or the original value from props if the edited value is undefined.
     */
    private getCurrentValue(): string {
        return this.state.editedValue !== undefined ? this.state.editedValue : this.props.value;
    }

    private onChange(event: ChangeEvent<HTMLInputElement>): void {


        if (event.target.value === this.getCurrentValue()) {
            // Update the state with the selected checkbox value
            this.setState({ editedValue: undefined });
        } else {
            // Update the state with the selected checkbox value
            this.setState({ editedValue: event.target.value });
        }

        // If an onUpdate prop is passed, propagate the selected value to the parent component
        if (this.props.onUpdate) {

            this.props.onUpdate(event.target.value === this.getCurrentValue() ? "" : event.target.value);
        }
    }

    private onBlur(): void {
        const inputValue = this.props.value;
        const currentValue = this.getCurrentValue();

        if (this.props.onLeave) {
            this.props.onLeave(currentValue, currentValue !== inputValue);
        }

        // Reset edited value if it's empty
        if (currentValue === "") {
            this.setState({ editedValue: undefined });
        }


    }

    render(): ReactNode {
        const enumlist: enumValue[] = this.props.enumAttribute.universe?.map((caption, key) => ({
            key: caption,
            caption: caption
        })) || [];
        
        const labelledby = `${this.props.id}-label` + (this.props.hasError ? ` ${this.props.id}-error` : "");

        if (this.props.formorientation === "horizontal") {
            return (
                
                <div className="checkbox-container">
                    {enumlist.map((enumItem) => (
                        <div key={enumItem.key} className="col-lg col-md col checkbox-item">
                            <input
                                type="checkbox"
                                className={classNames(this.props.className)}
                                style={this.props.style}
                                value={enumItem.key}
                                tabIndex={this.props.tabIndex}
                                onChange={this.onChangeHandle}
                                disabled={this.props.disabled}
                                onBlur={this.onBlurHandle}
                                aria-labelledby={labelledby}
                                aria-invalid={this.props.hasError}
                                aria-required={this.props.required}
                                checked={this.state.editedValue === enumItem.key} // Only one checkbox can be checked at a time
                            />
                            <label className="checkbox-item-lable">{enumItem.caption}</label>
                        </div>
                    ))}
                </div>
            );

        } else {
            return (
                <div className="checkbox-container-vertical">
                {enumlist.map((enumItem) => (
                    <div key={enumItem.key} className="checkbox-item-vertical">
                        <input
                            type="checkbox"
                            className={classNames(this.props.className)}
                            style={this.props.style}
                            value={enumItem.key}
                            tabIndex={this.props.tabIndex}
                            onChange={this.onChangeHandle}
                            disabled={this.props.disabled}
                            onBlur={this.onBlurHandle}
                            aria-labelledby={labelledby}
                            aria-invalid={this.props.hasError}
                            aria-required={this.props.required}
                            checked={this.state.editedValue === enumItem.key} // Only one checkbox can be checked at a time
                        />
                        <label className="checkbox-item-vertical-lable">{enumItem.caption}</label>
                    </div>
                ))}
            </div>
            );
        }
    }
}
