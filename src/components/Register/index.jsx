import { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import {
  ChakraProvider,
  Box,
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";

// onLoginSuccess is a function that will be called when the user successfully logs in
// Javascript allowed passing functions as arguments to other functions
// It called "callback function"
// Javascript support higher-order functions (HOFs)

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name1, setName1] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/users", {
        Name: name1,
        Email: email,
        Password: password,
      });

      console.log("response = " + response.data.message);
      if (response.status == 200) {
        // Handle success (e.g., store token, redirect, update state)
        navigate("/"); // Redirect to the home page
        // Redirect or update state here
      } else {
        // Handle other responses
        console.log(response.data.message);
        // Show error message to the user
      }
    } catch (error) {
      if (error.response && error.response.data) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Login error:", error.response.data.message);
        // Display error message to the user
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <ChakraProvider>
      <Box p={4}>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="name1">
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                placeholder="Enter your Name"
                value={name1}
                onChange={(e) => setName1(e.target.value)}
              />
            </FormControl>

            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup size="md">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Button colorScheme="blue" type="submit">
              Register
            </Button>
          </VStack>
        </form>
      </Box>
    </ChakraProvider>
  );
}

export default Register;
