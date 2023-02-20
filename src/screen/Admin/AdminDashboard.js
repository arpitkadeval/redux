// import React, { useEffect, useState } from "react";
// import moment from "moment";
// import AdminAppBar from "../../core/components/AdminAppBar";
// import AdminToolbar from "../../core/components/AdminToolbar";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   Box,
//   TextField,
//   Grid,
//   Card,
//   Avatar,
//   Typography,
//   TableContainer,
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
// } from "@material-ui/core";

// import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import LocalizationProvider from "@mui/lab/LocalizationProvider";
// import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
// import {
//   getAllUserAttandance,
//   getAllUsers,
// } from "../../store/userManagement/userAction";
// import Loader from "../../core/components/Loader";
// import Carousel from "../../core/components/Caroucel";
// import PersonIcon from "@material-ui/icons/Person";
// import Commanitem from "../../core/components/Commanitem";
// import empty from "../../core/assets/empty.svg";
// import CollapsTable from "./CollapsTable";

// const AdminDashboard = () => {
//   const dispatch = useDispatch();
//   const { auth, userManagement } = useSelector((state) => state);
//   const [startDate, setStartDate] = useState(
//     new Date().setDate(new Date().getDate() - 15),
//   );
//   const [endDate, setEndDate] = useState(new Date());

//   const [attandData, setattandData] = useState([]);
//   const [totalWorkingDays, setTotalWorkingDays] = useState(0);
//   const [holidayList, setholidayList] = useState([]);
//   const [userdata, setuserdata] = useState([]);

//   const greeting = () => {
//     const hour = moment().hour();
//     if (hour > 16) {
//       return "Good evening";
//     }
//     if (hour > 11) {
//       return "Good afternoon";
//     }
//     return "Good morning";
//   };

//   useEffect(() => {
//     datahanlder();
//   }, [startDate, endDate]);

//   const datahanlder = async () => {
//     const Responsce = await dispatch(
//       getAllUserAttandance({
//         startDate: startDate,
//         endDate: endDate,
//       }),
//     );
//     if (!Responsce) {
//       return;
//     }

//     const attandData = Object.entries(Responsce?.attendance).map(
//       ([key, value]) => ({ key, value }),
//     );

//     if (attandData.length > 0) {
//       setattandData(attandData);
//     }

//     setholidayList(Responsce?.holiDays);

//     const totalWorkingDays = Object.keys(Responsce?.attendance)?.length;
//     setTotalWorkingDays(totalWorkingDays);
//     let userDetails = [];
//     Responsce &&
//       Object.keys(Responsce?.attendance).forEach((key, i) => {
//         var presentList = Responsce?.attendance[key].presents;
//         if (presentList.length) {
//           presentList.map((ele) => {
//             userDetails.push(ele || []);
//           });
//         }
//       });

//     let userData = [];
//     userDetails.map((user) => {
//       if (user && user._id) {
//         let isExist = false;
//         let selectedIndex = -1;
//         userData.map((userDt, index) => {
//           if (userDt._id === user._id) {
//             isExist = true;
//             selectedIndex = index;
//           }
//         });
//         if (isExist) {
//           userData[selectedIndex].count += 1;
//         } else {
//           userData.push({ ...user, count: 1 });
//         }
//       }
//     });
//     setuserdata(userData);
//   };

//   useEffect(() => {
//     dispatch(
//       getAllUsers({
//         orgId: auth?.data?.orgId,
//       }),
//     );
//   }, []);

//   const setting = {
//     dragSpeed: 1.25,
//     itemSideOffsets: 10,
//   };

//   return (
//     <>
//       <Loader isLoading={userManagement?.loading} />
//       <AdminAppBar>
//         <AdminToolbar
//           title={`${greeting()} ${
//             auth?.data?.firstName + " " + auth?.data?.lastName
//           }`}
//         ></AdminToolbar>
//       </AdminAppBar>

