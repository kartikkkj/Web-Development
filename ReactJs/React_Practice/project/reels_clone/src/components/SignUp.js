import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./cp.css";
import logo from "../assets/logo.png";
import { makeStyles } from '@mui/styles';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import CloudUploadIcon from "@material-ui/icons/CloudUpload"
import { useState, useContext } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Link,} from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { database, storage } from '../firebaseConfig';
import { useNavigate } from 'react-router';

export default function SignUp() {
  const useStyle = makeStyles({
    text_grey: {
      color: "grey",
      textAlign: "center",
      padding: ".5rem"
    },
    margin_top: {
      marginTop: ".5rem"
    },
    margin_btn: {
      marginBottom: "5rem"
    }
  })
  const classes = useStyle();

  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [file, setFile] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useNavigate()
  const { signup } = useContext(AuthContext);

  async function signupfun() {
    if (!name) {
      setError("Please enter your name")
      setTimeout(() => {
        setError("")
      }, 2000)
      return;
    }
    if (!email) {
      setError("Please enter your email")
      setTimeout(() => {
        setError("")
      }, 2000)
      return;
    }
    if (!values.password) {
      setError("Please enter your password")
      setTimeout(() => {
        setError("")
      }, 2000)
      return;
    }
    if (!file) {
      setError("Please upload a profile image")
      setTimeout(() => {
        setError("")
      }, 2000)
      return;
    }
    try {
      setError("")
      setLoading(true)

      const userObj = await signup(email, values.password)
      if (typeof userObj == String) {
        setError(userObj)
        setTimeout(() => {
          setError("")
        }, 2000)
        return;
      }
      const uid = userObj.user.uid
      const data = storage.ref("/data/" + uid + "/profileImage").put(file)
      data.on("state_changed", fn1, fn2, fn3);
      function fn1(snapshot) {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log("upload", progress);
      }
      function fn2(err) {
        setError(err)
        setTimeout(() => {
          setError("")

        }, 2000)
        setLoading(false)
      }
      function fn3() {
        data.snapshot.ref.getDownloadURL().then((url) => {
          database.users.doc(uid).set({
            email: email,
            userId: uid,
            name: name,
            profileUrl: url,
            createAt: database.getTimeStamp()
          })
        })
        setLoading(false)
        history("/")
      }
    }
    catch (err) {
      setError(err)
      setTimeout(() => {
        setError("")

      }, 2000)
    }
  }

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div className='signup-wrapper'>
      <Card sx={{ maxWidth: 400 }}>
        <div className='signup-logo'>
          <img src={logo}></img>
        </div>
        <CardContent>
          <Typography className={classes.text_grey} variant="body2" color="text.secondary">
            Sign up to do MUJRA or watch MUJRA
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField id="outlined-name" label="Name" variant="outlined" fullWidth={true} margin="dense" size="small" value={name} onChange={(e) => setName(e.target.value)} />
          <TextField id="outlined-email" label="Email" variant="outlined" fullWidth={true} margin="dense" size="small" value={email} onChange={(e) => setEmail(e.target.value)} />


          <FormControl className={classes.margin_btn} fullWidth={true} size="small" margin="dense" variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}

              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>

          <Button component="label" size="small" fullWidth={true} margin="dense" color='secondary' variant="outlined" startIcon={<CloudUploadIcon />} >Upload Profile
            <input type="file" accept='image/*' hidden onChange={(e) => setFile(e.target.files[0])}></input>
          </Button>
        </CardContent>
        <CardActions>
          <Button fullWidth={true} color='primary' variant="contained" disabled={loading} onClick={signupfun} >Sign Up</Button>
        </CardActions>
        <CardContent>
          <Typography className={classes.text_grey} variant="body2" color="text.secondary">
            By signing up you are agree to our Terms and Condition
          </Typography>
        </CardContent>
      </Card>
      <Card variant='outlined' className={classes.margin_top}>
        <Typography className={classes.text_grey} variant="body2" color="text.secondary">
          Having an account?  <Link style={{ textDecoration: "none" }} to="/login"> Login</Link>
        </Typography>
      </Card>
    </div>
  );
}
