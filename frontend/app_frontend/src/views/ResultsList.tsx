import React,{ useState,useEffect } from 'react';
import MaterialTable from 'material-table';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { useSelector, useDispatch } from "react-redux";
import  languageJson  from "../config/language";
import {
  fetchResults,
}  from "../actions/resultactions";
import AlertDialog from '../components/AlertDialog';
import DatatableLoader from '../components/Loaders/DatatableLoader';
import { useStyles, getModalStyle } from '../config/helper';


export default function ResultsList() {
    const columns =  [
        { title: languageJson.quizz_id, field: 'quizz_id', sorting:false },
        { title: languageJson.email, field: 'user_email', sorting:true },
        { title: languageJson.perspective_type, field: 'result_string', sorting:true },
        { title: languageJson.dimension1, field: 'function1', sorting:false },
        { title: languageJson.dimension2, field: 'function2', sorting:false },
        { title: languageJson.dimension3, field: 'function3', sorting:false },
        { title: languageJson.dimension4, field: 'function4', sorting:false },
        { title: languageJson.createdAt, field: 'created_at', sorting:true },
    ];

  const [data, setData] = useState<any>([]);
  const resultsdata = useSelector((state: any) => state.results);
  const dispatch = useDispatch();
  const [queryData, setQueryData] = useState({
    email: '',
  });

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(true);
  const [clicked, setClicked] = useState(false);

  useEffect(()=>{
        if(resultsdata.results){
            setData(resultsdata.results);
            setOpen(false);
        }
  },[resultsdata.results]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEmailChange = (e: any) => {
    setQueryData({ ...queryData, email: e.target.value });
  }
  
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setClicked(true);
    dispatch(fetchResults(queryData));
    setOpen(false);
  }

  const handleCloseAlert = () => {
    setClicked(false);
    //dispatch(clearUsersViewError());
  };

  const querybody = (
    <div style={modalStyle} className={classes.paper2}>
      <h2 id="simple-modal-title">User email</h2>
      
      <form className={classes.form} onSubmit={handleSubmit}>
  
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

  function FormRow1(questionData: any) {
    return (
      <React.Fragment>
        <Grid item xs={10}>
          <Paper >
            Question : {questionData.questionData.question.question_string}
          </Paper>
          
        </Grid>
        <Grid item xs={2}>
          <Paper >
            Answer : {questionData.questionData.question_value}
          </Paper>
        </Grid>
      </React.Fragment>
    );
  }


  return (
    
    
      data ?
      <Container component="main" >
        <CssBaseline />
        <div >
        <Button onClick={handleOpen} color="primary" >
          Search for results
        </Button>
        <MaterialTable
          title={languageJson.results_text}
          columns={columns}
          data={data}
          options={{
            exportButton: false,
            sorting: true,
          }}
          actions={[
            rowData => ({
              icon: 'delete',
              tooltip: 'Delete Quizz Results',
              onClick: (event, rowData:any) => { return window.confirm("You want to delete " + rowData.quizz_id)},
            }),
            {
              icon: 'refresh',
              tooltip: 'Refresh Data',
              isFreeAction: true,
              onClick: () => { /*tableRef.current && tableRef.current.onQueryChange()*/ },
            },
          ]}
          detailPanel={[
            {
              tooltip: 'Show Results',
              render: (rowData: any) => {
                return (
                  <Container component="main" >
                    <CssBaseline />
                    <div className={classes.detaillist}>
                      <div className="row">
                        <div className="col-lg-3">
                            <header className="App-header">
                            <p>Your perspective type is : {rowData.result_string} </p>
                          </header>
                        </div>
                        <div className="col-lg-9">
                        {
                          rowData.quizzanswers[0].answers.map((ansdata:any) => {
                            return(
                              <Grid container spacing={1}>
                                <Grid container item xs={12} spacing={2}>
                                  <FormRow1 questionData={ansdata} />
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
          aria-describedby="simple-modal-description"
        >
          {querybody}
        </Modal>

        <AlertDialog open={resultsdata.error.flag && clicked} onClose={handleCloseAlert}>{languageJson.update_failed}</AlertDialog>
        </div>
        </Container>:

        <DatatableLoader/>
    
  );
}


