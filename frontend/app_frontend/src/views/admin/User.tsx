import React,{ useState,useEffect } from 'react';
import MaterialTable from 'material-table';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { useSelector, useDispatch } from "react-redux";
import  languageJson  from "../../config/language";
import {
  saveUser,deleteUser,updateUser, fetchUsers
}  from "../../actions/useractions";
import AlertDialog from '../../components/AlertDialog';
import { getModalStyle, useStyles } from '../../config/helper';


const User = (props: any ) => {
  
  const columns:any =  [
    { title: languageJson.quizz_id, field: 'id', sorting:true, editable:'never' },
    { title: languageJson.name, field: 'name', sorting:true, editable:'always'  },
    { title: languageJson.email, field: 'email', sorting:true, editable:'always'  },
    { title: languageJson.is_admin, field: 'isAdmin', sorting:false, editable:'never', render: (rowData:any) => <Switch checked={rowData.isAdmin} color="primary" disabled={true} />},
    { title: languageJson.createdAt, field: 'created_at', sorting:true, editable:'never' },
  ];

  const [data, setData] = useState<any>([]);
  const usersdata = useSelector((state: any) => state.users);
  const auth = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const [queryData, setQueryData] = useState({
    email: '',
    name: '',
    password: 'Azerty123@#',
    isAdmin: false,
  });

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(()=>{
      if(usersdata.users){
          setData(usersdata.users);
          setOpen(false);
      }
      
  },[usersdata.users]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNameChange = (e: any) => {
    setQueryData({ ...queryData, name: e.target.value });
  }

  const handleEmailChange = (e: any) => {
    setQueryData({ ...queryData, email: e.target.value });
  }

  const handlePasswordChange = (e: any) => {
    setQueryData({ ...queryData, password: e.target.value });
  }
  
  const handleisAdminChange = (e: any) => {
    setQueryData({ ...queryData, isAdmin: e.target.checked });
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setClicked(true);
    dispatch(saveUser(queryData));
    refreshData();
    setOpen(false);
  }

  const refreshData = () => {
    if(auth.isAuthenticated && auth.usertype === 'Admin'){
      dispatch(fetchUsers());
    }
  }

  const handleCloseAlert = () => {
    setClicked(false);
    //dispatch(clearUsersViewError());
  };

  const querybody = (
    <div style={modalStyle} className={classes.paper2}>
      <h2 id="simple-modal-title">Add Quizz</h2>
      
      <form className={classes.form} onSubmit={handleSubmit}>
  
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label={languageJson.name}
              name="name"
              autoComplete="name"
              onChange={handleNameChange}
              value={queryData.name}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label={languageJson.email}
              name="email"
              autoComplete="email"
              onChange={handleEmailChange}
              value={queryData.email}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              label={languageJson.password}
              name="password"
              autoComplete="password"
              onChange={handlePasswordChange}
              value={queryData.password}
            />

            <FormControlLabel
              control={
                <Switch
                  checked={queryData.isAdmin}
                  onChange={handleisAdminChange}
                  name="isAdmin"
                  color="primary"
                />
              }
              label={languageJson.admin}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}>
              {languageJson.submit}
            </Button>

          </form>
      
    </div>
  );

  function FormRow1(quizzsData: any) {
    return (
      <React.Fragment>
        <Grid item xs={3}>
          <Paper >
            Quizz  : {quizzsData.quizzsData.quizz.quizz_name}
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper >
            Perspective  : {quizzsData.quizzsData.result_string}
          </Paper>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    
    <Container component="main" >
        <CssBaseline />
        <div >
        <Button onClick={handleOpen} color="primary" >
          Add User
        </Button>
        <MaterialTable
          title={languageJson.results_text}
          columns={columns}
          data={data}
          options={{
            exportButton: false,
            sorting: true,
          }}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  dispatch(updateUser(newData));
                  refreshData();
                }, 100);
              }),
            
            onRowDelete: rowData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  dispatch(deleteUser(rowData.id));
                  refreshData();
                }, 600);
              }), 
          }}
          actions={[
            {
              icon: 'refresh',
              tooltip: 'Refresh Data',
              isFreeAction: true,
              onClick: () => { 
                refreshData();
              },
            },
          ]}
          detailPanel={[
            {
              tooltip: 'Show Quizzs',
              render: (rowData: any) => {
                return (
                  <Container component="main" >
                    <CssBaseline />
                    <div className={classes.detaillist}>
                      <div className="row">
                        <div className="col-lg-2">
                          <header className="App-header">
                            <p> Quizzs Taken</p>
                          </header>
                        </div>
                        <div className="col-lg-9">
                        {
                          rowData.quizzresults.map((ansdata:any) => {
                            return(
                              <Grid container spacing={1}>
                                <Grid container item xs={12} spacing={2}>
                                  <FormRow1 quizzsData={ansdata} />
                                </Grid>
                              </Grid>
                            );
                          })
                        }
                        </div>
                      </div>
                    </div>
                  </Container>
                )
              },
            },
          ]}
        />
        
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description">
          {querybody}
        </Modal>

        <AlertDialog open={usersdata.error.flag && clicked} onClose={handleCloseAlert}>{languageJson.update_failed}</AlertDialog>
        </div>
        </Container>
    
  );
}

export default User;
