import User from '../models/User.js';

export const updateOnboarding = async (req, res) => {
  try {
    const userId = req.user.id; 
    
    const {
      fullName,
      phone,
      country,
      childrenCount,
      childrenAges,
      parentType,
      improveGoals,
      childValues,
      struggles,
      confidenceScale,
      emailOptIn,
      currentNeeds
    } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (fullName !== undefined) user.fullName = fullName;
    if (phone !== undefined) user.phone = phone;
    if (country !== undefined) user.country = country;
    if (childrenCount !== undefined) user.childrenCount = childrenCount;
    if (childrenAges !== undefined) user.childrenAges = childrenAges;
    if (parentType !== undefined) user.parentType = parentType;
    if (improveGoals !== undefined) user.improveGoals = improveGoals;
    if (childValues !== undefined) user.childValues = childValues;
    if (struggles !== undefined) user.struggles = struggles;
    if (confidenceScale !== undefined) user.confidenceScale = confidenceScale;
    if (emailOptIn !== undefined) user.emailOptIn = emailOptIn;
    if (currentNeeds !== undefined) user.currentNeeds = currentNeeds;

    const updatedUser = await user.save();

    res.status(200).json({
      message: 'Onboarding completed successfully',
      user: {
        id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        fullName: updatedUser.fullName
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};