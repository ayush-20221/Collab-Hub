import {
  Box,
  VStack,
  Button,
  Divider,
  chakra,
  Grid,
  GridItem,
  Container,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

function MeetingCard({
  elem: { topic, meetingLink, hostEmail, participants, dateandtime, duration },
}) {
  // dateandtime = new Date(dateandtime).getTime() - (5 * 60 * 60 * 1000 + 30 * 60 * 1000);
  dateandtime = new Date(dateandtime).getTime();
  const expiryDate =
    new Date(dateandtime).getTime() +
    (duration === "15 min" ? 15 : duration === "30 min" ? 30 : 60) * 60 * 1000;

  // console.log(new Date().getTime()) 
  // console.log(expiryDate) 
  // console.log(
  return (
    <Box as={Container} maxW="7xl" mt={14} p={2}>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(2, 1fr)",
        }}
        gap={4}
      >
        <GridItem colSpan={1}>
          <VStack alignItems="center" spacing="20px">
            <chakra.h2 fontSize="3xl" fontWeight="700">
              {topic}
            </chakra.h2>
            <Button
              colorScheme={
                new Date().getTime() < new Date(dateandtime).getTime() ||
                new Date().getTime() > expiryDate
                  ? "red"
                  : "green"
              }
              size="md"
              isDisabled={
                new Date().getTime() < new Date(dateandtime).getTime() ||
                new Date().getTime() > expiryDate
              }
              onClick={() => {
                // navigate(meetingLink);
                window.location.href = meetingLink;
              }}
            >
              {new Date().getTime() < new Date(dateandtime).getTime()
                ? "You can't join yet"
                : new Date().getTime() > expiryDate
                ? "Link Expired"
                : "Join Now"}
            </Button>
          </VStack>
        </GridItem>
        <GridItem alignItems={"left"}>
          {/* <Flex> */}
          <Box textAlign={"left"}>
            <chakra.p>
              <span style={{ fontWeight: "600" }}>Host: </span> {hostEmail}
            </chakra.p>
            <chakra.p>
              <span style={{ fontWeight: "600" }}>Participants: </span>{" "}
              {[...new Set(participants)].join(", ")}
            </chakra.p>
            <chakra.p>
              <span style={{ fontWeight: "600" }}>Date and Time: </span>{" "}
              {new Date(dateandtime).toLocaleDateString()},{" "}
              {new Date(dateandtime).toLocaleTimeString()}{" "}
            </chakra.p>
            <chakra.p>
              <span style={{ fontWeight: "600" }}>Duration: </span> {duration}
            </chakra.p>

            <chakra.p>
              <span style={{ fontWeight: "600" }}>Link : </span>{" "}
              {new Date().getTime() < new Date(dateandtime).getTime() ? (
                "Not available yet"
              ) : new Date().getTime() > expiryDate ? (
                "Expired"
              ) : (
                <Link
                  to={
                    meetingLink
                  }
                >
                  {window.location.protocol +
                    "//" +
                    window.location.host +
                    meetingLink}
                </Link>
              )}
            </chakra.p>
          </Box>

          {/* </Flex> */}
        </GridItem>
      </Grid>
      <Divider mt={12} mb={12} />
    </Box>
  );
}
export default MeetingCard;
