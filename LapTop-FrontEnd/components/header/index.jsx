import { baseUrl, DRF_TOKEN_KEY, USER_KEY } from "@/utils/api/axios";
import { getProfessorProfile } from "@/utils/api/user";
import { falsyString } from "@/utils/falsyString";
import { getUser } from "@/utils/user";
import { Menu, MenuItem } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Header = () => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const user = getUser();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { data, isLoading } = useQuery({
    queryFn: getProfessorProfile,
    queryKey: ["professor-prof"],
  });

  const profileUrl = data?.data
    ? baseUrl + "/users" + data.data
    : "/user-profile.svg";

  return (
    <div
      className={
        "flex flex-row h-28 w-screen bg-[#31363f] items-center gap-x-3"
      }
      dir={"rtl"}
    >
      <div
        className={
          "flex flex-row justify-center items-center text-white basis-2/12"
        }
      >
        <img className={"w-24 h-24"} src={"/sefid.png"} />
        <p className={"font-bold text-4xl"}> SAMA </p>
      </div>
      <div
        className={"text-white basis-8/12 flex flex-row gap-16 items-center"}
      >
        <Link className="mr-6" href="/professor-home">
          خانه
        </Link>
        <Link href="/professor-new-request">تعریف درس جدید</Link>
      </div>

      <div
        className={
          "flex flex-row justify-center items-center text-white basis-2/12 gap-3"
        }
      >
        <div onClick={handleClick} className="cursor-pointer">
          {isMounted &&
            `${falsyString(user?.first_name)} ${falsyString(user?.last_name)}`}
        </div>
        <Image
          src={profileUrl}
          alt="profile"
          width={150}
          height={150}
          className="rounded-full border w-14 h-14 object-cover"
        />
      </div>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        className="mt-3"
      >
        <Link href="/professor-profile">
          <MenuItem onClick={handleClose}>پروفایل</MenuItem>
        </Link>
        <Link href="/professor-profile-edit">
          <MenuItem onClick={handleClose}>ویرایش</MenuItem>
        </Link>
        <MenuItem
          onClick={() => {
            localStorage.removeItem(DRF_TOKEN_KEY);
            localStorage.removeItem(USER_KEY);
            handleClose();
            router.push("/login");
          }}
        >
          خروج
        </MenuItem>
      </Menu>
    </div>
  );
};
export default Header;
