import React from "react";

export default function Alert(props) {
    if (props.toDisplay) {
        return (
            <div className="text-center alert alert-danger">
                <p>{props.message}</p>
            </div>
        );
    } else {
        return null;
    }
}