import { useState } from "react";
import Question from "../../Components/Question/Question";
import { ToastContainer, toast } from "react-toastify";

const FormCreator = () => {
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [uniqueString, setUniqueString] = useState("");
  const [questions, setQuestions] = useState([]);

  const addQuestion = () => {
    toast.success("Make sure to click on save questions to save it!!!");
    setQuestions([...questions, {}]);
  };

  const handleQuestionChange = (index, questionData) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = questionData;
    setQuestions(updatedQuestions);
    toast.success("Question Saved Successfully!!!")
  };

  const saveForm = () => {
    console.log("Form Data:", {
      formName,
      formDescription,
      questions,
    });
    toast.success("Form Submitted!!!")

    // Send req. to backend here
  };
  return (
    <>
      <ToastContainer />
      <div>
        <input
          type="text"
          placeholder="Form Name"
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Form Description"
          value={formDescription}
          onChange={(e) => setFormDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Unique String"
          value={uniqueString}
          onChange={(e) => setUniqueString(e.target.value)}
        />
        {questions.map((question, index) => (
          <Question
            key={index}
            uniqueString={uniqueString}
            questionNumber={index + 1}
            onQuestionChange={(questionData) =>
              handleQuestionChange(index, questionData)
            }
          />
        ))}
        <button onClick={addQuestion}>Add Question</button>
        <button onClick={saveForm}>Save Form</button>
      </div>
    </>
  );
};
export default FormCreator;
