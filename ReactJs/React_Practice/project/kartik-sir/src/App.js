import logo from "./logo.svg";
import "./App.css";
import react, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDateFns } from "@mui/x-date-pickers-pro/AdapterDateFns";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/system";
import { database } from "./fireBaseConfig";
import { set, get, child, ref } from "firebase/database";
import { uuidv4 } from "@firebase/util";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const result = await axios.post(`https://kartik-sir.herokuapp.com/api/orders`);
    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const { amount, id: order_id, currency } = result.data;
    const options = {
      key: "rzp_test_Mo10W1XKV9cYqW",
      amount: amount.toString(),
      currency: currency,
      name: "Kartik",
      description: "Payment for appoinment",
      image: { logo },
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };
        const result = await axios.post(`https://kartik-sir.herokuapp.com/api/success`, data);
        if (result.data.msg === "success") {
          const curDate = date.toString().split(" ");
          const chooseDate = curDate[3] + "-" + Month[curDate[1]] + "-" + curDate[2];
          await set(ref(database, "appoinments/" + size), {
            id: uuidv4(),
            name,
            chooseDate,
            time,
          });
        }
        window.location.reload();
      },
      theme: {
        color: "#1b986e",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  const handleChange = (event) => {
    setTime(event.target.value);
  };
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  const [rows, setRows] = useState([]);
  const [size, setSize] = useState("not");
  useEffect(() => {
    async function hello() {
      await get(child(ref(database), `appoinments`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            if (data === "No data available") {
              return;
            }
            setSize(data.length);
            const filteredData = data.filter(
              (obj) =>
                obj.chooseDate >=
                JSON.stringify(new Date()).split("T")[0].substring(1)
            );
            setRows(filteredData);
          } else {
            setSize(0);
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
    hello();
  }, [!name]);
  const Month = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  };
  async function handleSubmit() {
    if (!name || date === "" || !time || size === "not") {
      return;
    }
    await displayRazorpay();
  }
  const [showApp, setShowApp] = useState(new Set());

  useEffect(() => {
    if (date) {
      const curDate = date.toString().split(" ");
      const chooseDate =
        curDate[3] + "-" + Month[curDate[1]] + "-" + curDate[2];
      const data = rows.filter((d) => d.chooseDate === chooseDate);
      const value = new Set();
      for (let obj of data) {
        value.add(obj.time);
      }
      setShowApp(value);
    }
  }, [date]);
  function dataChangeHandle(newValue) {
    setDate(newValue);
  }
  return (
    <>
      <Container
        sx={{ display: "flex", justifyContent: "center" }}
        maxWidth="xl"
      >
        <div className="containerInner">
          <div className="mycontainer">
            <Box
              className="box"
              fullWidth
              component="form"
              noValidate
              autoComplete="off"
            >
              <div className="margin">
                <TextField
                  fullWidth
                  required
                  id="outlined-required"
                  label="Name"
                  defaultValue={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="margin">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDatePicker
                    disablePast
                    label="Date"
                    value={date}
                    onChange={dataChangeHandle}
                    renderInput={(params) => (
                      <TextField fullWidth {...params} />
                    )}
                  />
                </LocalizationProvider>
              </div>
              <div className="margin">
                <FormControl fullWidth>
                  {date && (
                    <>
                      <InputLabel id="demo-simple-select-label">
                        Time
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={time}
                        label="Time"
                        onChange={handleChange}
                      >
                        <MenuItem value={""}>Select a slot</MenuItem>
                        {!showApp.has("09AM-10AM") ? (
                          <MenuItem value={"09AM-10AM"}>09AM-10AM</MenuItem>
                        ) : (
                          ""
                        )}
                        {!showApp.has("10AM-11AM") ? (
                          <MenuItem value={"10AM-11AM"}>10AM-11AM</MenuItem>
                        ) : (
                          ""
                        )}
                        {!showApp.has("11AM-12PM") ? (
                          <MenuItem value={"11AM-12PM"}>11AM-12PM</MenuItem>
                        ) : (
                          ""
                        )}
                        {!showApp.has("12PM-01PM") ? (
                          <MenuItem value={"12PM-01PM"}>12PM-01PM</MenuItem>
                        ) : (
                          ""
                        )}
                        {!showApp.has("01PM-02PM") ? (
                          <MenuItem value={"01PM-02PM"}>01PM-02PM</MenuItem>
                        ) : (
                          ""
                        )}
                        {!showApp.has("02PM-03PM") ? (
                          <MenuItem value={"02PM-03PM"}>02PM-03PM</MenuItem>
                        ) : (
                          ""
                        )}
                        {!showApp.has("03PM-04PM") ? (
                          <MenuItem value={"03PM-04PM"}>03PM-04PM</MenuItem>
                        ) : (
                          ""
                        )}
                        {!showApp.has("04PM-05PM") ? (
                          <MenuItem value={"04PM-05PM"}>04PM-05PM</MenuItem>
                        ) : (
                          ""
                        )}
                        {!showApp.has("05PM-06PM") ? (
                          <MenuItem value={"05PM-06PM"}>05PM-06PM</MenuItem>
                        ) : (
                          ""
                        )}
                        {!showApp.has("06PM-07PM") ? (
                          <MenuItem value={"06PM-07PM"}>06PM-07PM</MenuItem>
                        ) : (
                          ""
                        )}
                        {showApp.size === 10 ? (
                          <MenuItem value={""}>
                            No Slots available for the selected date
                          </MenuItem>
                        ) : (
                          ""
                        )}
                      </Select>
                    </>
                  )}
                </FormControl>
              </div>
              <div className="btn-wrapper">
                <div>{name && date && time && <h4>Total price : 200</h4>}</div>
                <div>
                  <Button
                    className="btn-color"
                    variant="contained"
                    onClick={handleSubmit}
                  >
                    Proceed to Pay
                  </Button>
                </div>
              </div>
            </Box>
          </div>
          <div className="box2">
            <TableContainer component={Paper}>
              <Table sx={{ maxWidth: "100%" }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell align="right">Date</StyledTableCell>
                    <StyledTableCell align="right">Time</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => {
                    return (
                      <StyledTableRow key={row.id}>
                        <StyledTableCell component="th" scope="row">
                          {row.name}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.chooseDate}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.time}
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </Container>
    </>
  );
}
export default App;