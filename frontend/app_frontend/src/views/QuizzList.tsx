import React,{ useState,useEffect } from 'react';
import MaterialTable from 'material-table';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useSelector, useDispatch } from "react-redux";
import  languageJson  from "../config/language";
import AlertDialog from '../components/AlertDialog';
import { fetchQuizzs } from '../actions/quizzactions';

const QuizzList = (props: { history: string[]; }) => {

  const columns:any =  [
      { title: languageJson.quizz_id, field: 'id', sorting:false },
      { title: languageJson.name, field: 'quizz_name', sorting:true },
      { title: languageJson.quizz_active_label, field: 'quizz_active', sorting:false },
      { title: languageJson.createdAt, field: 'created_at', sorting:true },
  ];

  const [data, setData] = useState<any>([]);
  const resultsdata = useSelector((state: any) => state.results);
  const quizzsdata = useSelector((state: any) => state.quizzs);
  const dispatch = useDispatch();
  const [queryData, setQueryData] = useState({
    quizz_id: null,
  });

  const [clicked, setClicked] = useState(false);

  useEffect(()=>{
        if(quizzsdata.quizzs){
            setData(quizzsdata.quizzs);
        }
  },[quizzsdata.quizzs]);

  useEffect(()=>{
    if(queryData.quizz_id && queryData.quizz_id !== ''){
      props.history.push('/doquizz/'+queryData.quizz_id);
    }
  },[queryData.quizz_id]);

  const handleCloseAlert = () => {
    setClicked(false);
  };

  return (
    
    <Container component="main" >
      <CssBaseline />
      <div >
        <MaterialTable
            title={languageJson.quizzs_text}
            columns={columns}
            data={data}
            options={{
              exportButton: false,
              sorting: true,
            }}
            actions={[
              rowData => ({
                icon: 'show',
                tooltip: 'Take Quizz',
                onClick: (event, rowData:any) => { setQueryData({ ...queryData, quizz_id: rowData.id }); },
              }),
              rowData => ({
                icon: 'delete',
                tooltip: 'Delete Quizz Results',
                onClick: (event, rowData:any) => { return window.confirm("You want to delete " + rowData.id)},
              }),
              {
                icon: 'refresh',
                tooltip: 'Refresh Data',
                isFreeAction: true,
                onClick: () => { dispatch(fetchQuizzs());  },
              },
        ]}/>


        <AlertDialog open={resultsdata.error.flag && clicked} onClose={handleCloseAlert}>{languageJson.update_failed}</AlertDialog>
      </div>
    </Container>

  );
}

export default QuizzList;
