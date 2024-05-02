import { Box, Button, Flex, Spinner, VStack, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import MeetingCard from "../../Components/MeetingCard/MeetingCard";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

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
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );
      let data = await response.json();

      if (data.success) {
        setLoading(false);
        setAllMeeting(data.data);
      }
    } catch (error) {
      console.log(error);
      toast({
        title: `Couldn't Get Data`,
        status: "error",
        isClosable: true,
      });
    }
  };

  const handleCreateInstantMeeting = async () => {
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
  }, []);
  if (loading) {
    return (
      <Flex align={"center"} justify={"center"} p={"20"}>
        <Spinner
          alignItems={"center"}
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="teal.500"
          size="xl"
        />
      </Flex>
    );
  }
  return (
    <Box>
      <VStack pt={"20"}>
        <Button
          colorScheme="teal"
          variant="solid"
          onClick={handleCreateInstantMeeting}
        >
          Create an Instant Meeting
        </Button>
      </VStack>
      {allMeeting.length > 0 ? (
        allMeeting
          .sort(function (a, b) {
            return new Date(a.dateandtime) - new Date(b.dateandtime);
          })
          .map((elem, i) => {
            return <MeetingCard elem={elem} key={i} />;
          })
      ) : (
        <Flex align={"center"} justify={"center"} p={"20"}>
          <h1>No Scheduled Meetings Found</h1>
        </Flex>
      )}
    </Box>
  );
}
export default JoinMeeting;
