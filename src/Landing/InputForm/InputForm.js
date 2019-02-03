import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
    button: {
        margin: theme.spacing.unit,
      },
    input: {
        display: 'none',
    },
    errorField: {
        color: 'black !important'
    }
});

class InputForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({name: event.target.value});
    }

    handleSubmit(event) {
        let value = this.state.name;
        this.props.onSubmit(value);
        event.preventDefault();
    }

    render(){
        return(
            <div className={styles.container}>
                <form noValidate autoComplete="off">
                    {this.props.error ? 
                        <TextField
                            error
                            id="outlined-error"
                            label={this.props.label}
                            className={styles.textField}
                            value={this.state.name}
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
                        /> :
                        <TextField
                            id="outlined-name"
                            label={this.props.label}
                            className={styles.textField}
                            value={this.state.name}
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
                        /> 
                    }
                </form>
                <Button 
                    variant="contained" 
                    color="primary" 
                    className={styles.button}
                    onClick= {this.handleSubmit}
                >
                    Submit
                </Button>
                <h5 className={styles.errorField}>{this.props.error}</h5>
            </div>
        );
    }
}

export default InputForm;