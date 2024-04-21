import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
function Loader({show}) {
  return (
      <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={show}
      >
          <CircularProgress color="inherit" />
      </Backdrop>
  );
}

export default Loader;