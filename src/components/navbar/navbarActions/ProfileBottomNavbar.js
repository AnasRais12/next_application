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
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import ContactMailIcon from '@mui/icons-material/ContactMail';

const StyledListItemButton = styled(ListItemButton)({
    padding: '8px 16px',
    '&:hover': {
        backgroundColor: '#f5f5f5',
    },
});

const AccountSettings = () => {
    const [openItem, setOpenItem] = useState(null);

    const handleClick = (label) => {
        setOpenItem(openItem === label ? null : label);
    };

    const menuItems = [
        { icon: <ShoppingCartCheckoutIcon />, label: "My Orders" },
        { icon: <ContactMailIcon />, label: "My Details" },
        { icon: <Home />, label: "Address Book" },
        { icon: <Payment />, label: "Payment Methods" },
        { icon: <Notifications />, label: "Notifications" },
        { icon: <Logout />, label: "Logout" },
    ];

    return (
        <Box sx={{ width: "100%", bgcolor: "white", boxShadow: 1, py: 2,height: "100vh", overflowY: "hidden", display:{ mobileS: "block", lg: "none"}
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
                <KeyboardArrowUpSharp sx={{ color: "#757575" }} />
                <Typography sx={{ fontWeight: "bold", fontSize: "20px", color: "#212121" }}>
                    Account
                </Typography>
                <Notifications sx={{ color: "#757575" }} />
            </Box>

            {/* Menu List */}
            <List>
                {menuItems.map((item) => (
                    <React.Fragment key={item.label}>
                        <StyledListItemButton sx={{ borderBottom: `${item?.label === "Notifications" || item?.label === "My Orders"  && !openItem ? "1px solid #e0e0e0" : ""}`,mb:"30px" }} onClick={() => handleClick(item.label)}>
                            <ListItemIcon sx={{ color: "black", minWidth: "40px" }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.label} sx={{ color: "#212121" }} />
                            {openItem === item.label ? (
                                <KeyboardArrowUp sx={{ fontSize: "30px", color: "#999999" }} />
                            ) : (
                                <KeyboardArrowRight sx={{ fontSize: "30px", color: "#757575" }} />
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