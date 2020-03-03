import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import HelpIcon from '@material-ui/icons/Help';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Content from './Content';
import Createform from './CreateForm';
import GetForms from './GetForms'


const lightColor = 'rgba(255, 255, 255, 0.7)';

const styles = theme => ({
    secondaryBar: {
        zIndex: 0,
    },
    menuButton: {
        marginLeft: -theme.spacing(1),
    },
    iconButtonAvatar: {
        padding: 4,
    },
    link: {
        textDecoration: 'none',
        color: lightColor,
        '&:hover': {
            color: theme.palette.common.white,
        },
    },

    root: {
        borderColor: lightColor,
        flexGrow: 1,
        // backgroundColor: theme.palette.background.paper,
    },
});

function ContentHeader(props) {
    const { classes, onDrawerToggle } = props;
    const [value, setValue] = React.useState(0);
    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <Typography
                component="div"
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && <Box p={3}>{children}</Box>}
            </Typography>
        );
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.any.isRequired,
        value: PropTypes.any.isRequired,
    };

    return (
        <React.Fragment>
            {/* <AppBar color="primary" position="sticky" elevation={0}>
                <Toolbar>
                    <Grid container spacing={1} alignItems="center">
                        <Hidden smUp>
                            <Grid item>
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={onDrawerToggle}
                                    className={classes.menuButton}
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Grid>
                        </Hidden>
                        <Grid item xs />

                        <Grid item>
                            <IconButton color="inherit" className={classes.iconButtonAvatar}>
                                <Avatar src="/static/images/avatar/1.jpg" alt="Name Avatar" />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar> */}

            {/* <AppBar
                component="div"
                className={classes.secondaryBar}
                color="primary"
                position="static"
                elevation={0}
            >
            </AppBar> */}
            <AppBar
                component="div"
                className={classes.secondaryBar}
                color="primary"
                position="static"
                elevation={0}
            >
                <Tabs value={value} textColor="inherit" className={classes.root} onChange={handleChange}>
                    <Tab textColor="inherit" label="Question bank" {...a11yProps(0)} />
                    <Tab textColor="inherit" label="Create forms" {...a11yProps(1)} />
                    <Tab textColor="inherit" label="Forms" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <Content />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Createform />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <GetForms />
            </TabPanel>

        </React.Fragment>
    );
}

ContentHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    onDrawerToggle: PropTypes.func.isRequired,
};

export default withStyles(styles)(ContentHeader);