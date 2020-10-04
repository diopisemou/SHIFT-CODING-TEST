import React,{ useState,useEffect } from 'react';
import { useSelector } from "react-redux";
import {
    Grid,
    Typography
} from '@material-ui/core';
import DashboardCard from '../../components/DashboardCard';

const Dashboard = () => {

    const [data, setData] = useState<any>([]);
    const quizzsdata = useSelector((state: any) => state.quizzs);

    useEffect(()=>{
        if(quizzsdata.quizzs){
            setData(quizzsdata.quizzs);
        }
    },[quizzsdata.quizzs]);

    return (  
        <div>
            <Typography variant="h4" style={{margin:"20px 0 0 15px"}}> Last Activity</Typography>
            <Grid container direction="row" spacing={2}>
                { data.map((v:any) => {
                    return (
                        <Grid item xs>
                            <DashboardCard title="Quizz Manager" > {v.quizz_name} </DashboardCard> 
                        </Grid>
                        );
                    })
                }
            </Grid>
        </div>  
    )
}

export default Dashboard;