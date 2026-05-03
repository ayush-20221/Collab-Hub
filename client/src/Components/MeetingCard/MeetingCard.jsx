import {
  Box,
  VStack,
  Button,
  Text,
  Flex,
  Badge,
  HStack,
  Link,
  Grid,
} from "@chakra-ui/react";
import { TimeIcon, CalendarIcon, LinkIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import { motion } from "framer-motion";

function MeetingCard({
  elem: { topic, meetingLink, hostEmail, participants, dateandtime, duration },
}) {
  const meetingTime = new Date(dateandtime).getTime();
  const durationInMins = duration === "15 min" ? 15 : duration === "30 min" ? 30 : 60;
  const expiryDate = meetingTime + durationInMins * 60 * 1000;
  const now = new Date().getTime();

  const isUpcoming = now < meetingTime;
  const isExpired = now > expiryDate;
  const isActive = now >= meetingTime && now <= expiryDate;

  return (
    <Box
      as={motion.div}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.01 }}
      w="full"
      bg="rgba(255, 255, 255, 0.03)"
      border="1px solid"
      borderColor="whiteAlpha.200"
      backdropFilter="blur(16px)"
      rounded="2xl"
      p={6}
      transition="all 0.3s"
      _hover={{
        boxShadow: "0 15px 30px -10px rgba(0,0,0,0.5)",
        borderColor: "pink.400",
      }}
    >
      <Flex direction={{ base: "column", md: "row" }} justify="space-between" align="center" gap={6}>
        <VStack align="start" spacing={3} flex={1}>
          <HStack w="full" justify="space-between">
            <Text fontSize="2xl" fontWeight="bold" color="white">
              {topic}
            </Text>
            {isActive && (
              <Badge colorScheme="green" variant="solid" rounded="full" px={3} py={1}>
                In Progress
              </Badge>
            )}
            {isUpcoming && (
              <Badge colorScheme="pink" variant="subtle" rounded="full" px={3} py={1}>
                Upcoming
              </Badge>
            )}
            {isExpired && (
              <Badge colorScheme="red" variant="subtle" rounded="full" px={3} py={1}>
                Expired
              </Badge>
            )}
          </HStack>

          <HStack spacing={6} color="gray.300" flexWrap="wrap" pt={2}>
            <HStack>
              <CalendarIcon color="pink.400" />
              <Text fontSize="sm">{new Date(meetingTime).toLocaleDateString()}</Text>
            </HStack>
            <HStack>
              <TimeIcon color="pink.400" />
              <Text fontSize="sm">
                {new Date(meetingTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {duration}
              </Text>
            </HStack>
          </HStack>

          <Grid templateColumns="100px 1fr" columnGap={3} rowGap={1} pt={2} alignItems="start">
            <Text fontSize="sm" color="gray.200" fontWeight="600" display="flex" alignItems="left">Host:</Text>
            <Text fontSize="sm" color="gray.400" wordBreak="break-all" display="flex" alignItems="left">{hostEmail}</Text>

            <Text fontSize="sm" color="gray.200" fontWeight="600" display="flex" alignItems="left">Participants:</Text>
            <Text fontSize="sm" color="gray.400" wordBreak="break-word" display="flex" alignItems="left">
              {[...new Set(participants)].join(", ")}
            </Text>
          </Grid>
        </VStack>

        <Flex direction="column" align="center" justify="center" minW={{ base: "full", md: "200px" }} gap={3}>
          <Button
            w="full"
            size="lg"
            rounded="full"
            isDisabled={isUpcoming || isExpired}
            bgGradient={
              isActive
                ? "linear(to-r, purple.400, pink.500)"
                : isUpcoming
                  ? "linear(to-r, gray.500, gray.600)"
                  : "linear(to-r, red.500, red.600)"
            }
            color={isUpcoming ? "gray.300" : "white"}
            _hover={{
              bgGradient: isActive
                ? "linear(to-r, purple.500, pink.600)"
                : undefined,
              transform: isActive ? "scale(1.02)" : "none",
            }}
            onClick={() => {
              if (isActive) window.location.href = meetingLink;
            }}
          >
            {isUpcoming ? "Not Started" : isExpired ? "Expired" : "Join Now"}
          </Button>

          {isActive && (
            <HStack fontSize="xs" color="gray.400">
              <LinkIcon />
              <Link as={RouterLink} to={meetingLink} isExternal _hover={{ color: "pink.400" }}>
                Copy Meeting Link
              </Link>
            </HStack>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}

export default MeetingCard;
