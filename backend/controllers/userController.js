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

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.fullName = req.body.fullName || user.fullName;
    user.phone = req.body.phone || user.phone;
    user.city = req.body.city || user.city;
    user.zipCode = req.body.zipCode || user.zipCode;
    user.countryCode = req.body.countryCode || user.countryCode;

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
      phone: updatedUser.phone,
      city: updatedUser.city,
      zipCode: updatedUser.zipCode,
      countryCode: updatedUser.countryCode
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.password !== currentPassword) {
      return res.status(400).json({ message: 'Incorrect current password' });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export const completeChallenge = async (req, res) => {
  try {
    const { dayNumber, pointsEarned } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.completedChallenges) {
      user.completedChallenges = [];
    }

    const dayNum = Number(dayNumber);

    // Agar ye challenge pehle se complete nahi hai tabhi points aur streak barhao
    if (!user.completedChallenges.includes(dayNum)) {
      user.completedChallenges.push(dayNum);
      user.points = (user.points || 0) + (pointsEarned || 100);
      user.streakDays = (user.streakDays || 0) + 1;
      await user.save();
    }

    res.status(200).json({
      points: user.points,
      streakDays: user.streakDays,
      completedChallenges: user.completedChallenges,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};