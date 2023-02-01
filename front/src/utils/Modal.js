import { Box, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export const BasicModal = () => {
  const [open, setOpen] = useState(true);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ textAlign: "center" }}
          >
            Debes iniciar sesión para ver esta ventana
          </Typography>
          <Typography variant="h5" sx={{ textAlign: "center", mt: 2 }}>
            <Link to="/login" style={{ color: "#444" }}>
              Iniciar sesión
            </Link>
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, textAlign: "center" }}
          >
            ¿Necesitas una cuenta?{" "}
            <Link to="/signup" style={{ color: "#555" }}>
              Registrarse.
            </Link>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};
