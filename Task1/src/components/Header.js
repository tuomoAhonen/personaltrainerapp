import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Header() {
    return (
            <AppBar position="static" 
                style={{ 
                    marginBottom: 25, 
                    backgroundColor: "#181D1F",
                    boxShadow: '0 3px 5px 2px #000000',
                }}>
                <Toolbar>
                    <Typography variant="h5">
                        CRM Pro / Mr. Personal Trainer
                    </Typography>
                </Toolbar>
            </AppBar>
    );
}