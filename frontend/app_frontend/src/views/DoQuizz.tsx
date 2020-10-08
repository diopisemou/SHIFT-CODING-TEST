import React,{ useState,useEffect } from 'react';
import { useParams } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useSelector, useDispatch } from "react-redux";
import AlertDialog from '../components/AlertDialog';
import  languageJson  from "../config/language";
import {
  fetchQuizz,
  saveQuizzAnswer,
}  from "../actions/quizzactions";
import DynamicForm from "../components/DynamicForm/dynamicform";
import Validator from '../components/DynamicForm/validators';
import CircularLoading from "../components/CircularLoading";
import Swal from "sweetalert2";


const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
    width:195,
    height:195
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

/**
 * Component for handling quizz answering and saving
 * @param props 
 */
const DoQuizz = (props: { history: string[]; }) => {
  let { quizz_id } = useParams<any>();
  const auth = useSelector((state: any) => state.auth);
  const questiondata = useSelector((state: any) => state.questions);
  const quizzdata = useSelector((state: any) => state.quizzs);
  const dispatch = useDispatch();
  const classes  = useStyles();
  const [formdata, setFormData] = useState<any>([]);
  const [currentdata, setCurrentData] = useState<any>({});
  const [data, setData] = useState({
    qdata: [],    
    quizz_id: '',
  });
  const [emaildata, setEmailData] = useState({   
    email: '',
  });
  const [querycount, setQueryCount] = useState(0);
  
  useEffect(()=>{
    if( quizz_id && !quizzdata.loading && querycount < 2){
      if (querycount < 2) {
        dispatch(fetchQuizz(quizz_id));
      }
      setQueryCount(querycount +1);
    }
  }, [quizz_id, quizzdata.loading, querycount, dispatch]);

  useEffect(()=>{
    if( questiondata.info === "answer created" && questiondata.quizzresult && questiondata.quizzresult.quizz_id && emaildata.email ){
      props.history.push('/quizz/'+questiondata.quizz_id+'/result/'+emaildata.email);
    } 
  });

  useEffect(() => {
    if (quizzdata.quizz && quizzdata.quizz.questions) {
      setData({ ...data, qdata: quizzdata.quizz.questions.map((o: any, index:any) => {
          return {
            key: "question"+o.id,
            label: "Question "+(index+1)+": "+o.question_string,
            type: "radio",
            props: { required: true },
            options: [
              { key: "q1", label: "1", name: "question"+o.id, value: "1" },
              { key: "q2", label: "2", name: "question"+o.id, value: "2" },
              { key: "q3", label: "3", name: "question"+o.id, value: "3" },
              { key: "q4", label: "4", name: "question"+o.id, value: "4" },
              { key: "q5", label: "5", name: "question"+o.id, value: "5" },
              { key: "q6", label: "6", name: "question"+o.id, value: "6" },
              { key: "q7", label: "7", name: "question"+o.id, value: "7" }
            ]
          };
        }),
        quizz_id: quizzdata.quizz.id  
      });
    }
  }, [quizzdata.quizz]);

  const handleClose = () => {
    //dispatch(clearLoginError());
  };

  const onSubmit = (model: any) => {
    let formData: any = [];
    if (model.id) {
      formData = formdata.filter((d: any) => {
        return d.id !== model.id;
      });
    } else {
      model.id = +new Date();
      formData = formdata.slice();
    }
    setFormData([model, ...formData]);
    setCurrentData({});
    setEmailData({email: model.email});
    let qanswer = Object.entries(model).filter(x => x[0].includes("question"));
    if (qanswer.length === data.qdata.length) {
      dispatch(saveQuizzAnswer(model,qanswer,data.quizz_id));
    } else {
      Swal.fire(
        'Error!',
        'You have to answer all questions',
        'warning'
      );
    }
    
  };

  return (
    
    <Container component="main" >
      <CssBaseline />
      <div className={classes.paper}>
        
        <Typography component="h1" variant="h5">
          {languageJson.personality_quizz}
          {quizzdata.quizz ? ' - '+quizzdata.quizz.quizz_name : " - "}
        </Typography>
        
        {  data.qdata ? 
          <DynamicForm
          key={currentdata.id}
          className={classes.form}
          title="Discover your perspective "
          subTitle="Complete the 7 min test and get a detailed report of your lenses on the world "
          buttonText="Save & Continue"
          defaultValues={currentdata}
          validators={[
            {
              key: "name", validations: [
                {
                  "validator": Validator.checkName,
                  "message": "Name should start with alphabets"
                },
              ]
            },
            {
              key: "email", validations: [
                {
                  "validator": Validator.checkEmail,
                  "message": "Email is incorrect"
                },
              ]
            },
          ]}
          model={[ ...data.qdata, { key: "name", label: "Name", props: { required: true } }, { key: "email", label: "Email", props: { required: true } },] }
          onSubmit={(model: any) => {
            onSubmit(model);
          }}
        />
        :<CircularLoading/>

      }

      </div>
      <AlertDialog open={auth.error.flag} onClose={handleClose}>{languageJson.sign_in_error} {auth.error.msg} </AlertDialog>
    </Container>
  );
}

export default DoQuizz;
