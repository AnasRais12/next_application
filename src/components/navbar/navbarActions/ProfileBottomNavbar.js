"use client";
import React, { useState } from "react";
import styled from "@emotion/styled";
import {
    Box,
    List,
    ListItemText,
    Collapse,
    ListItemIcon,
    ListItemButton,
    Typography,
} from "@mui/material";
import {
    AccountCircle,
    Payment,
    Home,
    Notifications,
    Logout,
    StarBorder,
    KeyboardArrowUp,
    KeyboardArrowRight,
    KeyboardArrowUpSharp,
} from "@mui/icons-material";
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from "next/navigation";




const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  paddingLeft: '16px',
  paddingRight: '16px',
  paddingTop: '8px',
  paddingBottom: '8px',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
  [theme.breakpoints.up('sm')]: {
    paddingTop: '16px',
    paddingBottom: '16px',
  },
}));
const AccountSettings = () => {
    const router = useRouter();
    const [openItem, setOpenItem] = useState(null);

    const handleClick = (label) => {
        setOpenItem(openItem === label ? null : label);
    };

   const menuItems = [
    { icon: <ShoppingCartCheckoutOutlinedIcon sx={{ fontSize: { xs: "24px", sm: "30px" } }} />, label: "My Orders" },
    { icon: <ContactMailOutlinedIcon sx={{ fontSize: { xs: "24px", sm: "30px" } }} />, label: "My Details" },
    // { icon: <HomeOutlinedIcon sx={{ fontSize: { xs: "24px", sm: "30px" } }} />, label: "Address Book" },
    { icon: <NotificationsOutlinedIcon sx={{ fontSize: { xs: "24px", sm: "30px" } }} />, label: "Notifications" },
    { icon: <LogoutOutlinedIcon sx={{ fontSize: { xs: "24px", sm: "30px" } }} />, label: "Logout" },
];

    return (
        <Box sx={{ width: "100%", bgcolor: "white", px:{mobileS: '4px', sm: '20px'}, boxShadow: 1, py: 2,height: "100vh", overflowY: "auto", display:{ mobileS: "block", md: "none"}
         }}>
            {/* Top Header */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    px: 2,
                    pb: 2,
                    mb:2,
                    borderBottom: "1px solid #e0e0e0",
                }}
            >
                <ArrowBackIcon onClick={() => router.push('/home')} sx={{ color: "#757575", fontSize: { mobileS: "30px", sm: "35px" } }} />
                <Typography sx={{ fontWeight: "bold", fontSize: { mobileS: "25px", sm: "30px" }, color: "#212121" }}>
                    Account
                </Typography>
                <Notifications sx={{ color: "#757575", fontSize: { mobileS: "25px", sm: "30px" } }} />
            </Box>

            {/* Menu List */}
            <List>
                {menuItems.map((item) => (
                    <React.Fragment key={item.label}>
                        <StyledListItemButton sx={{ borderBottom: `${item?.label === "Notifications" || item?.label === "My Orders"  && !openItem ? "1px solid #e0e0e0" : ""}`,mb:"30px", }} onClick={() => handleClick(item.label)}>
                            <ListItemIcon sx={{ color: "black", minWidth: "40px", }}>
                                {item.icon}
                            </ListItemIcon>
                           <ListItemText
  primary={item.label}
  primaryTypographyProps={{
    sx: {
      color: "#212121",
      mr: 2,
      fontSize: { mobileS: "18px", sm: "21px" } // mobileS nahi hota by default
    }
  }}
/>
                            {openItem === item.label ? (
                                <KeyboardArrowUp sx={{ fontSize: { mobileS: "30px", sm: "40px" }, color: "#999999" }} />
                            ) : (
                                <KeyboardArrowRight sx={{ fontSize: { mobileS: "30px", sm: "40px" }, color: "#757575" }} />
                            )}
                        </StyledListItemButton>
                        <Collapse in={openItem === item.label} timeout="auto" unmountOnExit>
                            <StyledListItemButton sx={{ pl: 6, borderBottom: `${item?.label === "Notifications" ? "2px solid black" : ""}` }}>
                                <StarBorder sx={{ color: "#757575", mr: 2 }} />
                                <ListItemText primary="Starred" />
                            </StyledListItemButton>
                        </Collapse>
                    </React.Fragment>
                ))}
            </List>
        </Box>
    );
};

export default AccountSettings;