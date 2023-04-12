import { CardContent, Container, Typography, Card, Button, Box, CircularProgress } from '@mui/material';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import StudentAppliedTable from '../../components/table';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PopOver from '../../components/startUp/popOver';
import swal from 'sweetalert';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function StudentsApplied({ BASE_URL, timer }) {
    const { jobId } = useLocation().state;
    const [loading, setLoading] = useState(true);
    const [studentsAppliedTableRow, setStudentsAppliedTableRow] = useState([]);

    const getStudentsAppliedList = async() => {
        setLoading(true);
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
        const url = `${BASE_URL}/api/startUp/jobs/${jobId}`;
        try {
            await fetch(url, requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    if (data.status === 200) {
                        convertToTableRows(data.jobDetails.studentsApplied);
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

    const convertToTableRows = (studentsApplied) => {
        const jsonDataArray = []
        for (let i = 0; i < studentsApplied.length; i++) {
            const oneJsonData = studentsApplied[i];
            const convertedJsonData = {
                id: i + 1,
                name: oneJsonData.name,
                email: oneJsonData.email,
                course: oneJsonData.course,
                department: oneJsonData.department,
                year: oneJsonData.year,
                cgpa: oneJsonData.cgpa,
                whyShouldWeHireYou: oneJsonData.whyShouldWeHireYou,
                resumeLink: oneJsonData.resumeLink,
                linkedIn:oneJsonData.linkedIn,
                statusUpdate: { status: oneJsonData.status, studentId: oneJsonData.studentId },
            }
            jsonDataArray.push(convertedJsonData);
        }
        setStudentsAppliedTableRow(jsonDataArray);
        setLoading(false);
    }

    const openWhyShouldWeHireYou = (value) => {
        swal({
            title: "Cover Letter",
            text: value,
            button: "Close",
        })
    }

    const studentsAppliedTableColumn = [
        {
            field: "name",
            headerName: "Name",
            flex: 1
        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 1
        },
        {
            field: 'course',
            headerName: 'Course',
            flex: 1
        },
        {
            field: 'department',
            headerName: 'Department',
            flex: 1
        },
        {
            field: 'year',
            headerName: 'Year',
            flex: 1
        },
        {
            field: 'cgpa',
            headerName: 'CGPA',
            flex: 1
        },
        {
            field: 'whyShouldWeHireYou',
            headerName: 'Cover Letter',
            flex: 1,
            renderCell: ({ value }) => {
                return <Button size="small" variant="outlined" onClick={() => openWhyShouldWeHireYou(value)}><VisibilityRoundedIcon /></Button>
            }
        },
        {
            field: 'resumeLink',
            headerName: 'Resume',
            flex: 1,
            renderCell: ({ value }) => {
                return <Button size="small" variant="outlined" href={value} target="_blank"><VisibilityRoundedIcon /></Button>
            }
        },
        {
            field: 'linkedIn',
            headerName: 'linkedIn',
            flex: 1,
            renderCell: ({ value }) => {
                return (value==="" || value===undefined)?"_":<Button size="small" variant="outlined" href={value} target="_blank"><LinkedInIcon/></Button>
            }
        },
        {
            field: 'statusUpdate',
            headerName: 'Update Status',
            width: 180,
            renderCell: ({ value }) => {
                return <PopOver status={value.status} studentId={value.studentId} jobId={jobId} BASE_URL={BASE_URL} timer={timer} />
            }
        },
    ];

    useEffect(() => {
        getStudentsAppliedList();
    }, [])

    return (
        <Container sx={{ py: 2, mt: 9 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>Students Applied</Typography>
            <Card>
                <CardContent>
                    <Typography variant="h5" sx={{ mb: 2 }}>Students Details</Typography>
                    {
                        loading ? <Box sx={{ height: 370.5, display: 'flex', justifyContent: 'center', alignItems: "center" }}><CircularProgress /></Box> : <StudentAppliedTable column={studentsAppliedTableColumn} row={studentsAppliedTableRow} />
                    }
                </CardContent>
            </Card>
        </Container>
    )
}
