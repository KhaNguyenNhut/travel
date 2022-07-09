import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  Modal,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { filter } from 'lodash';
import { React, useEffect, useState } from 'react';
import Label from '../components/Label';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead } from '../components/_dashboard/user';
//
import USERLIST from '../_mocks_/user';
import './css/user.css';

const TABLE_HEAD = [
  { id: 'name', label: 'Người dùng', alignRight: false },
  { id: 'post', label: 'Bài viết', alignRight: false },
  { id: 'reason', label: 'Lý do', alignRight: false },
  { id: 'times', label: 'Thời gian', alignRight: false },
  { id: 'status', label: 'Trạng thái', alignRight: false },
  { id: 'details', label: 'Chi tiết', alignRight: false }
];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2
};

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));

const path = 'http://localhost:3000/';

export default function Page404() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [reports, setReports] = useState([]);
  const [postData, setPostData] = useState({});
  useEffect(() => {
    const getData = async () => {
      axios
        .get('http://localhost:3001/api/report')
        .then((response) => {
          setReports(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getData();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;
  const [open, setOpen] = useState(false);
  const [postId, setPostId] = useState(0);
  const [reportId, setReportId] = useState(0);

  function onClickReportDetail(row) {
    setPostId(row.post[0]?._id);
    setReportId(row._id);
    axios
      .get(`http://localhost:3001/api/post/${row.post[0]?._id}`)
      .then((response) => {
        setPostData(response.data);
        console.log(response.data);
        setOpen(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function onClickRemoveReport() {
    axios.delete(`http://localhost:3001/api/post/${postId}`).then((response) => {
      const newReports = reports.filter((each) => each.post[0]._id !== postId);
      setReports(newReports);
      setOpen(false);

      axios.delete(`http://localhost:3001/api/report/${reportId}`).then(() => {});
    });
  }

  function onClickCloseReport() {
    axios.delete(`http://localhost:3001/api/report/${reportId}`).then(() => {
      const newReports = reports.filter((each) => each.post[0]._id !== postId);
      setReports(newReports);
      setOpen(false);
    });
  }

  function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    if (query) {
      return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  const formatDate = (date) => {
    const d = new Date(date);

    return `${d.getDate()}-${
      d.getMonth() + 1
    }-${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
  };
  return (
    <Page title="User | Minimal-UI">
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {postData && (
            <div className="container-post">
              <div className="post-user">
                <div className="user-avatar">
                  <img src={postData?.user && path + postData?.user[0]?.avatar} alt="" />
                </div>
                <p className="user-name">
                  {postData?.user && postData?.user[0]?.name}{' '}
                  <span>{formatDate(postData.createdAt)}</span>
                </p>
              </div>
              <div className="post">
                <p className="product">{postData?.product}</p>
                <p>{postData?.content}</p>
                {postData.images?.length > 0 && postData?.images[0].split('.')[1] === 'mp4' && (
                  <video
                    style={{ width: '100%', height: '420px' }}
                    src={path + postData?.images[0]}
                    controls
                    autoPlay
                    muted
                  />
                )}
                {postData.imgPost?.length > 0 && postData?.images[0].split('.')[1] !== 'mp4' && (
                  <img src={path + postData?.images[0]} alt="" />
                )}
              </div>
              <div className="btn-hidden">
                <Button variant="contained" color="error" onClick={() => onClickRemoveReport()}>
                  Ẩn Bài Viết
                </Button>
                <Button
                  className="btn-report-btn"
                  variant="contained"
                  color="success"
                  onClick={() => onClickCloseReport()}
                >
                  Bài viết hợp lệ
                </Button>
              </div>
            </div>
          )}
        </Box>
      </Modal>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Báo cáo bài viết
          </Typography>
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {reports.length === 0 && (
                    <TableRow>
                      <TableCell> </TableCell>
                      <TableCell> </TableCell>
                      <TableCell> </TableCell>
                      <TableCell>Not Data</TableCell>
                    </TableRow>
                  )}
                  {reports
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const isItemSelected = selected.indexOf(row.User_name) !== -1;

                      return (
                        <TableRow
                          hover
                          key={row._id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, row.name)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar
                                alt={row.user[0]?.name}
                                src={`http://localhost:3000/${row.user[0]?.name}`}
                              />
                              <Typography variant="subtitle2" noWrap>
                                {row.user[0]?.name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{row.post[0]?.content}</TableCell>
                          <TableCell align="left">{row.content}</TableCell>
                          <TableCell align="left">{formatDate(row.createdAt)}</TableCell>
                          <TableCell align="left">
                            <Label
                              variant="ghost"
                              color={row.status === 'done' ? 'error' : 'success'}
                            >
                              {row.status === 'done' ? 'Đã xem' : 'Mới'}
                            </Label>
                          </TableCell>

                          <TableCell align="left">
                            <Button
                              className="btn-blockUser"
                              variant="contained"
                              color="success"
                              onClick={() => onClickReportDetail(row)}
                            >
                              Chi tiết
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
