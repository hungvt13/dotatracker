import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Panel from './Panel/Panel';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
    div:{
        padding: 10,
        margin: 5
    },
    fab: {
        margin: theme.spacing.unit,
    },
})

const panel = (id) => 
        <Grid item xs={12} md={4} key={id}>
            <Panel id={id} />
        </Grid>;
        

class Landing extends Component {
    constructor(props){
        super(props);
        this.state = ({
            renderPanel: [panel(0)], 
            numId: 1
        });

        this.handleAddClick = this.handleAddClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }


    handleAddClick(event) {
        let nextId = this.state.numId + 1;
        this.setState({
            renderPanel: [...this.state.renderPanel, panel(nextId)],
            numId: nextId
        });
    }

    handleDeleteClick(event) {
        console.log('delete')
    }

    render(){
        const { classes } = this.props;
        return(
            <div className={classes.div}>
                <Grid container spacing={24} justify="center" alignItems="center" style={{ minHeight: '80vh' }}>
                    {this.state.renderPanel}
                    <Grid item xs md={1}>
                        <Fab color="primary" aria-label="Add" className={classes.fab}>
                            <AddIcon onClick={this.handleAddClick}/>
                        </Fab>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(Landing);