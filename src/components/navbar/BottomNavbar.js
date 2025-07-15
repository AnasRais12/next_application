// components/BottomNavBar.jsx
import { Box, IconButton, Typography } from "@mui/material";
import { FiHome, FiSearch, FiHeart, FiShoppingCart, FiUser } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GlobalDetails } from "@/context/globalprovider/globalProvider";

const BottomNavBar = ({ setSearchBar, setWishlistModal,  }) => {
  const router = useRouter();
  const { user } = GlobalDetails();
const handleProfileClick = () => {
    if (user) {
      router.push('/settings');
    } else {
      router.push('/login');
    }
  };
  
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
        py: {sm: 3, mobileS: 1},
        zIndex: 1400,
        paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 8px)",
      }}
    >
      <Link href="/" passHref legacyBehavior>
        <Box component="a" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <FiHome className="md:text-[30px] text-[20px]" color={router.pathname === "/" ? "black" : "#aaa"} />
          <Typography fontSize={{ md: '25px', mobileS: '13px' }} variant="caption">Home</Typography>
        </Box>
      </Link>

      <Box onClick={() => setSearchBar(true)} sx={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}>
        <FiSearch className="md:text-[30px] text-[20px]" />
        <Typography fontSize={{ md: '25px', mobileS: '13px' }} variant="caption">Search</Typography>
      </Box>

      <Box onClick={() => setWishlistModal(true)} sx={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}>
        <FiHeart className="md:text-[30px] text-[20px]" />
        <Typography fontSize={{ md: '25px', mobileS: '13px' }} variant="caption">Saved</Typography>
      </Box>

      <Link href="/shoppingcart" passHref legacyBehavior>
        <Box component="a" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <FiShoppingCart className="md:text-[30px] text-[20px]" />
          <Typography fontSize={{ md: '25px', mobileS: '13px' }} variant="caption">Cart</Typography>
        </Box>
      </Link>

      <Box onClick={handleProfileClick} sx={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}>
        <FiUser className="md:text-[30px] text-[20px]" />
        <Typography fontSize={{ md: '25px', mobileS: '13px' }} variant="caption">Account</Typography>
      </Box>
    </Box>
  );
};

export default BottomNavBar;
