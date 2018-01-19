import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default class Modal extends Component {
    render() {
        
        const { open, title, ModalComponent } = this.props;
        
        const actions = [
        ];

        return (
            <div>
                <Dialog
                    title={title}
                    open={open}
                >
                    {ModalComponent && <ModalComponent />}
                    {actions.map(action => action)}
                </Dialog>
            </div>
        );
    }
} 