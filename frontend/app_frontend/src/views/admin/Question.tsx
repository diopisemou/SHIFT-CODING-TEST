import React,{ useState,useEffect } from 'react';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { useSelector, useDispatch } from "react-redux";
import  languageJson  from "../../config/language";



import AlertDialog from '../../components/AlertDialog';
import { deleteQuestion, fetchQuestions, saveQuestion } from '../../actions/questionactions';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}



const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  detaillist: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  paper2: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    width: 192,
    height: 192
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Question() {

  const columns:any =  [
    { title: languageJson.question_string, field: 'question_string',editable:'always', sorting:false },
    { title: languageJson.question_label, field: 'question_label', editable:'always', sorting:false },
    { title: languageJson.question_dimension, field: 'question_dimension', editable:'always', sorting:true },
    { title: languageJson.question_direction, field: 'question_direction', editable:'always', sorting:true },
    { title: languageJson.question_meaning, field: 'question_meaning', editable:'always', sorting:true },
    { title: languageJson.min_value, field: 'min_value', editable:'always', sorting:true },
    { title: languageJson.max_value, field: 'max_value', editable:'always', sorting:false },
    { title: languageJson.createdAt, field: 'created_at', editable:'never', sorting:true },
  ];

  const [data, setData] = useState<any>([]);
  const questionsdata = useSelector((state: any) => state.questions);
  const dispatch = useDispatch();
  const [queryData, setQueryData] = useState({
    name: '',
    question_string: '',
    question_label: '',
    question_dimension: '',
    question_direction: '',
    question_meaning: '',
    min_value: '',
    max_value: '',
  });

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(()=>{
        if(questionsdata.questions){
            setData(questionsdata.questions);
            setOpen(false);
        }
  },[questionsdata.questions]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNameChange = (e: any) => {
    setQueryData({ ...queryData, name: e.target.value });
  }

  const handleLabelChange = (e: any) => {
    setQueryData({ ...queryData, question_label: e.target.value });
  }

  const handleStringChange = (e: any) => {
    setQueryData({ ...queryData, question_string: e.target.value });
  }

  const handleMeaningChange = (e: any) => {
    setQueryData({ ...queryData, question_meaning: e.target.value });
  }
  
  const handleDirectionChange = (e: any) => {
    setQueryData({ ...queryData, question_direction: e.target.value });
  }

  const handleDimensionChange = (e: any) => {
    setQueryData({ ...queryData, question_dimension: e.target.value });
  }

  const handleMinValChange = (e: any) => {
    setQueryData({ ...queryData, min_value: e.target.value });
  }

  const handleMaxValChange = (e: any) => {
    setQueryData({ ...queryData, max_value: e.target.value });
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setClicked(true);
    dispatch(saveQuestion(queryData));
    refreshData();
    setOpen(false);
  }

  const handleCloseAlert = () => {
    setClicked(false);
    //dispatch(clearUsersViewError());
  };
  
  const refreshData = () => {
    dispatch(fetchQuestions());
  };

  function FormRow1() {
    return (
      <React.Fragment>
        <Grid item xs={6}>
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
        </Grid>
        <Grid item xs={6}>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="question_label"
                label={languageJson.question_label}
                name="question_label"
                autoComplete="question_label"
                onChange={handleLabelChange}
                value={queryData.question_label}
              />
        </Grid>
      </React.Fragment>
    );
  }

  function FormRow2() {
    return (
      <React.Fragment>
        <Grid item xs={6}>
        <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="question_string"
              label={languageJson.question_string}
              name="question_string"
              autoComplete="question_string"
              onChange={handleStringChange}
              value={queryData.question_string}
            />  
        </Grid>
        <Grid item xs={6}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="question_dimension"
              label={languageJson.question_dimension}
              name="question_dimension"
              autoComplete="question_dimension"
              onChange={handleDimensionChange}
              value={queryData.question_dimension}
            /> 
        </Grid>
      </React.Fragment>
    );
  }

  function FormRow3() {
    return (
      <React.Fragment>
        <Grid item xs={6}>
        <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="question_direction"
              label={languageJson.question_direction}
              name="question_direction"
              autoComplete="question_direction"
              onChange={handleDirectionChange}
              value={queryData.question_direction}
            /> 
        </Grid>
        <Grid item xs={6}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="question_meaning"
              label={languageJson.question_meaning}
              name="question_meaning"
              autoComplete="question_meaning"
              onChange={handleMeaningChange}
              value={queryData.question_meaning}
            /> 
        </Grid>
      </React.Fragment>
    );
  }

  function FormRow4() {
    return (
      <React.Fragment>
        <Grid item xs={6}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="min_value"
              label={languageJson.min_value}
              name="min_value"
              autoComplete="min_value"
              onChange={handleMinValChange}
              value={queryData.min_value}
            />
        </Grid>
        <Grid item xs={6}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="max_value"
              label={languageJson.max_value}
              name="max_value"
              autoComplete="max_value"
              onChange={handleMaxValChange}
              value={queryData.max_value}
            />
        </Grid>
      </React.Fragment>
    );
  }

  const querybody = (
    <div style={modalStyle} className={classes.paper2}>
      <h2 id="simple-modal-title">Add Question</h2>
      
      <form className={classes.form} onSubmit={handleSubmit}>

        <Grid container spacing={1}>
          <Grid container item xs={12} spacing={2}>
              <FormRow1/>
          </Grid>
          <Grid container item xs={12} spacing={2}>
              <FormRow2/>
          </Grid>
          <Grid container item xs={12} spacing={2}>
              <FormRow3/>
          </Grid>
          <Grid container item xs={12} spacing={2}>
              <FormRow4/>
          </Grid>
        </Grid>
    
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



  return (
    
    <Container component="main" >
        <CssBaseline />
        <div >
        <Button onClick={handleOpen} color="primary" >
          Add Question
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
            onRowUpdate: (newData:any, oldData:any) =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  //dispatch(updateQuestion(newData));
                }, 100);
              }),
            
            onRowDelete: (oldData: any) =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  if (window.confirm("You want to delete " + oldData.id)) {
                    dispatch(deleteQuestion(oldData.id));
                    return refreshData();
                  }
                }, 100);
              }), 
          }}
          actions={[
            {
              icon: 'refresh',
              tooltip: 'Refresh Data',
              isFreeAction: true,
              onClick: () => { dispatch(fetchQuestions());  },
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

        <AlertDialog open={questionsdata.error.flag && clicked} onClose={handleCloseAlert}>{languageJson.update_failed}</AlertDialog>
        </div>
        </Container>
    
  );
}


