import formModel from "../models/formModel.js";
import questionModel from "../models/questionModel.js";

export const createFormController = async (req, res) => {
  try {
    const { name, description, questions } = req.body;

    // create questions
    const questionIds = await Promise.all(
      questions.map(async (questionData) => {
        let question = await questionModel.create(questionData);
        // overwrite default id and Next question part left
        return question._id;
      })
    );

    // create form
    const form = await formModel.create({
      name,
      description,
      questions: questionIds,
      responses: [], // how?
    });

    res.status(201).json({
      success: true,
      message: "Form Created Successfully",
      data: form,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error while creating form", error });
  }
};

export const getAllFormsController = async (req, res) => {
  try {
    const forms = await formModel
      .find()
      .select({ _id: 1, name: 1, description: 1, questions: 0, responses: 0 });
    if (forms && forms.length) {
      res.status(200).send({
        success: true,
        message: "forms fetched successfully",
        forms,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const getFormController = async (req, res) => {
  const { formId } = req.params;
  try {
    const form = await formModel
      .findById(formId)
      .select({ _id: 1, name: 1, description: 1, questions: 1, responses: 0 });
    if (form) {
      res.status(200).send({ success: true, form });
    } else {
      res.status(404).send({
        success: false,
        message: "form not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while getting form",
      error,
    });
  }
};

export const deleteFormController = async (req, res) => {
  try {
    const { formId } = req.body;
    const form = await formModel.findByIdAndDelete(formId);
    if (!form) {
      res.status(404).send({
        success: false,
        message: "form not found for deletion",
      });
    } else {
      const { deletedCount } = await questionModel.deleteMany({
        _id: { $in: form.questions },
      });
      res.status(204).send({
        success: true,
        message: `The form and ${deletedCount} associated questions were deleted.`,
      });
    }
  } catch (error) {
    console.error(error);
  }
};
