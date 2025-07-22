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
  Menu,
  MenuItem,
} from "@mui/material";
import { FiHeart, FiShoppingCart, FiUser } from "react-icons/fi";
import { SearchBar } from "./Searchbar";
import { useRouter } from "next/navigation";
import Link from "next/link";

const DesktopNavbar = ({ user, wishListState, cartItem, handleProfileClick, countries,setWishlistModal,isOpen,DropdownMenu ,handleClose}) => {
  const router = useRouter();
  const open = Boolean(isOpen);
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "white",
        width: "100%",
        zIndex: 1300,
        borderBottom: "1px solid #e0e0e0",
        display: { mobileS: "none", md: "block" },
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between",width:{lg:'95%', md:'100%'}, mx: "auto", }}>
        <Link href="/" passHref legacyBehavior>
          <Box component="a" sx={{ display: "flex", alignItems: "center" }}>
            <div className="lg:text-3xl text-2xl text-black font-bold">ShopEase</div>
          </Box>
        </Link>

        {/* <Box
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
        </Box> */}
        <SearchBar/>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton onClick={() => setWishlistModal(true)}>
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

          <IconButton onClick={() => handleProfileClick(event)}>
            {user ? (
              <Avatar sx={{ bgcolor: "primary.main" }}>{user.email[0].toUpperCase()}</Avatar>
            ) : (
              <FiUser />
            )}
           
      
          </IconButton>
       <Menu
        anchorEl={isOpen} // ✅ correct variable used
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 2,
          sx: {
              mt: 4,
            width: 150,
            borderRadius: 2,
          },
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',

          
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
         PopperProps={{
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [ -400, 0 ], // [X, Y] => 100px left
        },
      },
    ],
  }}
      >
        {DropdownMenu.map((item, index) => (
          <MenuItem   sx={{textTransform:'capitalize'}} key={index} onClick={()=> router.push(`/${item}`)}>
            {item}
          </MenuItem>
        ))}
        {/* <MenuItem onClick={handleClose}>My Account</MenuItem>
        <MenuItem onClick={handleClose}>Settings</MenuItem> */}
       
      </Menu>
          

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
