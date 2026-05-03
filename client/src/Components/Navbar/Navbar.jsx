import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {MyContext} from '../Context/ContexProvider';

import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  Stack,
  Divider,
  Text
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";

const Links = [
  { title: "Dashboard", path: "/" },
  // { title: "Login", path: "/login" },
  { title: "Schedule", path: "/schedule" },
  { title: "Join", path: "/join" },
  { title: "Code Arena", path: "/code-arena" },
];

const NavLink = ({ title, path }) => (
  <Box
    as={motion.div}
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.95 }}
  >
    <Box
      as={Link}
      to={path}
      px={3}
      py={2}
      rounded={"md"}
      color={"gray.300"}
      fontWeight={"medium"}
      transition={"all 0.2s"}
      _hover={{
        textDecoration: "none",
        color: "white",
        bg: "whiteAlpha.200",
      }}
    >
      {title}
    </Box>
  </Box>
);

const Navbar = () => {
  const { isAuth } = useContext(MyContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        position="sticky"
        top={0}
        zIndex={1000}
        bg="rgba(15, 23, 42, 0.85)"
        backdropFilter="blur(12px)"
        borderBottom="1px solid"
        borderColor="whiteAlpha.200"
        px={4}
      >
        <Flex
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
          fontSize={"xl"}
        >
          <HStack spacing={8} alignItems={"center"}>
            <Box
              as={motion.div}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              fontSize={"2xl"}
              fontWeight={"extrabold"}
            >
              <Link to={"/"}>
                <Text
                  as="span"
                  bgGradient="linear(to-r, purple.300, pink.400)"
                  bgClip="text"
                >
                  Collab Hub
                </Text>
              </Link>
            </Box>
          </HStack>
          <Flex alignItems={"center"}>
            <HStack
              as={"nav"}
              spacing={{ base: 4, md: 8 }}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map(({ title, path }) => (
                <NavLink key={title} title={title} path={path} />
              ))}
              {isAuth ? (
                <NavLink key={"logout"} title={"Logout"} path={"/logout"} />
              ) : (
                <NavLink key={"login"} title={"Login"} path={"/login"} />
              )}
            </HStack>
          </Flex>
          <IconButton
            size={"md"}
            color={"white"}
            variant={"ghost"}
            _hover={{ bg: "whiteAlpha.200" }}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map(({ title, path }) => (
                <NavLink key={title} title={title} path={path} />
              ))}
              {isAuth ? (
                <NavLink key={"logout"} title={"Logout"} path={"/logout"} />
              ) : (
                <NavLink key={"login"} title={"Login"} path={"/login"} />
              )}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default Navbar;
