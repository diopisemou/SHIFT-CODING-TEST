import React from "react";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Radio from '@material-ui/core/Radio';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import "./dynamicform.css";
import { makeStyles } from '@material-ui/core/styles';


export default class DynamicForm extends React.Component<any> {
  state:any = {};
  constructor(props: any) {
    super(props);
  }

  
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("gds:p:s", nextProps.defaultValues, prevState);

    let derivedState = {};

    if (
      nextProps.defaultValues &&
      nextProps.defaultValues.id !== prevState.id
    ) {
      
      return {
        ...nextProps.defaultValues
      };
    }

    console.log("no state change");
    return null;
  }

  // Validate form fields (This is configured in DynamicForm as props)
  validate = () => {
    let errors = {};
    const validators = this.props.validators;
    console.log(validators);
    validators.forEach((v) => {
      console.log(v);
      let fieldValue = this.state[v.key];
      console.log(`validating ${v.key}`);
      v.validations.forEach((vd) => {
        let r = vd.validator(fieldValue);
        if (!r) {
          if (errors[v.key] === undefined) {
            errors[v.key] = [];
          }
          errors[v.key].push(vd.message);
        }
      }); 
    })

    console.log("ERRORS: ", errors);

    return errors;
  }

  onSubmit = e => {
    e.preventDefault();
    let errors = this.validate();
    let objlen = Object.entries(errors).length;
    if ( objlen !== 0) {
      alert(JSON.stringify(errors));
      return false;
    }
    
    if (this.props.onSubmit) this.props.onSubmit(this.state);
  };

  onChange = (e, key, type = "single") => {
    
    if (type === "single") {
      this.setState(
        {
          [key]: e.target.value
        },
        () => {}
      );
    } else {
      
      let found = this.state[key]
        ? this.state[key].find(d => d === e.target.value)
        : false;

      if (found) {
        let data = this.state[key].filter(d => {
          return d !== found;
        });
        this.setState({
          [key]: data
        });
      } else {
        console.log("found", key, this.state[key]);
        
        let others = this.state[key] ? [...this.state[key]] : [];
        this.setState({
          [key]: [e.target.value, ...others]
        });
      }
    }
  };

  renderForm = () => {
    let model = this.props.model;
    let defaultValues = this.props.defaultValues;

    let formUI = model.map(m => {
      let key = m.key;
      let type = m.type || "text";
      let props = m.props || {};
      let name = m.name;
      let value = m.value;

      let target = key;
      value = this.state[target] || "";

      let input = (
        <input
          {...props}
          className="form-input"
          type={type}
          key={key}
          name={name}
          value={value}
          onChange={e => {
            this.onChange(e, target);
          }}
        />
      );

      if (type === "radio") {
        input = m.options.map(o => {
          let checked = o.value === value;
          return (
            <React.Fragment key={"fr" + o.key}>

                <FormControlLabel
                  key={o.key}
                  value={o.value}
                  control={<Radio key={o.key} name={o.name} value={o.value} checked={checked} color="primary" onChange={e => {
                      this.onChange(e, o.name);
                  }} />}
                  label={o.key}
                  labelPlacement="bottom"
                  />


            </React.Fragment>
          );
        });
        
        input = <div className="form-group-radio"><div><h3 className="form-behaviour-red">Disagree</h3></div>{input}<div><h3 className="form-behaviour-green">Agree</h3></div></div>;
      }

      if (type === "select") {
        input = m.options.map(o => {
          let checked = o.value === value;
          return (
            <option
              {...props}
              className="form-input"
              key={o.key}
              value={o.value}
            >
              {o.value}
            </option>
          );
        });

        input = (
          <select
            value={value}
            onChange={e => {
              this.onChange(e, m.key);
            }}
          >
            {input}
          </select>
        );
      }

      if (type === "checkbox") {
        input = m.options.map(o => {
          let checked = false;
          if (value && value.length > 0) {
            checked = value.indexOf(o.value) > -1 ? true : false;
          }
          
          return (
            <React.Fragment key={"cfr" + o.key}>
              <input
                {...props}
                className="form-input"
                type={type}
                key={o.key}
                name={o.name}
                checked={checked}
                value={o.value}
                onChange={e => {
                  this.onChange(e, m.key, "multiple");
                }}
              />
              <label key={"ll" + o.key}>{o.label}</label>
            </React.Fragment>
          );
        });

        input = <div className="form-group-checkbox">{input}</div>;
      }

      return (
        <div key={"g" + key} className="form-group">
          <label className="form-label" key={"l" + key} htmlFor={key}>
            {m.label}
          </label>
          {input}
          <Divider variant="middle" />
        </div>
        
      );
    });
    return formUI;
  };

  render() {
    let title = this.props.title || "Dynamic Form";
    let subTitle = this.props.subTitle || "";
    let buttonText = this.props.buttonText || "";

    return (
        
        <Container component="main" maxWidth="md">
            <CssBaseline />
            <div style={{
                    marginTop: (8),
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    }}>
                <div className={this.props.className}>
                    <h4 className="form-title">{title}</h4>
                    <h5 className="form-subtitle">{subTitle}</h5>
                    <form className="dynamic-form"
                    style={{width: '100%', marginTop: (1)}}
                    onSubmit={e => { this.onSubmit(e); }} >
                    {this.renderForm()}
                        <div className="form-actions">
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                 >
                                {buttonText}
                            </Button>  
                        </div>
                    </form>
                </div>
            </div>
        </Container>
      );
  }
}
