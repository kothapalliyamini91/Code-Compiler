import React, { useState, useEffect } from 'react';
import './ide.css';
import axios from 'axios';
import questionsData from './decription';

const baseURL = 'http://172.18.0.1:2358/submissions';
const baseURL1 = 'http://127.0.0.1:8000/server/ide/';

export default function OnlineIde() {
  const [userId, setUserId] = useState('');
  const [language, setLanguage] = useState('');
  const [sourceCode, setSourceCode] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [questionNumber, setQuestionNumber] = useState('');
  const [questionDescription, setQuestionDescription] = useState('');
  const [questions, setQuestions] = useState(questionsData);
  const [executionStatus, setExecutionStatus] = useState('');
  const [executionTime, setExecutionTime] = useState('');
  const [error_, setError_] = useState('');
  const [savedData, setSavedData] = useState([]);
  const [outputs, setOutputs] = useState([]);
  const [testCasesPassed, setTestCasesPassed] = useState(0);
  const [failedTestCases, setFailedTestCases] = useState([]);

  useEffect(() => {
    // Add any additional logic that needs to run when the component mounts.
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setExecutionTime('');
    setError_('');
    const data = {
      source_code: sourceCode,
      language_id: language,
      stdin: input,
    };

    try {
      const response = await axios.post(baseURL, data);
      const token = response.data.token;

      setTimeout(() => {
        fetchOutput(token);
      }, 4000);

      const runTestCases = async () => {
        let passedCount = 0;
        const newOutputs = [];
        const failedCases = [];

        const selectedQuestion = questionsData[selectedQuestionIndex];

        if (selectedQuestion && selectedQuestion.testCases) {
          for (const testCase of selectedQuestion.testCases) {
            try {
              const response = await axios.post(baseURL, {
                ...data,
                stdin: testCase.input,
              });
              const token = response.data.token;

              // eslint-disable-next-line no-loop-func
              setTimeout(async () => {
                const output = await fetchOutput1(token);
                console.log('Input:', testCase.input);
                console.log('Expected Output:', testCase.expectedOutput);
                console.log('Actual Output:', output);
                console.log('---');
                newOutputs.push({
                  input: testCase.input,
                  expectedOutput: testCase.expectedOutput,
                  actualOutput: output.replace(/\n/g, ''), // Remove newline characters
                });
                if (output.replace(/\n/g, '') === testCase.expectedOutput) {
                  passedCount++; // Update passedCount within the setTimeout callback
                } else {
                  failedCases.push({
                    input: testCase.input,
                    expectedOutput: testCase.expectedOutput,
                    actualOutput: output.replace(/\n/g, ''), // Remove newline characters
                  });
                }
                // Check if this is the last test case, and update passed count
                if (newOutputs.length === selectedQuestion.testCases.length) {
                  setTestCasesPassed(passedCount);
                }
              }, 4000);
            } catch (error) {
              console.error('Error occurred during test case execution:', error);
            }
          }
        }
        setOutputs(newOutputs);
        console.log(outputs);
        setFailedTestCases(failedCases);
        console.log(failedTestCases);
      };

      runTestCases();
    } catch (error) {
      console.error(error);
      setExecutionStatus('Error occurred during execution');
      setError_(error.response?.data?.stderr || 'Unknown error occurred');
      setOutput('');
    }
  };

  const fetchOutput = async (token) => {
    try {
      const url = `${baseURL}/${token}`;
      const response = await axios.get(url);
      setOutput(response.data.stdout || '');
      setError_(response.data.stderr || '');
      setExecutionTime(response.data.time || '');
      setExecutionStatus(response.data.status?.description || '');
    } catch (error) {
      console.error(error);
      setError_('Error occurred while fetching output');
      setExecutionStatus('Error occurred while fetching output');
    }
  };

  const fetchOutput1 = async (token) => {
    try {
      const url = `${baseURL}/${token}`;
      const response = await axios.get(url);
      const output = response.data.stdout || '';
      return output;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    setInput('');
    setOutput('');
  };

  const handleSourceCode = (e) => {
    setSourceCode(e.target.value);
    setInput('');
    setOutput('');
  };

  const handleAddButtonClick = () => {
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
    setQuestionNumber('');
    setQuestionDescription('');
  };

  const handleModalSubmit = () => {
    const newQuestion = {
      number: questionNumber,
      description: questionDescription,
    };
    setQuestions([...questions, newQuestion]);
    handleModalClose();
  };

  const handleSave = () => {
    const selectedQuestion = questionsData[selectedQuestionIndex];
    const newData = {
      userId,
      language,
      sourceCode,
      input,
      output,
      executionStatus,
      executionTime,
      error_,
      questionNumber: selectedQuestion?.question_id,
      questionDescription: selectedQuestion?.question_description,
    };

    setSavedData([...savedData, newData]);
    console.log('Data to be saved:', newData);
    axios
      .post(baseURL1, newData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error saving data:', error);
      });
  };

  return (
    <div>
      <nav className="navbar">
        <div className="title">CODE COMPILER</div>
      </nav>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <div className="button-list-container">
          <button className="add-button" onClick={handleAddButtonClick}>
            Add Question
          </button>
          <div className="button-grid">
            {questions.map((question, index) => (
              <button
                key={index}
                className={`custom-button ${question && question.number ? 'added' : ''}`}
                onClick={() => setSelectedQuestionIndex(index)}
              >
                {question && question.number ? `${question.number}` : ` ${index + 1}`}
              </button>
            ))}
          </div>
        </div>

        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <label htmlFor="userId">User ID:</label>
              <input
                type="text"
                id="userId"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              />
              <label htmlFor="language">Language:</label>
              <select
                id="language"
                value={language}
                onChange={handleLanguageChange}
                required
              >
                <option value="">Select a language</option>
                <option value="50">C</option>
                <option value="54">C++</option>
                <option value="62">Java</option>
                <option value="71">Python</option>
              </select>
            </div>

            <label htmlFor="sourceCode">Source Code:</label>
            <textarea
              id="sourceCode"
              value={sourceCode}
              onChange={handleSourceCode}
              required
            />

            <label htmlFor="input">Input:</label>
            <textarea
              style={{ height: '40px' }}
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button type="submit">Run</button>
              <button type="button" onClick={handleSave}>
                Save
              </button>
            </div>

            <label htmlFor="output">Output</label>
            <textarea
              style={{ height: '30px' }}
              type="text"
              id="output"
              value={output}
              readOnly
            />
            <label htmlFor="error">Error:</label>
            <textarea
              style={{ height: '30px' }}
              value={error_}
              type="text"
              id="error"
            ></textarea>

            {executionTime && <p>Execution Time: {executionTime} seconds</p>}
            {executionStatus && <p>Result: {executionStatus}</p>}
          </form>
        </div>

        <div>
          <div className="question-wrapper">
            <div className="question-container">
              <p className="question-description">
                {selectedQuestionIndex !== null
                  ? questions[selectedQuestionIndex]?.question_description
                  : questions[0]?.question_description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {modalIsOpen && (
        <div className="alert-modal">
          <div className="alert-content">
            <h2>Add Question</h2>
            <div style={{ display: 'grid' }}>
              <label>
                Question Number:
                <input
                  type="text"
                  className="input-field1"
                  value={questionNumber}
                  onChange={(e) => setQuestionNumber(e.target.value)}
                  required
                />
              </label>
            </div>
            <div style={{ display: 'grid' }}>
              <label>Question Description:</label>
              <textarea
                id="sourceCode"
                value={questionDescription}
                onChange={(e) => setQuestionDescription(e.target.value)}
                required
                rows={10}
              />
            </div>
            <div className="modal-button-container">
              <button className="submit-button" onClick={handleModalSubmit}>
                Submit
              </button>
              <button className="cancel-button" onClick={handleModalClose}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
