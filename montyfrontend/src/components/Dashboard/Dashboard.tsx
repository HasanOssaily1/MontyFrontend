import { Button, CardActions, CardContent, Typography } from '@mui/material';
import Card from '@mui/material/Card';


function Dashboard({count}) {
  return (
      <Card sx={{ minWidth: 275 }}>
          <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Total number of users
              </Typography>
              <Typography variant="h5" component="div">
                  { count }
              </Typography>
              <Typography variant="body2">
                To manage user click above
              </Typography>
          </CardContent>
      </Card>
  );
}

export default Dashboard;