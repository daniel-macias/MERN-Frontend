import { useState, useEffect } from "react";
import axios from "axios";

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import NoteIcon from "@material-ui/icons/Note";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { CardActionArea } from "@material-ui/core";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import NotePreview from "../NotePreview"
import CreateNote from "../CreateNote";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minWidth: 275,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius : 5,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "50%"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  pos: {
    marginBottom: 12,
  },
  card: {
    padding: theme.spacing(2),
    color: theme.palette.text.primary,
    height: 300,
  },
  createNewCard: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: 300,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  cardButton: {
    height: 300,
    display: "flex",
    flexDirection: "column",
  },
  centerBox: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
}));

const PrivateScreen = ({ history }) => {
  const classes = useStyles();
  //const [auth, setAuth] = React.useState(true); Tomar en cuenta
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [openModal, setOpenModal] = React.useState(false);

  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");

  const [modalMode, setModalMode] = useState("");
  const [readNoteID, setReadNoteID] = useState("");

  const [userNotes, setUserNotes] = useState({"data": {
    "notes": [
      {
        "title": "Cargando notas...",
        "body": "Por favor espere"
      }
    ]
  }});

  useEffect(() => {
    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get("/api/private", config);
        setPrivateData(data.data);
        setUserNotes(await axios.get("/api/private/user", config));
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };

    fetchPrivateDate();
  }, [history]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    history.push("/login");
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <NoteIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Mis Notas
          </Typography>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={logoutHandler}>Salir</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Box component="span" m={1}>
        <Container maxWidth={false}>
          <Grid container justifyContent="center" spacing={3}>
            <Grid className={classes.root} item xs={12} sm={3}>
              <Card
                className={classes.createNewCard}
                variant="outlined"
                justifyContent="center"
              >
                <Box>
                  <CardActionArea onClick={handleOpenModal} >
                    <CardContent className={classes.createNewCard}>
                      <Typography variant="h5" component="h2">
                        <NoteAddIcon style={{ fontSize: 100 }} />
                      </Typography>
                      <Typography className={classes.pos} color="textSecondary">
                        Haz click aquí para crear una nueva nota
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Box>
              </Card>
            </Grid>

            {userNotes.data.notes.map(exer => (
              <Grid className={classes.root} item xs={12} sm={3}>
                <NotePreview  Title = {exer.title} Body = {exer.body} NID = {exer.id}/>
              </Grid>
            ))}  

            
          </Grid>
        </Container>
      </Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <div className={classes.paper}>
            <CreateNote />
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default PrivateScreen;
