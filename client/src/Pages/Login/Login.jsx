import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useToast,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../Components/Context/ContexProvider";
import emailjs from '@emailjs/browser';
import { motion } from "framer-motion";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

function Login() {
  const navigate = useNavigate();
  const { toggleIsAuth } = useContext(MyContext);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [inputState, setInputState] = useState({
    email: "",
    password: "",
  });
  const toast = useToast({ position: "top" });

  const handleValuedInput = (e) => {
    setInputState({
      ...inputState,
      [e.target.name]: e.target.value,
    });
  };

  const sendEmail = () => {
    emailjs
      .send('collabhub', 'collabhub', {
        user_name: inputState.name || 'User',
        user_email: inputState.email,
        message: 'You have successfully logged in to Collab Hub!',
      }, 'uQtQVFTlTbFumTjdM')
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        }
      );
  };

  const validateForm = ({ email, password }) => {
    if (!email) {
      toast({
        title: `Email is required`,
        status: "error",
        isClosable: true,
      });
      return false;
    }
    if (!email.includes("@")) {
      toast({
        title: `Enter valid email`,
        status: "error",
        isClosable: true,
      });
      return false;
    }
    if (!password) {
      toast({
        title: `Password is required`,
        status: "error",
        isClosable: true,
      });
      return false;
    }
    if (password.length < 8) {
      toast({
        title: `Password should be over 8 characters.`,
        status: "error",
        isClosable: true,
      });
      return false;
    }

    return true;
  };

  const handleFormSubmit = async () => {
    if (!validateForm(inputState)) return;

    try {
      setLoading(true);

      let response = await fetch(process.env.REACT_APP_BACKEND_ENDPOINT_URL + "/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputState),
      });
      let data = await response.json();
      setLoading(false);
      if (data.success) {
        sendEmail();
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("user", JSON.stringify(data.user));
        toast({
          title: `Login Successful`,
          status: "success",
          isClosable: true,
        });

        toggleIsAuth(true);
        setInputState({
          email: "",
          password: "",
        });
        navigate(window.location.search.replace("?next=", "") || "/");
      } else {
        toast({
          title: data.message || `Login Failed`,
          status: "error",
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: `Email or Password is incorrect`,
        status: "error",
        isClosable: true,
      });
      setLoading(false);
    }
  };

  return (
    <Flex
      h={"calc(100vh - 65px)"}
      overflow={"hidden"}
      align={"center"}
      justify={"center"}
      backgroundPosition={"center"}
      backgroundRepeat={"no-repeat"}
      backgroundSize={"cover"}
      position={"relative"}
      backgroundImage={"url(/landingBG.jpg)"}
    >
      {/* Dark overlay for text contrast and premium feel */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="rgba(10, 15, 26, 0.75)"
        backdropFilter="blur(10px)"
        zIndex={0}
      />

      <Stack
        as={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        zIndex={1}
        spacing={8}
        mx={"auto"}
        maxW={"lg"}
        py={12}
        px={6}
        w="full"
      >
        <Stack align={"center"} textAlign="center">
          <Heading 
            fontSize={"4xl"} 
            color="white"
            fontWeight="extrabold"
            letterSpacing="tight"
          >
            Welcome Back
          </Heading>
          <Text fontSize={"lg"} color={"gray.400"}>
            Sign in to continue your collaboration ✌️
          </Text>
        </Stack>

        <Box
          bg="rgba(255, 255, 255, 0.03)"
          border="1px solid"
          borderColor="whiteAlpha.200"
          backdropFilter="blur(16px)"
          rounded={"3xl"}
          boxShadow={"2xl"}
          p={8}
          as={motion.div}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Stack spacing={6}>
            <FormControl id="email" isRequired>
              <FormLabel color="gray.300">Email Address</FormLabel>
              <Input
                variant="filled"
                bg="whiteAlpha.100"
                color="white"
                _hover={{ bg: "whiteAlpha.200" }}
                _focus={{ bg: "whiteAlpha.200", borderColor: "purple.400" }}
                type="email"
                placeholder="Enter your email"
                name="email"
                onChange={handleValuedInput}
                rounded="xl"
                size="lg"
                _placeholder={{ color: "whiteAlpha.400" }}
              />
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel color="gray.300">Password</FormLabel>
              <InputGroup size="lg">
                <Input
                  variant="filled"
                  bg="whiteAlpha.100"
                  color="white"
                  _hover={{ bg: "whiteAlpha.200" }}
                  _focus={{ bg: "whiteAlpha.200", borderColor: "purple.400" }}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  onChange={handleValuedInput}
                  rounded="xl"
                  _placeholder={{ color: "whiteAlpha.400" }}
                />
                <InputRightElement h={"full"}>
                  <IconButton
                    variant={"ghost"}
                    color="whiteAlpha.600"
                    _hover={{ color: "white" }}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}
                    icon={showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Stack spacing={8}>
              <Button
                isLoading={loading}
                size="lg"
                rounded="full"
                bgGradient="linear(to-r, purple.400, purple.500)"
                color="white"
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "0 10px 20px -10px rgba(159,122,234,0.7)",
                  bgGradient: "linear(to-r, purple.500, purple.600)"
                }}
                transition="all 0.2s"
                onClick={handleFormSubmit}
              >
                Sign In
              </Button>

              <Text align={"center"} color="gray.400">
                New to Collab Hub?{" "}
                <Link
                  color={"purple.300"}
                  fontWeight="bold"
                  onClick={() => navigate("/signup")}
                  _hover={{ color: "purple.200", textDecoration: "none" }}
                >
                  Join now
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default Login;
