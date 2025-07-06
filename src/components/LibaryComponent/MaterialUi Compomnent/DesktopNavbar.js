// components/DesktopNavbar.jsx
import {
  AppBar,
  Toolbar,
  Box,
  InputBase,
  Button,
  IconButton,
  Badge,
  Avatar,
} from "@mui/material";
import { FiSearch, FiHeart, FiShoppingCart, FiUser } from "react-icons/fi";
import Link from "next/link";

const DesktopNavbar = ({ user, wishListState, cartItem, handleProfileClick, countries }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "white",
        zIndex: 1300,
        borderBottom: "1px solid #e0e0e0",
        display: { mobileS: "none", lg: "block" },
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", maxWidth: 1280, mx: "auto", px: 3 }}>
        <Link href="/" passHref legacyBehavior>
          <Box component="a" sx={{ display: "flex", alignItems: "center" }}>
            <div className="text-3xl text-black font-bold">ShopEase</div>
          </Box>
        </Link>

        <Box
          component="form"
          sx={{
            display: "flex",
            alignItems: "center",
            maxWidth: 600,
            mx: 4,
            px: 2,
            py: 0.5,
            borderRadius: 50,
            border: "1px solid #ccc",
            width: "100%",
          }}
        >
          <FiSearch style={{ marginRight: 8, color: "#aaa" }} />
          <InputBase placeholder="Search for products..." fullWidth />
          <Button variant="contained" sx={{ borderRadius: "50px", backgroundColor: "black" }}>
            Search
          </Button>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton>
            <Badge badgeContent={wishListState?.length || 0} color="secondary">
              <FiHeart />
            </Badge>
          </IconButton>

          <Link href="/shoppingcart" passHref legacyBehavior>
            <IconButton>
              <Badge badgeContent={cartItem?.length || 0} color="secondary">
                <FiShoppingCart />
              </Badge>
            </IconButton>
          </Link>

          <IconButton onClick={handleProfileClick}>
            {user ? (
              <Avatar sx={{ bgcolor: "primary.main" }}>{user.email[0].toUpperCase()}</Avatar>
            ) : (
              <FiUser />
            )}
          </IconButton>

          <Box>
            <img
              src={countries?.flags?.svg || "https://flagcdn.com/w320/us.png"}
              style={{ width: 25, height: 25, borderRadius: 3 }}
              alt="Flag"
            />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default DesktopNavbar;