//       <Box>
//         <Grid justifyContent="start" alignItems="center" display={"flex"}>
//           <Grid item mr={2}>
//             <LocalizationProvider dateAdapter={AdapterDateFns}>
//               <DesktopDatePicker
//                 inputFormat="MM/dd/yyyy"
//                 value={startDate}
//                 onChange={(date) => setStartDate(date)}
//                 maxDate={new Date()}
//                 renderInput={(params) => (
//                   <TextField
//                     {...params}
//                     id="date"
//                     fullWidth
//                     margin="normal"
//                     name="date"
//                     label="Start Date"
//                   />
//                 )}
//               />
//             </LocalizationProvider>
//           </Grid>
//           <Grid item mr={2}>
//             <LocalizationProvider dateAdapter={AdapterDateFns}>
//               <DesktopDatePicker
//                 inputFormat="MM/dd/yyyy"
//                 value={endDate}
//                 onChange={(date) => setEndDate(date)}
//                 minDate={startDate}
//                 maxDate={new Date()}
//                 renderInput={(params) => (
//                   <TextField
//                     {...params}
//                     id="date"
//                     fullWidth
//                     margin="normal"
//                     name="date"
//                     label="End Date"
//                   />
//                 )}
//               />
//             </LocalizationProvider>
//           </Grid>
//         </Grid>
//         <Box mt={5} mb={3}>
//           <Carousel _data={userdata} {...setting}>
//             {userdata &&
//               userdata.map((value, index) => (
//                 <Card className="card" key={index}>
//                   <Box display={"flex"} justifyContent={"center"}>
//                     {auth?.data?.image === "" ? (
//                       <Avatar
//                         sx={{
//                           bgcolor: "grey",
//                           mb: 2,
//                           height: 100,
//                           width: 100,
//                         }}
//                       >
//                         <PersonIcon />
//                       </Avatar>
//                     ) : (
//                       <Avatar
//                         src={`${process.env.REACT_APP_SERVICE_URL}/${value?.profilePicUrl}`}
//                         alt="Profile"
//                         sx={{
//                           bgcolor: "grey",
//                           mb: 2,
//                           height: 100,
//                           width: 100,
//                         }}
//                       />
//                     )}
//                   </Box>
//                   <Typography component="div" variant="h5" textAlign={"center"}>
//                     {value?.firstName} {value?.lastName}
//                   </Typography>
//                   <Typography
//                     component="div"
//                     variant="h6"
//                     textAlign={"center"}
//                     mt={"10px"}
//                   >
//                     Total days Attands
//                   </Typography>
//                   <Typography
//                     component="div"
//                     variant="h1"
//                     textAlign={"center"}
//                     mt={"3px"}
//                   >
//                     {totalWorkingDays}/{value?.count}
//                   </Typography>
//                 </Card>
//               ))}
//           </Carousel>
//         </Box>
//         <Box sx={{ flexGrow: 1 }}>
//           <Grid container spacing={2}>
//             <Grid item xs={12} md={6}>
//               <Commanitem title="Date wise Attandance">
//                 {attandData && attandData.length > 0 ? (
//                   <CollapsTable
//                     data={attandData}
//                     totalUser={userdata?.length}
//                   />
//                 ) : (
//                   <>
//                     <Box
//                       component="div"
//                       sx={{
//                         height: "100%",
//                         width: "100%",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                       }}
//                     >
//                       <Box
//                         component="img"
//                         sx={{
//                           width: 500,
//                           height: 300,
//                         }}
//                         alt="No Data Founded"
//                         src={empty}
//                       />
//                     </Box>
//                   </>
//                 )}
//               </Commanitem>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <Commanitem title="holiday List">
//                 {holidayList && holidayList.length > 0 ? (
//                   <TableContainer>
//                     <Table aria-label="simple table">
//                       <TableHead>
//                         <TableRow>
//                           <TableCell>#</TableCell>
//                           <TableCell align="left">Title</TableCell>
//                           <TableCell align="left">Date</TableCell>
//                         </TableRow>
//                       </TableHead>

//                       <TableBody>
//                         {holidayList.map((value, index) => (
//                           <TableRow
//                             key={index}
//                             sx={{
//                               "&:last-child td, &:last-child th": { border: 0 },
//                             }}
//                           >
//                             <TableCell component="th" scope="row">
//                               {index + 1}
//                             </TableCell>

//                             <TableCell align="left">{value?.title}</TableCell>
//                             <TableCell align="left">
//                               {moment(value?.date).format("MMM Do YY")}
//                             </TableCell>
//                           </TableRow>
//                         ))}
//                       </TableBody>
//                     </Table>
//                   </TableContainer>
//                 ) : (
//                   <>
//                     <Box
//                       component="div"
//                       sx={{
//                         height: "100%",
//                         width: "100%",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                       }}
//                     >
//                       <Box
//                         component="img"
//                         sx={{
//                           width: 500,
//                           height: 300,
//                         }}
//                         alt="No Data Founded"
//                         src={empty}
//                       />
//                     </Box>
//                   </>
//                 )}
//               </Commanitem>
//             </Grid>
//           </Grid>
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default AdminDashboard;
import React from "react";

const AdminDashboard = () => {
  return <div>AdminDashboard</div>;
};

export default AdminDashboard;
