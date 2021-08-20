import React from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { ButtonGroup } from "@material-ui/core";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import EditNote from "./EditNote";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minWidth: 275,
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
    overflow: "auto",
    "&:hover": {
      background: "#e8efff",
    },
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
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    outline: "none",
    backgroundColor: theme.palette.background.paper,
    borderRadius: 5,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  editPaper: {
    width: "50%",
    height: "50%",
    outline: "none",
    backgroundColor: theme.palette.background.paper,
    borderRadius: 5,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function NotePreview(props) {
  const classes = useStyles();

  const [openModal, setOpenModal] = React.useState(false);
  const [openModalEdit, setOpenModalEdit] = React.useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModalEdit = () => {
    setOpenModalEdit(true);
  };

  const handleCloseModalEdit = () => {
    setOpenModalEdit(false);
  };

  const handleModalChange = () => {
    handleCloseModal();
    handleOpenModalEdit();
  };

  const handleDelete = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };

    axios
      .delete(`/api/private/notes/${props.NID}`, config)
      .then(console.log)
      .catch(console.log);

    window.location.reload();
  };

  return (
    <div>
      <Card hoverable className={classes.card} onClick={handleOpenModal}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {props.Title}
          </Typography>
          <br />
          <Typography variant="body2" component="p">
            <ReactMarkdown children={props.Body} remarkPlugins={[remarkGfm]} />
          </Typography>
        </CardContent>
      </Card>

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
            <h2 id="transition-modal-title">{props.Title}</h2>
            <ReactMarkdown children={props.Body} remarkPlugins={[remarkGfm]} />

            <br />
            <div>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <ButtonGroup variant="contained">
                <Button
                  onClick={handleModalChange}
                  variant="contained"
                  color="primary"
                  m={2}
                >
                  Editar
                </Button>
                <Button
                  onClick={handleDelete}
                  variant="contained"
                  color="secondary"
                >
                  Borrar
                </Button>
              </ButtonGroup>
              </Box>
              
            </div>
          </div>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openModalEdit}
        onClose={handleCloseModalEdit}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModalEdit}>
          <div className={classes.editPaper}>
            <EditNote Title={props.Title} Body={props.Body} NID={props.NID} />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
