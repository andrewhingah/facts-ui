import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
  root: {
    display: "flex",
    maxWidth: "100vw",
    overflowX: "hidden"
  },
  appBar: {
    width: "100%",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  toolbar: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logotype: {
    color: "white",
    marginLeft: theme.spacing(2.5),
    marginRight: theme.spacing(2.5),
    fontWeight: 500,
    fontSize: 18,
    whiteSpace: "nowrap",
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  },
  formButtonsStart: {
    marginTop: theme.spacing(4),
    display: "flex",
    justifyContent: "flex-end",
  },
  formButtons: {
    marginTop: theme.spacing(4),
    display: "flex",
    justifyContent: "space-between",
  },
  content: {
    flexGrow: 1,
    padding: 38,
    width: `calc(100vw - 240px)`,
    minHeight: "100vh"
  },
  fakeToolbar: {
    ...theme.mixins.toolbar
  },

}));
