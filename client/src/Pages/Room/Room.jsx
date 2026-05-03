import { useParams, useNavigate } from "react-router-dom";
import { Box, Text, Flex, Button } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { JitsiMeeting } from "@jitsi/react-sdk";

function Room() {
  const { roomID } = useParams();
  const navigate = useNavigate();
  const userName = JSON.parse(localStorage.getItem("user"))?.name || "user name";

  return (
    <Box bg={"gray.50"} h={"calc(100vh - 76px)"} overflow={"hidden"} display={"flex"} flexDirection={"column"}>
      <Flex p={4} bg="white" shadow="sm" align="center" justify="space-between">
        <Text fontSize={"2xl"} fontWeight={"semibold"} color="gray.800" isTruncated>
          Room ID: {roomID}
        </Text>
        <Button 
          leftIcon={<CloseIcon boxSize={3} />} 
          colorScheme="red" 
          variant="outline" 
          size="sm"
          onClick={() => navigate("/join")}
        >
          Leave Room
        </Button>
      </Flex>
      <Box flex={1} width={"100%"}>
        <JitsiMeeting
          domain="alpha.jitsi.net"
          roomName={`CollabHubRoom${roomID.replace(/[^a-zA-Z0-9]/g, "")}`}
          configOverwrite={{
            startWithAudioMuted: true,
            disableModeratorIndicator: true,
            startScreenSharing: true,
            enableEmailInStats: false,
            prejoinPageEnabled: false,
          }}
          interfaceConfigOverwrite={{
            DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
          }}
          userInfo={{
            displayName: userName,
          }}
          onApiReady={(externalApi) => {
            // Automatically return to the previous page when the user uses Jitsi's red hangup button
            externalApi.addListener("videoConferenceLeft", () => {
              navigate("/join");
            });
            externalApi.addListener("readyToClose", () => {
              navigate("/join");
            });
          }}
          getIFrameRef={(iframeRef) => {
            iframeRef.style.height = '100%';
            iframeRef.style.width = '100%';
          }}
        />
      </Box>
    </Box>
  );
}
export default Room;
