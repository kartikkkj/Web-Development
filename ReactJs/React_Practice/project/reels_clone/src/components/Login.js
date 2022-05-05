import React, { useContext, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./cp.css";
import logo from "../assets/logo.png";
import { makeStyles } from '@mui/styles';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import CloudUploadIcon from "@material-ui/icons/CloudUpload"
import img from "../assets/img.jpg"
import { CarouselProvider, Slider, Slide, Image } from 'pure-react-carousel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Link } from 'react-router-dom';
import 'pure-react-carousel/dist/react-carousel.es.css';
import img1 from "../assets/img1.jpg"
import img2 from "../assets/img2.jpg"
import img3 from "../assets/img3.jpg"
import img4 from "../assets/img4.jpg"
import { AuthContext } from '../context/authContext';
import { useNavigate } from 'react-router';


export default function Login() {
    const store = useContext(AuthContext)
    const useStyle = makeStyles({
        text_grey: {
            color: "grey",
            textAlign: "center",
            padding: ".5rem"
        },
        text_center: {
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
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useNavigate()
    const { signin } = useContext(AuthContext);
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

    async function loginfun() {
        try {
            setError("")
            setLoading(true)
            const res = await signin(email, values.password)
            setLoading(false) 
            history("/")
        }
        catch (err) {
            setError(err.message)
            setTimeout(() => {
                setError("")

            }, 2000)
            setLoading(false)
        }
    }
    return (
        <div className='login-wrapper'>
            <div className='imgcar' style={{ backgroundImage: `url(${img})`, backgroundSize: "fit", backgroundRepeat: 'no-repeat' }}>
                <div className='img'>
                    <CarouselProvider
                        visibleSlides={1}
                        hasMasterSpinner
                        interval={2000}
                        isPlaying={true}
                        infinite={true}
                        dragEnabled={true}
                        touchEnabled={true}
                        naturalSlideWidth={195}
                        naturalSlideHeight={342}
                        totalSlides={4}
                    >
                        <Slider>
                            <Slide index={0}><Image src={img1} /></Slide>
                            <Slide index={1}><Image src={img2} /></Slide>
                            <Slide index={2}><Image src={img3} /></Slide>
                            <Slide index={3}><Image src={img4} /></Slide>
                        </Slider>
                    </CarouselProvider>
                </div>
            </div>
            <div>
                <Card sx={{ maxWidth: 400 }}>
                    <div className='signup-logo'>
                        <img src={logo}></img>
                    </div>
                    <CardContent>
                        <Typography className={classes.text_grey} variant="body2" color="text.secondary">
                            Login to do MUJRA or watch MUJRA
                        </Typography>
                        {error && <Alert severity="error">{error}</Alert>}
                        <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin="dense" size="small" value={email} onChange={(e) => setEmail(e.target.value)} />
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

                    </CardContent>
                    <CardActions>
                        <Button fullWidth={true} color='primary' disabled={loading} variant="contained" onClick={loginfun}>Login</Button>
                    </CardActions>
                    <CardContent>
                        <Typography className={classes.text_center} variant="body2" color="primary">
                            <Link to="/forgot" style={{ textDecoration: "none" }}>Forgot Password ?</Link>
                        </Typography>
                    </CardContent>
                </Card>
                <Card variant='outlined' className={classes.margin_top}>
                    <Typography className={classes.text_grey} variant="body2" color="text.secondary">
                        Don't have an account?  <Link style={{ textDecoration: "none" }} to="/signup"> Sign up</Link>
                    </Typography>
                </Card>
            </div>
        </div>
    );
}
