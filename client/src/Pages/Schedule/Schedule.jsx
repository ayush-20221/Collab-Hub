import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import emailjs from '@emailjs/browser';
import { motion } from "framer-motion";

function Schedule() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [inputState, setInputState] = useState({
    topic: "",
    dateandtime: "",
    duration: "15 min",
    guest: "",
  });
  const toast = useToast({ position: "top" });

  const handleValuedInput = (e) => {
    setInputState({
      ...inputState,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = ({ topic, dateandtime, duration, guest }) => {
    if (!topic) {
      toast({
        title: `Topic is required`,
        status: "error",
        isClosable: true,
      });
      return false;
    }
    if (!dateandtime) {
      toast({
        title: `Date and Time is required`,
        status: "error",
        isClosable: true,
      });
      return false;
    }
    
    if (new Date(dateandtime) < new Date()) {
      toast({
        title: `Meeting time cannot be in the past`,
        status: "error",
        isClosable: true,
      });
      return false;
    }
    if (!duration) {
      toast({
        title: `Duration is required`,
        status: "error",
        isClosable: true,
      });
      return false;
    }
    if (!guest) {
      toast({
        title: `Participant is required`,
        status: "error",
        isClosable: true,
      });
      return false;
    }
    if (!guest.includes("@")) {
      toast({
        title: `Enter valid email`,
        status: "error",
        isClosable: true,
      });
      return false;
    }
    return true;
  };

  const sendEmail = (meetingDetails) => {
    const templateParams = {
      topic: meetingDetails.topic,
      hostEmail: 'your_email@example.com', // Replace with your email or get it from session
      participants: meetingDetails.guest,
      dateandtime: new Date(meetingDetails.dateandtime).toLocaleString(),
      duration: meetingDetails.duration,
      meetingLink: meetingDetails.meetingLink,
    };

    emailjs
      .send(
        'collabhub',
      'collabhub',
      templateParams,
      '_adCN3FzeKmxS8f_L'
      )
      .then(
        (response) => {
          console.log('Email successfully sent!', response.status, response.text);
        },
        (error) => {
          console.error('Failed to send email.', error);
        }
      );
  };

  const handleFormSubmit = async () => {
    if (!validateForm(inputState)) return;

    try {
      setLoading(true);
      let meetingUrl = "/room/" + uuidv4();

      let response = await fetch(
        process.env.REACT_APP_BACKEND_ENDPOINT_URL + "/meeting/schedule",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({ ...inputState, meetingLink: meetingUrl }),
        }
      );
      let data = await response.json();
      setLoading(false);
      if (data.success) {
        toast({
          title: `Meeting has been Scheduled`,
          status: "success",
          isClosable: true,
        });

        // Send email notification
        sendEmail({ ...inputState, meetingLink: meetingUrl });

        setInputState({
          topic: "",
          dateandtime: "",
          duration: "15 min",
          guest: "",
        });
        navigate("/join");
      } else {
        toast({
          title: data.message || `Failed to schedule meeting`,
          status: "error",
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: `Couldn't Post Data`,
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
        transition={{ duration: 0.6, ease: "easeOut" }}
        zIndex={1}
        spacing={5}
        w={"full"}
        maxW={"md"}
        bg="rgba(255, 255, 255, 0.03)"
        border="1px solid"
        borderColor="whiteAlpha.200"
        backdropFilter="blur(16px)"
        rounded={"2xl"}
        boxShadow={"2xl"}
        p={8}
        my={6}
      >
        <Heading 
          lineHeight={1.1} 
          fontSize={{ base: "2xl", md: "3xl" }}
          color="white"
          textAlign="center"
          mb={4}
        >
          Schedule Meeting
        </Heading>
        <FormControl isRequired>
          <FormLabel color="gray.300">Topic</FormLabel>
          <Input
            variant="filled"
            bg="whiteAlpha.100"
            color="white"
            _hover={{ bg: "whiteAlpha.200" }}
            focusBorderColor="pink.400"
            placeholder="Interview Practice Session"
            _placeholder={{ color: "whiteAlpha.400" }}
            type="text"
            name="topic"
            onChange={handleValuedInput}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color="gray.300">Date and Time</FormLabel>
          <Input
            variant="filled"
            bg="whiteAlpha.100"
            color="white"
            _hover={{ bg: "whiteAlpha.200" }}
            focusBorderColor="pink.400"
            _placeholder={{ color: "whiteAlpha.400" }}
            type="datetime-local"
            name="dateandtime"
            sx={{
              '::-webkit-calendar-picker-indicator': {
                filter: 'invert(1)'
              }
            }}
            onChange={handleValuedInput}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color="gray.300">Duration</FormLabel>
          <Select 
            variant="filled"
            bg="whiteAlpha.100"
            color="white"
            _hover={{ bg: "whiteAlpha.200" }}
            focusBorderColor="pink.400"
            sx={{
              '> option': {
                background: 'rgba(15, 23, 42, 0.95)',
                color: 'white',
              },
            }}
            size="lg" 
            name="duration" 
            onChange={handleValuedInput}
          >
            <option value={"15 min"}>15 min</option>
            <option value={"30 min"}>30 min</option>
            <option value={"60 min"}>60 min</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel color="gray.300">Invite Participant (separated by ,)</FormLabel>
          <Input
            variant="filled"
            bg="whiteAlpha.100"
            color="white"
            _hover={{ bg: "whiteAlpha.200" }}
            focusBorderColor="pink.400"
            placeholder="email@example.com, developer@company.com"
            _placeholder={{ color: "whiteAlpha.400" }}
            type="email"
            name="guest"
            onChange={handleValuedInput}
          />
        </FormControl>
        <Stack spacing={6} pt={2}>
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
            Create
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}

export default Schedule;
