import { useState } from "react";

const Question = ({ uniqueString, questionNumber, onQuestionChange }) => {
  const [questionType, setQuestionType] = useState("");
  const [questionDescription, setQuestionDescription] = useState("");
  const [options, setOptions] = useState([]);
  const [nextQuestions, setNextQuestions] = useState([]);

  const addOption = () => {
    setOptions([...options, ""]);
    setNextQuestions([...nextQuestions, ""]);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleNextQuestionChange = (index, value) => {
    const newNextQuestions = [...nextQuestions];
    newNextQuestions[index] = value;
    setNextQuestions(newNextQuestions);
  };

  // Main Question submission here
  const handleQuestionChange = () => {
    let nextQuestionValue = "";
    if (questionType === "message" || questionType === "text-response") {
      nextQuestionValue = nextQuestions[0]
        ? [`${uniqueString}${nextQuestions[0]}`]
        : [];
    } else if (questionType === "multi-choice") {
      // if the next Question not present for some options then default value???
      // nextQuestionValue = nextQuestions.map(quesNo=>`${uniqueString}${quesNo}`)
      nextQuestionValue = options.map(
        (val, index) =>
          nextQuestions[index] ? `${uniqueString}${nextQuestions[index]}` : "" //and the next question needs to be present most probably
      );
    }

    // prepare the question data
    const questionData = {
      _id: `${uniqueString}${questionNumber}`,
      Type: questionType,
      Description: questionDescription,
      Options: questionType === "multi-choice" ? options : [],
      NextQuestion: nextQuestionValue,
      Required: true,
    };

    onQuestionChange(questionData);
    // Add this whole question data to the "questions"
  };
  return (
    <>
      <div>
        <input
          type="text"
          placeholder={`Question ${questionNumber}`}
          readOnly
          //   value={`${uniqueString}${questionNumber}`}
        />
        {/* Make the select horizontal */}
        <select
          value={questionType}
          onChange={(e) => setQuestionType(e.target.value)}
        >
          <option value="">Select Question Type</option>
          <option value="message">Message</option>
          <option value="text-response">Text Response</option>
          <option value="multi-choice">Multi Choice</option>
        </select>
        <input
          type="text"
          placeholder="Question Description"
          value={questionDescription}
          onChange={(e) => setQuestionDescription(e.target.value)}
        />
        {questionType === "multi-choice" && (
          <div>
            {options.map((option, index) => (
              <div key={index}>
                <input
                  type="text"
                  placeholder={`Option ${index + 1} Description`}
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                />
                <input
                  type="text"
                  placeholder={`Next Question Number for Option ${index+1}`}
                  value={nextQuestions[index]}
                  onChange={(e) =>
                    handleNextQuestionChange(index, e.target.value)
                  }
                />
              </div>
            ))}
            <button onClick={addOption}>Add Option</button>
          </div>
        )}
        {/* Show the next Question for whole question if not multi choice */}
        {questionType !== "multi-choice" && (
          <input
            type="text"
            placeholder="Next Question Number"
            value={nextQuestions[0]}
            onChange={(e) => handleNextQuestionChange(0, e.target.value)}
          />
        )}
        <button onClick={handleQuestionChange}>Save Question</button>
      </div>
    </>
  );
};

export default Question;
