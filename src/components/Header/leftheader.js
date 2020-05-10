/*eslint-disable*/
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { withStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';

// @material-ui/icons
import { Apps, CloudDownload, Person } from "@material-ui/icons";

// core components
import CustomDropdown from "../CustomDropdown/CustomDropdown.js";
import Button from "../CustomButtons/Button.js";
import firebase from "../../firebase"
import styles from "../../Styles/headerLinksStyle";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import "../../Styles/dropdownStyle.css"
import Search from "../search"


const useStyles = makeStyles(styles);

const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));
  
  const StyledMenuItem = withStyles((theme) => ({
    root: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);
  
  export default function HeaderLinks(props) {
    const classes = useStyles();
    const [genre,setGenre]=React.useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);
    
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
      setAnchorEl(null);
    };
    
    const selectedGenre=(e)=>{
       console.log("Selected genre::", e)
       
       window.location.href=`/genre?genre=${e}`
       // return selectGenre
     }
    return (
        <List className={classes.list}>
            <ListItem className={classes.listItem}>

                <Button href="/dashboard" color="transparent" >
                    Dashboard
                </Button>

            </ListItem>

            <ListItem className={classes.listItem}>

                <Button href="/toppicks" color="transparent">
                    Top Picks
                </Button>

            </ListItem>
            <ListItem className={classes.listItem}>

                <Button href="/latest" color="transparent">
                    Latest
                </Button>

            </ListItem>
            <ListItem className={classes.listItem}>
            <div class= "dropdown">
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="transparent"
        onClick={handleClick}
      >
        Genre
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <div class="dropdown-menu dropdown-multicol2" aria-labelledby="dropdownMenuButton">
        <div class="dropdown-col">
        <StyledMenuItem value='Fiction' > 
          <Button color="transparent" value='Fiction' onClick={e=>selectedGenre('Fiction')}>Fiction</Button>
          {/* <ListItemText primary="Fiction" value='Fiction'  /> */}
        </StyledMenuItem>
        <StyledMenuItem value='Fantasy' >
          
        <Button color="transparent" value='Fantasy' onClick={e=>selectedGenre('Fantasy')}>Fantasy</Button>
        </StyledMenuItem>
        <StyledMenuItem value='Young-Adult' >
         
        <Button color="transparent" value='Young-Adult' onClick={e=>selectedGenre('Young-Adult')}>Young</Button>
        </StyledMenuItem>
        
      </div>
      <div class="dropdown-col">
        <StyledMenuItem value='Mystery' >
          
        <Button color="transparent" value='Mystery' onClick={e=>selectedGenre('Mystery')}>Mystery</Button>
        </StyledMenuItem>
        <StyledMenuItem value='Non-Fiction' >
          
        <Button color="transparent" value='Non-Fiction' onClick={e=>selectedGenre('Non-Fiction')}> Non-Fiction</Button>
        </StyledMenuItem>
        <StyledMenuItem value='Romance' >
         
        <Button color="transparent" value='Romance' onClick={e=>selectedGenre('Romance')}>Romance</Button>
        </StyledMenuItem>
        
      </div>
      <div class="dropdown-col">
        <StyledMenuItem value='Classics' >
          
        <Button color="transparent" value='Classics' onClick={e=>selectedGenre('Classics')}>Classics</Button>
        </StyledMenuItem>
        <StyledMenuItem value='Historical-Fiction' > 
          
        <Button color="transparent" value='Historical-Fiction' onClick={e=>selectedGenre('Historical-Fiction')}>Historical</Button>
        </StyledMenuItem>
        <StyledMenuItem value='Science-Fiction' >
         
        <Button color="transparent" value='Science-Fiction' onClick={e=>selectedGenre('Science-Fiction')}>Science</Button>
        </StyledMenuItem>
        
      </div>
      <div class="dropdown-col">
        <StyledMenuItem value='Horror' >
          
        <Button color="transparent" value='Horror' onClick={e=>selectedGenre('Horror')}>Horror</Button>
        </StyledMenuItem>
        <StyledMenuItem value='Graphic-Novels' >
          
        <Button color="transparent" value='Graphic-Novels' onClick={e=>selectedGenre('Graphic-Novels')}>Novels</Button>
        </StyledMenuItem>
        <StyledMenuItem value='Picture-Books' >
         
        <Button color="transparent" value='Picture-Books' onClick={e=>selectedGenre('Picture-Books')}>Comics</Button>
        </StyledMenuItem>
        
      </div>
      <div class="dropdown-col">
        <StyledMenuItem value='Childrens' >
          
        <Button color="transparent" value='Childrens' onClick={e=>selectedGenre('Childrens')}>Childrens</Button>
        </StyledMenuItem>
        <StyledMenuItem value='Chick-Lit' >
          
        <Button color="transparent" value='Chick-Lit' onClick={e=>selectedGenre('Chick-Lit')}>Chick-Lits</Button>
        </StyledMenuItem>
        <StyledMenuItem value='History' > 
         
        <Button color="transparent" value='History' onClick={e=>selectedGenre('History')}>History</Button>
        </StyledMenuItem>
        
      </div>
      <div class="dropdown-col">
        <StyledMenuItem value='Urban-Fantasy' >
          
        <Button color="transparent" value='Urban-Fantasy' onClick={e=>selectedGenre('Urban-Fantasy')}>Urban</Button>
        </StyledMenuItem>
        <StyledMenuItem value='Vampires' >
          
        <Button color="transparent" value='Vampires' onClick={e=>selectedGenre('Vampires')}>Vampires</Button>
        </StyledMenuItem>
        <StyledMenuItem value='Manga' >
         
        <Button color="transparent" value='Manga' onClick={e=>selectedGenre('Manga')}>Anime</Button>
        </StyledMenuItem>
        
      </div>
      
      
      
      </div>
      </StyledMenu>

    </div>
            </ListItem>
            <ListItem className={classes.listItem}>
                <Button href="/recommend" color="transparent">
                    Recommendations
                </Button>
            </ListItem>
            <ListItem className={classes.listItem}>
                <Search />

            </ListItem>
        </List>


    );

}
