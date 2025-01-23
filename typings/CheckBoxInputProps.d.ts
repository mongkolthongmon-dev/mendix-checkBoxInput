/**
 * This file was generated from CheckBoxInput.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, EditableValue } from "mendix";

export interface CheckBoxInputContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    id: string;
    enumAttribute: EditableValue<string>;
    onChangeAction?: ActionValue;
}

export interface CheckBoxInputPreviewProps {
    class: string;
    style: string;
    enumAttribute: string;
    onChangeAction: {} | null;
}
