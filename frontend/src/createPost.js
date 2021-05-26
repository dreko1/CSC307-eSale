import React from 'react';
import { Button, makeStyles} from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import makePostCall from './axiosMethods'
import { Input } from '@material-ui/core';
import './App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%'
  },
}));
export default function CreatePost(props){
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    name: "",
    description: "",
    contact: ""
  });
  const [imageFile, setImageFile] = React.useState("");

  var reader = new FileReader();
  reader.onloadend = ()=>{setImageFile(reader.result)}

  function uploadImageFile(e){
    if (e.target && e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
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
    setOpen(false);
  };

  const handleSubmit = async () => {
    const credentials = props.getCredentials();
  
    const listing = {
      username: credentials.username,
      password: credentials.password,
      name: state.name,
      description: state.description,
      contact: state.contact,
      image: imageFile
    }
    console.log(listing);
    
    makePostCall('/post', listing).then(response => {
        if(response.status==201){
            console.log("new posting request succeded");
            console.log(response);
        }else{
            console.log("new posting request failed");
            //handleListingError(the_field_that_has_an_error, what_the_error_is);
        }
    });
    setOpen(false);
  };

  
}