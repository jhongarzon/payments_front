import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// FEEDBACK: unused imports, a linter would pick this up.
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// FEEDBACK: unused imports, a linter would pick this up.
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

export default function Home() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    // FEEDBACK: unused imports, a linter would pick this up.
    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <div>
            <h1 style={{ color: "#f50057" }}>Payment process</h1>

            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                className={classes.root}>
                <ListItem button>
                    <ListItemIcon>
                        <SendIcon />
                    </ListItemIcon>
                    <ListItemText primary="Choose the tab products" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <SendIcon />
                    </ListItemIcon>
                    <ListItemText primary="Select a product from the listgrid" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <SendIcon />
                    </ListItemIcon>
                    <ListItemText primary="A modal with the details of the product will appear" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <SendIcon />
                    </ListItemIcon>
                    <ListItemText primary="On the checkout page please fill the card details you can use the stripe dummy number cards" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <SendIcon />
                    </ListItemIcon>
                    <ListItemText primary="Process the payment" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <SendIcon />
                    </ListItemIcon>
                    <ListItemText primary="The result page with the payment data will be shown" />
                </ListItem> </List>
        </div>
    );
}
