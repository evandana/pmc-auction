import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default class Modal extends Component {
    render() {
        
        const { open, title, ModalComponent } = this.props;

        return (
            <div>
                <Dialog
                    title={title}
                    modal={true}
                    open={open}
                >
                    {ModalComponent && <ModalComponent />}
                </Dialog>
            </div>
        );
    }
} 