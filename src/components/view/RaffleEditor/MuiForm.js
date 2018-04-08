import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
// import muiThemeable from 'material-ui/styles/muiThemeable';
import Checkbox from 'material-ui/Checkbox'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

const validate = values => {
  const errors = {}
  return errors
}
const renderTextField = ({
  input,
  label,
  type,
  name,
  value,
  meta: { touched, error },
  ...custom
}) => (
    <TextField
      floatingLabelText={label}
      errorText={touched && error}
      floatingLabelFixed={type === 'date' ? true : false}
      hintText={type === 'date' ? '' : label}
      type={type}
      {...input}
      {...custom}
    />
  )

const renderCheckbox = ({ input, label }) => (
  <Checkbox
    label={label}
    checked={input.value ? true : false}
    onCheck={input.onChange}
  />
)

const renderSelectField = ({
    input,
    label,
    meta: { touched, error },
    children,
    ...custom
}) => {
  return (
        <SelectField
            floatingLabelText={label}
            errorText={touched && error}
            {...input}
            onChange={(event, index, value) => input.onChange(value)}
            children={children}
            {...custom}
        />
    )
}

class MuiForm extends Component {

  constructor(props) {
    super(props);
    // this.themePalette = this.props.muiTheme.palette;
    this.state = {
      initialValues: this.props.initialValues
    };
  }

  render() {

    const {
        handleSubmit,
        persistRaffleUpdateSubmitForm,
        pristine,
        reset,
        submitting,
        initialValues,
        raffleSubmitLabel,
        images,
    } = this.props;
      
    let imageMenuItems = [];
    
    if (images && images.length) {
      imageMenuItems = images.map((image, key) => <MenuItem value={image.downloadURL} primaryText={image.name} key={key} />);
    } 

    const style = {
      field: {
        borderRight: '.5em solid #fff'
      }
    };

    return (
      <form
        onSubmit={handleSubmit(persistRaffleUpdateSubmitForm)}
      >

        <section className="row middle-xs middle-sm">
          <RaisedButton className="col-xs-7" type="submit" style={{ padding: 0 }} primary disabled={pristine || submitting}>
            {raffleSubmitLabel || ''}
          </RaisedButton>
          <span className="col-xs-1"> </span>
          <RaisedButton className="col-xs-4" type="button" style={{ padding: 0 }} disabled={pristine || submitting} onClick={reset}>
            Clear Values
          </RaisedButton>
        </section>

        <section className="row">
          <Field
            className="col-xs-12"
            style={style.field}
            name="title"
            type="text"
            component={renderTextField}
            label="Title"
          />
          <Field
            className="col-xs-12 col-sm-8"
            style={style.field}
            name="subTitle"
            type="text"
            component={renderTextField}
            label="Subtitle"
          />
          <Field
            className="col-xs-4 col-sm-3"
            style={style.field}
            name="commercialValue"
            type="number"
            component={renderTextField}
            hintText={0}
            label="Value ($)"
          />
          <Field
            className="col-xs-12"
            style={style.field}
            name="description"
            type="text"
            component={renderTextField}
            label="Description"
            multiLine={true}
            rows={2}
          />
          <Field
            className="col-xs-8 col-sm-6"
            style={style.field}
            name="referenceLink"
            type="url"
            component={renderTextField}
            hintText={'http://somesite.com'}
            label="Reference Link"
          />
          <Field
            className="col-xs-6"
            name="show"
            component={renderCheckbox}
            label="Show"
          />
          <Field
              className="col-xs-12"
              name="raffleImage"
              component={renderSelectField}
              label="Raffle Image"
          >
              {imageMenuItems}
          </Field>
          
        </section>
      </form>
    )
  }
}

export default reduxForm({
  validate,
})(MuiForm)
