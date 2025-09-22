"use client";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const navItems = [
  { title: "使用說明", link: "/guide" },
  { title: "收費方式", link: "/pricing" },
  { title: "站點資訊", link: "/locations" },
  { title: "最新消息", link: "/news" },
  { title: "活動專區", link: "/events" },
];

const Nav = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPathname(window.location.pathname);
    }
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: "white",
        boxShadow: 2,
        height: 80,
        justifyContent: "center",
        paddingX: { xs: 1, md: 8 },
      }}
    >
      <Toolbar
        sx={{
          minHeight: 80,
          ...(isMobile && { display: "flex", justifyContent: "space-between" }),
        }}
      >
        <Box className="flex items-center">
          <Image
            src="/logo.png"
            alt="Ubike"
            width={32}
            height={32}
            className="h-8 w-auto mr-2"
          />
        </Box>

        {isMobile ? (
          open ? (
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon sx={{ color: "#b2cc3a" }} />
            </IconButton>
          ) : (
            <IconButton onClick={() => setOpen(true)}>
              <MenuIcon sx={{ color: "#b2cc3a" }} />
            </IconButton>
          )
        ) : (
          <>
            <Box sx={{ flex: 1, display: "flex", gap: 3, ml: 5 }}>
              {navItems.map((item) => (
                <a
                  key={item.title}
                  href={item.link}
                  className={`font-bold px-2 transition-colors ${
                    pathname === item.link ? "text-[#677511]" : "text-[#b2cc3a]"
                  } hover:text-[#677511]`}
                >
                  {item.title}
                </a>
              ))}
            </Box>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#b2cc3a",
                color: "white",
                px: 4,
                py: 1,
                borderRadius: 999,
                ml: 2,
                boxShadow: "none",
                "&:hover": { bgcolor: "#a0b82a" },
              }}
            >
              登入
            </Button>
          </>
        )}

        {/* Mobile */}
        {isMobile && open && (
          <Box className="fixed inset-0 z-50 bg-black/20 flex top-20">
            <div className="w-full bg-[#b2cc3a] h-full flex flex-col pt-6 px-6 relative">
              <List sx={{ mt: 2 }}>
                {navItems.map((item) => (
                  <ListItem key={item.title} disablePadding>
                    <ListItemButton
                      component="a"
                      href={item.link}
                      selected={pathname === item.link}
                      sx={{
                        color: "white",
                        "&.Mui-selected": {
                          color: "#677511",
                          bgcolor: "transparent",
                        },
                      }}
                      onClick={() => setOpen(false)}
                    >
                      <ListItemText primary={item.title} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              <div className="flex-1" />
              <Button
                variant="contained"
                sx={{
                  bgcolor: "white",
                  color: "#b2cc3a",
                  px: 2,
                  borderRadius: 999,
                  fontWeight: "bold",
                  mb: 6,
                  ml: 2,
                  alignSelf: "flex-start",
                  boxShadow: "none",
                  "&:hover": { bgcolor: "#f4f4f4" },
                }}
              >
                登入
              </Button>
            </div>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
