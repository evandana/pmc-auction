import React from 'react';
import {
    Step,
    Stepper,
    StepButton,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

/**
 * This is similar to the horizontal non-linear example, except the
 * `<Step>` components are being controlled manually via individual props.
 *
 * An enhancement made possible by this functionality (shown below),
 * is to permanently mark steps as complete once the user has satisfied the
 * application's required conditions (in this case, once it has visited the step).
 *
 */
class StatusStepper extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { claimStep, setClaimStep, bidDetails } = this.props;

        return (
            <div style={{
                width: '100%',
                maxWidth: 500,
                margin: 'auto',
            }}>
                <Stepper
                    linear={false}
                    activeStep={typeof claimStep === "number" ? claimStep + 1 : 0}
                >
                    <Step>
                        <StepButton
                            completed={claimStep >= 0}
                            style={{ marginTop: '-20px', height: '40px' }}
                            onClick={() => setClaimStep({
                                claimStep: claimStep === 0 ? null : 0, 
                                ...bidDetails
                            })}
                            >
                            Contact
                        </StepButton>
                    </Step>
                    <Step>
                        <StepButton
                            completed={claimStep >= 1}
                            style={{ marginTop: '-20px', height: '40px' }}
                            onClick={() => setClaimStep({
                                claimStep: claimStep === 1 ? 0 : 1, 
                                ...bidDetails
                            })}
                            >
                            Plan
                        </StepButton>
                    </Step>
                    <Step>
                        <StepButton
                            completed={claimStep >= 2}
                            style={{ marginTop: '-20px', height: '40px' }}
                            onClick={() => setClaimStep({
                                claimStep: claimStep === 2 ? 1 : 2, 
                                ...bidDetails
                            })}
                            >
                            Meet
                        </StepButton>
                    </Step>
                </Stepper>
            </div>
        );
    }
}

export default StatusStepper;