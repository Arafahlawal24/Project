import { Grid } from '@mui/material';
import {AddEventForm} from './AddEventForm';

const Home = () => {

  return (
    <>
        <Grid container spacing={2} justifyContent="center" >
            <AddEventForm />
        </Grid>
    </>
  )
}

export default Home
