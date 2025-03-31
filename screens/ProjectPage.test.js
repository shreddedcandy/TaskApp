import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import ProjectPage from "./ProjectPage";
import { Task_context } from "./task_Context";
import { Alert } from "react-native";
import { act } from "@testing-library/react-native";

// Mock AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
}));

// Mock Alert
jest.spyOn(Alert, "alert");

// Mock TaskContext
const mock_Add_task = jest.fn();
const mockCheckUserExists = jest.fn();

const mockContextValue = {
  addTask: mock_Add_task,
  checkUserExists: mockCheckUserExists,
};

// Navigation mock
const mockNavigation = {
  goBack: jest.fn(),
};

describe("ProjectPage Component", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });
  test("adds a task successfully", async () => {
    mockCheckUserExists.mockResolvedValue(true); // Mock that user exists

    const { getByPlaceholderText, getAllByText } = render(
      <Task_context.Provider value={mockContextValue}>
        <ProjectPage navigation={mockNavigation} />
      </Task_context.Provider>
    );

    // Set the inputs to add a task
    fireEvent.changeText(getByPlaceholderText("Project title"), "Test Task");
    fireEvent.changeText(
      getByPlaceholderText("Project description"),
      "Test Description"
    );

    // Debug: Verify input states
    console.log(
      "Title input after set:",
      getByPlaceholderText("Project title").props.value
    );
    console.log(
      "Description input after set:",
      getByPlaceholderText("Project description").props.value
    );

    // simulate button press
    await act(async () => {
      fireEvent.press(getAllByText("Add Project")[1]); // Target the correct button
    });

    // wait for task addition logic to complete
    await waitFor(() => {
      expect(mock_Add_task).toHaveBeenCalledWith(
        {
          taskTitle: "Test Task",
          taskDescription: "Test Description",
          dueDate: expect.any(Date),
          type: "project",
        },
        expect.any(Array)
      );
      expect(Alert.alert).toHaveBeenCalledWith(
        "Success",
        "Project added successfully"
      );
      expect(mockNavigation.goBack).toHaveBeenCalled();
    });
  });

  test("shows error alert when adding a task fails", async () => {
    mock_Add_task.mockRejectedValue(new Error("Network Error")); // simulate network error

    const { getByPlaceholderText, getAllByText } = render(
      <Task_context.Provider value={mockContextValue}>
        <ProjectPage navigation={mockNavigation} />
      </Task_context.Provider>
    );

    // inputs are set to bypass validation errors
    fireEvent.changeText(getByPlaceholderText("Project title"), "Test Task");
    fireEvent.changeText(
      getByPlaceholderText("Project description"),
      "Test Description"
    );

    //  Check if inputs are correctly set
    console.log(
      "Title input:",
      getByPlaceholderText("Project title").props.value
    ); // Expected: "Test Task"
    console.log(
      "Description input:",
      getByPlaceholderText("Project description").props.value
    ); // Expected: "Test Description"

    await act(async () => {
      fireEvent.press(getAllByText("Add Project")[1]); // press the Add Project button
    });

    // alert for network error
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith("Error", "Network Error");
    });
  });

  test("shows validation error when taskTitle or taskDescription is empty", async () => {
    const { getAllByText } = render(
      <Task_context.Provider value={mockContextValue}>
        <ProjectPage navigation={mockNavigation} />
      </Task_context.Provider>
    );

    fireEvent.press(getAllByText("Add Project")[1]); // Use getAllByText and select the correct button by index

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Validation Error",
        "Project title and description are required"
      );
    });
  });
  test("adds user email to the list when user exists", async () => {
    mockCheckUserExists.mockResolvedValue(true);

    const { getByText, getByPlaceholderText, queryByDisplayValue } = render(
      <Task_context.Provider value={mockContextValue}>
        <ProjectPage navigation={mockNavigation} />
      </Task_context.Provider>
    );

    fireEvent.changeText(
      getByPlaceholderText("Max 5 collaborator"),
      "user@gmail.com"
    );
    fireEvent.press(getByText("Add"));

    await waitFor(() => {
      // Check if the input is cleared properly after adding
      expect(queryByDisplayValue("user@gmail.com")).toBeNull();
      expect(getByText("user@gmail.com")).toBeTruthy();
    });
  });
  test("shows error alert when user does not exist", async () => {
    mockCheckUserExists.mockResolvedValue(false);
    const { getByText, getByPlaceholderText } = render(
      <Task_context.Provider value={mockContextValue}>
        <ProjectPage navigation={mockNavigation} />
      </Task_context.Provider>
    );

    fireEvent.changeText(
      getByPlaceholderText("Max 5 collaborator"),
      "nonexistent@gmail.com"
    );
    fireEvent.press(getByText("Add"));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith("Error", "User does not exist");
    });
  });
});
