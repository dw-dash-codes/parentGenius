import CommunitySolution from '../models/CommunitySolution.js';

export const getSolutions = async (req, res) => {
  try {
    const solutions = await CommunitySolution.find().sort({ createdAt: -1 });
    res.status(200).json(solutions);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export const createSolution = async (req, res) => {
  try {
    const { content, topic, ageGroup } = req.body;
    const user = req.user.fullName || "Parent";
    const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    const newSolution = await CommunitySolution.create({
      user,
      content,
      topic,
      ageGroup,
      date,
    });

    res.status(201).json(newSolution);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
export const rateSolution = async (req, res) => {
  try {
    const { rating } = req.body;
    const solution = await CommunitySolution.findById(req.params.id);

    if (!solution) {
      return res.status(404).json({ message: 'Solution not found' });
    }

    // Simple average or direct rating update logic
    solution.rating = rating;
    await solution.save();

    res.status(200).json(solution);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};