import { useNavigate } from "react-router-dom";
import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import { ArrowForwardIcon, CalendarIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { useContext } from "react";
import { MyContext } from "../../Components/Context/ContexProvider";

function Home() {
  const navigate = useNavigate();
  const { isAuth } = useContext(MyContext);

  return (
    <Flex
      justifyContent={"center"}
      // paddingTop={"100px"}
      // bg={"gray.50"}
      h={"92vh"}
      backgroundPosition={"bottom"}
      backgroundRepeat={"no-repeat"}
      backgroundSize={"cover"}
      position={"relative"}
      style={{
        filter: "blur(0px)",
        "-webkit-filter": "blur(0px)",
        backgroundImage: "url(/landingBG.jpg)",
      }}
    >
      {/* <div
        style={{
          filter: "blur(0.5px)",
          "-webkit-filter": "blur(0.5px)",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.5)",
          zIndex: -1,
        }}
      ></div> */}
      <Box>
        <Stack align="center" marginTop={"20px"} marginBottom={"50px"}>
          {isAuth && (
            <Stack direction="row">
              <Text color={"black"}  fontSize={"2em"}>Hey </Text>
              <Text fontSize={"2em"} color={"teal"}>
                {JSON.parse(localStorage.getItem("user"))?.name || "User"}
              </Text>
              <Text color={"black"}  fontSize={"2em"}>, Welcome back !</Text>
            </Stack>
          )}
          <Stack direction="row">
            <Text color={"black"} fontSize={"2em"}>
              One Platform to{" "}
            </Text>
            <Text fontSize={"2em"} color={"teal"}>
              Connect
            </Text>
          </Stack>
        </Stack>
        <Stack direction="column" spacing={2} align={"center"}>
          <Stack direction="row" spacing={4}>
            <Button
              leftIcon={<CalendarIcon />}
              colorScheme="teal"
              variant="solid"
              onClick={() => {
                navigate("/schedule");
              }}
            >
              Schedule a Meeting
            </Button>
            <Button
              rightIcon={<ArrowForwardIcon />}
              colorScheme="teal"
              variant="outline"
              onClick={() => {
                navigate("/join");
              }}
            >
              Join Meeting
            </Button>
          </Stack>
          <Text
            style={{
              margin: "20px 0",
            }}
            color={"black"}
          >
            OR
          </Text>
          <Stack direction="column" spacing={4} align={"center"}>
            <Text 
            background={"white"}
            padding={"5px 10px"}
            color={"black"}>Try out your interview skills with </Text>
            <Button
              rightIcon={<ExternalLinkIcon />}
              colorScheme="teal"
              // variant="contained"
              onClick={() => {
                navigate("/mock-interview");
              }}
            >
              Mock Interview{" "}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Flex>
  );
}
export default Home;
