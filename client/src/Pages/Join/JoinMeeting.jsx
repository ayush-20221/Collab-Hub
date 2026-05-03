import { Box, Button, Flex, Spinner, VStack, useToast, Heading, Text, Container } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import MeetingCard from "../../Components/MeetingCard/MeetingCard";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { AddIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";

function JoinMeeting() {
  const [loading, setLoading] = useState(true);
  const [allMeeting, setAllMeeting] = useState([]);
  const toast = useToast({ position: "top" });
  const navigate = useNavigate();

  const getAllUpcommingMeetings = async () => {
    try {
      setLoading(true);

      let response = await fetch(
        process.env.REACT_APP_BACKEND_ENDPOINT_URL + "/meeting/all",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      let data = await response.json();

      if (data.success) {
        setAllMeeting(data.data);
      }
    } catch (error) {
      console.log(error);
      toast({
        title: `Couldn't Get Data`,
        status: "error",
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateInstantMeeting = () => {
    let meetingUrl = "/room/" + uuidv4();

    toast({
      title: `Meeting Created Successfully`,
      status: "success",
      isClosable: true,
    });
    navigate(meetingUrl);
  };

  useEffect(() => {
    getAllUpcommingMeetings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex
      minH={"calc(100vh - 70px)"}
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
        bg="rgba(10, 15, 26, 0.85)"
        backdropFilter="blur(10px)"
        zIndex={0}
      />

      <Container maxW="5xl" zIndex={1} py={12}>
        <VStack spacing={8} align="stretch" w="full">
          
          <Flex
            as={motion.div}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            direction={{ base: "column", md: "row" }} justify="space-between" align="center" bg="rgba(255, 255, 255, 0.02)" backdropFilter="blur(16px)" border="1px solid" borderColor="whiteAlpha.200" rounded="2xl" p={8} boxShadow="2xl">
            <VStack align={{ base: "center", md: "start" }} spacing={2} mb={{ base: 6, md: 0 }}>
              <Heading size="lg" color="white">Your Meetings</Heading>
              <Text color="gray.400">Join your scheduled sessions or start instantly</Text>
            </VStack>
            <Button
              size="lg"
              rounded="full"
              leftIcon={<AddIcon />}
              bgGradient="linear(to-r, purple.400, pink.500)"
              color="white"
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "0 10px 20px -10px rgba(159,122,234,0.7)",
                bgGradient: "linear(to-r, purple.500, pink.600)"
              }}
              onClick={handleCreateInstantMeeting}
            >
              Instant Meeting
            </Button>
          </Flex>

          {loading ? (
            <Flex align={"center"} justify={"center"} p={20}>
              <Spinner thickness="4px" speed="0.65s" emptyColor="whiteAlpha.200" color="pink.400" size="xl" />
            </Flex>
          ) : allMeeting.length > 0 ? (
            <VStack spacing={5} w="full">
              {allMeeting
                .sort((a, b) => new Date(a.dateandtime) - new Date(b.dateandtime))
                .map((elem, i) => (
                  <MeetingCard elem={elem} key={i} />
                ))}
            </VStack>
          ) : (
            <Flex 
              direction="column" 
              align={"center"} 
              justify={"center"} 
              p={20} 
              bg="rgba(255, 255, 255, 0.02)" 
              border="1px dashed" 
              borderColor="whiteAlpha.300" 
              rounded="2xl"
            >
              <Text fontSize="xl" color="gray.400" mt={4}>No Scheduled Meetings Found</Text>
              <Text color="gray.500" mt={2}>Schedule a meeting or start an instant one to begin collaborating.</Text>
            </Flex>
          )}

        </VStack>
      </Container>
    </Flex>
  );
}

export default JoinMeeting;
