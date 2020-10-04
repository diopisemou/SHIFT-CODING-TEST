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
  saveQuizz,deleteQuizz, updateQuizz, fetchQuizzs
}  from "../../actions/quizzactions";
import AlertDialog from '../../components/AlertDialog';
import { useStyles, getModalStyle } from '../../config/helper';



const Quizz = (props: any ) => {
  const columns:any =  [
    { title: languageJson.quizz_id, field: 'id', sorting:true, editable:"never"  },
    { title: languageJson.name, field: 'quizz_name', sorting:true, editable:"always"  },
    { title: languageJson.quizz_active, field: 'quizz_active', sorting:false, editable:"always", render: (rowData:any) => <Switch checked={rowData.quizz_active} color="primary" disabled={true} /> },
    { title: languageJson.createdAt, field: 'created_at', sorting:true, editable:"never"  },
  ];

  const [data, setData] = useState<any>([]);
  const resultsdata = useSelector((state: any) => state.results);
  const quizzsdata = useSelector((state: any) => state.quizzs);
  const dispatch = useDispatch();
  const [queryData, setQueryData] = useState({
    quizz_name: '',
    quizz_active: false,
  });

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(()=>{
      if(quizzsdata.quizzs){
          setData(quizzsdata.quizzs);
          setOpen(false);
      }
  },[quizzsdata.quizzs]);


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleQuizzNameChange = (e: any) => {
    setQueryData({ ...queryData, quizz_name: e.target.value });
  }

  const handleQuizzActiveChange = (e: any) => {
    setQueryData({ ...queryData, quizz_active: e.target.checked });
  }
  
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setClicked(true);
    dispatch(saveQuizz(queryData));
    setOpen(false);
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
              id="quizz_name"
              label={languageJson.name}
              name="quizz_name"
              autoComplete="quizz_name"
              onChange={handleQuizzNameChange}
              value={queryData.quizz_name}
            />

            <FormControlLabel
              control={
                <Switch
                  checked={queryData.quizz_active}
                  onChange={handleQuizzActiveChange}
                  name="quizz_active"
                  color="primary"
                />
              }
              label={languageJson.quizz_active_label}
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
            Question : {questionData.questionData.question_string}
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
          Add Quizz
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
                  dispatch(updateQuizz(newData));
                  dispatch(fetchQuizzs());
                }, 100);
              }),
            
            onRowDelete: rowData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                 dispatch(deleteQuizz(rowData.id));
                  return dispatch(fetchQuizzs());
                }, 100);
              }), 
          }}
          actions={[
            rowData => ({
              icon: 'update',
              tooltip: 'Update Quizz Questions',
              onClick: (event, rowData:any) => { 
                props.history.push('/edit/quizz/'+rowData.id);
              },
            }),
            {
              icon: 'refresh',
              tooltip: 'Refresh Data',
              isFreeAction: true,
              onClick: () => {  dispatch(fetchQuizzs());},
            },
          ]}
          detailPanel={[
            {
              tooltip: 'Show Questions',
              render: (rowData: any) => {
                return (
                  <Container component="main" >
                    <CssBaseline />
                    <div className={classes.detaillist}>
                      <div className="row">
                        <div className="col-lg-2">
                          <header className="App-header">
                            <p> Questions </p>
                          </header>
                        </div>
                        <div className="col-lg-9">
                        {
                          rowData.questions.map((ansdata:any) => {
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
        </Container>
    
  );
}

export default Quizz;

