// import {
//   Button,
//   Flex,
//   FormControl,
//   FormLabel,
//   Heading,
//   Input,
//   Select,
//   Stack,
//   useColorModeValue,
//   useToast,
// } from "@chakra-ui/react";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { v4 as uuidv4 } from "uuid";

// function Schedule() {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [inputState, setInputState] = useState({
//     topic: "",
//     dateandtime: "",
//     duration: "15 min",
//     guest: "",
//   });
//   const toast = useToast({ position: "top" });

//   const handleValuedInput = (e) => {
//     setInputState({
//       ...inputState,
//       [e.target.name]: e.target.value,
//     });
//   };
//   const validateForm = ({ topic, dateandtime, duration, guest }) => {
//     if (!dateandtime) {
//       toast({
//         title: `Date and Time is required`,
//         status: "error",
//         isClosable: true,
//       });
//       return false;
//     }
//     if (!duration) {
//       toast({
//         title: `Duration is required`,
//         status: "error",
//         isClosable: true,
//       });
//       return false;
//     }

//     if (!guest) {
//       toast({
//         title: `Participant is required`,
//         status: "error",
//         isClosable: true,
//       });
//       return false;
//     }
//     if (!guest.includes("@")) {
//       toast({
//         title: `Enter valid email`,
//         status: "error",
//         isClosable: true,
//       });
//       return false;
//     }

//     return true;
//   };

//   const handleFormSubmit = async () => {
//     if (!validateForm(inputState)) return;

//     try {
//       setLoading(true);
//       // console.log(inputState);
//       let meetingUrl =
//         // window.location.protocol +
//         // "//" +
//         // window.location.host +
//         "/room/" +
//         uuidv4();

//       let response = await fetch(
//         process.env.REACT_APP_BACKEND_ENDPOINT_URL + "/meeting/schedule",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
//           },
//           body: JSON.stringify({ ...inputState, meetingLink: meetingUrl }),
//         }
//       );
//       let data = await response.json();
//       console.log(data);
//       setLoading(false);
//       if (data.success) {
//         toast({
//           title: `Meeting has been Scheduled `,
//           status: "success",
//           isClosable: true,
//         });
//         // console.log(data);
//         setInputState({
//           topic: "",
//           dateandtime: "",
//           duration: "15 min",
//           guest: "",
//         });
//         navigate("/join");
//       }
//     } catch (error) {
//       console.log(error);
//       toast({
//         title: `Couldn't Post Data`,
//         status: "error",
//         isClosable: true,
//       });
//     }
//   };
//   return (
//     <Flex
//       minH={"100vh"}
//       align={"center"}
//       justify={"center"}
//       bg={useColorModeValue("gray.50", "gray.800")}
//     >
//       <Stack
//         spacing={4}
//         w={"full"}
//         maxW={"md"}
//         bg={useColorModeValue("white", "gray.700")}
//         rounded={"xl"}
//         boxShadow={"lg"}
//         p={6}
//         my={12}
//       >
//         <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
//           Schedule Meeting
//         </Heading>
//         <FormControl>
//           <FormLabel>Topic</FormLabel>
//           <Input
//             placeholder="Interview Practice Session"
//             _placeholder={{ color: "gray.500" }}
//             type="text"
//             name="topic"
//             onChange={handleValuedInput}
//           />
//         </FormControl>
//         <FormControl isRequired>
//           <FormLabel>Date and Time</FormLabel>
//           <Input
//             _placeholder={{ color: "gray.500" }}
//             type="datetime-local"
//             name="dateandtime"
//             onChange={handleValuedInput}
//           />
//         </FormControl>
//         <FormControl isRequired>
//           <FormLabel>Duration</FormLabel>
//           <Select size="lg" name="duration" onChange={handleValuedInput}>
//             <option value={"15 min"}>15 min</option>
//             <option value={"30 min"}>30 min</option>
//             <option value={"60 min"}>60 min</option>
//           </Select>
//         </FormControl>
//         <FormControl>
//           <FormLabel>Invite Participant (seperated by ,)</FormLabel>
//           <Input
//             placeholder="akansha.20208@knit.ac.in, ayush.20221@knit.ac.in, ..."
//             _placeholder={{ color: "gray.500" }}
//             type="email"
//             name="guest"
//             onChange={handleValuedInput}
//           />
//         </FormControl>
//         <Stack spacing={6}>
//           <Button
//             isLoading={loading}
//             bg={"teal.400"}
//             color={"white"}
//             _hover={{
//               bg: "teal.500",
//             }}
//             onClick={handleFormSubmit}
//           >
//             Create
//           </Button>
//         </Stack>
//       </Stack>
//     </Flex>
//   );
// }
// export default Schedule;
import {
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
import emailjs from 'emailjs-com';

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
    if (!dateandtime) {
      toast({
        title: `Date and Time is required`,
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
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
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
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          Schedule Meeting
        </Heading>
        <FormControl>
          <FormLabel>Topic</FormLabel>
          <Input
            placeholder="Interview Practice Session"
            _placeholder={{ color: "gray.500" }}
            type="text"
            name="topic"
            onChange={handleValuedInput}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Date and Time</FormLabel>
          <Input
            _placeholder={{ color: "gray.500" }}
            type="datetime-local"
            name="dateandtime"
            onChange={handleValuedInput}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Duration</FormLabel>
          <Select size="lg" name="duration" onChange={handleValuedInput}>
            <option value={"15 min"}>15 min</option>
            <option value={"30 min"}>30 min</option>
            <option value={"60 min"}>60 min</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Invite Participant (separated by ,)</FormLabel>
          <Input
            placeholder="akansha.20208@knit.ac.in, ayush.20221@knit.ac.in, ..."
            _placeholder={{ color: "gray.500" }}
            type="email"
            name="guest"
            onChange={handleValuedInput}
          />
        </FormControl>
        <Stack spacing={6}>
          <Button
            isLoading={loading}
            bg={"teal.400"}
            color={"white"}
            _hover={{
              bg: "teal.500",
            }}
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
