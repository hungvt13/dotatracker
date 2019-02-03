import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';




import InputForm from '../InputForm/InputForm';
import Match from'../Match/Match';


const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
    },
    progress: {
      margin: theme.spacing.unit * 2,
    },
    delete: {
        marginTop: 'auto'
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      },
});

class Panel extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: '',
            matches: '',
            winRate: '',
            id: '',
            profileName: '',
            avatar: '',
            mmr: '',
            isFound: false,
            error: '',
            loading: false,
            expanded: false, 
        };

        this.getWinRate = this.getWinRate.bind(this);
        this.handleExpandClick = this.handleExpandClick.bind(this);
    }
    //this get the player data from OpenDota API
    fetchPlayer(id) {
        return new Promise(resolve =>{
            resolve(
                fetch(`https://api.opendota.com/api/players/${id}`)
                    .then((response) => {
                        return response.json();
                    })
                    .then(data => {
                        this.setState({data: data})
                        return this.data;
                    })
                    .catch((error) =>{
                        console.log(error)
                        this.setState({error: 'Connection Error'})
                    })
            )
        })
    };

    //get matches from player ID
    fetchMatches(id) {
        return new Promise(resolve =>{
            resolve(
                fetch(`https://api.opendota.com/api/players/${id}/recentMatches`)
                    .then((response) => {
                        return response.json();
                    })
                    .then(data => {
                        this.setState({matches: data})
                        return this.data;
                    })
            )
        })
    };

    clearInfo() {
        this.setState({
            data: '',
            matches: '',
            winRate: '',
            id: '',
            profileName: '',
            avatar: '',
            mmr: '',
            isFound: false,
            error: '',
            loading: '',
            expanded: false,
        });
    }

    getWinRate(number){
        let rate = number + '%';
        this.setState({winRate: rate});
    }

    handleExpandClick(){
        let exp = !this.state.expanded
        this.setState({expanded: exp})
    }

    //this generate information from fetched data
    getInfo = async (id) => {
        this.clearInfo();
        this.setState({loading: true});
        await this.fetchPlayer(id);
        await this.fetchMatches(id);

        let player = this.state.data;
        if(player.profile != null) this.setState({
            isFound: true,
            error: '',
            loading: false
        });
        else {
            this.setState({
                error: 'ID doesn\'t exist',
                loading: false
            });
            console.log(this.state.error);
            return;
        }

        let playerName = player.profile.personaname;
        let playerAvatar = player.profile.avatarmedium;
        let playerMmr = player.solo_competitive_rank;

        if(playerMmr == null) playerMmr = 'Calibrating';

        this.setState({
            id: id,
            profileName: playerName,
            avatar: playerAvatar,
            mmr: playerMmr,
        });
    }
    
    render(){
        const { classes } = this.props;

        return(
            <div>
                {this.state.isFound? 
                    (<Paper className={classes.root} elevation={1}>
                        <Typography variant="h4" component="h2">
                            Welcome 
                        </Typography>
                        <Typography variant="h4" component="h4">
                            {this.state.profileName} 
                        </Typography>
                        <img src={this.state.avatar} alt='avatar'/>
                        <Typography variant="h6" component="h6">
                            Ranking: <strong>{this.state.mmr}</strong>
                        </Typography>
                        <Typography variant="h6" component="h6">
                            Winrate: <strong>{this.state.winRate}</strong>
                        </Typography>
                        <IconButton
                            onClick={this.handleExpandClick}
                            aria-expanded={this.state.expanded}
                            aria-label="Show more"
                            >
                            <ExpandMoreIcon />
                        </IconButton>
                        <Collapse in={this.state.expanded} timeout="auto">
                            <Match recentMatches={this.state.matches} getWinRate={this.getWinRate} />
                        </Collapse>
                    </Paper>) : 
                    (<Paper className={classes.root} elevation={1}>
                        <Typography variant="h4" component="h1">
                        Steam ID:
                        </Typography>
                        <InputForm 
                            label="steam id" 
                            onSubmit={this.getInfo}
                            error={this.state.error}
                        />
                        <Fab aria-label="Delete" size="small">
                            <DeleteIcon onClick={this.props.deleteEvent}/>
                        </Fab>
                        {this.state.loading &&
                            <CircularProgress className={classes.progress} />
                        }
                    </Paper>)
                    
                }
            </div>
        );
    }
}
export default withStyles(styles)(Panel);;