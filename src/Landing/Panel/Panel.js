import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';


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
    }
});

class Panel extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: '',
            matches: '',
            id: '',
            profileName: '',
            avatar: '',
            mmr: '',
            isFound: false,
            error: '',
            loading: false,
        };
    }
    //this get the player data from OpenDota API
    fetchPlayer(id) {
        return new Promise(resolve =>{
            resolve(
                fetch('https://api.opendota.com/api/players/67762065')
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
                fetch('https://api.opendota.com/api/players/67762065/recentMatches')
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
            id: '',
            profileName: '',
            avatar: '',
            mmr: '',
            isFound: false,
            error: '',
        });
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
            this.setState({error: 'ID doesn\'t exist'});
            console.log(this.state.error);
            return;
        }

        let playerName = player.profile.personaname;
        let playerAvatar = player.profile.avatarmedium;
        let playerMmr = player.solo_competitive_rank;

        this.setState({
            id: id,
            profileName: playerName,
            avatar: playerAvatar,
            mmr: playerMmr
        });
    }
    
    render(){
        const { classes } = this.props;

        return(
            <div>
                {this.state.isFound? 
                    (<Paper className={classes.root} elevation={1}>
                        <Typography variant="h4" component="h1">
                            Welcome {this.state.profileName} 
                        </Typography>
                        <img src={this.state.avatar} alt='avatar'/>
                        <Typography variant="h5" component="h4">
                            Ranking: {this.state.mmr}
                        </Typography>
                        <Match recentMatches={this.state.matches}/>
                    </Paper>) : 
                    (<Paper className={classes.root} elevation={1}>
                        <Typography variant="h5" component="h3">
                        Enter your id:
                        </Typography>
                        <InputForm 
                            label="steam id" 
                            onSubmit={this.getInfo}
                            error={this.state.error}
                        />
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