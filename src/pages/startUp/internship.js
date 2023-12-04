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
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import React, { useState, useEffect } from "react";
import InternshipTable from "../../components/table";
import InternshipImage from "../../assets/internshipImage.svg";
import CofounderImage from "../../assets/cofounderImage.svg";
import JobImage from "../../assets/jobImage.svg";
import { useNavigate, useLocation } from "react-router-dom";
import moment from "moment";

export default function Internship({
  BASE_URL,
  startUpDetails,
  setShowAlert,
  setAlertMessage,
  setAlertSeverity,
}) {
  const { type } = useLocation().state;
  const [loading, setLoading] = useState(true);
  const [internshipTableRow, setInternshipTableRow] = useState([]);
  const [typeImage, setTypeImage] = useState([]);
  const [typeDescription, setTypeDescription] = useState([]);
  const navigate = useNavigate();

  const convertToTableRows = (jsonData) => {
    const jsonDataArray = [];
    for (let i = 0; i < jsonData.length; i++) {
      const oneJsonData = jsonData[i];
      const convertedJsonData = {
        id: i + 1,
        company: oneJsonData.companyName,
        designation: oneJsonData.designation,
        type: oneJsonData.type,
        stipend: oneJsonData.stipend,
        deadline: oneJsonData.deadline,
        details: oneJsonData._id,
        update: oneJsonData._id,
        studentsApplied: oneJsonData._id,
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
        "Need intern who can witness a 0-1 jouney of a startup and get first hand experience of working in a startup."
      );
    } else if (type === "Job") {
      setTypeImage(JobImage);
      setTypeDescription(
        "Need employee to work in a fast paced enviourment for your startup."
      );
    } else {
      setTypeImage(CofounderImage);
      setTypeDescription(
        "Need a right people as cofounder to kickstart your startup journey."
      );
    }
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const url = `${BASE_URL}/api/startUp/jobs?startUpId=${startUpDetails._id}&type=${type}`;
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      if (data.status === 200) {
        setLoading(false);
        convertToTableRows(data.jobs);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
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
      field: "type",
      headerName: "Type",
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
      field: "studentsApplied",
      headerName: "Students Applied",
      flex: 1,
      renderCell: ({ value }) => {
        return (
          <Button
            size="small"
            onClick={() => {
              navigate("../studentsApplied", { state: { jobId: value } });
            }}
          >
            <PeopleAltRoundedIcon />
          </Button>
        );
      },
    },
    {
      field: "update",
      headerName: "Update",
      flex: 1,
      renderCell: ({ value }) => {
        return (
          <Button
            size="small"
            onClick={() => {
              navigate("../addNew", {
                state: {
                  type: type,
                  companyName: startUpDetails.companyName,
                  startUpId: startUpDetails._id,
                  jobId: value,
                },
              });
            }}
          >
            <BorderColorRoundedIcon />
          </Button>
        );
      },
    },
  ];

  const addNew = () => {
    if (startUpDetails.location === undefined) {
      setAlertMessage("Please complete account details before adding");
      setAlertSeverity("info");
      setShowAlert(true);
    } else {
      navigate("../addNew", {
        state: {
          type: type,
          companyName: startUpDetails.companyName,
          startUpId: startUpDetails._id,
        },
      });
    }
  };

  useEffect(() => {
    getInternship();
  }, [type]);

  return (
    <div>
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
            <Box
              sx={{
                mb: 2,
                display: { xs: "block", md: "flex" },
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h5">Post {type} Opportunities</Typography>
              <Button
                variant="contained"
                sx={{ width: 120, height: 40, mt: { xs: 2, md: 0 } }}
                onClick={addNew}
              >
                <AddRoundedIcon />
              </Button>
            </Box>
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
    </div>
  );
}
