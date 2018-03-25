import React, { Component } from 'react'

import muiThemeable from 'material-ui/styles/muiThemeable';

import Paper from 'material-ui/Paper';

import { Field, reduxForm } from 'redux-form'

import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { Tabs, Tab } from 'material-ui/Tabs';
// import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import Checkbox from 'material-ui/Checkbox'
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle';
import ImageUpload from 'components/controller/ImageUpload';

import { persistRaffleUpdate } from 'actions';

import MuiForm from './MuiForm';

class RaffleEditor extends Component {

    constructor(props) {
        super(props);
        this.submitForm = this.submitForm.bind(this);
        this.themePalette = this.props.muiTheme.palette;
        this.state = {
            selectedTab: !this.props.raffles || this.props.raffles.length < 1 ? 'new' : this.props.raffles[0].uid ,
        };
    }

    numberify(val, defaultValue) {
        return !val ? defaultValue : typeof val !== "number" ? parseInt(val, 10) : val;
    }

    submitForm(formData) {

        const { dispatch, user } = this.props;

        formData.commercialValue = this.numberify(formData.commercialValue, 0);

        dispatch(persistRaffleUpdate(formData, user));
    }


    handleChange = (value) => {
        this.setState({
            selectedTab: value,
        });
    };

    render() {

        const { raffles, images } = this.props;

        const style = {
            field: {
                borderRight: '.5em solid #fff'
            }
        };

        debugger;

        return (
            <div className="page">
                <Tabs
                    inkBarStyle={{background: this.themePalette.highlight1Color}}
                    tabItemContainerStyle={{ backgroundColor: this.themePalette.ternaryTextColor }}
                    value={this.state.selectedTab}
                    onChange={this.handleChange}
                >
                    {raffles.map(raffle => {
                        // ignore mal-formed raffle items
                        if (!raffle.title) {
                            return '';
                        }

                        return (
                            <Tab 
                                label={raffle.title.length < 17 ? raffle.title : raffle.title.substring(0,15) + '...'} 
                                value={raffle.uid} 
                                key={raffle.uid}
                                >
                                <div className="text-content">
                                    <MuiForm
                                        key={raffle.uid}
                                        form={raffle.uid}
                                        initialValues={raffle}
                                        raffleSubmitLabel='Save'
                                        persistRaffleUpdateSubmitForm={this.submitForm}
                                        images={images}
                                    />
                                    <ImageUpload />
                                </div>
                            </Tab>
                        );
                    })}
                    <Tab icon={<AddCircleIcon />} value={'new'}>
                        <div className="text-content">
                            <MuiForm
                                form={'new'}
                                initialValues={{
                                    show: true,
                                }}
                                raffleSubmitLabel='Create Raffle'
                                persistRaffleUpdateSubmitForm={this.submitForm}
                                images={images}
                            />
                            <ImageUpload />
                        </div>
                    </Tab>
                </Tabs>
            </div>
        )

    }

}

export default muiThemeable()(RaffleEditor);