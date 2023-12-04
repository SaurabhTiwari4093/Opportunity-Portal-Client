import {
  Container,
  Typography,
  Grid,
  CardContent,
  Card,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import React, { useState, useEffect } from "react";
import InternshipTable from "../../components/table";
import InternshipImage from "../../assets/internshipImage.svg";
import CofounderImage from "../../assets/cofounderImage.svg";
import JobImage from "../../assets/jobImage.svg";
import { useNavigate, useLocation } from "react-router-dom";
import PopOver from "../../components/student/popOver";
import moment from "moment";

export default function Internship({
  BASE_URL,
  studentDetails,
  setShowAlert,
  setAlertMessage,
  setAlertSeverity,
}) {
  const { type } = useLocation().state;
  const [loading, setLoading] = useState(true);
  const [internshipTableRow, setInternshipTableRow] = useState([]);
  const navigate = useNavigate();
  const [typeImage, setTypeImage] = useState([]);
  const [typeDescription, setTypeDescription] = useState([]);

  const checkStatus = (studentsApplied) => {
    for (let i = 0; i < studentsApplied.length; i++) {
      if (studentsApplied[i].studentId === studentDetails._id) {
        return studentsApplied[i].status;
      }
    }
    return "Not Applied";
  };

  const convertToTableRows = (jsonData) => {
    const jsonDataArray = [];
    for (let i = 0; i < jsonData.length; i++) {
      const oneJsonData = jsonData[i];
      const convertedJsonData = {
        id: i + 1,
        company: oneJsonData.companyName,
        designation: oneJsonData.designation,
        stipend: oneJsonData.stipend,
        deadline: oneJsonData.deadline,
        status: checkStatus(oneJsonData.studentsApplied),
        details: oneJsonData._id,
        apply: {
          jobId: oneJsonData._id,
          status: checkStatus(oneJsonData.studentsApplied),
          deadline: oneJsonData.deadline,
        },
      };
      jsonDataArray.push(convertedJsonData);
    }
    setInternshipTableRow(jsonDataArray);
  };

  const getInternship = async () => {
    setLoading(true);
    if (type === "Internship") {
      setTypeImage(InternshipImage);
      setTypeDescription(
        "Witness a 0-1 jouney of a startup and get first hand experience of working in a startup."
      );
    } else if (type === "Job") {
      setTypeImage(JobImage);
      setTypeDescription(
        "Work in a fast paced enviourment and experience the thrill of a startup."
      );
    } else {
      setTypeImage(CofounderImage);
      setTypeDescription(
        "Wanted to be a cofounder meet the right people and kickstart your startup journey."
      );
    }
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const url = `${BASE_URL}/api/student/jobs?type=${type}`;
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      if (data.status === 200) {
        convertToTableRows(data.jobs);
        setLoading(false);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const statusTypoColor = (jobStatus) => {
    if (jobStatus === "Selected" || jobStatus === "Shortlisted") {
      return "#2e7d32";
    } else if (
      jobStatus === "Not shortlisted" ||
      jobStatus === "Not selected"
    ) {
      return "#d32f2f";
    } else if (jobStatus === "Applied") {
      return "primary";
    } else {
      return "none";
    }
  };

  const internshipTableColumn = [
    {
      field: "company",
      headerName: "Company",
      flex: 1,
    },
    {
      field: "designation",
      headerName: "Designation",
      flex: 1,
    },
    {
      field: "stipend",
      headerName: "Stipend",
      flex: 1,
    },
    {
      field: "deadline",
      headerName: "Deadline",
      flex: 1,
      renderCell: ({ value }) => {
        return value < moment().format("YYYY-MM-DDThh:mm")
          ? "Deadline passed"
          : moment(value).format("MMMM Do, h:mm a");
      },
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: ({ value }) => {
        return <Typography color={statusTypoColor(value)}>{value}</Typography>;
      },
    },
    {
      field: "details",
      headerName: "Details",
      flex: 1,
      renderCell: ({ value }) => {
        return (
          <Button
            size="small"
            onClick={() => {
              navigate("../details", { state: { jobId: value } });
            }}
          >
            <VisibilityRoundedIcon />
          </Button>
        );
      },
    },
    {
      field: "apply",
      headerName: "Apply",
      flex: 1,
      renderCell: ({ value }) => {
        return (
          <PopOver
            jobId={value.jobId}
            status={value.status}
            studentDetails={studentDetails}
            deadline={value.deadline}
            setShowAlert={setShowAlert}
            setAlertMessage={setAlertMessage}
            setAlertSeverity={setAlertSeverity}
          />
        );
      },
    },
  ];

  useEffect(() => {
    getInternship();
  }, [type]);

  return (
    <Container sx={{ py: 2, mt: 9 }}>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={7} md={9}>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography variant="h5">{typeDescription}</Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={0}
              sm={5}
              md={3}
              display={{ xs: "none", sm: "grid" }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "center",
                }}
              >
                <img
                  src={typeImage}
                  alt={type}
                  loading="lazy"
                  width={200}
                  height={200}
                />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2 }}>
            {type} Opportunities
          </Typography>
          {loading ? (
            <Box
              sx={{
                height: 370.5,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <InternshipTable
              column={internshipTableColumn}
              row={internshipTableRow}
            />
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
