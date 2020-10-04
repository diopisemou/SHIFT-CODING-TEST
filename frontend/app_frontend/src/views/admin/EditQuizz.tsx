import React,{ useState,useEffect } from 'react';
import { useParams } from "react-router-dom";
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { useSelector, useDispatch } from "react-redux";
import  languageJson  from "../../config/language";
import AlertDialog from '../../components/AlertDialog';
import { fetchQuizz, updateQuizz } from '../../actions/quizzactions';
import { useStyles } from '../../config/helper';

function not(a: any[], b: any[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: any[], b: any[]) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a: any[], b: any[]) {
  return [...a, ...not(b, a)];
}

const EditQuizz = (props: any ) => {

  let { quizz_id } = useParams<any>();

  const resultsdata = useSelector((state: any) => state.results);
  const quizzsdata = useSelector((state: any) => state.quizzs);
  const questionsdata = useSelector((state: any) => state.questions);
  const dispatch = useDispatch();
  const [queryData, setQueryData] = useState<any>({
    quizz_id: null,
    quizz_name: '',
    quizz_active: false,
    questions: [],
    questions_toadd: [],
    questions_toaddid: [],
  });

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [clicked, setClicked] = useState(false);

  const [checked, setChecked] = useState<any[]>([]);
  const [left, setLeft] = useState<any[]>([]);
  const [right, setRight] = useState<any[]>([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const numberOfChecked = (items: any[]) => intersection(checked, items).length;

  useEffect(()=>{
      if(quizzsdata.quizzs){
          let quizzdata = quizzsdata.quizzs.find((x:any) => x.id === quizz_id);
          let quizzdataid = quizzdata.questions.map((v:any) => v.id);
          let questionstoadd = questionsdata.questions.filter((v:any) => !quizzdataid.includes(v.id) );
          let questionstoaddid = questionstoadd.map((v:any) => v.id);
          setQueryData({ ...queryData, quizz_id:quizz_id,
            quizz_name:quizzdata.quizz_name, 
            quizz_active:quizzdata.quizz_active,
            questions:quizzdata.questions,
            questions_toaddid:questionstoaddid,
            questions_toadd:questionstoadd});
            setLeft(questionstoadd);
            setRight(quizzdata.questions);
      } else {
        dispatch(fetchQuizz(quizz_id));
      }
  },[quizzsdata.quizzs]);

  const handleQuizzNameChange = (e: any) => {
    setQueryData({ ...queryData, quizz_name: e.target.value });
  }

  const handleQuizzActiveChange = (e: any) => {
    setQueryData({ ...queryData, quizz_active: e.target.value });
  }
  
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setClicked(true);
    setQueryData({ ...queryData,
      quizz_id: quizz_id,
      questions_toaddid:right.map((v:any) => v.id),
      questions_toadd:right});
    dispatch(updateQuizz(queryData));
    
  }

  const handleCloseAlert = () => {
    setClicked(false);
  };
  
  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleToggleAll = (items: any[]) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (title: React.ReactNode, items: any[]) => (
    <Card>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
            disabled={items.length === 0}
            inputProps={{ 'aria-label': 'all items selected' }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List className={classes.list} dense component="div" role="list">
        {items.map((value: any) => {
          const labelId = `transfer-list-all-item-${value.id}-label`;

          return (
            <ListItem key={value.id} role="listitem" button onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value.question_string} />
              {/* <ListItemText id={labelId} primary={`List item ${value + 1}`} /> */}
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );


  return (
    
    <Container component="main" >
        <CssBaseline />
          <div >
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

              <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
                <Grid item>{customList('Questions to add', left)}</Grid>
                <Grid item>
                  <Grid container direction="column" alignItems="center">
                    <Button
                      variant="outlined"
                      size="small"
                      className={classes.button}
                      onClick={handleCheckedRight}
                      disabled={leftChecked.length === 0}
                      aria-label="move selected right"
                    >
                      &gt;
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      className={classes.button}
                      onClick={handleCheckedLeft}
                      disabled={rightChecked.length === 0}
                      aria-label="move selected left"
                    >
                      &lt;
                    </Button>
                  </Grid>
                </Grid>
                <Grid item>{customList('Questions added', right)}</Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}>
                {languageJson.update}
              </Button>

            </form>
        
            <AlertDialog open={resultsdata.error.flag && clicked} onClose={handleCloseAlert}>{languageJson.update_failed}</AlertDialog>
          </div>
        </Container>
    
  );
}


export default EditQuizz;