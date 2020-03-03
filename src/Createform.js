import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
    paper: {
        maxWidth: 936,
        margin: 'auto',
        overflow: 'hidden',
    },
    searchBar: {
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
    searchInput: {
        fontSize: theme.typography.fontSize,
    },
    block: {
        display: 'block',
    },
    addUser: {
        marginRight: theme.spacing(1),
    },
    createformWrapper: {
        margin: '40px 16px',
    },
    // list: {
    //     width: 260,
    //     color: theme.palette.common.white,
    // },
    // fullList: {
    //     width: 'auto',
    // },
});


function Createform(props) {
    const { classes } = props;


    return (
        <Paper className={classes.paper}>
            <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
                <Toolbar>
                    <Grid container spacing={2} alignItems="center">
                        {/* <Grid item>
                            <SearchIcon className={classes.block} color="inherit" />
                        </Grid> */}
                        {/* <Grid item xs>
                            <TextField
                                fullWidth
                                placeholder="Search by email address, phone number, or user UID"
                                InputProps={{
                                    disableUnderline: true,
                                    className: classes.searchInput,
                                }}
                            />
                        </Grid> */}
                        <Grid item>
                            {/* <Button variant="contained" color="primary" className={classes.addUser}>
                                Add Question
                        </Button> */}
                            <Button variant="contained" color="primary" className={classes.addUser}>Add Form</Button>
                            <Tooltip title="Reload">
                                <IconButton>
                                    <RefreshIcon className={classes.block} color="inherit" />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <div className={classes.createformWrapper}>
                <Typography color="textSecondary" align="center">
                    No Forms added yet!
        </Typography>
            </div>
        </Paper>
    );
}

Createform.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Createform);