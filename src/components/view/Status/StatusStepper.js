import React from 'react';
import {
    Step,
    Stepper,
    StepButton,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import CheckCircleIcon from 'material-ui/svg-icons/action/check-circle';

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
        const { claimStep, setClaimStep, bidDetails, themePalette } = this.props;

        const stepLabels = [
            'Contact',
            'Plan',
            'Meet'
        ];

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
                    {stepLabels.map((label, i) => {
                        return (
                            <Step key={i}>
                                {claimStep >= i ? (
                                    // completed
                                    <StepButton
                                        completed={claimStep >= i}
                                        style={{ marginTop: '-20px', height: '40px' }}
                                        onClick={() => setClaimStep({
                                            claimStep: claimStep === i ? i - 1 : i,
                                            ...bidDetails
                                        })}
                                        icon={<CheckCircleIcon style={{ color: themePalette.accent1Color }} />}
                                        >
                                        {stepLabels[i]}
                                    </StepButton>
                                ) : (
                                    // not completed
                                    <StepButton
                                        completed={claimStep >= i}
                                        style={{ marginTop: '-20px', height: '40px' }}
                                        onClick={() => setClaimStep({
                                            claimStep: claimStep === i ? i - 1 : i,
                                            ...bidDetails
                                        })}
                                        >
                                        {label}
                                    </StepButton>
                                )}
                            </Step>
                        );
                    })}
                </Stepper>
            </div>
        );
    }
}

export default StatusStepper;