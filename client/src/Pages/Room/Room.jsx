import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { Box, Text } from "@chakra-ui/react";

function Room() {
  const { roomID } = useParams();
  console.log(roomID)
  const myMeeting = async (element) => {
    const appID = 246154957;
    const serverSecret = "b9bdcc8b9c977ef3236d39959b117057";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      Date.now().toString(),
      JSON.parse(localStorage.getItem("user")).name || "user name"
    );
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Copy link",
          url:
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname +
            "?roomID=" +
            roomID,
        },
      ],
      scenario: {
        // mode: ZegoUIKitPrebuilt.OneONoneCall,
        mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
      },
      showScreenSharingButton: true,
    });
  };

  return (
    <Box bg={"gray.50"} h={"100vh"}>
      <Box>
        <Text fontSize={"2xl"} fontWeight={"semibold"}>
          Room ID : {roomID}
        </Text>
      </Box>
      <Box
        ref={myMeeting}
        sx={{
          width: "100vw",
          height: "87.5vh",
        }}
      />
    </Box>
    // <div>
    //   <h1>Room</h1>
    //   <h2>Room Id : {roomID}</h2>
    //   {/* <div ref={myMeeting}/> */}
    // </div>
  );
}
export default Room;
