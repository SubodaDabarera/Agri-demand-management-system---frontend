import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BiError } from "react-icons/bi";

const WrongRouteModal = ({open, handleClose}) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        if(window.location.pathname == '/'){
            setIsLoggedIn(true)
        }
    }, [])

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
      >
        <DialogTitle id="alert-dialog-title">
          {/*<b className="align-middle pb-4">{buyer.fullName}</b>*/}
          {/*<br/>*/}
          {/*<p className="align-middle text-gray-900 pb-4">{buyer.email}</p>*/}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="pt-4 text-xl font-medium">
                {isLoggedIn ? (
                    <div className="grid justify-center items-center">
                        <div> You will be logged out and directed to the Login screen!</div>
                        <div className="grid justify-center"><BiError className="w-28 h-28 " color="#bfbf02"/></div>

                    </div>
                ): (
                    <div className="grid justify-center items-center">
                        <div>Access is denied</div>
                        <div className="grid justify-center"><BiError className="w-28 h-28 " color="#bfbf02"/></div>
                        </div>
                )}
                
                
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button
            type="button"
            className="inline-flex mr-4 mb-2 text-white items-center justify-center rounded-md border border-transparent bg-emerald-600 m px-4 py-1 text-sm hover:bg-emerald-700"
            onClick={() => handleClose()}
          >
            OK
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default WrongRouteModal;
