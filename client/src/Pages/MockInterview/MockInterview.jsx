import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IDE from "../../Components/IDE";
import { Tooltip, Avatar, Flex, Box, Button, HStack, Text, useToast, IconButton } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import runIcon from "../../images/icons/run.svg";
import whiteboard24Regular from "@iconify/icons-fluent/whiteboard-24-regular";

const MockInterview = () => {
  const [textEditor, setTextEditor] = useState("input");
  const [processing, setProcessing] = useState(false);
  const [percentageStage, setPercentageStage] = useState(0);
  const [selected, setSelected] = useState("python");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [python, setpython] = useState("");
  const [cpp, setcpp] = useState("");
  const [java, setjava] = useState("");
  const [js, setjs] = useState("");
  const [pascal, setpascal] = useState("");
  const [perl, setperl] = useState("");
  const [php, setphp] = useState("");
  const [ruby, setruby] = useState("");
  const [modal, setModal] = useState(false);
  const [isInputBoxShown, setisInputBoxShown] = useState(true);
  const toast = useToast({ position: "top" });

  const runCode = () => {
    setOutput("");
    setTextEditor("output");
    setProcessing(true);
    setPercentageStage(10);
    setisInputBoxShown(false);

    var lang = selected;
    const backend_url = process.env.REACT_APP_BACKEND_ENDPOINT_URL + "/runcode";
    var source = "print(1)";
    if (lang === "python") {
      source = python;
    } else if (lang === "cpp") {
      source = cpp;
    } else if (lang === "java") {
      source = java;
    } else if (lang === "javascript") {
      source = js;
    } else if (lang === "pascal") {
      source = pascal;
    } else if (lang === "perl") {
      source = perl;
    } else if (lang === "php") {
      source = php;
    } else if (lang === "ruby") {
      source = ruby;
    }

    const data = {
      langauge: selected,
      stdin: input,
      files: [
        {
          name: "collabhub." + selected,
          content: source,
        },
      ],
    };

    var raw = JSON.stringify(data);

    var requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: raw,
      redirect: "follow",
    };

    fetch(backend_url, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        setOutput(data.stdout || data.stderr || data.error);
        setProcessing(false);
        return;
      })
      .catch((err) => {
        console.log(err);
        setProcessing(false);
        toast({
          title: "Execution Error",
          description: "Failed to connect to the compilation server.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      });
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const navigate = useNavigate();
  const handleLeaveRoom = () => {
    window.location.href = "/code-arena";
  };

  return (
    <Flex
      direction="column"
      h="calc(100vh - 70px)" // Assuming standard navbar height presence, adjust if standalone
      w="100vw"
      overflow="hidden"
      bg="gray.900" // Premium dark base
      bgImage={"url(/landingBG.jpg)"}
      bgSize="cover"
      bgPosition="center"
      position="relative"
    >
      {/* Impeccable dark glass overlay */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="rgba(10, 15, 26, 0.85)"
        backdropFilter="blur(16px)"
        zIndex={0}
      />

      <Flex direction="column" zIndex={1} h="full">
        <Header
          runCode={runCode}
          toggleModal={toggleModal}
          isInputBoxShown={isInputBoxShown}
          setisInputBoxShown={setisInputBoxShown}
          processing={processing}
          handleLeaveRoom={handleLeaveRoom}
        />

        <Box flex="1" position="relative" overflow="hidden">
          <IDE
            modal={modal}
            java={java}
            setjava={setjava}
            toggleModal={toggleModal}
            setModal={setModal}
            cpp={cpp}
            setcpp={setcpp}
            js={js}
            setjs={setjs}
            php={php}
            setphp={setphp}
            perl={perl}
            setperl={setperl}
            ruby={ruby}
            setruby={setruby}
            pascal={pascal}
            setpascal={setpascal}
            python={python}
            setpython={setpython}
            input={input}
            setInput={setInput}
            selected={selected}
            setSelected={setSelected}
            output={output}
            setOutput={setOutput}
            textEditor={textEditor}
            setTextEditor={setTextEditor}
            processing={processing}
            setProcessing={setProcessing}
            percentageStage={percentageStage}
            setPercentageStage={setPercentageStage}
            isInputBoxShown={isInputBoxShown}
          />
        </Box>
      </Flex>
    </Flex>
  );
};

function Header({
  runCode,
  toggleModal,
  isInputBoxShown,
  setisInputBoxShown,
  processing,
  handleLeaveRoom,
}) {
  const [userInfo, setUserInfo] = useState({});
  const [isUserPresent, setIsUserPresent] = useState(false);

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setUserInfo(user);
      if (user) {
        setIsUserPresent(true);
      } else setIsUserPresent(false);
    } catch (e) {
      setIsUserPresent(false);
    }
  }, []);

  const toggleInputBox = () => {
    setisInputBoxShown(!isInputBoxShown);
  };

  return (
    <Flex
      px={6}
      py={3}
      w="full"
      justify="space-between"
      align="center"
      bg="rgba(15, 23, 42, 0.6)"
      backdropFilter="blur(20px)"
      borderBottom="1px solid"
      borderColor="whiteAlpha.100"
      boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
    >
      <HStack spacing={4}>
        <Box
          px={3}
          py={1}
          rounded="md"
          bg="whiteAlpha.100"
          border="1px solid"
          borderColor="whiteAlpha.200"
        >
          <Text fontSize="sm" fontWeight="bold" bgGradient="linear(to-r, pink.400, purple.300)" bgClip="text" letterSpacing="widest" textTransform="uppercase">
            ACTIVE ARENA WORKSPACE
          </Text>
        </Box>
      </HStack>

      <HStack spacing={4}>
        <Tooltip label="Toggle Input/Output" hasArrow placement="bottom" bg="pink.600">
          <IconButton
            icon={<Icon icon="bi:input-cursor-text" fontSize="20px" />}
            onClick={toggleInputBox}
            variant="ghost"
            color="gray.300"
            _hover={{ bg: "whiteAlpha.200", color: "pink.300" }}
            aria-label="Toggle Input"
            size="sm"
            rounded="full"
          />
        </Tooltip>

        <Tooltip label="Open Whiteboard" hasArrow placement="bottom" bg="purple.600">
          <IconButton
            icon={<Icon icon={whiteboard24Regular} fontSize="22px" />}
            onClick={toggleModal}
            variant="ghost"
            color="gray.300"
            _hover={{ bg: "whiteAlpha.200", color: "purple.300" }}
            aria-label="Toggle Whiteboard"
            size="sm"
            rounded="full"
          />
        </Tooltip>

        <Tooltip label="Execute Code" hasArrow placement="bottom" bg="green.500">
          <Button
            size="sm"
            onClick={runCode}
            isLoading={processing}
            loadingText="Running"
            leftIcon={<img src={runIcon} alt="run" style={{ width: '14px', filter: 'brightness(0) invert(1)' }} />}
            bgGradient="linear(to-r, pink.500, purple.400)"
            color="white"
            _hover={{
              bgGradient: "linear(to-r, pink.400, purple.300)",
              transform: "translateY(-1px)",
              boxShadow: "0 4px 12px rgba(159, 122, 234, 0.4)"
            }}
            _active={{ transform: "translateY(0)" }}
            rounded="full"
            px={5}
            transition="all 0.2s"
          >
            Run Code
          </Button>
        </Tooltip>

        <Tooltip label="Leave Room" hasArrow placement="bottom" bg="red.500">
          <Button
            size="sm"
            onClick={handleLeaveRoom}
            variant="solid"
            bgGradient="linear(to-r, red.500, orange.500)"
            color="white"
            _hover={{
              bgGradient: "linear(to-r, red.600, orange.600)",
              transform: "translateY(-1px)",
              boxShadow: "0 4px 12px rgba(229, 62, 62, 0.4)"
            }}
            _active={{ transform: "translateY(0)" }}
            rounded="full"
            px={5}
          >
            Leave
          </Button>
        </Tooltip>

        {isUserPresent && (
          <Box ml={2} pl={4} borderLeft="1px solid" borderColor="whiteAlpha.200">
            <Tooltip label={userInfo.email} hasArrow placement="bottom" bg="gray.700">
              <Avatar
                size="sm"
                name={userInfo.name}
                src={userInfo.picture}
                border="2px solid"
                borderColor="pink.500"
                cursor="pointer"
                transition="all 0.2s"
                _hover={{ transform: "scale(1.1)", shadow: "0 0 10px rgba(255, 0, 128, 0.4)" }}
              />
            </Tooltip>
          </Box>
        )}
      </HStack>
    </Flex>
  );
}

export default MockInterview;
