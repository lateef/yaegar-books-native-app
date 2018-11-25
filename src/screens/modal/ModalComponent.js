import React, {Component} from 'react';
import {dismissAllModals, dismissModal} from "../../App";
import {Navigation} from "react-native-navigation/lib/dist/index";

export class ModalComponent extends Component {
    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
    }

    navigationButtonPressed({buttonId}) {
        if ('backButton' === buttonId) {
            this.dismissModal();
        }
    }

    dismissModal() {
        dismissModal(this.props.componentId);
    }

    dismissAllModals() {
        dismissAllModals(this.props.componentId);
    }
}