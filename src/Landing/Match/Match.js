import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';



const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 200,
    },
    head: {
        backgroundColor: theme.palette.common.black,
        color: 'white',
    },
    lose: {
        color: 'red'
    },
    win: {
        color: 'green'
    }
})

class Match extends Component{

    constructor(props){
        super(props);
        this.rows = [];
        this.id = 0;
        this.win = 0;
    }
    checkWin = (playerId, radiantWon) => (playerId <= 127 && radiantWon)? 'Win' : 'Lose';

    calculateWinRate = () =>  this.win / 20 * 100;

    createData(game_id, wl){
        this.id += 1;
        let curId = this.id;
        return { curId, game_id, wl };
    }

    generateData = (data) => {
        data.map((item) => {
            let isWon = this.checkWin(item.player_slot, item.radiant_win);
            if(isWon === 'Win') this.win++;
            return this.rows.push(this.createData(item.match_id, isWon));
       });
   }

    componentDidMount(){
        this.generateData(this.props.recentMatches);
        let winRate = this.calculateWinRate();
        this.props.getWinRate(winRate);
    }
    
    render(){
        const { classes } = this.props;
        return(
            <Paper className={classes.root}>
            <Typography variant="h6" component="h6">
                Recent 20 matches 
            </Typography>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow >
                            <TableCell className={classes.head}>Game #</TableCell>
                            <TableCell align="center" className={classes.head}>Id</TableCell>
                            <TableCell align="right" className={classes.head}>Result</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.rows.map(row => (
                            <TableRow key={row.curId}>
                            <TableCell component="th" scope="row">
                                {row.curId}
                            </TableCell>
                            <TableCell align="right">{row.game_id}</TableCell>
                            {row.wl === 'Win'? 
                                <TableCell align="right" className={classes.win}>{row.wl}</TableCell> :
                                <TableCell align="right" className={classes.lose}>{row.wl}</TableCell>
                            }
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        )
    };
}

export default withStyles(styles)(Match);