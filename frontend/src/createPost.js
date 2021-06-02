import React from 'react';
import { Button, makeStyles} from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {makePostCall} from './axiosMethods'
import { Input } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import './App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%'
  },
}));
const options = [
  'All',
  'Auto',
  'Bikes',
  'Boats',
  'Computers',
  'Household Items',
  'Music',
  'Sports',
  'Tools',
  'Toys',
  'Video Games'
];

const MenuProps = {
  PaperProps: {
      style: {
          maxHeight: 48 * 4.5 + 8,
          width: 250,
      },
  },
};
export default function CreatePost(props){
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [state, setState] = React.useState({
      title: "",
      description: "",
      contact: "",
      category: "All",
      image_name: "",
      price: "0"
    });

    const [imageFile, setImageFile] = React.useState("");
    
    var reader = new FileReader();
    reader.onloadend = ()=>{setImageFile(reader.result)}
  
    function uploadImageFile(e){
      if (e.target && e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
        setState({...state, image_name: e.target.files[0].name})
      }else{
        setImageFile(null);
      }
    }

    const handleChange = (event) => {
      const name = event.target.name;
      setState({...state, [name]: event.target.value});
    };
  
    const handleClickOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
      setState({
        title: "",
        description: "",
        contact: "",
        category: "",
        image_name: ""})
      setOpen(false);
    };
    const handlePriceChange = (event) => {
      event.target.value = parseInt(event.target.value, 10);
      if(event.target.value==""){
        event.target.value = 0;
      }
      handleChange(event)
    }

    const handleSubmit = async () => {
      const credentials = props.getCredentials();
    
      const listing = {
        username: credentials.username,
        password: credentials.password,
        title: state.title,
        price: state.price,
        description: state.description,
        category: state.category,
        contact: state.contact,
        city: "no city provided",
        state: "no state provided",
        zip: "no zip provided",
        image: imageFile
      }
      
      makePostCall('/post', listing).then(response => {
          if(response.status===201){
              console.log("new posting request succeded");
              console.log(response);
          }else{
              console.log("new posting request failed");
              //handleListingError(the_field_that_has_an_error, what_the_error_is);
          }
      });
      setOpen(false);
    };
  
    return (
        <div>
        <Button variant="contained" size="large" color="secondary" className={classes.margin} onClick={handleClickOpen}>
          Create Post
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="lg" fullWidth={true}>
          <DialogTitle id="form-dialog-title">Create Post</DialogTitle>
          <DialogContent>
            <DialogContentText>
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Item Name" 
              value={state.title} 
              onChange={handleChange}
              inputProps={{ 
              name: 'title',
              }}
              required
              size="medium"
            />
          </DialogContent>
          <DialogContent>
            <DialogContentText>
            </DialogContentText>
            <TextField
              margin="dense"
              label="Contact Information" 
              value={state.contact} 
              onChange={handleChange}
              inputProps={{ 
                name: 'contact',
              }}
              required
              size="medium"
            />
          </DialogContent>
  
  
          <DialogContent>
            <DialogContentText>
            </DialogContentText>
            <TextField
              margin="dense"
              label="Item Description" 
              value={state.description} 
              onChange={handleChange}
              inputProps={{ 
                name: 'description',
              }}
              fullWidth
              multiline={true}
              rows="2"
            />
          </DialogContent>
          <DialogContent>
            <DialogContentText>
            </DialogContentText>
            <TextField
              id="standard-number"
              label="Price (US Dollars)" 
              type="number"
              value = {state.price}
              onChange = {handlePriceChange}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{ 
                name: 'price',
              }}
              required
              size="medium"
              margin="dense"
            />
          </DialogContent>

          <DialogContent>
            <DialogContentText>
            </DialogContentText>
            <InputLabel>Category</InputLabel>
            <Select
                autowidth
                labelId="category-label"
                required
                id="category-name"
                onChange={handleChange}
                name='category'
                MenuProps={MenuProps}
                defaultValue="All"
            >
                {options.map((option) => (
                    <MenuItem key={option} value={option} selected={option === state.category}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
          </DialogContent>

          <DialogContent>
            <DialogContentText>{"Upload Image - "+state.image_name}</DialogContentText>
            <label>
              <Input id="image" name="myImage" style={{ display: 'none' }} type="file" onChange={uploadImageFile}/>
            <Button variant="contained" component="span">
                Select an Image
              </Button>
            </label>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>

        </Dialog>
      </div>
    );
}