import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import React from "react";
import { MdClose } from "react-icons/md";
const BaseDialog = ({ open, handleClose, children, title }) => {
	return (
		<Dialog open={open} onClose={handleClose} sx={{}} scroll="paper"
		PaperProps={{
			sx:{
				borderRadius:'12px'
			}
		}}
		>
			<IconButton
				onClick={() => handleClose()}
				sx={{ position: "absolute", top: "10px", right: "10px" }}
			>
				<MdClose />
			</IconButton>
			{title && <DialogTitle sx={{
				fontWeight:'bold',
				fontSize:'2.5rem',
			}}>{title}</DialogTitle>}
			<DialogContent>{children}</DialogContent>
		</Dialog>
	);
};

export default BaseDialog;
