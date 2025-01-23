import classNames from "classnames";
import { CSSProperties, ChangeEvent, Component, ReactNode, createElement } from "react";

export interface InputProps {
    id?: string;
    value: string;
    className?: string;
    index?: number;
    style?: CSSProperties;
    tabIndex?: number;
    disabled?: boolean;
    onLeave?: (value: string, isChanged: boolean) => void;
    hasError?: boolean;
    required?: boolean;
    enumValues?: any;
    width?: number;
    onUpdate?: (value: string) => void;
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

    readonly state: InputState = { editedValue: undefined };

    componentDidUpdate(prevProps: InputProps): void {
        // console.log("componentDidUpdate", prevProps.value, this.props.value);

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
        // console.log("onChange", event.target.value, this);

        if (event.target.value === this.getCurrentValue()) {
            // Update the state with the selected checkbox value
            this.setState({ editedValue: undefined });
        } else {
            // Update the state with the selected checkbox value
            this.setState({ editedValue: event.target.value });
        }


        // If an onUpdate prop is passed, propagate the selected value to the parent component
        if (this.props.onUpdate) {
            // console.log("onUpdate", event.target.value);
            this.props.onUpdate(event.target.value === this.getCurrentValue()? '' : event.target.value);
        }

    }

    private onBlur(): void {
        const inputValue = this.props.value;
        const currentValue = this.getCurrentValue();

        if (this.props.onLeave) {
            this.props.onLeave(currentValue, currentValue !== inputValue);
        }

        // Reset edited value if it's empty
        if (currentValue === '') {
            this.setState({ editedValue: undefined });
        }

        // console.log("onBlur", inputValue, currentValue);
    }

    render(): ReactNode {
        const enumlist: enumValue[] = this.props.enumValues.universe as enumValue[];
        const labelledby = `${this.props.id}-label` + (this.props.hasError ? ` ${this.props.id}-error` : "");
        // console.log("enumValues", enumlist);
        // console.log("editedValue", this.state.editedValue);

        return (
            <div className="checkbox-container">
                {enumlist.map((enumItem, index) => (
                    <div key={index} className="col-lg col-md col checkbox-item">
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
                            checked={this.state.editedValue === enumItem.key}  // Only one checkbox can be checked at a time
                        />
                        <label className="checkbox-item-lable">{enumItem.caption}</label>
                    </div>
                ))}
            </div>
        );
    }
}
