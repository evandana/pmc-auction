import React from 'react';
import {
    Step,
    Stepper,
    StepButton,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

const getStyles = () => {
    return {
        root: {
            width: '100%',
            maxWidth: 500,
            margin: 'auto',
        },
        content: {
            margin: '0 16px',
        },
        actions: {
            marginTop: 12,
        },
        backButton: {
            marginRight: 12,
        },
    };
};

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

    // state = {
    //     stepIndex: null,
    //     visited: [],
    // };

    // componentWillMount() {
    //     const { stepIndex, visited } = this.state;
    //     this.setState({ visited: visited.concat(stepIndex) });
    // }

    // componentWillUpdate(nextProps, nextState) {
    //     const { stepIndex, visited } = nextState;
    //     if (visited.indexOf(stepIndex) === -1) {
    //         this.setState({ visited: visited.concat(stepIndex) });
    //     }
    // }

    // handleNext = () => {
    //     const { stepIndex } = this.state;
    //     if (stepIndex < 2) {
    //         this.setState({ stepIndex: stepIndex + 1 });
    //     }
    // };

    // handlePrev = () => {
    //     const { stepIndex } = this.state;
    //     if (stepIndex > 0) {
    //         this.setState({ stepIndex: stepIndex - 1 });
    //     }
    // };

    // getStepContent(stepIndex) {
    //     switch (stepIndex) {
    //         case 0:
    //             return 'Select campaign settings...';
    //         case 1:
    //             return 'What is an ad group anyways?';
    //         case 2:
    //             return 'This is the bit I really care about!';
    //         default:
    //             return 'Click a step to get started.';
    //     }
    // }

    render() {
        // const {stepIndex, visited} = this.state;

        const { claimStep, setClaimStep, bidDetails } = this.props;

        // const setStepAction = (step) => {
        //     console.log('setStepAction', step);
        // }

        const styles = getStyles();

        return (
            <div style={styles.root}>
                {/* <p>
          <a
            href="#"
            onClick={(event) => {
              event.preventDefault();
              this.setState({stepIndex: null, visited: []});
            }}
          >
            Click here
          </a> to reset the example.
        </p> */}
                {/* <div style={styles.content}>
          <p>{this.getStepContent(stepIndex)}</p>
          {stepIndex !== null && (
            <div style={styles.actions}>
              <FlatButton
                label="Back"
                disabled={stepIndex === 0}
                onClick={this.handlePrev}
                style={styles.backButton}
              />
              <RaisedButton
                label="Next"
                primary={true}
                onClick={this.handleNext}
              />
            </div>
          )}
        </div> */}
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


// import React from 'react';
// import {
//   Step,
//   Stepper,
//   StepLabel,
//   StepContent,
// } from 'material-ui/Stepper';
// import RaisedButton from 'material-ui/RaisedButton';
// import FlatButton from 'material-ui/FlatButton';

// /**
//  * Vertical steppers are designed for narrow screen sizes. They are ideal for mobile.
//  *
//  * To use the vertical stepper with the contained content as seen in spec examples,
//  * you must use the `<StepContent>` component inside the `<Step>`.
//  *
//  * <small>(The vertical stepper can also be used without `<StepContent>` to display a basic stepper.)</small>
//  */
// class StatusStepper extends React.Component {

//   state = {
//     finished: false,
//     stepIndex: 0,
//   };

//   handleNext = () => {
//     const {stepIndex} = this.state;
//     this.setState({
//       stepIndex: stepIndex + 1,
//       finished: stepIndex >= 2,
//     });
//   };

//   handlePrev = () => {
//     const {stepIndex} = this.state;
//     if (stepIndex > 0) {
//       this.setState({stepIndex: stepIndex - 1});
//     }
//   };

//   renderStepActions(step) {
//     const {stepIndex} = this.state;

//     return (
//       <div style={{margin: '12px 0'}}>
//         <RaisedButton
//           label={stepIndex === 2 ? 'Finish' : 'Next'}
//           disableTouchRipple={true}
//           disableFocusRipple={true}
//           primary={true}
//           onClick={this.handleNext}
//           style={{marginRight: 12}}
//         />
//         {step > 0 && (
//           <FlatButton
//             label="Back"
//             disabled={stepIndex === 0}
//             disableTouchRipple={true}
//             disableFocusRipple={true}
//             onClick={this.handlePrev}
//           />
//         )}
//       </div>
//     );
//   }

//   render() {
//     const {finished, stepIndex} = this.state;

//     return (
//       <div style={{maxWidth: 380, maxHeight: 400, margin: 'auto'}}>
//         <Stepper activeStep={stepIndex} orientation="vertical">
//           <Step>
//             <StepLabel>Select campaign settings</StepLabel>
//             <StepContent>
//               <p>
//                 For each ad campaign that you create, you can control how much
//                 you're willing to spend on clicks and conversions, which networks
//                 and geographical locations you want your ads to show on, and more.
//               </p>
//               {this.renderStepActions(0)}
//             </StepContent>
//           </Step>
//           <Step>
//             <StepLabel>Create an ad group</StepLabel>
//             <StepContent>
//               <p>An ad group contains one or more ads which target a shared set of keywords.</p>
//               {this.renderStepActions(1)}
//             </StepContent>
//           </Step>
//           <Step>
//             <StepLabel>Create an ad</StepLabel>
//             <StepContent>
//               <p>
//                 Try out different ad text to see what brings in the most customers,
//                 and learn how to enhance your ads using features like ad extensions.
//                 If you run into any problems with your ads, find out how to tell if
//                 they're running and how to resolve approval issues.
//               </p>
//               {this.renderStepActions(2)}
//             </StepContent>
//           </Step>
//         </Stepper>
//         {finished && (
//           <p style={{margin: '20px 0', textAlign: 'center'}}>
//             <a
//               href="#"
//               onClick={(event) => {
//                 event.preventDefault();
//                 this.setState({stepIndex: 0, finished: false});
//               }}
//             >
//               Click here
//             </a> to reset the example.
//           </p>
//         )}
//       </div>
//     );
//   }
// }

// export default StatusStepper;