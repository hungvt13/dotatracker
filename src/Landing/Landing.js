import React from 'react';
import Grid from '@material-ui/core/Grid';
import Panel from './Panel/Panel';

const styles = {
    div:{
        paddingTop: 10,
    }
}

const Landing = () => {
    return(
        <div style={styles.div}>
            <Grid container spacing={24} justify="center">
                <Grid item xs md={6}>
                    <Panel/>
                </Grid>
            </Grid>
        </div>
    );
}

export default Landing;