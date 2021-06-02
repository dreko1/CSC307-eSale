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
import Collapse from '@material-ui/core/Collapse';
import Alert from '@material-ui/lab/Alert';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
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
      category: "",
      image_name: "",
      price: "",
      city: "",
      state: "",
      zip: ""
    });

    function resetState() {
      setState({
        title: "",
        description: "",
        contact: "",
        category: "",
        image_name: "",
        price: "",
        city: "",
        state: "",
        zip: ""
      });
      return;
    }

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
      resetState();
      setError("");
      setOpen(false);
    };

    const handlePriceChange = (event) => {
      event.target.value = parseInt(event.target.value, 10);
      if(event.target.value===""){
        event.target.value = 0;
      }
      handleChange(event)
    }

    const [error, setError] = React.useState("");
    
    // Functions for snackbar success message 
    function Alert(props) {
      return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const [openMsg, setOpenMsg] = React.useState(false);

    const handleCloseMsg = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpenMsg(false);
    };


    const handleSubmit = async () => {
        const credentials = props.credentials;
        if (credentials.username==="") {
          setError("Must be signed in to post")
        } else if (state.title==="") {
          setError("Must enter a title")
        } else if (state.category==="") {
          setError("Must select a category")
        } else if (state.price==="") {
          setError("Must enter a price")
        } else {

        const listing = {
          username: credentials.username,
          password: credentials.password,
          title: state.title,
          price: state.price,
          description: state.description,
          category: state.category,
          contact: state.contact,
          city: state.city,
          state: state.state,
          zip: state.zip,
          image: imageFile
        }
      
        makePostCall('/post', listing).then(response => {
          if(response.status===201){
            console.log("new posting request succeded");
            console.log(response);
            setOpen(false);
            setOpenMsg(true);
            resetState();
          } else{
            console.log("new posting request failed");
            setError(response.data.message)
            //handleListingError(the_field_that_has_an_error, what_the_error_is);
          }
        });
        
      }
    };
  
    return (
        <div>
        <Button variant="contained" size="large" color="secondary" className={classes.margin} onClick={handleClickOpen}>
          Create Post
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="lg" fullWidth={true}>
          <br />
          <Collapse in={error}>
            <Alert severity="error">
              {error}
            </Alert>
          </Collapse>
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
            <InputLabel>Location</InputLabel>
            <TextField
              margin="dense"
              label="City"
              value={state.city}
              onChange={handleChange}
              inputProps={{
                name: 'city',
              }}
              size="medium"
            />
            <TextField
              margin="dense"
              label="State"
              value={state.state}
              onChange={handleChange}
              inputProps={{
                name: 'state',
              }}
              size="medium"
            />
            <TextField
              margin="dense"
              label="Zip Code"
              value={state.zip}
              onChange={handleChange}
              inputProps={{
                name: 'zip',
              }}
              size="medium"
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
        <Snackbar open={openMsg} autoHideDuration={5000} onClose={handleCloseMsg}>
          <Alert onClose={handleClose} severity="success">
            Sucessfully Posted Listing!
              </Alert>
        </Snackbar>
      </div>
    );
}