import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 400,
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

const checkWin = (playerId, radiantWon) => (playerId <= 127 && radiantWon)? 'Win' : 'Lose';

let id = 0;
const createData = (game_id, wl) => {
  id += 1;
  return { id, game_id, wl };
}

const rows = [];
const generateData = (data) => {
     data.map((item) => {
         let isWon = checkWin(item.player_slot, item.radiant_win);
         return rows.push(createData(item.match_id, isWon));
    });
}

class Match extends Component{

    componentDidMount(){
        generateData(this.props.recentMatches);
    }
    
    render(){
        const { classes } = this.props;
        return(
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead >
                    <TableRow >
                        <TableCell className={classes.head}>Game #</TableCell>
                        <TableCell align="center" className={classes.head}>Id</TableCell>
                        <TableCell align="right" className={classes.head}>Result</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                {row.id}
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