// components/BottomNavBar.jsx
import { Box, IconButton, Typography } from "@mui/material";
import { FiHome, FiSearch, FiHeart, FiShoppingCart, FiUser } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";

const BottomNavBar = ({ setSearchBar, setWishlistModal, handleProfileClick }) => {
  const router = useRouter();

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        backgroundColor: "white",
        borderTop: "1px solid #ddd",
        display: { mobileS: "flex",  md: "none" },
        justifyContent: "space-around",
        py: 1,
        zIndex: 1400,
        paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 8px)",
      }}
    >
      <Link href="/" passHref legacyBehavior>
        <Box component="a" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <FiHome size={20} color={router.pathname === "/" ? "black" : "#aaa"} />
          <Typography variant="caption">Home</Typography>
        </Box>
      </Link>

      <Box onClick={() => setSearchBar(true)} sx={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}>
        <FiSearch size={20} />
        <Typography variant="caption">Search</Typography>
      </Box>

      <Box onClick={() => setWishlistModal(true)} sx={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}>
        <FiHeart size={20} />
        <Typography variant="caption">Saved</Typography>
      </Box>

      <Link href="/shoppingcart" passHref legacyBehavior>
        <Box component="a" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <FiShoppingCart size={20} />
          <Typography variant="caption">Cart</Typography>
        </Box>
      </Link>

      <Box onClick={handleProfileClick} sx={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}>
        <FiUser size={20} />
        <Typography variant="caption">Account</Typography>
      </Box>
    </Box>
  );
};

export default BottomNavBar;
