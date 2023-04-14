import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentOrStartUp from "./pages/studentOrStartUp";
import Error404 from './pages/error404';
import SignIn from './pages/signIn';
import OTPVerify from './pages/otpVerify';
import SignUp from './pages/signUp';
import StudentIndex from './pages/student/index';
import StartUpIndex from './pages/startUp/index';
import StartUpInternship from './pages/startUp/internship';
import StudentInternship from './pages/student/internship';
import StudentApply from './pages/student/apply';
import JobPortalIndex from './pages/index';
import StudentAccount from './pages/student/account';
import StartUpAccount from './pages/startUp/account';
import StartUpAddNew from './pages/startUp/addNew';
import JobDetails from './pages/details';
import StudentsApplied from './pages/startUp/studentsApplied';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import darkScrollbar from '@mui/material/darkScrollbar';
import { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import AlertSnackbar from "../src/components/snackbar";

const BASE_URL = 'http://localhost:3000';
//const BASE_URL = 'https://opportunity-portal.edciitd.com';

const timer = 2000;

export default function App() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [mode, setMode] = useState('light');
    const [startUpDetails, setStartUpDetails] = useState(null);
    const [studentDetails, setStudentDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("Showing alert!");
    const [alertSeverity, setAlertSeverity] = useState("info");

    const darkTheme = createTheme({
        components: {
            MuiCssBaseline: {
                styleOverrides: (themeParam) => ({
                    body: themeParam.palette.mode === 'dark' ? darkScrollbar() : null,
                }),
            },
        },
        palette: {
            mode: mode,
            primary: {
                main: '#1976d2',
            },
        },
    });

    const getStudentAccountDetails = async () => {
        setLoading(true);
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }
        const url = `${BASE_URL}/api/student/register/${localStorage.getItem('localStorageStudentId')}`;
        try {
            await fetch(url, requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    if (data.status === 200) {
                        setStudentDetails(data.studentDetails)
                        setLoading(false)
                    }
                    else {
                        console.log(data)
                    }
                })
        }
        catch (error) {
            console.log(error)
        }
    }

    const getStartUpAccountDetails = async () => {
        setLoading(true);
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }
        const url = `${BASE_URL}/api/startUp/register/${localStorage.getItem('localStorageStartUpId')}`;
        try {
            await fetch(url, requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    if (data.status === 200) {
                        setStartUpDetails(data.startUpDetails);
                        setLoading(false)
                    }
                    else {
                        console.log(data);
                    }
                })
        }
        catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        if (localStorage.getItem('localStorageStudentId')) {
            getStudentAccountDetails();
        }
        else if (localStorage.getItem('localStorageStartUpId')) {
            getStartUpAccountDetails();
        }
        else {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        if (localStorage.getItem('colorMode') === 'dark') {
            setMode('dark');
        }
        else if (localStorage.getItem('colorMode') === 'light') {
            setMode('light');
        }
        else {
            setMode(prefersDarkMode ? 'dark' : 'light');
        }
    }, [])

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            {
                loading ? <Box sx={{ height: "100vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}><CircularProgress /></Box> :
                    <>
                        <BrowserRouter>
                            <Routes>
                                <Route path="/" element={<JobPortalIndex mode={mode} setMode={setMode} startUpDetails={startUpDetails} studentDetails={studentDetails} />}>
                                    <Route path="/" element={<StudentOrStartUp BASE_URL={BASE_URL} setShowAlert={setShowAlert} setAlertMessage={setAlertMessage} setAlertSeverity={setAlertSeverity}/>} />
                                    <Route path="details" element={<JobDetails BASE_URL={BASE_URL} startUpDetails={null} />} />
                                    <Route path="signIn" element={<SignIn BASE_URL={BASE_URL} setShowAlert={setShowAlert} setAlertMessage={setAlertMessage} setAlertSeverity={setAlertSeverity}/>} />
                                    <Route path="signUp" element={<SignUp BASE_URL={BASE_URL} setShowAlert={setShowAlert} setAlertMessage={setAlertMessage} setAlertSeverity={setAlertSeverity}/>} />
                                    <Route path="otpVerify" element={<OTPVerify BASE_URL={BASE_URL} setStartUpDetails={setStartUpDetails} setStudentDetails={setStudentDetails} setShowAlert={setShowAlert} setAlertMessage={setAlertMessage} setAlertSeverity={setAlertSeverity}/>} />
                                </Route>

                                <Route path="student" element={<StudentIndex mode={mode} setMode={setMode} studentDetails={studentDetails} setStudentDetails={setStudentDetails} />}>
                                    <Route path="internship" element={<StudentInternship BASE_URL={BASE_URL} studentDetails={studentDetails}  setShowAlert={setShowAlert} setAlertMessage={setAlertMessage} setAlertSeverity={setAlertSeverity}/>} />
                                    <Route path="account" element={<StudentAccount BASE_URL={BASE_URL} studentDetails={studentDetails} setStudentDetails={setStudentDetails}  setShowAlert={setShowAlert} setAlertMessage={setAlertMessage} setAlertSeverity={setAlertSeverity}/>} />
                                    <Route path="details" element={<JobDetails BASE_URL={BASE_URL} startUpDetails={null} />} />
                                    <Route path="apply" element={<StudentApply BASE_URL={BASE_URL} studentDetails={studentDetails} setShowAlert={setShowAlert} setAlertMessage={setAlertMessage} setAlertSeverity={setAlertSeverity}/>} />
                                </Route>

                                <Route path="startUp" element={<StartUpIndex mode={mode} setMode={setMode} startUpDetails={startUpDetails} setStartUpDetails={setStartUpDetails} />}>
                                    <Route path="internship" element={<StartUpInternship BASE_URL={BASE_URL} startUpDetails={startUpDetails} setShowAlert={setShowAlert} setAlertMessage={setAlertMessage} setAlertSeverity={setAlertSeverity}/>} />
                                    <Route path="account" element={<StartUpAccount BASE_URL={BASE_URL} startUpDetails={startUpDetails} setStartUpDetails={setStartUpDetails} setShowAlert={setShowAlert} setAlertMessage={setAlertMessage} setAlertSeverity={setAlertSeverity}/>} />
                                    <Route path="addNew" element={<StartUpAddNew BASE_URL={BASE_URL} setShowAlert={setShowAlert} setAlertMessage={setAlertMessage} setAlertSeverity={setAlertSeverity}/>} />
                                    <Route path="studentsApplied" element={<StudentsApplied BASE_URL={BASE_URL} setShowAlert={setShowAlert} setAlertMessage={setAlertMessage} setAlertSeverity={setAlertSeverity}/>} />
                                    <Route path="details" element={<JobDetails BASE_URL={BASE_URL} startUpDetails={startUpDetails} />} />
                                </Route>

                                <Route path="*" element={<Error404 />} />
                            </Routes>
                        </BrowserRouter >
                        {
                            showAlert ? <AlertSnackbar message={alertMessage} severity={alertSeverity} timer={timer} setShowAlert={setShowAlert}/> : <></>
                        }
                    </>

            }
        </ThemeProvider>
    );
}