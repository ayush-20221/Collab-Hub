import { useNavigate } from "react-router-dom";
import { Box, Button, Flex, Stack, Text, Heading, Badge } from "@chakra-ui/react";
import { ArrowForwardIcon, CalendarIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { useContext } from "react";
import { MyContext } from "../../Components/Context/ContexProvider";
import { motion } from "framer-motion";

function Home() {
  const navigate = useNavigate();
  const { isAuth } = useContext(MyContext);
  const userName = JSON.parse(localStorage.getItem("user"))?.name || "User";

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      h={"calc(100vh - 65px)"}
      overflow={"hidden"}
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

      <Flex
        as={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        direction="column"
        align="center"
        textAlign="center"
        maxW="4xl"
        px={6}
        pt={12}
        pb={10}
        zIndex={1}
      >
        <Badge
          px={4}
          py={1.5}
          rounded="full"
          fontSize="sm"
          textTransform="none"
          fontWeight="semibold"
          mb={6}
          border="1px solid"
          borderColor="purple.400"
          bg="whiteAlpha.100"
          color="purple.200"
          letterSpacing="wide"
        >
          🚀 Sync, Solve, and Succeed Together
        </Badge>

        {isAuth && (
          <Text color="gray.300" fontSize="xl" mb={4} fontWeight="medium">
            Welcome back, <Text as="span" color="purple.300">{userName}</Text>
          </Text>
        )}

        <Heading
          as="h1"
          fontSize={{ base: "3xl", md: "6xl", lg: "6xl" }}
          fontWeight="extrabold"
          letterSpacing="tight"
          color="white"
          lineHeight="1.1"
          mb={6}
        >
          One Platform to{" "}
          <Text
            as="span"
            bgGradient="linear(to-r, purple.300, pink.400)"
            bgClip="text"
          >
            Collaborate
          </Text>
        </Heading>

        <Text fontSize={{ base: "lg", md: "xl" }} color="gray.400" maxW="2xl" mb={10}>
          Seamlessly schedule meetings, join collaborative workspaces, and sharpen your skills with our interactive Code Arena. Built for modern professionals.
        </Text>

        <Stack direction={{ base: "column", sm: "row" }} spacing={4} align="center" mb={16}>
          <Button
            size="lg"
            rounded="full"
            px={8}
            colorScheme="purple"
            bgGradient="linear(to-r, purple.400, purple.500)"
            color="white"
            leftIcon={<CalendarIcon />}
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "0 10px 20px -10px rgba(159,122,234,0.7)",
              bgGradient: "linear(to-r, purple.500, purple.600)"
            }}
            transition="all 0.2s"
            onClick={() => navigate("/schedule")}
          >
            Schedule a Meeting
          </Button>

          <Button
            size="lg"
            rounded="full"
            px={8}
            variant="outline"
            color="white"
            borderColor="whiteAlpha.500"
            rightIcon={<ArrowForwardIcon />}
            _hover={{
              bg: "whiteAlpha.200",
              borderColor: "white",
            }}
            transition="all 0.2s"
            onClick={() => navigate("/join")}
          >
            Join Meeting
          </Button>
        </Stack>

        <Box
          as={motion.div}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          bg="rgba(255, 255, 255, 0.03)"
          border="1px solid"
          borderColor="whiteAlpha.200"
          backdropFilter="blur(16px)"
          rounded="2xl"
          p={6}
          w="full"
          maxW="2xl"
          boxShadow="2xl"
          // transition="transform 0.3s"
          _hover={{ transform: "translateY(-4px)", borderColor: "pink.500" }}
        >
          <Flex direction={{ base: "column", sm: "row" }} justify="space-between" align="center" gap={4}>
            <Box textAlign={{ base: "center", sm: "left" }}>
              <Text color="white" fontWeight="semibold" fontSize="lg">
                Ready for a Challenge?
              </Text>
              <Text color="gray.400" fontSize="sm">
                Turn practice into mastery within the Code Arena.
              </Text>
            </Box>
            <Button
              rightIcon={<ExternalLinkIcon />}
              // colorScheme="blue"
              size="sm"
              variant="solid"
              rounded="full"
              px={6}
              bgGradient="linear(to-r, purple.300, pink.400)"
              onClick={() => navigate("/code-arena")}
            >
              Enter Code Arena
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}
export default Home;
