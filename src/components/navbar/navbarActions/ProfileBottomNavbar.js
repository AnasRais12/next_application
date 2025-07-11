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
        { icon: <AccountCircle />, label: "My Details" },
        { icon: <Payment />, label: "Payment Methods" },
        { icon: <Home />, label: "Address Book" },
        { icon: <Notifications />, label: "Notifications" },
        { icon: <Logout />, label: "Logout" },
    ];

    return (
        <Box sx={{ width: "100%", bgcolor: "white", boxShadow: 1, py: 2 }}>
            {/* Top Header */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    px: 2,
                    pb: 1,
                    borderBottom: "1px solid #e0e0e0",
                }}
            >
                <KeyboardArrowUpSharp sx={{ color: "#757575" }} />
                <Typography sx={{ fontWeight: "bold", fontSize: "18px", color: "#212121" }}>
                    Account
                </Typography>
                <Notifications sx={{ color: "#757575" }} />
            </Box>

            {/* Menu List */}
            <List>
                {menuItems.map((item) => (
                    <React.Fragment key={item.label}>
                        <StyledListItemButton sx={{ borderBottom: `${item?.label === "Notifications" && !openItem ? "2px solid black" : ""}` }} onClick={() => handleClick(item.label)}>
                            <ListItemIcon sx={{ color: "#757575", minWidth: "40px" }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.label} sx={{ color: "#212121" }} />
                            {openItem === item.label ? (
                                <KeyboardArrowUp sx={{ fontSize: "30px", color: "#757575" }} />
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