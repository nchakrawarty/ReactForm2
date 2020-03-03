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
// import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Popover from '@material-ui/core/Popover';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import clsx from 'clsx';
import Form from './form'
import LoadQuestion from './loadQuestion'
import GetData from './requests/GetData'

import axios from 'axios';

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
    contentWrapper: {
        margin: '40px 16px',
    },
    typography: {
        padding: theme.spacing(2),
    },
    root: {
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
    Form: {
        width: '50%',
    },
    icon: {
        borderRadius: '50%',
        width: 16,
        height: 16,
        boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
        backgroundColor: '#f5f8fa',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
        '$root.Mui-focusVisible &': {
            outline: '2px auto rgba(19,124,189,.6)',
            outlineOffset: 2,
        },
        'input:hover ~ &': {
            backgroundColor: '#ebf1f5',
        },
        'input:disabled ~ &': {
            boxShadow: 'none',
            background: 'rgba(206,217,224,.5)',
        },
    },
    checkedIcon: {
        backgroundColor: '#137cbd',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&:before': {
            display: 'block',
            width: 16,
            height: 16,
            backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
            content: '""',
        },
        'input:hover ~ &': {
            backgroundColor: '#106ba3',
        },
    },
    // list: {
    //     width: 260,
    //     color: theme.palette.common.white,
    // },
    // fullList: {
    //     width: 'auto',
    // },
});

// class Content extends Component {
//     constructor(props) {
//         super(props)
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }
//     handleSubmit(e) {
//         alert('The value is: ' + this.input.value);
//         e.preventDefault();
//     }
// }




function Content(props) {
    // let quetionList = {};
    // let questList = localStorage.getItem('questionList');
    let questList = JSON.parse(localStorage.getItem('questionList'))

    // console.log("QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ", localStorage.getItem('questionList'))
    console.log("QuestionList", questList)

    const handleSubmit = e => {
        alert('The value is: ' + e.target.value);
        // e.preventDefault();
    }
    console.log(props)

    const { classes } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const refreshData = event => {
        axios.get('http://eletionapp.3m3pfprvaw.ap-south-1.elasticbeanstalk.com/api/questions').then(response => {
            // this.state.data = response;
            const data = response.data;
            this.setState({ datas: data.reverse() })
            console.log(response, this.state)

        }).catch(error => {
            console.log(error)
        })
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const setQuestType = event => {
        const x = window.$pt;
        window.$qt = event.target.value;
        console.log(x, event.target.value);
    }
    const setText = event => {
        window.$pt = event.target.value;
        const x = window.$qt;
        console.log(event.target.value, x);
    }



    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


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
                            {/* <Button variant="contained" color="primary" className={classes.addUser}>Add Qestion</Button> */}
                            <Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
                                Add Question
                            </Button>
                            <Popover
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                            >

                                {/* <Typography className={classes.typography} >
                                    <span>
                                        <input type="text" onChange={setText.bind(this)}></input>
                                        <input type="radio" value="multipleChoice" name="questiontype" className={classes.root} onChange={setQuestType.bind(this)} />
                                        Multiple Choice
                                        <input type="radio" value="plainText" name="questiontype" onChange={setQuestType.bind(this)} />
                                        PLain text
                                   </span>
                                    <form onSubmit={handleSubmit.bind(this)}>
                                        <label>
                                            Name:
                                     <input type="text" />
                                        </label>
                                        <input type="submit" value="Submit" />
                                    </form>

                                </Typography> */}
                                <Form />
                            </Popover>
                            <Tooltip title="Reload">
                                <IconButton>
                                    <RefreshIcon className={classes.block} color="inherit" onClick={refreshData} />

                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <div className={classes.contentWrapper}>
                <Typography color="textSecondary" align="center">
                    Questions
                </Typography>
                {/* <LoadQuestion /> */}
                <GetData />
            </div>
        </Paper>
    );
}

Content.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);